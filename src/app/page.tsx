"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion"
import {
  ArrowRight,
  Layers,
  Cpu,
  Target,
  Zap,
  GitBranch,
  Hexagon,
  Terminal,
  ChevronDown,
  Minus,
  Plus,
  Globe,
  X,
  Search,
  Brain,
  Rocket,
  Shield,
  TrendingUp,
  Code,
  Palette,
  Bot,
  BarChart3,
  Network,
  Briefcase,
  Camera,
  Code2,
  Plane,
  Building2,
} from "lucide-react"
import dynamic from "next/dynamic"
import { SubstrateOracle, OracleTrigger } from "@/components/substrate-oracle"
import { LogoCloud } from "@/components/ui/logo-cloud"

const ShaderBackground = dynamic(() => import("@/components/shader-background"), {
  ssr: false,
})

/* ═══════════════════════════════════════
   TRANSLATIONS
   ═══════════════════════════════════════ */
const t = {
  pt: {
    status: "sistema ativo — substrato v3.0",
    headline1: "Eu não construo",
    headline2: "produtos",
    headline3: "Eu construo a",
    headline4: "infraestrutura",
    headline5: "por trás deles.",
    sub: "22 anos. Poliglota. CEO da PAI (Partners in A.I). Sócio de fundos com 10+ empresas em portfólio. Construo sistemas que pensam, marcas que escalam, e infraestrutura que dura.",
    scroll: "descer para entrar",
    terminalHint: "Pressione Ctrl+K para abrir o terminal",
    tese: "Tese",
    teseTitle1: "A maioria constrói features.",
    teseTitle2: "Eu construo as condições",
    teseTitle3: "para que features tenham razão de existir.",
    teseBody: "Aos 22, já morei nos EUA estudando, construí a PAI — uma empresa de inteligência artificial aplicada —, opero como sócio de fundos de investimento com mais de 10 empresas em portfólio, e falo múltiplos idiomas. Não sou designer. Não sou desenvolvedor. Não sou marqueteiro. Sou a camada que conecta tudo isso — o substrato. A infraestrutura de pensamento que transforma ambiguidade em arquitetura, e arquitetura em sistemas que operam sozinhos.",
    teseQuote: "O substrato não aparece no produto final. Mas sem ele, o produto não existe.",
    framework: "Como Penso",
    frameworkTitle: "O framework",
    frameworkSub: "Não é improviso. É um sistema de 4 camadas que transforma qualquer problema em arquitetura executável.",
    sistema: "Sistema Operacional",
    sistemaTitle: "Mapa do sistema",
    sistemaSub: "Cada competência é um nó. Passe o mouse para ver as conexões.",
    stackLabel: "stack de pensamento",
    provas: "Provas de Sistema",
    provasTitle1: "Não é portfólio.",
    provasTitle2: "É arqueologia de decisões.",
    provasSub: "Cada projeto demonstra como penso, não o que faço. Clique para expandir.",
    antiTitle: "O que eu não faço",
    antiSub: "Posicionamento por subtração. Se você precisa disso, não sou a pessoa certa.",
    stackTitle: "Infraestrutura Operacional",
    stackSub: "Não é uma lista de apps. É como as camadas se organizam para produzir output sem atrito.",
    sinal: "Sinal",
    sinalTitle: "Fragmentos de sistema",
    logTitle: "Log do sistema",
    logSub: "Entradas recentes do diário operacional.",
    gateway: "Gateway",
    gatewayTitle1: "Se você chegou até aqui,",
    gatewayTitle2: "provavelmente pensa parecido.",
    gatewaySub: "Não estou buscando projetos. Estou buscando problemas que mereçam sistemas como resposta.",
    gatewayAvail: "Disponibilidade Q1 2026:",
    gatewaySlots: "1 slot aberto",
    gatewayCta: "Iniciar conversa →",
    gatewayOracle: "Ou acesse o conhecimento do Substrato via IA",
    investTitle: "Tese de investimento",
    investSub: "Se trabalhar comigo fosse uma decisão de investimento.",
    metaTitle: "Este site é um sistema",
    metaSub: "Next.js 16 · Tailwind 4 · Framer Motion · Paper Shaders · TypeScript. Zero templates. Zero builders. Código puro, projetado como produto. Construído da mesma forma que construo tudo: como infraestrutura.",
    storiesLabel: "Fragmentos",
    storiesTitle: "Quem opera o substrato",
    storiesSub: "Não é currículo. É contexto. Cada destaque é uma camada da história que construiu o sistema.",
    highlightUSA: "USA",
    highlightPAI: "PAI",
    highlightPortfolio: "Portfolio",
    highlightLifestyle: "Lifestyle",
    highlightCode: "Code",
    highlightTravel: "Travel",
    lang: "EN",
  },
  en: {
    status: "system active — substrato v3.0",
    headline1: "I don't build",
    headline2: "products",
    headline3: "I build the",
    headline4: "infrastructure",
    headline5: "behind them.",
    sub: "22 years old. Polyglot. CEO of PAI (Partners in A.I). Fund partner with 10+ portfolio companies. I build systems that think, brands that scale, and infrastructure that lasts.",
    scroll: "scroll to enter",
    terminalHint: "Press Ctrl+K to open terminal",
    tese: "Thesis",
    teseTitle1: "Most people build features.",
    teseTitle2: "I build the conditions",
    teseTitle3: "for features to have a reason to exist.",
    teseBody: "At 22, I've lived in the US studying, built PAI — an applied artificial intelligence company —, operate as a fund partner with 10+ portfolio companies, and speak multiple languages. I'm not a designer. Not a developer. Not a marketer. I'm the layer that connects all of it — the substrate. The thinking infrastructure that turns ambiguity into architecture, and architecture into self-operating systems.",
    teseQuote: "The substrate doesn't show in the final product. But without it, the product doesn't exist.",
    framework: "How I Think",
    frameworkTitle: "The framework",
    frameworkSub: "It's not improvisation. It's a 4-layer system that turns any problem into executable architecture.",
    sistema: "Operating System",
    sistemaTitle: "System map",
    sistemaSub: "Each skill is a node. Hover to see connections.",
    stackLabel: "thinking stack",
    provas: "System Proofs",
    provasTitle1: "Not a portfolio.",
    provasTitle2: "An archaeology of decisions.",
    provasSub: "Each project shows how I think, not what I do. Click to expand.",
    antiTitle: "What I don't do",
    antiSub: "Positioning by subtraction. If you need this, I'm not the right person.",
    stackTitle: "Operational Infrastructure",
    stackSub: "Not a list of apps. It's how layers organize to produce frictionless output.",
    sinal: "Signal",
    sinalTitle: "System fragments",
    logTitle: "System log",
    logSub: "Recent entries from the operational journal.",
    gateway: "Gateway",
    gatewayTitle1: "If you made it this far,",
    gatewayTitle2: "you probably think alike.",
    gatewaySub: "I'm not looking for projects. I'm looking for problems that deserve systems as answers.",
    gatewayAvail: "Q1 2026 availability:",
    gatewaySlots: "1 open slot",
    gatewayCta: "Start a conversation →",
    gatewayOracle: "Or access the Substrate knowledge via AI",
    investTitle: "Investment thesis",
    investSub: "If working with me were an investment decision.",
    metaTitle: "This site is a system",
    metaSub: "Next.js 16 · Tailwind 4 · Framer Motion · Paper Shaders · TypeScript. Zero templates. Zero builders. Pure code, designed as product. Built the same way I build everything: as infrastructure.",
    storiesLabel: "Fragments",
    storiesTitle: "Who operates the substrate",
    storiesSub: "Not a resume. It's context. Each highlight is a layer of the story that built the system.",
    highlightUSA: "USA",
    highlightPAI: "PAI",
    highlightPortfolio: "Portfolio",
    highlightLifestyle: "Lifestyle",
    highlightCode: "Code",
    highlightTravel: "Travel",
    lang: "PT",
  },
}

