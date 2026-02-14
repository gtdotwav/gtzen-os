"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Send,
  Brain,
  Zap,
  ChevronRight,
  Phone,
  MessageSquare,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Dynamically import CallMode — only loads when call mode is activated
// This prevents @elevenlabs/react from being a hard build dependency
const CallMode = dynamic(() => import("./oracle-call-mode"), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center gap-4 py-10">
      <Loader2 className="w-6 h-6 animate-spin text-white/20" />
      <span className="font-mono text-[10px] text-white/15 uppercase tracking-wider">
        Loading voice module...
      </span>
    </div>
  ),
})

/* ═══════════════════════════════════════
   TYPES
   ═══════════════════════════════════════ */
type Lang = "pt" | "en"
type OracleMode = "chat" | "call"

interface Message {
  role: "oracle" | "user" | "system"
  text: string
  timestamp: Date
}

interface LeadData {
  name?: string
  business?: string
  problem?: string
  scale?: string
  contact?: string
}

interface SubstrateOracleProps {
  isOpen: boolean
  onClose: () => void
  lang: Lang
  agentId?: string
}

/* ═══════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════ */
const oracleT = {
  pt: {
    title: "Substrato Oracle",
    subtitle: "IA Conversacional · Qualificação Inteligente",
    greeting:
      "Bem-vindo ao núcleo do Substrato. Eu sou a camada de inteligência que conecta visão a execução. Me conte sobre você — o que te trouxe até aqui?",
    inputPlaceholder: "Digite sua mensagem...",
    starterLabel: "Acesse o conhecimento:",
    starters: [
      { text: "Como a IA pode escalar meu negócio?", icon: "zap", category: "business" },
      { text: "Quero construir um sistema que opera sozinho", icon: "brain", category: "scale" },
      { text: "Como funciona uma parceria com o Geander?", icon: "chevron", category: "partnership" },
      { text: "Qual o investimento para ter infraestrutura de IA?", icon: "zap", category: "budget" },
    ],
    thinking: "Processando...",
    leadCapture: "Para continuar esta conversa e receber uma análise personalizada, deixe seu contato:",
    namePlaceholder: "Seu nome",
    emailPlaceholder: "Seu melhor email",
    submitLead: "Enviar e continuar",
    thankYou: "Perfeito. O Geander vai analisar seu caso pessoalmente e entrar em contato em até 24h. Enquanto isso, explore o resto do Substrato.",
    chatMode: "Chat",
    callMode: "Chamada ao vivo",
    callConnecting: "Conectando ao Substrato...",
    callActive: "Conversa ativa — fale naturalmente",
    callEnded: "Chamada encerrada",
    callStart: "Iniciar chamada com IA",
    callEnd: "Encerrar chamada",
    callNoAgent: "Configure NEXT_PUBLIC_ELEVENLABS_AGENT_ID para ativar chamadas por voz",
    poweredBy: "ElevenLabs Conversational AI",
  },
  en: {
    title: "Substrate Oracle",
    subtitle: "Conversational AI · Intelligent Qualification",
    greeting:
      "Welcome to the Substrate core. I'm the intelligence layer that connects vision to execution. Tell me about yourself — what brought you here?",
    inputPlaceholder: "Type your message...",
    starterLabel: "Access the knowledge:",
    starters: [
      { text: "How can AI scale my business?", icon: "zap", category: "business" },
      { text: "I want to build a self-operating system", icon: "brain", category: "scale" },
      { text: "How does a partnership with Geander work?", icon: "chevron", category: "partnership" },
      { text: "What's the investment for AI infrastructure?", icon: "zap", category: "budget" },
    ],
    thinking: "Processing...",
    leadCapture: "To continue this conversation and receive a personalized analysis, leave your contact:",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your best email",
    submitLead: "Submit and continue",
    thankYou: "Perfect. Geander will personally review your case and reach out within 24h. Meanwhile, explore the rest of the Substrate.",
    chatMode: "Chat",
    callMode: "Live Call",
    callConnecting: "Connecting to Substrate...",
    callActive: "Call active — speak naturally",
    callEnded: "Call ended",
    callStart: "Start AI call",
    callEnd: "End call",
    callNoAgent: "Configure NEXT_PUBLIC_ELEVENLABS_AGENT_ID to enable voice calls",
    poweredBy: "ElevenLabs Conversational AI",
  },
}

