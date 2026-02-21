"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Brain,
  Bot,
  TrendingUp,
  Zap,
  Activity,
  Server,
  BarChart3,
  Layers,
  Target,
  Network,
  Rocket,
} from "lucide-react"

type Lang = "pt" | "en"

interface Hub {
  id: string
  name: string
  subtitle: string
  status: "active" | "warning" | "idle"
  color: string
  dotColor: string
  metrics: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }[]
  health: number
}

interface LogEntry {
  date: string
  text: string
  tag: string
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export function SubmundoDashboard({
  isOpen,
  onClose,
  lang,
}: {
  isOpen: boolean
  onClose: () => void
  lang: Lang
}) {
  const [activeHub, setActiveHub] = useState<string>("pai")
  const [uptime, setUptime] = useState(0)

  // Calculate uptime from a fixed start date (2024-06-01)
  useEffect(() => {
    if (!isOpen) return
    const start = new Date("2024-06-01").getTime()
    const update = () => {
      const days = Math.floor((Date.now() - start) / (1000 * 60 * 60 * 24))
      setUptime(days)
    }
    update()
    const i = setInterval(update, 60000)
    return () => clearInterval(i)
  }, [isOpen])

  // Escape to close
  useEffect(() => {
    if (!isOpen) return
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [isOpen, onClose])

  const hubs: Hub[] = lang === "pt" ? [
    {
      id: "pai",
      name: "PAI",
      subtitle: "Partners in A.I",
      status: "active",
      color: "blue",
      dotColor: "bg-blue-400/60",
      health: 96,
      metrics: [
        { label: "Pipelines ativos", value: "7+", icon: Network },
        { label: "Decisões automatizadas", value: "85%", icon: Brain },
        { label: "Tempo economizado", value: "12h/sem", icon: Zap },
        { label: "Clientes em operação", value: "3+", icon: Server },
      ],
    },
    {
      id: "dryon",
      name: "DryOn",
      subtitle: "Allpharma",
      status: "active",
      color: "amber",
      dotColor: "bg-amber-400/60",
      health: 100,
      metrics: [
        { label: "Funil", value: "Autônomo", icon: Target },
        { label: "Esteira IA", value: "Ativa", icon: Bot },
        { label: "Intervenção manual", value: "0", icon: Activity },
        { label: "Camadas do sistema", value: "5", icon: Layers },
      ],
    },
    {
      id: "fund",
      name: "Fundo",
      subtitle: "Investimentos",
      status: "active",
      color: "green",
      dotColor: "bg-green-400/60",
      health: 92,
      metrics: [
        { label: "Empresas", value: "10+", icon: BarChart3 },
        { label: "Exits network", value: ">R$1BI", icon: TrendingUp },
        { label: "Board", value: "Ativo", icon: Layers },
        { label: "Tese", value: "Infraestrutura", icon: Rocket },
      ],
    },
  ] : [
    {
      id: "pai",
      name: "PAI",
      subtitle: "Partners in A.I",
      status: "active",
      color: "blue",
      dotColor: "bg-blue-400/60",
      health: 96,
      metrics: [
        { label: "Active pipelines", value: "7+", icon: Network },
        { label: "Automated decisions", value: "85%", icon: Brain },
        { label: "Time saved", value: "12h/wk", icon: Zap },
        { label: "Clients operating", value: "3+", icon: Server },
      ],
    },
    {
      id: "dryon",
      name: "DryOn",
      subtitle: "Allpharma",
      status: "active",
      color: "amber",
      dotColor: "bg-amber-400/60",
      health: 100,
      metrics: [
        { label: "Funnel", value: "Autonomous", icon: Target },
        { label: "AI pipeline", value: "Active", icon: Bot },
        { label: "Manual intervention", value: "0", icon: Activity },
        { label: "System layers", value: "5", icon: Layers },
      ],
    },
    {
      id: "fund",
      name: "Fund",
      subtitle: "Investments",
      status: "active",
      color: "green",
      dotColor: "bg-green-400/60",
      health: 92,
      metrics: [
        { label: "Companies", value: "10+", icon: BarChart3 },
        { label: "Exits network", value: ">R$1BI", icon: TrendingUp },
        { label: "Board", value: "Active", icon: Layers },
        { label: "Thesis", value: "Infrastructure", icon: Rocket },
      ],
    },
  ]

  const logs: LogEntry[] = lang === "pt" ? [
    { date: "2026.02", text: "Pipeline de decisão autônoma v3 deployed na PAI", tag: "pai" },
    { date: "2026.01", text: "2 novos investimentos fechados no fundo", tag: "fund" },
    { date: "2025.12", text: "Substrato v3 projetado e lançado", tag: "meta" },
    { date: "2025.11", text: "DryOn (Allpharma) atingiu operação autônoma", tag: "dryon" },
    { date: "2025.09", text: "PAI atingiu 85% de automação de decisões", tag: "pai" },
    { date: "2025.07", text: "Novo investimento: gateway de pagamento", tag: "fund" },
  ] : [
    { date: "2026.02", text: "Autonomous decision pipeline v3 deployed at PAI", tag: "pai" },
    { date: "2026.01", text: "2 new fund investments closed", tag: "fund" },
    { date: "2025.12", text: "Substrate v3 designed and launched", tag: "meta" },
    { date: "2025.11", text: "DryOn (Allpharma) reached autonomous operation", tag: "dryon" },
    { date: "2025.09", text: "PAI reached 85% decision automation", tag: "pai" },
    { date: "2025.07", text: "New investment: payment gateway", tag: "fund" },
  ]

  const tagColors: Record<string, string> = {
    pai: "text-blue-400/60 border-blue-400/20",
    dryon: "text-amber-400/60 border-amber-400/20",
    fund: "text-green-400/60 border-green-400/20",
    meta: "text-white/40 border-white/10",
  }

  const systemHealth = Math.round(hubs.reduce((a, h) => a + h.health, 0) / hubs.length)

  const selectedHub = hubs.find((h) => h.id === activeHub)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 terminal-overlay" />

          {/* Dashboard container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto border-gradient rounded-xl bg-black/95 submundo-scroll"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ═══ HEADER ═══ */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-black/90 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-white/20"
                >
                  <Network className="w-4 h-4" />
                </motion.div>
                <div>
                  <span className="font-mono text-xs text-white/70 tracking-wider">SUBMUNDO</span>
                  <span className="font-mono text-[9px] text-white/20 ml-2">v1.0</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${systemHealth > 90 ? "bg-green-500/60" : "bg-amber-500/60"} animate-pulse`} />
                  <span className="font-mono text-[9px] text-white/30">
                    {lang === "pt" ? "saúde" : "health"}: {systemHealth}%
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/20 hover:text-white/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* ═══ HUB SELECTOR ═══ */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {hubs.map((hub, i) => (
                  <motion.button
                    key={hub.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease }}
                    onClick={() => setActiveHub(hub.id)}
                    className={`relative border rounded-lg p-4 text-left transition-all duration-500 cursor-pointer group ${
                      activeHub === hub.id
                        ? "border-white/[0.12] bg-white/[0.03]"
                        : "border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.01]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${hub.dotColor} ${hub.status === "active" ? "animate-pulse" : ""}`} />
                      <span className={`font-mono text-xs tracking-wide transition-colors duration-300 ${
                        activeHub === hub.id ? "text-white/80" : "text-white/40"
                      }`}>
                        {hub.name}
                      </span>
                    </div>
                    <p className={`font-mono text-[9px] uppercase tracking-wider transition-colors duration-300 ${
                      activeHub === hub.id ? "text-white/30" : "text-white/15"
                    }`}>
                      {hub.subtitle}
                    </p>

                    {/* Health bar */}
                    <div className="mt-3 h-px bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${hub.health}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 1, ease }}
                        className={`h-full rounded-full ${
                          hub.color === "blue" ? "bg-blue-400/30" :
                          hub.color === "amber" ? "bg-amber-400/30" :
                          "bg-green-400/30"
                        }`}
                      />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* ═══ ACTIVE HUB METRICS ═══ */}
              <AnimatePresence mode="wait">
                {selectedHub && (
                  <motion.div
                    key={selectedHub.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-1 h-1 rounded-full ${selectedHub.dotColor}`} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
                        {selectedHub.name} — {lang === "pt" ? "métricas" : "metrics"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedHub.metrics.map((m, i) => {
                        const Icon = m.icon
                        return (
                          <motion.div
                            key={m.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06, duration: 0.4, ease }}
                            className="border-gradient rounded-lg p-4 group hover:bg-white/[0.02] transition-all duration-500"
                          >
                            <Icon className="w-4 h-4 text-white/15 group-hover:text-white/30 transition-colors duration-500 mb-3" />
                            <div className="font-mono text-lg text-white/70 mb-1">{m.value}</div>
                            <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/20">{m.label}</div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ═══ ACTIVITY FEED ═══ */}
              <div className="border-gradient rounded-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-3.5 h-3.5 text-white/15" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
                    {lang === "pt" ? "Feed de atividade" : "Activity feed"}
                  </span>
                </div>

                <div className="space-y-3">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.4, ease }}
                      className="flex items-start gap-3 group"
                    >
                      <span className="font-mono text-[10px] text-white/15 mt-0.5 shrink-0 tabular-nums">
                        {log.date}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs text-white/35 group-hover:text-white/55 transition-colors leading-relaxed">
                          {log.text}
                        </p>
                      </div>
                      <span className={`font-mono text-[8px] uppercase tracking-wider shrink-0 border rounded px-1.5 py-0.5 ${tagColors[log.tag] || tagColors.meta}`}>
                        {log.tag}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ═══ SYSTEM FOOTER ═══ */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-4 border-t border-white/[0.04]"
              >
                {[
                  { label: "uptime", value: `${uptime}d` },
                  { label: "nodes", value: "6" },
                  { label: lang === "pt" ? "automação" : "automation", value: "85%" },
                  { label: lang === "pt" ? "sistemas" : "systems", value: "3" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-white/15">{s.label}:</span>
                    <span className="font-mono text-[10px] text-white/35">{s.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