type Lang = keyof typeof t

/* ═══════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════ */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const dur = 2000
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>
}

/* ═══════════════════════════════════════
   TERMINAL EASTER EGG (Ctrl+K)
   ═══════════════════════════════════════ */
function TerminalOverlay({ isOpen, onClose, lang }: { isOpen: boolean; onClose: () => void; lang: Lang }) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<{ cmd: string; out: string }[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setInput("")
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const commands: Record<string, string> = {
    help: "Available: about, skills, projects, stack, contact, philosophy, clear",
    about: "Geander · 22 · Polyglot (PT/EN/ES) · Lived in the US · CEO & Founder of PAI (Partners in A.I) · Fund partner with 10+ portfolio companies · Systems thinker · Builder",
    skills: "Branding Strategy · Applied AI · E-commerce & Performance · Product Architecture · Automation & Prompt Engineering · Digital Ecosystems · Business Strategy",
    projects: "001 DryOn → Full brand system (branding + ecommerce + narrative)\n002 PAI → Partners in A.I — applied AI infrastructure company\n003 Investment Fund → 10+ companies in portfolio, active board roles\n004 Digital Assets → Self-operating portfolio of scalable products",
    stack: "DECISION: First principles + Systems thinking\nCREATION: AI pipelines + Prompt architecture\nDISTRIBUTION: Performance marketing + E-commerce\nAUTOMATION: n8n + Custom LLM chains + API orchestration",
    contact: "→ businessgeander@gmail.com\n→ Open for 1 strategic partnership in Q1 2026",
    philosophy: "\"Build systems, not products. The system survives you. The product doesn't.\"",
    clear: "__CLEAR__",
  }

  const exec = (cmd: string) => {
    const c = cmd.trim().toLowerCase()
    if (c === "clear") {
      setHistory([])
      return
    }
    const out = commands[c] || `Command not found: ${c}. Type 'help' for available commands.`
    setHistory((p) => [...p, { cmd, out }])
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      exec(input)
      setInput("")
    }
    if (e.key === "Escape") onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 terminal-overlay" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl border-gradient rounded-lg bg-black/90 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-white/30" />
                <span className="font-mono text-[10px] text-white/30">gtzen.terminal</span>
              </div>
              <button onClick={onClose} className="text-white/20 hover:text-white/50 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto font-mono text-[11px]">
              <div className="text-white/30 mb-3">
                Welcome to GTZEN Terminal. Type &apos;help&apos; for commands.
              </div>
              {history.map((h, i) => (
                <div key={i} className="mb-3">
                  <div className="text-white/50">$ {h.cmd}</div>
                  <div className="text-white/30 whitespace-pre-wrap mt-1">{h.out}</div>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <span className="text-white/40">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 bg-transparent text-white/70 outline-none font-mono text-[11px] caret-white/50"
                  placeholder="type a command..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════
   SCROLL PROGRESS
   ═══════════════════════════════════════ */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="fixed top-0 left-0 right-0 h-px bg-white/20 origin-left z-50" style={{ scaleX }} />
}

/* ═══════════════════════════════════════
   SECTION NAV
   ═══════════════════════════════════════ */
function SectionNav({ active, sections }: { active: number; sections: string[] }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 3, duration: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3"
    >
      {sections.map((s, i) => (
        <a key={s} href={`#s-${i}`} className="flex items-center gap-2 group">
          <span className={`font-mono text-[9px] uppercase tracking-[0.2em] transition-all duration-500 ${active === i ? "text-white/50" : "text-transparent group-hover:text-white/30"}`}>
            {s}
          </span>
          <div className={`transition-all duration-500 rounded-full ${active === i ? "w-6 h-px bg-white/50" : "w-3 h-px bg-white/15 group-hover:w-5 group-hover:bg-white/30"}`} />
        </a>
      ))}
    </motion.nav>
  )
}

/* ═══════════════════════════════════════
   TYPING TERMINAL
   ═══════════════════════════════════════ */
function TypingTerminal() {
  const lines = [
    "$ init substrato --mode=architect",
    "> loading: branding, ai, scale...",
    "> connecting decision layers...",
    "> PAI systems online.",
    "",
    "$ gtzen.status",
    "> age: 22 | languages: 4 | portfolio: 10+ companies",
    "> building: what doesn't exist yet.",
  ]
  const [displayed, setDisplayed] = useState<string[]>([])
  const [line, setLine] = useState(0)
  const [char, setChar] = useState(0)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const i = setInterval(() => setBlink((p) => !p), 530)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    if (line >= lines.length) return
    const l = lines[line]
    if (char < l.length) {
      const speed = l[char] === "." ? 100 : l.startsWith("$") ? 45 : 20
      const t = setTimeout(() => setChar((p) => p + 1), speed)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayed((p) => [...p, l])
      setLine((p) => p + 1)
      setChar(0)
    }, l === "" ? 150 : 350)
    return () => clearTimeout(t)
  }, [line, char])

  return (
    <div className="font-mono text-[11px] leading-relaxed">
      {displayed.map((l, i) => (
        <div key={i} className={l.startsWith("$") ? "text-white/60" : l.startsWith(">") ? "text-white/30" : "h-3"}>{l}</div>
      ))}
      {line < lines.length && (
        <div className={lines[line].startsWith("$") ? "text-white/60" : "text-white/30"}>
          {lines[line].slice(0, char)}<span className={blink ? "opacity-100" : "opacity-0"}>▊</span>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   PROOF TICKER (silent social proof)
   ═══════════════════════════════════════ */
function ProofTicker() {
  const items = [
    "DryOn → sistema de marca completo",
    "PAI (Partners in A.I) → CEO & Founder",
    "Fundo de Investimento → 10+ empresas em portfólio",
    "Infraestrutura IA → 85% decisões automatizadas",
    "Ativos Digitais → portfólio escalável em produção",
    "4 idiomas · Vivência internacional · EUA",
    "Prompt Architecture → 7 pipelines autônomos",
    "E-commerce → sistemas de conversão engenhados",
  ]
  const doubled = [...items, ...items]

  return (
    <div className="w-full overflow-hidden border-y border-white/[0.04] py-3">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-[10px] text-white/15 whitespace-nowrap mx-8 uppercase tracking-wider">
            {item}
            <span className="mx-8 text-white/8">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   SYSTEM NODE
   ═══════════════════════════════════════ */
function SystemNode({ label, description, icon: Icon, index, connections }: {
  label: string; description: string; icon: React.ComponentType<{ className?: string }>; index: number; connections: string[]
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.07, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="border-gradient border-gradient-hover rounded-lg p-6 transition-all duration-500 h-full">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center transition-all duration-500 ${hovered ? "bg-white/[0.08]" : "bg-white/[0.03]"}`}>
              <Icon className={`w-5 h-5 transition-colors duration-500 ${hovered ? "text-white/80" : "text-white/35"}`} />
            </div>
            <AnimatePresence>
              {hovered && (
                <motion.div className="absolute inset-0 rounded-md border border-white/10"
                  initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.6, opacity: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity }} />
              )}
            </AnimatePresence>
          </div>
          <div className="flex-1">
            <h3 className="font-mono text-sm text-white/90 mb-1.5">{label}</h3>
            <p className="text-xs text-white/30 leading-relaxed mb-3">{description}</p>
            <div className="flex flex-wrap gap-1.5">
              {connections.map((c) => (
                <span key={c} className={`font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded transition-all duration-500 ${hovered ? "text-white/40 bg-white/[0.05]" : "text-white/12 bg-transparent"}`}>
                  → {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   CASE STUDY (expandable)
   ═══════════════════════════════════════ */
function CaseStudy({ number, title, thesis, layers, result, insight, metrics, index }: {
  number: string; title: string; thesis: string; layers: string[]; result: string; insight: string; metrics?: { label: string; value: string }[]; index: number
}) {
  const [expanded, setExpanded] = useState(false)
  return (
    <Reveal delay={index * 0.1}>
      <div className="border-gradient border-gradient-hover rounded-lg group transition-all duration-700 cursor-pointer overflow-hidden" onClick={() => setExpanded(!expanded)}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-white/15">{number}</span>
              <h3 className="text-xl font-light tracking-tight text-white/90">{title}</h3>
            </div>
            <div className="text-white/15">{expanded ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</div>
          </div>
          <p className="text-sm text-white/45 mb-5 leading-relaxed max-w-lg">{thesis}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {layers.map((l, i) => (
              <span key={i} className="font-mono text-[10px] uppercase tracking-widest text-white/25 border border-white/8 rounded-full px-3 py-1">{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/35 group-hover:text-white/55 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />{result}
          </div>
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <div className="px-8 pb-8 pt-2 border-t border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/15 mb-3 block">Insight estrutural</span>
                    <p className="text-sm text-white/40 leading-relaxed">{insight}</p>
                  </div>
                  {metrics && (
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/15 mb-3 block">Indicadores</span>
                      <div className="space-y-3">
                        {metrics.map((m, i) => (
                          <div key={i} className="flex items-baseline justify-between">
                            <span className="text-xs text-white/25">{m.label}</span>
                            <span className="font-mono text-sm text-white/65">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

/* ═══════════════════════════════════════
   MAIN PAGE — SUBSTRATO v3
   ═══════════════════════════════════════ */
export default function SubstratoPage() {
  const [lang, setLang] = useState<Lang>("pt")
  const tx = t[lang]
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.96])
  const heroBlur = useTransform(scrollYProgress, [0, 0.1], [0, 10])
  const [activeLayer, setActiveLayer] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [oracleOpen, setOracleOpen] = useState(false)

  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)
  const smoothX = useSpring(cursorX, { stiffness: 70, damping: 20 })
  const smoothY = useSpring(cursorY, { stiffness: 70, damping: 20 })

  useEffect(() => {
    const h = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY) }
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [cursorX, cursorY])

  // Ctrl+K terminal
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setTerminalOpen((p) => !p)
      }
      if (e.key === "Escape") setTerminalOpen(false)
    }
    window.addEventListener("keydown", h)
    return () => window.removeEventListener("keydown", h)
  }, [])

  // Section observer
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.id.replace("s-", ""))
          if (!isNaN(idx)) setActiveSection(idx)
        }
      })
    }, { threshold: 0.25 })
    document.querySelectorAll("[id^='s-']").forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const i = setInterval(() => setActiveLayer((p) => (p + 1) % 4), 3000)
    return () => clearInterval(i)
  }, [])

  const sectionNames = lang === "pt"
    ? ["Tese", "Framework", "Sistema", "Provas", "Stack", "Sinal", "Gateway"]
    : ["Thesis", "Framework", "System", "Proofs", "Stack", "Signal", "Gateway"]

  const nodes = [
    { label: "Branding Estratégico", description: "Marcas como sistemas vivos — identidade, posicionamento e narrativa como arquitetura.", icon: Hexagon, connections: ["IA", "E-commerce", "Produto"] },
    { label: "IA Aplicada", description: "Inteligência artificial como camada de decisão — automação de processos cognitivos, não de tarefas.", icon: Cpu, connections: ["Automação", "Produto", "Escala"] },
    { label: "E-commerce & Performance", description: "Sistemas de aquisição e conversão engenhados para escala composta.", icon: Target, connections: ["Branding", "IA", "Ecossistema"] },
    { label: "Arquitetura de Produto", description: "Produtos digitais pela lente de sistemas — cada feature é uma decisão estrutural.", icon: Layers, connections: ["Branding", "Automação", "IA"] },
    { label: "Automação & Prompts", description: "Infraestrutura invisível que elimina atrito — da operação à criação.", icon: Zap, connections: ["IA", "Produto", "Ecossistema"] },
    { label: "Ecossistemas Digitais", description: "Plataformas onde cada parte alimenta o todo — efeitos de rede por design.", icon: GitBranch, connections: ["Branding", "E-commerce", "Produto"] },
  ]

  const cases = [
    { number: "001", title: "DryOn", thesis: "Uma marca de secadores não é sobre secadores. É sobre a narrativa de cuidado e identidade que o produto carrega. Construí a DryOn como um sistema de marca completo.", layers: ["branding", "e-commerce", "narrativa", "performance"], result: "Marca operando como ecossistema", insight: "Tratar o produto como veículo de identidade, não commodity. Cada decisão de branding alimentava a performance — um loop, não sequência.", metrics: [{ label: "Camadas", value: "4" }, { label: "Tempo", value: "90d" }, { label: "Modelo", value: "Sistema" }] },
    { number: "002", title: "PAI — Partners in A.I", thesis: "Fundei a PAI para resolver um gap: empresas querem IA mas não têm infraestrutura de pensamento para usá-la. Não vendemos ferramentas — vendemos a camada de inteligência que falta.", layers: ["IA aplicada", "consultoria", "automação", "estratégia"], result: "Empresa ativa com clientes em operação", insight: "O mercado não precisa de mais ferramentas de IA. Precisa de quem entenda a arquitetura de decisão por trás. A PAI é essa camada.", metrics: [{ label: "Pipelines ativos", value: "7+" }, { label: "Decisões automatizadas", value: "85%" }, { label: "Tempo economizado", value: "12h/sem" }] },
    { number: "003", title: "Portfólio de Investimentos", thesis: "Como sócio de fundos, avalio empresas pela mesma lente: a qualidade da infraestrutura, não do produto. Sistemas escaláveis > features bonitas.", layers: ["venture", "diligência", "escala", "governança"], result: "10+ empresas em portfólio ativo", insight: "A tese é simples: investir em fundadores que pensam em sistemas, não em funcionalidades. O produto muda. O sistema permanece.", metrics: [{ label: "Empresas", value: "10+" }, { label: "Tese", value: "Sistemas" }, { label: "Papel", value: "Ativo" }] },
    { number: "004", title: "Ativos Digitais", thesis: "Cada conteúdo e sistema que crio é projetado como ativo — gera valor composto ao longo do tempo, não apenas no momento da publicação.", layers: ["produtos digitais", "escala", "IP", "distribuição"], result: "Portfólio que escala sem operação", insight: "Não pergunto 'o que publicar hoje?' — pergunto 'o que vai gerar retorno em 6 meses?'. Isso muda a arquitetura de tudo.", metrics: [{ label: "Ativos", value: "12+" }, { label: "Recorrência", value: "Sim" }, { label: "Operação", value: "~0" }] },
  ]

  const layers = [
    { name: "Visão", desc: "O que o mercado ainda não vê", detail: "Identificar padrões antes que virem consenso", icon: Brain },
    { name: "Arquitetura", desc: "Como as peças se conectam", detail: "Decisões estruturais que definem o jogo", icon: Network },
    { name: "Execução", desc: "Do blueprint à realidade", detail: "Shipping > theorizing. Sempre.", icon: Rocket },
    { name: "Escala", desc: "Sistemas que crescem sozinhos", detail: "Construir para funcionar sem você", icon: TrendingUp },
  ]

  const antiItems = [
    "Identidade visual sem estratégia por trás",
    "Automação de processos que já estão quebrados",
    "Marketing de performance sem arquitetura de marca",
    "Consultoria genérica — cada sistema é único",
    "Projetos sem visão de longo prazo",
  ]

  const stackLayers = [
    { name: "Decisão", tools: "First Principles · Systems Thinking · Mental Models", icon: Brain },
    { name: "Criação", tools: "AI Pipelines · Prompt Architecture · LLM Chains", icon: Code },
    { name: "Distribuição", tools: "Performance Marketing · E-commerce · Content Systems", icon: BarChart3 },
    { name: "Automação", tools: "n8n · Custom APIs · Autonomous Agents", icon: Bot },
  ]

  const logEntries = [
    { date: "2026.02", text: "Novo pipeline de decisão autônoma em produção na PAI. 3 clientes migrados.", tag: "infra" },
    { date: "2026.01", text: "Fechamento de 2 novos investimentos no fundo. Tese: infraestrutura > produto.", tag: "venture" },
    { date: "2025.12", text: "Substrato v3 — este site — projetado e construído como sistema, não como página.", tag: "meta" },
    { date: "2025.11", text: "DryOn atingiu operação autônoma. Zero intervenção manual no funil.", tag: "escala" },
  ]

  const investData = [
    { label: lang === "pt" ? "Risco" : "Risk", value: lang === "pt" ? "Baixo — track record demonstrável" : "Low — demonstrable track record" },
    { label: lang === "pt" ? "Retorno esperado" : "Expected return", value: lang === "pt" ? "Sistemas que operam sozinhos após setup" : "Systems that self-operate after setup" },
    { label: lang === "pt" ? "Diferencial" : "Edge", value: lang === "pt" ? "Pensa em sistemas, não em tarefas" : "Thinks in systems, not tasks" },
    { label: lang === "pt" ? "Horizonte" : "Horizon", value: lang === "pt" ? "Longo prazo — infraestrutura > quick wins" : "Long term — infrastructure > quick wins" },
  ]

  const signals = [
    { text: "Automação sem arquitetura é apenas velocidade aplicada ao caos.", tag: "automação" },
    { text: "Uma marca não é identidade visual. É a decisão estrutural mais importante do negócio.", tag: "branding" },
    { text: "IA não substitui pessoas. Substitui os processos que impedem pessoas de pensar.", tag: "IA" },
    { text: "Escala não é crescer. É construir algo que cresce sem precisar de você.", tag: "escala" },
    { text: "A diferença entre produto e sistema: o sistema funciona quando você para.", tag: "sistemas" },
  ]

  const stats = [
    { label: lang === "pt" ? "Empresas no portfólio" : "Portfolio companies", value: 10 },
    { label: lang === "pt" ? "Sistemas construídos" : "Systems built", value: 15 },
    { label: lang === "pt" ? "Automações ativas" : "Active automations", value: 30 },
    { label: lang === "pt" ? "Idiomas" : "Languages", value: 4 },
  ]

  return (
    <main className="relative min-h-screen bg-black text-white">
      <ScrollProgress />
      <SectionNav active={activeSection} sections={sectionNames} />
      <TerminalOverlay isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} lang={lang} />

      {/* Language toggle + terminal hint */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <button
          onClick={() => setTerminalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-white/15 hover:text-white/35 transition-colors border border-white/5 rounded px-2 py-1"
        >
          <Terminal className="w-3 h-3" />
          <span>Ctrl+K</span>
        </button>
        <button
          onClick={() => setLang(lang === "pt" ? "en" : "pt")}
          className="flex items-center gap-1.5 font-mono text-[9px] text-white/25 hover:text-white/50 transition-colors border border-white/8 rounded px-2 py-1"
        >
          <Globe className="w-3 h-3" />
          {tx.lang}
        </button>
      </div>

      <motion.div className="cursor-glow hidden lg:block" style={{ left: smoothX, top: smoothY }} />

      {/* ═══ HERO ═══ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale, filter: useTransform(heroBlur, (v) => `blur(${v}px)`) }}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <ShaderBackground />
        <div className="absolute inset-0 grid-bg opacity-25" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-16 px-6 max-w-6xl w-full">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1 }} className="hidden lg:block w-80 shrink-0">
            <div className="border-gradient rounded-lg p-5 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500/30" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
                <div className="w-2 h-2 rounded-full bg-green-500/30" />
                <span className="font-mono text-[9px] text-white/12 ml-2">substrato.sh</span>
              </div>
              <TypingTerminal />
            </div>
          </motion.div>

          <div className="text-center lg:text-left flex-1">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="mb-6 flex items-center justify-center lg:justify-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">{tx.status}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] mb-6 glitch-hover">
              {tx.headline1}{" "}<span className="italic text-white/35">{tx.headline2}</span><br />
              <span className="text-white/90">{tx.headline3}{" "}
                <span className="relative inline-block">{tx.headline4}
                  <motion.div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.8, duration: 1.2 }} />
                </span>
              </span><br />
              <span className="text-white/25">{tx.headline5}</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
              className="font-mono text-[11px] sm:text-xs text-white/20 max-w-xl mx-auto lg:mx-0 leading-relaxed tracking-wide">
              {tx.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }} className="mt-8 flex items-center gap-6 sm:gap-8 justify-center lg:justify-start flex-wrap">
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-mono text-xl sm:text-2xl text-white/65"><Counter value={s.value} suffix="+" /></div>
                  <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/15 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }} className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/10">{tx.scroll}</span>
          <ChevronDown className="w-4 h-4 text-white/10 animate-bounce" />
        </motion.div>
      </motion.section>

      {/* ═══ PROOF TICKER ═══ */}
      <ProofTicker />

      {/* ═══ 00 TESE ═══ */}
      <section id="s-0" className="relative py-32 sm:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">00 — {tx.tese}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-[1.4] text-white/55 mb-8">
              {tx.teseTitle1}<br /><span className="text-white/90">{tx.teseTitle2}</span> {tx.teseTitle3}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-sm text-white/25 leading-[1.9] max-w-xl mb-8">{tx.teseBody}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-white/8" />
              <p className="font-mono text-[11px] text-white/15 italic">&quot;{tx.teseQuote}&quot;</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ HIGHLIGHTS — Quem Opera o Substrato ═══ */}
      <section className="relative py-24 sm:py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">{tx.storiesLabel}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-3 text-white/90">{tx.storiesTitle}</h2>
            <p className="text-sm text-white/25 max-w-lg mb-12 leading-relaxed">{tx.storiesSub}</p>
          </Reveal>

          {/* Highlight Circles */}
          <Reveal delay={0.15}>
            <div className="flex items-start gap-6 sm:gap-8 overflow-x-auto pb-4 justify-center flex-wrap">
              {[
                { key: "usa", label: tx.highlightUSA, icon: <Globe className="w-6 h-6" /> },
                { key: "pai", label: tx.highlightPAI, icon: <Building2 className="w-6 h-6" /> },
                { key: "portfolio", label: tx.highlightPortfolio, icon: <Briefcase className="w-6 h-6" /> },
                { key: "lifestyle", label: tx.highlightLifestyle, icon: <Camera className="w-6 h-6" /> },
                { key: "code", label: tx.highlightCode, icon: <Code2 className="w-6 h-6" /> },
                { key: "travel", label: tx.highlightTravel, icon: <Plane className="w-6 h-6" /> },
              ].map((h, i) => (
                <motion.button
                  key={h.key}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex flex-col items-center gap-2.5 group cursor-pointer"
                  title={lang === "pt" ? "Adicione imagens em /public/highlights/" + h.key : "Add images to /public/highlights/" + h.key}
                >
                  <div className="relative w-[72px] h-[72px]">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="46" fill="none" strokeWidth="3" className="stroke-white/20 group-hover:stroke-white/40 transition-colors duration-500" strokeDasharray="4 4" />
                    </svg>
                    <div className="absolute inset-[5px] rounded-full bg-white/[0.03] group-hover:bg-white/[0.06] p-[2px] transition-all duration-500 flex items-center justify-center">
                      <div className="text-white/25 group-hover:text-white/50 transition-colors duration-500">
                        {h.icon}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white/25 group-hover:text-white/45 uppercase tracking-wider transition-colors">
                    {h.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </Reveal>

          {/* Logo Cloud */}
          <Reveal delay={0.3}>
            <div className="mt-16">
              <div className="mx-auto my-5 h-px max-w-sm bg-white/[0.06] [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
              <LogoCloud logos={[
                { src: "https://svgl.app/library/openai_wordmark_light.svg", alt: "OpenAI" },
                { src: "https://svgl.app/library/vercel_wordmark.svg", alt: "Vercel" },
                { src: "https://svgl.app/library/supabase_wordmark_light.svg", alt: "Supabase" },
                { src: "https://svgl.app/library/github_wordmark_light.svg", alt: "GitHub" },
                { src: "https://svgl.app/library/claude-ai-wordmark-icon_light.svg", alt: "Claude" },
                { src: "https://svgl.app/library/nvidia-wordmark-light.svg", alt: "Nvidia" },
                { src: "https://svgl.app/library/stripe_wordmark_light.svg", alt: "Stripe" },
                { src: "https://svgl.app/library/nextjs_wordmark_light.svg", alt: "Next.js" },
              ]} />
              <div className="mx-auto h-px max-w-sm bg-white/[0.06] [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 01 FRAMEWORK ═══ */}
      <section id="s-1" className="relative py-32 sm:py-40 px-6 grid-bg">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">01 — {tx.framework}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">{tx.frameworkTitle}</h2>
            <p className="text-sm text-white/25 max-w-lg mb-16 leading-relaxed">{tx.frameworkSub}</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {layers.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 0.1}>
                <div className="framework-node border-gradient rounded-lg p-6 h-full relative overflow-hidden group hover:bg-white/[0.02] transition-all duration-700">
                  <div className="flex items-center gap-2 mb-4">
                    <layer.icon className="w-4 h-4 text-white/25" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/15">L{i}</span>
                  </div>
                  <h3 className="text-lg font-light text-white/85 mb-2">{layer.name}</h3>
                  <p className="text-xs text-white/30 mb-3">{layer.desc}</p>
                  <p className="text-[10px] text-white/20 font-mono">{layer.detail}</p>
                  {i < 3 && <div className="hidden lg:block absolute right-0 top-1/2 w-4 h-px bg-gradient-to-r from-white/10 to-transparent translate-x-full" />}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 02 SISTEMA ═══ */}
      <section id="s-2" className="relative py-32 sm:py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">02 — {tx.sistema}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">{tx.sistemaTitle}</h2>
            <p className="text-sm text-white/25 max-w-lg mb-16 leading-relaxed">{tx.sistemaSub}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map((n, i) => <SystemNode key={n.label} {...n} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ 03 PROVAS ═══ */}
      <section id="s-3" className="relative py-32 sm:py-40 px-6 grid-bg">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">03 — {tx.provas}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">
              {tx.provasTitle1}<br /><span className="text-white/45">{tx.provasTitle2}</span>
            </h2>
            <p className="text-sm text-white/25 max-w-lg mb-16 leading-relaxed">{tx.provasSub}</p>
          </Reveal>
          <div className="space-y-4">
            {cases.map((c, i) => <CaseStudy key={c.number} {...c} index={i} />)}
          </div>

          {/* Anti-portfolio */}
          <Reveal delay={0.2}>
            <div className="mt-20 border-gradient rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-4 h-4 text-white/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">{tx.antiTitle}</span>
              </div>
              <p className="text-xs text-white/20 mb-6">{tx.antiSub}</p>
              <div className="space-y-3">
                {antiItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-red-500/30" />
                    <span className="text-sm text-white/30">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 04 STACK ═══ */}
      <section id="s-4" className="relative py-32 sm:py-40 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">04 — Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">{tx.stackTitle}</h2>
            <p className="text-sm text-white/25 max-w-lg mb-16 leading-relaxed">{tx.stackSub}</p>
          </Reveal>
          <div className="space-y-4">
            {stackLayers.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 0.1}>
                <div className="border-gradient rounded-lg p-6 flex items-center gap-6 group hover:bg-white/[0.02] transition-all duration-500">
                  <div className="w-10 h-10 rounded-md bg-white/[0.03] flex items-center justify-center shrink-0">
                    <layer.icon className="w-5 h-5 text-white/30" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/15">Layer {i}</span>
                      <h3 className="text-sm font-mono text-white/80">{layer.name}</h3>
                    </div>
                    <p className="text-xs text-white/25 font-mono">{layer.tools}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 05 SINAL + LOG ═══ */}
      <section id="s-5" className="relative py-32 sm:py-40 px-6 grid-bg">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">05 — {tx.sinal}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-16 text-white/90">{tx.sinalTitle}</h2>
          </Reveal>

          <div className="space-y-14 mb-24">
            {signals.map((q, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="flex items-start gap-6 sm:gap-8 group">
                  <span className="font-mono text-[10px] text-white/8 mt-2 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-px h-full bg-gradient-to-b from-white/12 via-white/3 to-transparent" />
                    <p className="text-lg sm:text-xl md:text-2xl font-light text-white/45 group-hover:text-white/70 transition-colors duration-700 leading-relaxed mb-2">{q.text}</p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/12">{q.tag}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* System log */}
          <Reveal>
            <div className="border-gradient rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-4 h-4 text-white/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">{tx.logTitle}</span>
              </div>
              <p className="text-xs text-white/15 mb-6">{tx.logSub}</p>
              <div className="space-y-4">
                {logEntries.map((entry, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <span className="font-mono text-[10px] text-white/12 mt-0.5 shrink-0">{entry.date}</span>
                    <div className="flex-1">
                      <p className="text-sm text-white/35 group-hover:text-white/50 transition-colors leading-relaxed">{entry.text}</p>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/10 shrink-0 border border-white/5 rounded px-2 py-0.5">{entry.tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 06 GATEWAY ═══ */}
      <section id="s-6" className="relative py-32 sm:py-40 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-16">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/15" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">06 — {tx.gateway}</span>
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-8 text-white/90 leading-[1.2]">
              {tx.gatewayTitle1}<br /><span className="text-white/35">{tx.gatewayTitle2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm text-white/25 max-w-md mx-auto mb-6 leading-[1.8]">{tx.gatewaySub}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex items-center justify-center gap-2 mb-12">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50 animate-pulse" />
              <span className="font-mono text-[10px] text-white/25">{tx.gatewayAvail} <span className="text-amber-400/60">{tx.gatewaySlots}</span></span>
            </div>
          </Reveal>

          {/* ═══ ORACLE — AI Lead Qualification ═══ */}
          <Reveal delay={0.35}>
            <OracleTrigger onClick={() => setOracleOpen(true)} lang={lang} />
          </Reveal>

          <Reveal delay={0.45}>
            <div className="flex items-center gap-4 my-10 max-w-xs mx-auto">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/8" />
              <span className="font-mono text-[9px] text-white/12 uppercase tracking-wider">
                {lang === "pt" ? "ou" : "or"}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <a href="mailto:businessgeander@gmail.com"
              className="inline-flex items-center gap-3 font-mono text-[11px] text-white/30 hover:text-white/55 transition-all duration-500 group">
              <span>{tx.gatewayCta}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </Reveal>

          {/* Investment thesis */}
          <Reveal delay={0.3}>
            <div className="mt-24 border-gradient rounded-lg p-8 text-left max-w-lg mx-auto">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/15 mb-6 block">{tx.investTitle}</span>
              <p className="text-xs text-white/15 mb-6">{tx.investSub}</p>
              <div className="space-y-4">
                {investData.map((d, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4">
                    <span className="text-xs text-white/20 shrink-0">{d.label}</span>
                    <div className="flex-1 border-b border-dotted border-white/5" />
                    <span className="font-mono text-xs text-white/45 text-right">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SUBSTRATE ORACLE OVERLAY ═══ */}
      <SubstrateOracle
        isOpen={oracleOpen}
        onClose={() => setOracleOpen(false)}
        lang={lang}
        agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}
      />

      {/* ═══ FOOTER — META ═══ */}
      <footer className="py-16 px-6 border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/10">{tx.metaTitle}</span>
            <p className="font-mono text-[10px] text-white/8 mt-3 max-w-md mx-auto leading-relaxed">{tx.metaSub}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.02]">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/8">GTZEN — Substrato v3.0</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-green-500/30" />
                <span className="font-mono text-[8px] text-white/8">ONLINE</span>
              </div>
              <span className="font-mono text-[8px] text-white/6">{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