/* ═══════════════════════════════════════
   CONVERSATION TREE (chat mode)
   ═══════════════════════════════════════ */
type FlowNode = {
  responses: string[]
  followUp?: string
  extractField?: keyof LeadData
}

const conversationFlows: Record<Lang, Record<string, FlowNode>> = {
  pt: {
    business: {
      responses: [
        "Boa pergunta. A maioria das empresas tenta usar IA como ferramenta — mas o real poder está em usar como infraestrutura de decisão.",
        "Na PAI, construímos pipelines que automatizam 85% das decisões operacionais. O resultado? O fundador para de apagar incêndio e começa a arquitetar.",
        "Me conta: qual é o seu negócio? Quero entender o contexto antes de sugerir qualquer coisa.",
      ],
      followUp: "business_detail",
    },
    business_detail: {
      responses: [
        "Interessante. Esse tipo de operação geralmente tem gargalos em 3 pontos: aquisição, operação e escala.",
        "O Substrato ataca os três simultaneamente — não resolve um problema, resolve a estrutura que causa os problemas.",
        "Qual desses três é o que mais dói hoje?",
      ],
      extractField: "business",
    },
    scale: {
      responses: [
        "Esse é exatamente o tipo de pensamento que separa operadores de arquitetos.",
        "Um sistema que opera sozinho precisa de 4 camadas: visão clara, arquitetura de decisão, execução automatizada, e feedback loops.",
        "O Geander construiu isso para a PAI, para a DryOn, e para mais de 10 empresas no portfólio — com parceria em gateways de pagamento, investimento na Shield Tech, e networking com CEOs de exits bilionários. Não é teoria — é infraestrutura em produção.",
        "Qual é o sistema que você quer construir? Me dê contexto.",
      ],
      followUp: "scale_detail",
    },
    scale_detail: {
      responses: [
        "Entendi o cenário. Isso tem padrão de um sistema de 3-4 camadas.",
        "O approach seria: mapear decisões que se repetem, automatizar a camada de inteligência, e construir loops de feedback.",
        "Para uma análise real, como posso te encontrar? Nome e email — o Geander analisa pessoalmente.",
      ],
      extractField: "problem",
    },
    partnership: {
      responses: [
        "Transparência total: o Geander não trabalha com qualquer um.",
        "A seleção é por alinhamento de pensamento — se você pensa em sistemas e longo prazo, já está 80% qualificado.",
        "Atualmente há 1 slot aberto para Q1 2026. Me conta: o que você está construindo?",
      ],
      followUp: "partnership_detail",
    },
    partnership_detail: {
      responses: [
        "Isso tem potencial. O tipo de desafio que o Geander gosta de resolver — complexo, sistêmico, com impacto real.",
        "Deixa seu nome e email — ele vai revisar pessoalmente e responder em 24h.",
      ],
      extractField: "scale",
    },
    budget: {
      responses: [
        "Não trabalho com tabela de preços — porque cada sistema é único.",
        "O investimento reflete a complexidade da arquitetura. O ROI é claro: sistemas que operam sozinhos eliminam custos que se acumulam infinitamente.",
        "Para uma estimativa real, qual é o tamanho da sua operação hoje?",
      ],
      followUp: "budget_detail",
    },
    budget_detail: {
      responses: [
        "Entendi a escala. Com esse contexto, já tenho ideia da infraestrutura necessária.",
        "Me passa seu nome e email para agendar uma conversa estratégica.",
      ],
      extractField: "scale",
    },
    generic: {
      responses: [
        "Entendi. O Substrato opera com lógica simples: cada problema é um sistema esperando ser arquitetado.",
        "Me conta mais — quanto mais contexto, mais preciso eu consigo ser.",
      ],
    },
  },
  en: {
    business: {
      responses: [
        "Great question. Most companies try to use AI as a tool — but the real power is using it as decision infrastructure.",
        "At PAI, we build pipelines that automate 85% of operational decisions. The result? Founders stop firefighting and start architecting.",
        "Tell me: what's your business? I need context before suggesting anything.",
      ],
      followUp: "business_detail",
    },
    business_detail: {
      responses: [
        "Interesting. This type of operation usually has bottlenecks in 3 areas: acquisition, operations, and scale.",
        "The Substrate attacks all three simultaneously — solving the structure, not just the symptoms.",
        "Which hurts most today?",
      ],
      extractField: "business",
    },
    scale: {
      responses: [
        "That's exactly the thinking that separates operators from architects.",
        "A self-operating system needs 4 layers: clear vision, decision architecture, automated execution, and feedback loops.",
        "Geander built this for PAI, DryOn, and 10+ portfolio companies — with payment gateway partnerships, Shield Tech investment, and a network including CEOs of billion-dollar exits. Not theory — infrastructure in production.",
        "What system do you want to build? Give me context.",
      ],
      followUp: "scale_detail",
    },
    scale_detail: {
      responses: [
        "I see the scenario. This follows a 3-4 layer system pattern.",
        "The approach: map repeating decisions, automate the intelligence layer, build feedback loops.",
        "For a real analysis — name and email? Geander reviews personally.",
      ],
      extractField: "problem",
    },
    partnership: {
      responses: [
        "Full transparency: Geander doesn't work with just anyone.",
        "Selection is by thinking alignment — systems thinking and long-term vision gets you 80% qualified.",
        "1 open slot for Q1 2026. What are you building?",
      ],
      followUp: "partnership_detail",
    },
    partnership_detail: {
      responses: [
        "This has potential. Complex, systemic, real impact — exactly what Geander solves.",
        "Leave your name and email — he'll personally review within 24h.",
      ],
      extractField: "scale",
    },
    budget: {
      responses: [
        "No price tables — every system is unique.",
        "The investment reflects architecture complexity. The ROI is clear: self-operating systems eliminate compounding operational costs.",
        "For a real estimate, what's the size of your operation today?",
      ],
      followUp: "budget_detail",
    },
    budget_detail: {
      responses: [
        "Got the scale. I can estimate the infrastructure needed.",
        "Send me your name and email to schedule a strategic conversation.",
      ],
      extractField: "scale",
    },
    generic: {
      responses: [
        "Got it. The Substrate operates on simple logic: every problem is a system waiting to be architected.",
        "Tell me more — the more context, the more precise I can be.",
      ],
    },
  },
}

