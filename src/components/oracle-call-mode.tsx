"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Phone, PhoneOff, Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"

// ═══════════════════════════════════════
// NO STATIC IMPORTS FROM @elevenlabs/*
// Everything is loaded at runtime via dynamic import()
// This ensures the build succeeds even if the package
// is not installed in node_modules.
// ═══════════════════════════════════════

/* ═══════════════════════════════════════
   VOICE VISUALIZER
   ═══════════════════════════════════════ */
function VoiceVisualizer({ active, bars = 48, getFreqData }: {
  active: boolean
  bars?: number
  getFreqData?: () => Uint8Array | undefined
}) {
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(2))
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!active) {
      setHeights(Array(bars).fill(2))
      return
    }

    const update = () => {
      if (getFreqData) {
        const data = getFreqData()
        if (data && data.length > 0) {
          const step = Math.floor(data.length / bars)
          setHeights(
            Array(bars)
              .fill(0)
              .map((_, i) => 2 + (data[i * step] / 255) * 22)
          )
        } else {
          setHeights(Array(bars).fill(0).map(() => 2 + Math.random() * 14))
        }
      } else {
        setHeights(Array(bars).fill(0).map(() => 2 + Math.random() * 18))
      }
      frameRef.current = requestAnimationFrame(update)
    }

    frameRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frameRef.current)
  }, [active, bars, getFreqData])

  return (
    <div className="flex items-end justify-center gap-[1.5px] h-7">
      {heights.map((h, i) => (
        <div
          key={i}
          className={cn(
            "w-[2px] rounded-full transition-[height]",
            active ? "bg-white/40 duration-75" : "bg-white/8 duration-500"
          )}
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   CALL TEXT INPUT
   ═══════════════════════════════════════ */
function CallTextInput({ placeholder, onSend }: { placeholder: string; onSend: (text: string) => void }) {
  const [val, setVal] = useState("")
  const send = () => {
    if (!val.trim()) return
    onSend(val.trim())
    setVal("")
  }
  return (
    <div className="flex items-center gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder={placeholder}
        className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-[12px] text-white/50 placeholder:text-white/12 outline-none focus:border-white/[0.1] transition-colors font-mono"
      />
      <button
        onClick={send}
        disabled={!val.trim()}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-white/40 disabled:opacity-20 transition-colors bg-white/[0.03] border border-white/[0.06]"
      >
        <Send className="w-3 h-3" />
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════
   CALL MODE — ElevenLabs Real-time Voice
   Uses imperative Conversation API loaded at runtime
   ═══════════════════════════════════════ */
type Lang = "pt" | "en"

interface CallModeProps {
  agentId: string
  lang: Lang
  tx: {
    callConnecting: string
    callActive: string
    callEnded: string
    callStart: string
    callEnd: string
  }
  onTranscript: (role: "oracle" | "user", text: string) => void
}

// Runtime-import ElevenLabs — bundled as a separate async chunk
// Falls back gracefully if the package is not installed
async function loadElevenLabs(): Promise<{ Conversation: any } | null> {
  try {
    const mod = await import("@elevenlabs/client")
    return mod
  } catch {
    return null
  }
}

export default function CallMode({ agentId, lang, tx, onTranscript }: CallModeProps) {
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "error">("idle")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [sdkAvailable, setSdkAvailable] = useState<boolean | null>(null)
  const conversationRef = useRef<any>(null)
  const animFrameRef = useRef<number>(0)

  // Check SDK availability on mount
  useEffect(() => {
    loadElevenLabs().then((mod) => {
      setSdkAvailable(!!mod?.Conversation)
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(animFrameRef.current)
      if (conversationRef.current) {
        try { conversationRef.current.endSession() } catch {}
      }
    }
  }, [])

  const handleStartCall = useCallback(async () => {
    setStatus("connecting")

    try {
      // Check secure context (required for mic access)
      if (!window.isSecureContext) {
        throw new Error("INSECURE_CONTEXT")
      }

      // Request mic permission if available (pre-warm)
      if (navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          // Release the stream — the SDK will request its own
          stream.getTracks().forEach(t => t.stop())
        } catch (micErr: any) {
          // If user denied, throw specific error
          if (micErr?.name === "NotAllowedError") {
            throw new Error("MIC_DENIED")
          }
          // Other mic errors — let SDK try anyway
          console.warn("Pre-mic check failed, letting SDK handle:", micErr)
        }
      }

      const mod = await loadElevenLabs()
      if (!mod?.Conversation) {
        throw new Error("SDK_UNAVAILABLE")
      }

      const conversation = await mod.Conversation.startSession({
        agentId,
        connectionType: "webrtc",
        onConnect: () => {
          setStatus("connected")
          onTranscript("oracle", lang === "pt"
            ? "Conectado. Estou ouvindo — fale naturalmente sobre o que te trouxe aqui."
            : "Connected. I'm listening — speak naturally about what brought you here."
          )
        },
        onDisconnect: () => {
          setStatus("idle")
          conversationRef.current = null
          onTranscript("oracle", lang === "pt"
            ? "Chamada encerrada. Se quiser continuar, inicie uma nova chamada ou use o chat."
            : "Call ended. To continue, start a new call or use chat."
          )
        },
        onMessage: (message: any) => {
          if (message?.message) {
            const role = message.source === "user" ? "user" as const : "oracle" as const
            onTranscript(role, message.message)
          }
        },
        onModeChange: (mode: any) => {
          setIsSpeaking(mode?.mode === "speaking")
        },
        onError: (error: any) => {
          console.error("ElevenLabs error:", error)
          setStatus("error")
          conversationRef.current = null
          onTranscript("oracle", lang === "pt"
            ? "Erro na conexão. Tente novamente ou use o chat de texto."
            : "Connection error. Try again or use the text chat."
          )
        },
      })

      conversationRef.current = conversation
    } catch (err: any) {
      console.error("Failed to start call:", err)
      setStatus("error")

      const errorMsg = err?.message || ""
      let userMessage: string

      if (errorMsg === "INSECURE_CONTEXT") {
        userMessage = lang === "pt"
          ? "Chamadas de voz requerem HTTPS. Acesse via localhost ou configure HTTPS."
          : "Voice calls require HTTPS. Access via localhost or configure HTTPS."
      } else if (errorMsg === "MIC_DENIED") {
        userMessage = lang === "pt"
          ? "Permissão de microfone negada. Clique no ícone de cadeado na barra de endereço → Microfone → Permitir, e recarregue."
          : "Microphone permission denied. Click the lock icon in the address bar → Microphone → Allow, then reload."
      } else if (errorMsg === "SDK_UNAVAILABLE") {
        userMessage = lang === "pt"
          ? "SDK de voz não encontrado. Execute: npm install @elevenlabs/client"
          : "Voice SDK not found. Run: npm install @elevenlabs/client"
      } else {
        userMessage = lang === "pt"
          ? "Não consegui iniciar a chamada. Verifique as permissões do microfone e tente novamente."
          : "Couldn't start the call. Check microphone permissions and try again."
      }

      onTranscript("oracle", userMessage)
      setTimeout(() => setStatus("idle"), 4000)
    }
  }, [agentId, onTranscript, lang])

  const handleEndCall = useCallback(async () => {
    if (conversationRef.current) {
      try {
        await conversationRef.current.endSession()
      } catch {}
      conversationRef.current = null
    }
    setStatus("idle")
    setIsSpeaking(false)
  }, [])

  const handleSendText = useCallback((text: string) => {
    if (conversationRef.current?.sendUserMessage) {
      conversationRef.current.sendUserMessage(text)
    }
  }, [])

  const isConnecting = status === "connecting"
  const isConnected = status === "connected"

  // SDK not yet checked
  if (sdkAvailable === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-10">
        <Loader2 className="w-5 h-5 animate-spin text-white/15" />
        <span className="font-mono text-[10px] text-white/15 uppercase tracking-wider">
          {lang === "pt" ? "Verificando módulo de voz..." : "Checking voice module..."}
        </span>
      </div>
    )
  }

  // SDK not available — show install instructions
  if (!sdkAvailable) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 px-6 text-center">
        <Phone className="w-8 h-8 text-white/10" />
        <div className="space-y-2">
          <p className="font-mono text-[11px] text-white/30">
            {lang === "pt"
              ? "Módulo de voz não disponível"
              : "Voice module not available"}
          </p>
          <p className="font-mono text-[9px] text-white/15 leading-relaxed max-w-xs">
            {lang === "pt"
              ? "Para ativar chamadas por voz, instale o SDK:"
              : "To enable voice calls, install the SDK:"}
          </p>
          <code className="block font-mono text-[10px] text-amber-400/40 bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-2.5 mt-2">
            npm install @elevenlabs/client
          </code>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5 py-6">
      {/* Visualizer */}
      <div className="w-full max-w-xs">
        <VoiceVisualizer
          active={isConnected}
          bars={48}
          getFreqData={isConnected && conversationRef.current?.getInputByteFrequencyData
            ? () => conversationRef.current?.getInputByteFrequencyData()
            : undefined}
        />
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            isConnected
              ? "bg-green-500 animate-pulse"
              : isConnecting
              ? "bg-amber-500 animate-pulse"
              : status === "error"
              ? "bg-red-500 animate-pulse"
              : "bg-white/15"
          )}
        />
        <span className="font-mono text-[10px] text-white/30 uppercase tracking-wider">
          {isConnecting
            ? tx.callConnecting
            : isConnected
            ? tx.callActive
            : status === "error"
            ? (lang === "pt" ? "Erro de conexão" : "Connection error")
            : ""}
        </span>
      </div>

      {/* Agent speaking indicator */}
      {isSpeaking && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-pulse" />
          <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider">
            {lang === "pt" ? "Substrato falando..." : "Substrate speaking..."}
          </span>
        </motion.div>
      )}

      {/* Call Button */}
      {!isConnected ? (
        <motion.button
          onClick={handleStartCall}
          disabled={isConnecting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "flex items-center gap-3 px-8 py-4 rounded-xl border transition-all duration-500",
            isConnecting
              ? "border-amber-500/20 bg-amber-500/5 text-amber-400/50 cursor-wait"
              : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white/70"
          )}
        >
          {isConnecting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Phone className="w-5 h-5" />
          )}
          <span className="font-mono text-sm">
            {isConnecting ? tx.callConnecting : tx.callStart}
          </span>
        </motion.button>
      ) : (
        <motion.button
          onClick={handleEndCall}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-8 py-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400/60 hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-500"
        >
          <PhoneOff className="w-5 h-5" />
          <span className="font-mono text-sm">{tx.callEnd}</span>
        </motion.button>
      )}

      {/* Text input during call */}
      {isConnected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <CallTextInput
            placeholder={lang === "pt" ? "Ou digite uma mensagem..." : "Or type a message..."}
            onSend={handleSendText}
          />
        </motion.div>
      )}
    </div>
  )
}