/* ═══════════════════════════════════════
   CHAT MODE — Text conversation tree
   ═══════════════════════════════════════ */
function ChatMode({
  messages,
  isThinking,
  showStarters,
  showLeadForm,
  leadSubmitted,
  leadData,
  input,
  lang,
  tx,
  onInput,
  onSend,
  onStarter,
  onLeadChange,
  onLeadSubmit,
}: {
  messages: Message[]
  isThinking: boolean
  showStarters: boolean
  showLeadForm: boolean
  leadSubmitted: boolean
  leadData: LeadData
  input: string
  lang: Lang
  tx: (typeof oracleT)["pt"]
  onInput: (v: string) => void
  onSend: () => void
  onStarter: (starter: { text: string; category: string }) => void
  onLeadChange: (data: Partial<LeadData>) => void
  onLeadSubmit: () => void
}) {
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking, showLeadForm])

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 300)
  }, [])

  const starterIcons: Record<string, typeof Brain> = {
    brain: Brain,
    zap: Zap,
    chevron: ChevronRight,
  }

  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 oracle-scroll">
        {messages.map((msg, i) => (
          <motion.div
            key={`${i}-${msg.timestamp.getTime()}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-lg px-4 py-3",
                msg.role === "user"
                  ? "bg-white/[0.06] text-white/70"
                  : msg.role === "system"
                  ? "bg-amber-500/[0.04] text-amber-300/40 border border-amber-500/10"
                  : "text-white/50 border border-white/[0.04]"
              )}
            >
              {msg.role === "oracle" && (
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1 h-1 rounded-full bg-green-500/50" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/15">
                    substrato
                  </span>
                </div>
              )}
              <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
            </div>
          </motion.div>
        ))}

        {/* Thinking */}
        {isThinking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/[0.04]">
              <div className="flex gap-1">
                {[0, 200, 400].map((d) => (
                  <div
                    key={d}
                    className="w-1.5 h-1.5 rounded-full bg-white/25 animate-pulse"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-white/15">{tx.thinking}</span>
            </div>
          </motion.div>
        )}

        {/* Starter Questions */}
        <AnimatePresence>
          {showStarters && messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3 pt-2"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/15 block">
                {tx.starterLabel}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tx.starters.map((starter, i) => {
                  const Icon = starterIcons[starter.icon] || Zap
                  return (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.08 }}
                      onClick={() => onStarter(starter)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300 text-left group"
                    >
                      <Icon className="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition-colors shrink-0" />
                      <span className="text-[12px] text-white/35 group-hover:text-white/55 transition-colors leading-snug">
                        {starter.text}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lead Form */}
        <AnimatePresence>
          {showLeadForm && !leadSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="rounded-lg border border-white/[0.06] p-5 space-y-4"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-amber-400/40">
                  gateway
                </span>
              </div>
              <p className="text-[12px] text-white/30 leading-relaxed">{tx.leadCapture}</p>
              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder={tx.namePlaceholder}
                  value={leadData.name || ""}
                  onChange={(e) => onLeadChange({ name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/60 placeholder:text-white/12 outline-none focus:border-white/[0.12] transition-colors font-mono"
                />
                <input
                  type="email"
                  placeholder={tx.emailPlaceholder}
                  value={leadData.contact || ""}
                  onChange={(e) => onLeadChange({ contact: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-white/60 placeholder:text-white/12 outline-none focus:border-white/[0.12] transition-colors font-mono"
                />
                <button
                  onClick={onLeadSubmit}
                  disabled={!leadData.name || !leadData.contact}
                  className="w-full py-2.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed bg-white/[0.06] hover:bg-white/[0.1] text-white/50 hover:text-white/70 border border-white/[0.06]"
                >
                  {tx.submitLead}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="px-5 py-4 border-t border-white/[0.04]">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => onInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  onSend()
                }
              }}
              placeholder={tx.inputPlaceholder}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-4 pr-11 py-3 text-[13px] text-white/60 placeholder:text-white/12 outline-none focus:border-white/[0.12] transition-colors"
              disabled={isThinking}
            />
            <button
              onClick={onSend}
              disabled={!input.trim() || isThinking}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/[0.04] disabled:opacity-15 transition-all"
            >
              {isThinking ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════
   MAIN ORACLE COMPONENT
   ═══════════════════════════════════════ */
export function SubstrateOracle({ isOpen, onClose, lang, agentId }: SubstrateOracleProps) {
  const tx = oracleT[lang]
  const flows = conversationFlows[lang]

  const [mode, setMode] = useState<OracleMode>("chat")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [showStarters, setShowStarters] = useState(true)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({})
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [messageCount, setMessageCount] = useState(0)

  // Use ref for currentFlow to avoid stale closures
  const currentFlowRef = useRef<string | null>(null)
  const greetingSentRef = useRef(false)

  // Greeting on open
  useEffect(() => {
    if (isOpen && !greetingSentRef.current) {
      greetingSentRef.current = true
      const timer = setTimeout(() => {
        setMessages([{ role: "oracle", text: tx.greeting, timestamp: new Date() }])
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen, tx.greeting])

  // Show lead form after engagement
  useEffect(() => {
    if (messageCount >= 3 && !showLeadForm && !leadSubmitted) {
      const timer = setTimeout(() => setShowLeadForm(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [messageCount, showLeadForm, leadSubmitted])

  // Add message helper
  const addMessage = useCallback((role: Message["role"], text: string) => {
    setMessages((prev) => [...prev, { role, text, timestamp: new Date() }])
  }, [])

  // Detect intent from text
  const detectCategory = useCallback((text: string): string => {
    const lower = text.toLowerCase()
    if (lower.match(/\b(ia|ai|intelig|automat|pipeline)\b/)) return "business"
    if (lower.match(/\b(escal|sistema|system|sozinho|self|operat)\b/)) return "scale"
    if (lower.match(/\b(parcei|partner|trabalh|work|junto|together)\b/)) return "partnership"
    if (lower.match(/\b(preço|custo|invest|price|cost|budget|valor)\b/)) return "budget"
    return "generic"
  }, [])

  // Process message through conversation tree
  const processMessage = useCallback(
    async (text: string, category?: string) => {
      addMessage("user", text)
      setShowStarters(false)
      setIsThinking(true)
      setMessageCount((p) => p + 1)

      // Use the current flow from ref, or detect from category/text
      const flowKey = category || currentFlowRef.current || detectCategory(text)
      const flow = flows[flowKey] || flows.generic

      // Extract data if applicable
      if (currentFlowRef.current) {
        const currentNode = flows[currentFlowRef.current]
        if (currentNode?.extractField) {
          setLeadData((prev) => ({ ...prev, [currentNode.extractField!]: text }))
        }
      }

      // Deliver responses with natural typing delays
      for (let i = 0; i < flow.responses.length; i++) {
        const delay = i === 0 ? 600 + Math.random() * 800 : 500 + Math.random() * 700
        await new Promise((r) => setTimeout(r, delay))
        if (i === 0) setIsThinking(false)
        addMessage("oracle", flow.responses[i])
      }

      setIsThinking(false)

      // Advance flow state
      if (flow.followUp) {
        currentFlowRef.current = flow.followUp
      } else if (flow.extractField) {
        currentFlowRef.current = null
      } else {
        currentFlowRef.current = null
      }
    },
    [flows, addMessage, detectCategory]
  )

  // Handle text send
  const handleSend = useCallback(() => {
    if (!input.trim() || isThinking) return
    const text = input.trim()
    setInput("")

    if (currentFlowRef.current) {
      processMessage(text)
    } else {
      processMessage(text, detectCategory(text))
    }
  }, [input, isThinking, processMessage, detectCategory])

  // Handle starter click
  const handleStarter = useCallback(
    (starter: { text: string; category: string }) => {
      processMessage(starter.text, starter.category)
    },
    [processMessage]
  )

  // Handle lead submit
  const handleLeadSubmit = useCallback(async () => {
    if (!leadData.name || !leadData.contact) return
    setLeadSubmitted(true)
    setShowLeadForm(false)

    // TODO: Send to Supabase / webhook
    console.log("Lead captured:", leadData)

    addMessage("oracle", tx.thankYou)
  }, [leadData, addMessage, tx.thankYou])

  // Handle transcript from call mode
  const handleCallTranscript = useCallback(
    (role: "oracle" | "user", text: string) => {
      addMessage(role, text)
      if (role === "user") setMessageCount((p) => p + 1)
    },
    [addMessage]
  )

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const hasAgent = !!agentId

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={handleClose} />

          {/* Oracle Panel — fullscreen on mobile */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="oracle-panel-mobile relative w-full max-w-2xl h-[85vh] sm:max-h-[750px] flex flex-col rounded-xl overflow-hidden safe-bottom"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "linear-gradient(180deg, rgba(8,8,8,0.99) 0%, rgba(3,3,3,0.99) 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 0 120px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white/50" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500/70 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] text-white/70 tracking-wide">{tx.title}</h3>
                  <p className="font-mono text-[9px] text-white/20 tracking-wider uppercase">{tx.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Mode Toggle */}
                <div className="flex items-center rounded-lg border border-white/[0.06] overflow-hidden">
                  <button
                    onClick={() => setMode("chat")}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all",
                      mode === "chat"
                        ? "bg-white/[0.06] text-white/50"
                        : "text-white/15 hover:text-white/30"
                    )}
                  >
                    <MessageSquare className="w-3 h-3" />
                    {tx.chatMode}
                  </button>
                  <button
                    onClick={() => hasAgent ? setMode("call") : null}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider transition-all",
                      !hasAgent
                        ? "text-white/8 cursor-not-allowed"
                        : mode === "call"
                        ? "bg-white/[0.06] text-white/50"
                        : "text-white/15 hover:text-white/30"
                    )}
                    title={!hasAgent ? tx.callNoAgent : ""}
                  >
                    <Phone className="w-3 h-3" />
                    {tx.callMode}
                  </button>
                </div>

                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-white/50 hover:bg-white/[0.04] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {mode === "chat" ? (
              <ChatMode
                messages={messages}
                isThinking={isThinking}
                showStarters={showStarters}
                showLeadForm={showLeadForm}
                leadSubmitted={leadSubmitted}
                leadData={leadData}
                input={input}
                lang={lang}
                tx={tx}
                onInput={setInput}
                onSend={handleSend}
                onStarter={handleStarter}
                onLeadChange={(data) => setLeadData((p) => ({ ...p, ...data }))}
                onLeadSubmit={handleLeadSubmit}
              />
            ) : hasAgent ? (
              <div className="flex-1 flex flex-col">
                {/* Transcript area */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 oracle-scroll">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={`call-${i}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-lg px-3 py-2",
                          msg.role === "user"
                            ? "bg-white/[0.06] text-white/60"
                            : "text-white/40 border border-white/[0.04]"
                        )}
                      >
                        <p className="text-[12px] leading-relaxed">{msg.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Call interface */}
                <div className="border-t border-white/[0.04]">
                  <CallMode
                    agentId={agentId!}
                    lang={lang}
                    tx={tx}
                    onTranscript={handleCallTranscript}
                  />
                </div>

                {/* Lead form in call mode too */}
                {showLeadForm && !leadSubmitted && (
                  <div className="px-5 pb-4">
                    <div className="rounded-lg border border-white/[0.06] p-4 space-y-3" style={{ background: "rgba(255,255,255,0.01)" }}>
                      <p className="text-[11px] text-white/25">{tx.leadCapture}</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={tx.namePlaceholder}
                          value={leadData.name || ""}
                          onChange={(e) => setLeadData((p) => ({ ...p, name: e.target.value }))}
                          className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-[12px] text-white/50 placeholder:text-white/10 outline-none focus:border-white/[0.1] font-mono"
                        />
                        <input
                          type="email"
                          placeholder={tx.emailPlaceholder}
                          value={leadData.contact || ""}
                          onChange={(e) => setLeadData((p) => ({ ...p, contact: e.target.value }))}
                          className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-[12px] text-white/50 placeholder:text-white/10 outline-none focus:border-white/[0.1] font-mono"
                        />
                        <button
                          onClick={handleLeadSubmit}
                          disabled={!leadData.name || !leadData.contact}
                          className="px-4 py-2 rounded-lg font-mono text-[10px] uppercase bg-white/[0.06] hover:bg-white/[0.1] text-white/40 border border-white/[0.06] disabled:opacity-20 transition-all"
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Footer */}
            <div className="px-5 py-2 border-t border-white/[0.03] flex items-center justify-center">
              <span className="font-mono text-[7px] text-white/8 uppercase tracking-widest">
                {tx.poweredBy}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════
   ORACLE TRIGGER BUTTON
   ═══════════════════════════════════════ */
export function OracleTrigger({ onClick, lang }: { onClick: () => void; lang: Lang }) {
  const text = lang === "pt" ? "Fale com o Substrato" : "Talk to the Substrate"
  const sub = lang === "pt" ? "IA conversacional · Voz ao vivo · Zero formulários" : "Conversational AI · Live voice · Zero forms"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <button
        onClick={onClick}
        className="group relative w-full max-w-md mx-auto flex flex-col items-center gap-5 py-10 px-10 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] transition-all duration-700 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 100%)",
        }}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-t from-white/[0.03] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        {/* Icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-all duration-500 border border-white/[0.06] group-hover:border-white/[0.12]">
            <Brain className="w-7 h-7 text-white/35 group-hover:text-white/65 transition-colors duration-500" />
          </div>
          <div className="absolute inset-0 rounded-2xl border border-white/[0.06] animate-ping opacity-15" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500/50 animate-pulse border-2 border-black" />
        </div>

        {/* Text */}
        <div className="relative z-10 space-y-2">
          <span className="text-base text-white/60 group-hover:text-white/85 transition-colors duration-500 block font-light">
            {text}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 group-hover:text-white/30 transition-colors block">
            {sub}
          </span>
        </div>

        {/* Mode indicators */}
        <div className="flex items-center gap-5 relative z-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.04] transition-all border border-transparent group-hover:border-white/[0.06]">
            <MessageSquare className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" />
            <span className="font-mono text-[8px] text-white/15 group-hover:text-white/30 uppercase tracking-wider transition-colors">chat</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.02] group-hover:bg-white/[0.04] transition-all border border-transparent group-hover:border-white/[0.06]">
            <Phone className="w-3 h-3 text-white/20 group-hover:text-white/40 transition-colors" />
            <span className="font-mono text-[8px] text-white/15 group-hover:text-white/30 uppercase tracking-wider transition-colors">
              {lang === "pt" ? "voz" : "voice"}
            </span>
          </div>
        </div>
      </button>
    </motion.div>
  )
}
