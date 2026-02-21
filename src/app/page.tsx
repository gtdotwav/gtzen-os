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
    sub: "22 anos. Poliglota. CEO da PAI (Partners in A.I). Sócio de fundos com 10+ empresas. Investidor em gateways de pagamento. Network com CEOs de exits bilionários. Construo sistemas que pensam, marcas que escalam, e infraestrutura que dura.",
    scroll: "descer para entrar",
    terminalHint: "Pressione Ctrl+K para abrir o terminal",
    tese: "Tese",
    teseTitle1: "A maioria constrói features.",
    teseTitle2: "Eu construo as condições",
    teseTitle3: "para que features tenham razão de existir.",
    teseBody: "Aos 22, já morei nos EUA estudando, construí a PAI — uma empresa de inteligência artificial aplicada —, opero como sócio de fundos de investimento com mais de 10 empresas em portfólio, sou investidor em gateways de pagamento, e mantenho networking com CEOs que consolidaram e venderam empresas por valores acima de R$ 1 bilhão. Falo múltiplos idiomas. Conheço todas as áreas necessárias para consolidar uma estrutura 360°. Não sou designer. Não sou desenvolvedor. Não sou marqueteiro. Sou a camada que conecta tudo isso — o substrato.",
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
    sinal: "Princípios",
    sinalTitle: "Como o sistema pensa",
    sinalSub: "Não são frases motivacionais. São os modelos mentais que operam por trás de cada decisão. Cada princípio foi testado em produção.",
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
    lang: "EN",
  },
  en: {
    status: "system active — substrato v3.0",
    headline1: "I don't build",
    headline2: "products",
    headline3: "I build the",
    headline4: "infrastructure",
    headline5: "behind them.",
    sub: "22 years old. Polyglot. CEO of PAI (Partners in A.I). Fund partner with 10+ companies. Payment gateway investor. Network with billion-dollar exit CEOs. I build systems that think, brands that scale, and infrastructure that lasts.",
    scroll: "scroll to enter",
    terminalHint: "Press Ctrl+K to open terminal",
    tese: "Thesis",
    teseTitle1: "Most people build features.",
    teseTitle2: "I build the conditions",
    teseTitle3: "for features to have a reason to exist.",
    teseBody: "At 22, I've lived in the US studying, built PAI — an applied artificial intelligence company —, operate as a fund partner with 10+ portfolio companies, invest in payment gateways, and maintain a network with CEOs who've built and sold companies for over R$ 1 billion. I speak multiple languages and understand every layer needed to consolidate a 360° structure. I'm not a designer. Not a developer. Not a marketer. I'm the layer that connects all of it — the substrate.",
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
    sinal: "Principles",
    sinalTitle: "How the system thinks",
    sinalSub: "Not motivational quotes. These are the mental models operating behind every decision. Each principle was tested in production.",
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
    about: "Geander · 22 · Polyglot (PT/EN/ES) · Lived in the US · CEO & Founder of PAI (Partners in A.I) · Fund partner with 10+ portfolio companies · Payment gateway partnerships · Network with CEOs of billion-dollar exits · Systems thinker · Builder",
    skills: "Branding Strategy · Applied AI · E-commerce & Performance · Product Architecture · Automation & Prompt Engineering · Digital Ecosystems · Business Strategy",
    projects: "001 DryOn (Allpharma) → Full brand system (branding + ecommerce + narrative)\n002 PAI → Partners in A.I — applied AI infrastructure company\n003 Investment Fund → 10+ companies in portfolio, active board roles\n004 Digital Assets → Self-operating portfolio of scalable products",
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
   SECTION NAV (Desktop: right sidebar | Mobile: bottom bar)
   ═══════════════════════════════════════ */
function SectionNav({ active, sections }: { active: number; sections: string[] }) {
  return (
    <>
      {/* Desktop nav — right sidebar */}
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

      {/* Mobile nav — bottom bar */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 xl:hidden mobile-nav border-t border-white/[0.06]"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {sections.map((s, i) => (
            <a
              key={s}
              href={`#s-${i}`}
              className={`mobile-nav-item flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg transition-all duration-300 ${
                active === i ? "bg-white/[0.06]" : ""
              }`}
            >
              <div className={`w-1 h-1 rounded-full transition-all duration-500 ${active === i ? "bg-white/60" : "bg-white/12"}`} />
              <span className={`font-mono text-[8px] uppercase tracking-wider transition-all duration-500 ${active === i ? "text-white/60" : "text-white/25"}`}>
                {s.slice(0, 4)}
              </span>
            </a>
          ))}
        </div>
      </motion.nav>
    </>
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
function ProofTicker({ lang }: { lang: Lang }) {
  const items = lang === "pt" ? [
    "DryOn (Allpharma) → HEAD de IA & Growth · sistema de marca completo",
    "PAI (Partners in A.I) → CEO & Founder",
    "Fundo de Investimento → 10+ empresas em portfólio",
    "Gateways → investidor · inovação em pagamentos · Rio/Brasil",
    "Sócio de CEOs → exits acima de R$ 1BI",
    "Infraestrutura IA → 85% decisões automatizadas",
    "Ativos Digitais → portfólio escalável em produção",
    "4 idiomas · Vivência internacional · EUA",
    "Gateways de Pagamento → parceria estratégica",
    "Estrutura 360° → conhecimento completo de todas as áreas",
  ] : [
    "DryOn (Allpharma) → HEAD of AI & Growth · complete brand system",
    "PAI (Partners in A.I) → CEO & Founder",
    "Investment Fund → 10+ portfolio companies",
    "Gateways → investor · payment innovation · Rio/Brazil",
    "CEO Partners → exits above R$ 1BI",
    "AI Infrastructure → 85% automated decisions",
    "Digital Assets → scalable portfolio in production",
    "4 languages · International experience · USA",
    "Payment Gateways → strategic partnership",
    "360° Structure → full-stack knowledge across all areas",
  ]
  const doubled = [...items, ...items]

  return (
    <div className="w-full overflow-hidden border-y border-white/[0.04] py-3">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="font-mono text-[10px] text-white/15 whitespace-nowrap mx-8 uppercase tracking-wider">
            {item}
            <span className="mx-8 text-white/15">·</span>
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
                <span key={c} className={`font-mono text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded transition-all duration-500 ${hovered ? "text-white/50 bg-white/[0.06]" : "text-white/20 bg-transparent"}`}>
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
   CASE STUDY — with integrated Chain Nodes
   Each case study expands into a full visual
   pipeline showing the business model + scale
   ═══════════════════════════════════════ */
type ChainStep = { label: string; desc: string; icon: React.ComponentType<{ className?: string }> }

function CaseStudy({ number, title, thesis, layers, result, insight, metrics, chain, color, index }: {
  number: string; title: string; thesis: string; layers: string[]; result: string; insight: string
  metrics?: { label: string; value: string }[]
  chain: ChainStep[]
  color: "amber" | "blue" | "green" | "purple"
  index: number
}) {
  const [expanded, setExpanded] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const colorMap = {
    amber: { dot: "bg-amber-500/60", border: "border-amber-500/20", text: "text-amber-400/60", bg: "bg-amber-500/5", line: "from-amber-500/30 to-amber-500/5", glow: "shadow-amber-500/10" },
    blue: { dot: "bg-blue-500/60", border: "border-blue-500/20", text: "text-blue-400/60", bg: "bg-blue-500/5", line: "from-blue-500/30 to-blue-500/5", glow: "shadow-blue-500/10" },
    green: { dot: "bg-green-500/60", border: "border-green-500/20", text: "text-green-400/60", bg: "bg-green-500/5", line: "from-green-500/30 to-green-500/5", glow: "shadow-green-500/10" },
    purple: { dot: "bg-purple-500/60", border: "border-purple-500/20", text: "text-purple-400/60", bg: "bg-purple-500/5", line: "from-purple-500/30 to-purple-500/5", glow: "shadow-purple-500/10" },
  }
  const c = colorMap[color]

  return (
    <Reveal delay={index * 0.1}>
      <div className="border-gradient border-gradient-hover rounded-lg group transition-all duration-700 cursor-pointer overflow-hidden" onClick={() => setExpanded(!expanded)}>
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className={`w-2.5 h-2.5 rounded-full ${c.dot} ${expanded ? "animate-pulse" : ""}`} />
              <span className="font-mono text-xs text-white/15">{number}</span>
              <h3 className="text-lg sm:text-xl font-light tracking-tight text-white/90">{title}</h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] text-white/15 hidden sm:inline">{chain.length} nós</span>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="w-4 h-4 text-white/20" />
              </motion.div>
            </div>
          </div>
          <p className="text-sm text-white/45 mb-5 leading-relaxed max-w-lg">{thesis}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {layers.map((l, i) => (
              <span key={i} className="font-mono text-[10px] uppercase tracking-widest text-white/35 border border-white/12 rounded-full px-3 py-1">{l}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-white/45 group-hover:text-white/65 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse" />{result}
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-white/5">

                {/* ═══ CADEIA VISUAL — Business Model Pipeline ═══ */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-5">
                    <Network className="w-3.5 h-3.5 text-white/15" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/15">
                      Cadeia do modelo
                    </span>
                  </div>

                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    {/* Connection line */}
                    <div className={`absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b ${c.line}`} />

                    {chain.map((step, i) => {
                      const StepIcon = step.icon
                      const isActive = activeStep === i
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                          className="relative flex items-start gap-4 sm:gap-5 mb-5 last:mb-0 cursor-pointer"
                          onClick={() => setActiveStep(isActive ? null : i)}
                          onMouseEnter={() => setActiveStep(i)}
                          onMouseLeave={() => setActiveStep(null)}
                        >
                          {/* Node circle */}
                          <div className={`relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${
                            isActive
                              ? `${c.bg} ${c.border} border shadow-lg ${c.glow}`
                              : "bg-white/[0.03] border border-white/[0.06]"
                          }`}>
                            <StepIcon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-500 ${isActive ? c.text : "text-white/25"}`} />
                            {isActive && (
                              <motion.div
                                className={`absolute inset-0 rounded-lg ${c.border} border`}
                                initial={{ scale: 1, opacity: 0.6 }}
                                animate={{ scale: 1.4, opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pt-0.5">
                            <div className="flex items-baseline gap-3 mb-1">
                              <span className={`font-mono text-[9px] uppercase tracking-wider transition-colors duration-500 ${isActive ? c.text : "text-white/12"}`}>
                                0{i + 1}
                              </span>
                              <h4 className={`text-sm font-mono transition-colors duration-500 ${isActive ? "text-white/85" : "text-white/45"}`}>
                                {step.label}
                              </h4>
                            </div>
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <p className="text-xs text-white/40 leading-relaxed mt-1 pr-4">
                                    {step.desc}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Flow arrow */}
                          {isActive && i < chain.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute right-0 top-4 sm:top-5"
                            >
                              <ArrowRight className={`w-3 h-3 ${c.text}`} />
                            </motion.div>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* ═══ INSIGHT + METRICS ═══ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/[0.04]">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-3 block">Insight estrutural</span>
                    <p className="text-sm text-white/45 leading-relaxed">{insight}</p>
                  </div>
                  {metrics && (
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25 mb-3 block">Indicadores</span>
                      <div className="space-y-3">
                        {metrics.map((m, i) => (
                          <div key={i} className="flex items-baseline justify-between">
                            <span className="text-xs text-white/25">{m.label}</span>
                            <span className="font-mono text-sm text-white/75">{m.value}</span>
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
  const heroFilter = useTransform(heroBlur, (v: number) => `blur(${v}px)`)
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
    ? ["Tese", "Framework", "Sistema", "Provas", "Stack", "Princípios", "Gateway"]
    : ["Thesis", "Framework", "System", "Proofs", "Stack", "Principles", "Gateway"]

  const nodes = lang === "pt" ? [
    { label: "Branding Estratégico", description: "Marcas como sistemas vivos — identidade, posicionamento e narrativa como arquitetura.", icon: Hexagon, connections: ["IA", "E-commerce", "Produto"] },
    { label: "IA Aplicada", description: "Inteligência artificial como camada de decisão — automação de processos cognitivos, não de tarefas.", icon: Cpu, connections: ["Automação", "Produto", "Escala"] },
    { label: "E-commerce & Performance", description: "Sistemas de aquisição e conversão engenhados para escala composta.", icon: Target, connections: ["Branding", "IA", "Ecossistema"] },
    { label: "Arquitetura de Produto", description: "Produtos digitais pela lente de sistemas — cada feature é uma decisão estrutural.", icon: Layers, connections: ["Branding", "Automação", "IA"] },
    { label: "Automação & Prompts", description: "Infraestrutura invisível que elimina atrito — da operação à criação.", icon: Zap, connections: ["IA", "Produto", "Ecossistema"] },
    { label: "Ecossistemas Digitais", description: "Plataformas onde cada parte alimenta o todo — efeitos de rede por design.", icon: GitBranch, connections: ["Branding", "E-commerce", "Produto"] },
  ] : [
    { label: "Strategic Branding", description: "Brands as living systems — identity, positioning, and narrative as architecture.", icon: Hexagon, connections: ["AI", "E-commerce", "Product"] },
    { label: "Applied AI", description: "Artificial intelligence as a decision layer — automating cognitive processes, not tasks.", icon: Cpu, connections: ["Automation", "Product", "Scale"] },
    { label: "E-commerce & Performance", description: "Acquisition and conversion systems engineered for compound scale.", icon: Target, connections: ["Branding", "AI", "Ecosystem"] },
    { label: "Product Architecture", description: "Digital products through a systems lens — every feature is a structural decision.", icon: Layers, connections: ["Branding", "Automation", "AI"] },
    { label: "Automation & Prompts", description: "Invisible infrastructure that eliminates friction — from operations to creation.", icon: Zap, connections: ["AI", "Product", "Ecosystem"] },
    { label: "Digital Ecosystems", description: "Platforms where every part feeds the whole — network effects by design.", icon: GitBranch, connections: ["Branding", "E-commerce", "Product"] },
  ]

  const cases = [
    {
      number: "001", title: "DryOn — Allpharma", color: "amber" as const,
      thesis: "A DryOn é marca da Allpharma, indústria farmacêutica. Uma marca de desodorantes não é sobre desodorantes — é sobre a narrativa de cuidado e identidade que o produto carrega. Como HEAD de IA & Growth, construí a DryOn como um sistema de marca completo — do site à esteira de conteúdo com IA.",
      layers: ["branding", "e-commerce", "IA & growth", "narrativa", "performance"],
      result: "HEAD de IA & Growth · Marca operando como ecossistema",
      insight: "Tratar o produto como veículo de identidade, não commodity. Cada decisão de branding alimentava a performance — um loop, não sequência. A esteira de conteúdo com IA eliminou a dependência de equipe criativa manual.",
      metrics: [{ label: "Posição", value: "HEAD de IA" }, { label: "Camadas", value: "5" }, { label: "Automação", value: "Esteira IA" }, { label: "Modelo", value: "Sistema" }],
      chain: [
        { label: lang === "pt" ? "Diagnóstico de Marca" : "Brand Diagnosis", desc: lang === "pt" ? "Mapear mercado de desodorantes, gaps de posicionamento, e oportunidades de narrativa que nenhum concorrente ocupa" : "Map deodorant market, positioning gaps, and narrative opportunities no competitor occupies", icon: Search },
        { label: lang === "pt" ? "Arquitetura de Marca" : "Brand Architecture", desc: lang === "pt" ? "DNA da DryOn: identidade visual, tom de voz, narrativa de cuidado pessoal, sistema visual completo. Marca como sistema vivo" : "DryOn DNA: visual identity, voice tone, personal care narrative, complete visual system. Brand as living system", icon: Palette },
        { label: lang === "pt" ? "Site & E-commerce" : "Site & E-commerce", desc: lang === "pt" ? "Site construído como funil de conversão — cada página é uma decisão de arquitetura, não decoração" : "Site built as conversion funnel — every page is an architecture decision, not decoration", icon: Code },
        { label: lang === "pt" ? "Esteira IA de Conteúdo" : "AI Content Pipeline", desc: lang === "pt" ? "Pipeline de produção de conteúdo digital com IA: do briefing ao post final. Elimina gargalo criativo humano" : "AI digital content production pipeline: from brief to final post. Eliminates human creative bottleneck", icon: Bot },
        { label: lang === "pt" ? "Automação de Growth" : "Growth Automation", desc: lang === "pt" ? "Performance marketing + funis automatizados + loops de feedback. Sistema que escala sem intervenção manual" : "Performance marketing + automated funnels + feedback loops. System that scales without manual intervention", icon: TrendingUp },
        { label: lang === "pt" ? "Operação Autônoma" : "Autonomous Operation", desc: lang === "pt" ? "Zero intervenção manual no funil. Marca operando como ecossistema auto-sustentável. Crescimento composto" : "Zero manual funnel intervention. Brand operating as self-sustaining ecosystem. Compound growth", icon: Zap },
      ],
    },
    {
      number: "002", title: "PAI — Partners in A.I", color: "blue" as const,
      thesis: "Fundei a PAI para resolver um gap: empresas querem IA mas não têm infraestrutura de pensamento para usá-la. Não vendemos ferramentas — vendemos a camada de inteligência que falta.",
      layers: ["IA aplicada", "consultoria", "automação", "estratégia"],
      result: "Empresa ativa com clientes em operação",
      insight: "O mercado não precisa de mais ferramentas de IA. Precisa de quem entenda a arquitetura de decisão por trás. A PAI é essa camada.",
      metrics: [{ label: "Pipelines ativos", value: "7+" }, { label: "Decisões automatizadas", value: "85%" }, { label: "Tempo economizado", value: "12h/sem" }],
      chain: [
        { label: lang === "pt" ? "Auditoria de Processos" : "Process Audit", desc: lang === "pt" ? "Mapear todos os processos repetitivos e decisões manuais da empresa. Identificar onde IA gera ROI real, não hype" : "Map all repetitive processes and manual decisions. Identify where AI generates real ROI, not hype", icon: Search },
        { label: lang === "pt" ? "Arquitetura de Decisão" : "Decision Architecture", desc: lang === "pt" ? "Desenhar pipelines de decisão com LLMs — cada prompt é uma decisão de arquitetura, não um comando" : "Design decision pipelines with LLMs — each prompt is an architecture decision, not a command", icon: Brain },
        { label: lang === "pt" ? "Deploy em Produção" : "Production Deploy", desc: lang === "pt" ? "n8n, APIs customizadas, agents autônomos. Tudo em produção, não em slides" : "n8n, custom APIs, autonomous agents. Everything in production, not slides", icon: Code },
        { label: lang === "pt" ? "Feedback Loops" : "Feedback Loops", desc: lang === "pt" ? "Sistemas que aprendem sozinhos. Cada interação melhora o pipeline. O sistema evolui sem intervenção" : "Self-learning systems. Each interaction improves the pipeline. System evolves without intervention", icon: Network },
        { label: lang === "pt" ? "Escala Automatizada" : "Automated Scale", desc: lang === "pt" ? "85% das decisões operacionais automatizadas. 12h/semana economizadas por cliente. O fundador para de apagar incêndio" : "85% operational decisions automated. 12h/week saved per client. Founder stops firefighting", icon: Zap },
      ],
    },
    {
      number: "003", title: "Portfólio de Investimentos", color: "green" as const,
      thesis: "Sócio de fundos e investidor com parceria em gateways de pagamento e inovadores em tecnologia com networking nacional. Sócio de CEOs que venderam empresas por valores acima de R$ 1BI. Avalio tudo pela qualidade da infraestrutura, não do produto.",
      layers: ["venture", "gateways", "diligência", "escala", "governança 360°"],
      result: "10+ empresas em portfólio ativo · Parcerias com exits bilionários",
      insight: "A tese é simples: investir em fundadores que pensam em sistemas, não em funcionalidades. O produto muda. O sistema permanece. Com acesso a operadores que já consolidaram estruturas 360° em escala bilionária, o deal flow é outro nível.",
      metrics: [{ label: "Empresas", value: "10+" }, { label: "Parcerias", value: "Gateways · Tech" }, { label: "Network", value: "Exits >R$1BI" }, { label: "Papel", value: "Ativo · 360°" }],
      chain: [
        { label: lang === "pt" ? "Tese de Investimento" : "Investment Thesis", desc: lang === "pt" ? "Infraestrutura > features. Sistemas > produtos. Investir em quem pensa em arquitetura, não em funcionalidades bonitas" : "Infrastructure > features. Systems > products. Invest in those who think architecture, not pretty features", icon: Brain },
        { label: lang === "pt" ? "Due Diligence" : "Due Diligence", desc: lang === "pt" ? "Avaliar fundadores pela qualidade do sistema, não do produto. Sócios com exits acima de R$ 1BI validam o dealflow" : "Evaluate founders by system quality, not product. Partners with R$1BI+ exits validate dealflow", icon: Shield },
        { label: lang === "pt" ? "Alocação Estratégica" : "Strategic Allocation", desc: lang === "pt" ? "Capital + infraestrutura de IA + networking nacional como valor agregado. Parceria com gateways de pagamento e empresas de tecnologia" : "Capital + AI infra + nationwide network as added value. Partnership with payment gateways and tech companies", icon: Target },
        { label: lang === "pt" ? "Operação 360°" : "360° Operation", desc: lang === "pt" ? "Board ativo. Visão completa: branding, tech, growth, finanças. Decisões de arquitetura com conhecimento de todas as áreas" : "Active board. Complete vision: branding, tech, growth, finance. Architecture decisions with full-stack knowledge", icon: Layers },
        { label: lang === "pt" ? "Escala & Retorno" : "Scale & Return", desc: lang === "pt" ? "10+ empresas escalando. Portfólio em produção. Network com operadores de exits bilionários alimenta novas oportunidades" : "10+ companies scaling. Portfolio in production. Network with billion-exit operators feeds new opportunities", icon: TrendingUp },
      ],
    },
    {
      number: "004", title: "Ativos Digitais", color: "purple" as const,
      thesis: "Cada conteúdo e sistema que crio é projetado como ativo — gera valor composto ao longo do tempo, não apenas no momento da publicação.",
      layers: ["produtos digitais", "escala", "IP", "distribuição"],
      result: "Portfólio que escala sem operação",
      insight: "Não pergunto 'o que publicar hoje?' — pergunto 'o que vai gerar retorno em 6 meses?'. Isso muda a arquitetura de tudo.",
      metrics: [{ label: "Ativos", value: "12+" }, { label: "Recorrência", value: "Sim" }, { label: "Operação", value: "~0" }],
      chain: [
        { label: lang === "pt" ? "Identificação de Ativo" : "Asset Identification", desc: lang === "pt" ? "Mapear que tipo de conteúdo/sistema gera retorno composto — não viral, composto. Valor que cresce no tempo" : "Map what content/system generates compound return — not viral, compound. Value that grows over time", icon: Search },
        { label: lang === "pt" ? "Arquitetura de IP" : "IP Architecture", desc: lang === "pt" ? "Cada ativo é projetado como propriedade intelectual: template, framework, sistema. Não é conteúdo — é infraestrutura" : "Each asset is designed as intellectual property: template, framework, system. Not content — infrastructure", icon: Layers },
        { label: lang === "pt" ? "Produção com IA" : "AI Production", desc: lang === "pt" ? "Pipeline de criação automatizada. Da ideia ao ativo publicado com mínima intervenção humana" : "Automated creation pipeline. From idea to published asset with minimal human intervention", icon: Bot },
        { label: lang === "pt" ? "Distribuição Automatizada" : "Automated Distribution", desc: lang === "pt" ? "Sistemas de distribuição que funcionam 24/7. SEO, funis, marketplaces — tudo operando sem manutenção" : "Distribution systems that run 24/7. SEO, funnels, marketplaces — all operating maintenance-free", icon: Rocket },
        { label: lang === "pt" ? "Retorno Composto" : "Compound Return", desc: lang === "pt" ? "Portfólio de 12+ ativos gerando receita recorrente com operação próxima de zero. Cada ativo alimenta o próximo" : "Portfolio of 12+ assets generating recurring revenue with near-zero operation. Each asset feeds the next", icon: TrendingUp },
      ],
    },
  ]

  const layers = lang === "pt" ? [
    { name: "Visão", desc: "O que o mercado ainda não vê", detail: "Identificar padrões antes que virem consenso", icon: Brain },
    { name: "Arquitetura", desc: "Como as peças se conectam", detail: "Decisões estruturais que definem o jogo", icon: Network },
    { name: "Execução", desc: "Do blueprint à realidade", detail: "Shipping > theorizing. Sempre.", icon: Rocket },
    { name: "Escala", desc: "Sistemas que crescem sozinhos", detail: "Construir para funcionar sem você", icon: TrendingUp },
  ] : [
    { name: "Vision", desc: "What the market doesn't see yet", detail: "Identify patterns before they become consensus", icon: Brain },
    { name: "Architecture", desc: "How the pieces connect", detail: "Structural decisions that define the game", icon: Network },
    { name: "Execution", desc: "From blueprint to reality", detail: "Shipping > theorizing. Always.", icon: Rocket },
    { name: "Scale", desc: "Systems that grow on their own", detail: "Build to work without you", icon: TrendingUp },
  ]

  const antiItems = lang === "pt" ? [
    "Identidade visual sem estratégia por trás",
    "Automação de processos que já estão quebrados",
    "Marketing de performance sem arquitetura de marca",
    "Consultoria genérica — cada sistema é único",
    "Projetos sem visão de longo prazo",
  ] : [
    "Visual identity without strategy behind it",
    "Automating processes that are already broken",
    "Performance marketing without brand architecture",
    "Generic consulting — every system is unique",
    "Projects without long-term vision",
  ]

  const stackLayers = lang === "pt" ? [
    { name: "Decisão", tools: "First Principles · Systems Thinking · Mental Models", icon: Brain },
    { name: "Criação", tools: "AI Pipelines · Prompt Architecture · LLM Chains", icon: Code },
    { name: "Distribuição", tools: "Performance Marketing · E-commerce · Content Systems", icon: BarChart3 },
    { name: "Automação", tools: "n8n · Custom APIs · Autonomous Agents", icon: Bot },
  ] : [
    { name: "Decision", tools: "First Principles · Systems Thinking · Mental Models", icon: Brain },
    { name: "Creation", tools: "AI Pipelines · Prompt Architecture · LLM Chains", icon: Code },
    { name: "Distribution", tools: "Performance Marketing · E-commerce · Content Systems", icon: BarChart3 },
    { name: "Automation", tools: "n8n · Custom APIs · Autonomous Agents", icon: Bot },
  ]

  const logEntries = lang === "pt" ? [
    { date: "2026.02", text: "Novo pipeline de decisão autônoma em produção na PAI. 3 clientes migrados.", tag: "infra" },
    { date: "2026.01", text: "Fechamento de 2 novos investimentos no fundo. Tese: infraestrutura > produto.", tag: "venture" },
    { date: "2025.12", text: "Substrato v3 — este site — projetado e construído como sistema, não como página.", tag: "meta" },
    { date: "2025.11", text: "DryOn (Allpharma) atingiu operação autônoma. Zero intervenção manual no funil.", tag: "escala" },
  ] : [
    { date: "2026.02", text: "New autonomous decision pipeline in production at PAI. 3 clients migrated.", tag: "infra" },
    { date: "2026.01", text: "Closed 2 new fund investments. Thesis: infrastructure > product.", tag: "venture" },
    { date: "2025.12", text: "Substrate v3 — this site — designed and built as system, not as a page.", tag: "meta" },
    { date: "2025.11", text: "DryOn (Allpharma) reached autonomous operation. Zero manual funnel intervention.", tag: "scale" },
  ]

  const investData = [
    { label: lang === "pt" ? "Risco" : "Risk", value: lang === "pt" ? "Baixo — track record + sócios com exits >R$1BI" : "Low — track record + partners with >R$1BI exits" },
    { label: lang === "pt" ? "Retorno esperado" : "Expected return", value: lang === "pt" ? "Sistemas auto-operantes + infraestrutura de escala" : "Self-operating systems + scale infrastructure" },
    { label: lang === "pt" ? "Diferencial" : "Edge", value: lang === "pt" ? "Visão 360° · Gateways · Tech · Network nacional" : "360° vision · Gateways · Tech · Nationwide network" },
    { label: lang === "pt" ? "Horizonte" : "Horizon", value: lang === "pt" ? "Longo prazo — infraestrutura > quick wins" : "Long term — infrastructure > quick wins" },
    { label: lang === "pt" ? "Network" : "Network", value: lang === "pt" ? "CEOs de exits bilionários · Fundos · Gateways de pagamento" : "Billion-exit CEOs · Funds · Payment gateways" },
  ]

  const principles = lang === "pt" ? [
    {
      number: "01",
      title: "Sistema > Produto",
      thesis: "A diferença entre produto e sistema: o sistema funciona quando você para.",
      detail: "Produtos resolvem problemas pontuais. Sistemas resolvem classes inteiras de problemas. Quando projeto algo, pergunto: isso vai funcionar sem mim daqui a 6 meses? Se não, é produto. Se sim, é infraestrutura.",
      tag: "arquitetura",
    },
    {
      number: "02",
      title: "Automação ≠ Velocidade",
      thesis: "Automação sem arquitetura é apenas velocidade aplicada ao caos.",
      detail: "Antes de automatizar, é preciso entender a lógica de decisão por trás. 90% das empresas automatizam processos quebrados — e ficam surpresas quando escala só amplifica os problemas. Primeiro arquitetura, depois automação.",
      tag: "automação",
    },
    {
      number: "03",
      title: "Marca como Decisão Estrutural",
      thesis: "Uma marca não é identidade visual. É a decisão estrutural mais importante do negócio.",
      detail: "A marca define como o mercado te percebe, qual tipo de cliente você atrai, e qual preço pode cobrar. Isso não é design — é arquitetura de posicionamento. Uma marca mal construída limita tudo que vem depois.",
      tag: "branding",
    },
    {
      number: "04",
      title: "IA como Camada de Decisão",
      thesis: "IA não substitui pessoas. Substitui os processos que impedem pessoas de pensar.",
      detail: "Na PAI, usamos IA para eliminar as 85% de decisões operacionais repetitivas. O resultado: fundadores param de apagar incêndio e começam a arquitetar o futuro. A IA libera o recurso mais escasso — atenção humana de qualidade.",
      tag: "inteligência artificial",
    },
    {
      number: "05",
      title: "Escala por Subtração",
      thesis: "Escala não é crescer. É construir algo que cresce sem precisar de você.",
      detail: "A maioria tenta escalar adicionando — mais gente, mais features, mais processos. Escala real vem de subtrair: eliminar dependências, simplificar decisões, criar loops que se retroalimentam. Menos peças, mais sistema.",
      tag: "escala",
    },
  ] : [
    {
      number: "01",
      title: "System > Product",
      thesis: "The difference between product and system: the system works when you stop.",
      detail: "Products solve specific problems. Systems solve entire classes of problems. When I design something, I ask: will this work without me in 6 months? If not, it's a product. If yes, it's infrastructure.",
      tag: "architecture",
    },
    {
      number: "02",
      title: "Automation ≠ Speed",
      thesis: "Automation without architecture is just speed applied to chaos.",
      detail: "Before automating, you need to understand the decision logic behind it. 90% of companies automate broken processes — then wonder why scaling only amplifies problems. Architecture first, automation second.",
      tag: "automation",
    },
    {
      number: "03",
      title: "Brand as Structural Decision",
      thesis: "A brand isn't visual identity. It's the most important structural decision in a business.",
      detail: "Brand defines market perception, customer type, and pricing power. That's not design — it's positioning architecture. A poorly built brand limits everything that comes after.",
      tag: "branding",
    },
    {
      number: "04",
      title: "AI as Decision Layer",
      thesis: "AI doesn't replace people. It replaces the processes that prevent people from thinking.",
      detail: "At PAI, we use AI to eliminate the 85% of repetitive operational decisions. The result: founders stop firefighting and start architecting the future. AI frees the scarcest resource — quality human attention.",
      tag: "artificial intelligence",
    },
    {
      number: "05",
      title: "Scale by Subtraction",
      thesis: "Scale isn't growing. It's building something that grows without needing you.",
      detail: "Most try to scale by adding — more people, more features, more processes. Real scale comes from subtracting: eliminating dependencies, simplifying decisions, creating self-reinforcing loops. Fewer parts, more system.",
      tag: "scale",
    },
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
        style={{ opacity: heroOpacity, scale: heroScale, filter: heroFilter }}
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
                <span className="font-mono text-[9px] text-white/20 ml-2">substrato.sh</span>
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
              className="font-mono text-[11px] sm:text-xs text-white/30 max-w-xl mx-auto lg:mx-0 leading-relaxed tracking-wide">
              {tx.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }} className="mt-8 flex items-center gap-6 sm:gap-8 justify-center lg:justify-start flex-wrap">
              {stats.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-mono text-xl sm:text-2xl text-white/70"><Counter value={s.value} suffix="+" /></div>
                  <div className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/20 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 1 }} className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/15">{tx.scroll}</span>
          <ChevronDown className="w-4 h-4 text-white/15 animate-bounce" />
        </motion.div>
      </motion.section>

      {/* ═══ PROOF TICKER ═══ */}
      <ProofTicker lang={lang} />

      {/* ═══ 00 TESE ═══ */}
      <section id="s-0" className="relative py-32 sm:py-40 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">00 — {tx.tese}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-2xl sm:text-3xl md:text-4xl font-light leading-[1.4] text-white/55 mb-8">
              {tx.teseTitle1}<br /><span className="text-white/90">{tx.teseTitle2}</span> {tx.teseTitle3}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-sm text-white/35 leading-[1.9] max-w-xl mb-8">{tx.teseBody}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-white/10" />
              <p className="font-mono text-[11px] text-white/25 italic">&quot;{tx.teseQuote}&quot;</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ OPERADOR — Quem Opera o Substrato ═══ */}
      <section className="relative py-32 sm:py-40 px-6 overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{tx.storiesLabel}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight mb-3 text-white/90">{tx.storiesTitle}</h2>
            <p className="text-sm text-white/35 max-w-lg mb-16 leading-relaxed">{tx.storiesSub}</p>
          </Reveal>

          {/* ═══ IDENTITY DOSSIER ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-12">

            {/* LEFT — Profile card */}
            <Reveal delay={0.1}>
              <div className="border-gradient rounded-xl p-6 sm:p-8 h-full">
                {/* Profile header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] flex items-center justify-center border border-white/[0.06]">
                      <span className="font-mono text-2xl font-light text-white/70">G</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500/60 border-2 border-black animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-white/85 tracking-wide">Geander</h3>
                    <p className="font-mono text-[10px] text-white/30 uppercase tracking-wider">{lang === "pt" ? "Operador do Substrato" : "Substrate Operator"}</p>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { label: lang === "pt" ? "Idade" : "Age", value: "22" },
                    { label: lang === "pt" ? "Idiomas" : "Languages", value: "4" },
                    { label: lang === "pt" ? "Empresas" : "Companies", value: "10+" },
                    { label: lang === "pt" ? "Sistemas" : "Systems", value: "15+" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.02] rounded-lg px-3 py-2.5 border border-white/[0.04]">
                      <div className="font-mono text-lg text-white/70">{s.value}</div>
                      <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Roles */}
                <div className="space-y-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 block mb-2">
                    {lang === "pt" ? "Posições ativas" : "Active positions"}
                  </span>
                  {[
                    { role: "CEO & Founder", org: "PAI — Partners in A.I", dot: "bg-blue-400/60" },
                    { role: lang === "pt" ? "Sócio de fundo" : "Fund Partner", org: lang === "pt" ? "Fundo de investimento · 10+ empresas" : "Investment fund · 10+ companies", dot: "bg-green-400/60" },
                    { role: lang === "pt" ? "Investidor" : "Investor", org: lang === "pt" ? "Gateways de pagamento · Tech" : "Payment gateways · Tech", dot: "bg-amber-400/60" },
                    { role: "HEAD IA & Growth", org: "DryOn — Allpharma", dot: "bg-purple-400/60" },
                  ].map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="flex items-start gap-3 py-2 border-b border-white/[0.03] last:border-0"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${r.dot}`} />
                      <div>
                        <span className="font-mono text-[11px] text-white/60 block">{r.role}</span>
                        <span className="font-mono text-[9px] text-white/25">{r.org}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* RIGHT — Timeline journey */}
            <Reveal delay={0.2}>
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-transparent" />

                <div className="space-y-1">
                  {[
                    {
                      year: "2020",
                      title: lang === "pt" ? "Vivência nos EUA" : "US Experience",
                      desc: lang === "pt" ? "Imersão internacional — inglês fluente, visão global, entendimento de mercados de escala." : "International immersion — fluent English, global vision, understanding of scale markets.",
                      icon: Globe,
                      accent: "text-blue-400/50",
                    },
                    {
                      year: "2022",
                      title: lang === "pt" ? "Fundação da PAI" : "PAI Founded",
                      desc: lang === "pt" ? "Partners in A.I — empresa de inteligência artificial aplicada. De conceito a pipeline com 7+ clientes e 85% de decisões automatizadas." : "Partners in A.I — applied artificial intelligence company. From concept to pipeline with 7+ clients and 85% automated decisions.",
                      icon: Brain,
                      accent: "text-cyan-400/50",
                    },
                    {
                      year: "2023",
                      title: lang === "pt" ? "Fundo de Investimento" : "Investment Fund",
                      desc: lang === "pt" ? "Sócio de fundo com 10+ empresas em portfólio. Tese: infraestrutura > produto. Sócios com exits acima de R$ 1BI." : "Fund partner with 10+ portfolio companies. Thesis: infrastructure > product. Partners with R$1BI+ exits.",
                      icon: TrendingUp,
                      accent: "text-green-400/50",
                    },
                    {
                      year: "2024",
                      title: lang === "pt" ? "Investimentos & Gateways" : "Investments & Gateways",
                      desc: lang === "pt" ? "Investimentos em tecnologia e parcerias estratégicas com gateways de pagamento. Network com operadores de escala nacional." : "Tech investments and strategic partnerships with payment gateways. Network with national-scale operators.",
                      icon: Shield,
                      accent: "text-amber-400/50",
                    },
                    {
                      year: "2025",
                      title: lang === "pt" ? "DryOn (Allpharma) · HEAD de IA & Growth" : "DryOn (Allpharma) · HEAD of AI & Growth",
                      desc: lang === "pt" ? "Marca da Allpharma (indústria farmacêutica). Sistema de marca completo — do branding à esteira IA de conteúdo. Operação autônoma atingida: zero intervenção manual no funil." : "Allpharma's brand (pharmaceutical industry). Complete brand system — from branding to AI content pipeline. Autonomous operation achieved: zero manual funnel intervention.",
                      icon: Rocket,
                      accent: "text-purple-400/50",
                    },
                    {
                      year: "2026",
                      title: lang === "pt" ? "Substrato v3 · Este site" : "Substrate v3 · This site",
                      desc: lang === "pt" ? "Código puro, projetado como produto. O mesmo approach que aplico a tudo: construir infraestrutura, não páginas." : "Pure code, designed as product. The same approach I apply to everything: build infrastructure, not pages.",
                      icon: Code,
                      accent: "text-white/40",
                    },
                  ].map((event, i) => {
                    const EventIcon = event.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className="relative flex gap-4 sm:gap-5 group pl-0"
                      >
                        {/* Timeline node */}
                        <div className="relative z-10 shrink-0">
                          <div className="w-[31px] h-[31px] sm:w-[39px] sm:h-[39px] rounded-lg bg-black border border-white/[0.08] group-hover:border-white/[0.15] flex items-center justify-center transition-all duration-500">
                            <EventIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${event.accent} group-hover:text-white/60 transition-colors duration-500`} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6 sm:pb-8">
                          <div className="flex items-baseline gap-3 mb-1.5">
                            <span className="font-mono text-[10px] text-white/20 tabular-nums">{event.year}</span>
                            <h4 className="text-sm sm:text-[15px] font-light text-white/80 group-hover:text-white/90 transition-colors">{event.title}</h4>
                          </div>
                          <p className="text-xs text-white/30 group-hover:text-white/40 leading-relaxed transition-colors duration-500 max-w-md">{event.desc}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Logo Cloud */}
          <Reveal delay={0.35}>
            <div className="mt-20">
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
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">01 — {tx.framework}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">{tx.frameworkTitle}</h2>
            <p className="text-sm text-white/35 max-w-lg mb-16 leading-relaxed">{tx.frameworkSub}</p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {layers.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 0.1}>
                <div className="framework-node border-gradient rounded-lg p-6 h-full relative overflow-hidden group hover:bg-white/[0.02] transition-all duration-700">
                  <div className="flex items-center gap-2 mb-4">
                    <layer.icon className="w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors duration-500" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/20 group-hover:text-white/35 transition-colors duration-500">L{i}</span>
                  </div>
                  <h3 className="text-lg font-light text-white/85 mb-2">{layer.name}</h3>
                  <p className="text-xs text-white/30 mb-3">{layer.desc}</p>
                  <p className="text-[10px] text-white/30 font-mono">{layer.detail}</p>
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
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">02 — {tx.sistema}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">{tx.sistemaTitle}</h2>
            <p className="text-sm text-white/35 max-w-lg mb-16 leading-relaxed">{tx.sistemaSub}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map((n, i) => <SystemNode key={n.label} {...n} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ 03 PROVAS + CADEIA DE MODELOS ═══ */}
      <section id="s-3" className="relative py-32 sm:py-40 px-6 grid-bg">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">03 — {tx.provas}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">
              {tx.provasTitle1}<br /><span className="text-white/45">{tx.provasTitle2}</span>
            </h2>
            <p className="text-sm text-white/35 max-w-lg mb-16 leading-relaxed">{tx.provasSub}</p>
          </Reveal>

          {/* ═══ CADEIA DE MODELOS — Each case study has integrated chain nodes ═══ */}
          <div className="space-y-6 mb-16">
            {cases.map((c, i) => (
              <CaseStudy key={c.number} {...c} index={i} />
            ))}
          </div>

          {/* Anti-portfolio */}
          <Reveal delay={0.2}>
            <div className="mt-12 border-gradient rounded-lg p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-4 h-4 text-white/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{tx.antiTitle}</span>
              </div>
              <p className="text-xs text-white/30 mb-6">{tx.antiSub}</p>
              <div className="space-y-3">
                {antiItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
                    <span className="text-sm text-white/40">{item}</span>
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
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">04 — Stack</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">{tx.stackTitle}</h2>
            <p className="text-sm text-white/35 max-w-lg mb-16 leading-relaxed">{tx.stackSub}</p>
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
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/20">Layer {i}</span>
                      <h3 className="text-sm font-mono text-white/80">{layer.name}</h3>
                    </div>
                    <p className="text-xs text-white/35 font-mono">{layer.tools}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 05 PRINCÍPIOS OPERACIONAIS ═══ */}
      <section id="s-5" className="relative py-32 sm:py-40 px-6 grid-bg">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">05 — {tx.sinal}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4 text-white/90">{tx.sinalTitle}</h2>
            <p className="text-sm text-white/35 max-w-lg mb-16 leading-relaxed">{tx.sinalSub}</p>
          </Reveal>

          {/* Principles grid */}
          <div className="space-y-6 mb-24">
            {principles.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="border-gradient border-gradient-hover rounded-lg group transition-all duration-500 overflow-hidden">
                  <div className="p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 sm:gap-6 mb-5">
                      <span className="font-mono text-[11px] text-white/15 mt-1 shrink-0 tabular-nums">{p.number}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-base sm:text-lg font-light text-white/85 tracking-tight">{p.title}</h3>
                          <span className="font-mono text-[8px] uppercase tracking-widest text-white/20 border border-white/[0.08] rounded-full px-2.5 py-0.5 hidden sm:inline">{p.tag}</span>
                        </div>
                        {/* Thesis — the principle itself */}
                        <p className="text-lg sm:text-xl font-light text-white/50 group-hover:text-white/70 leading-relaxed transition-colors duration-500 mb-4">
                          &ldquo;{p.thesis}&rdquo;
                        </p>
                        {/* Detail — didactic explanation */}
                        <div className="relative pl-4 border-l border-white/[0.06]">
                          <p className="text-sm text-white/30 group-hover:text-white/40 leading-[1.8] transition-colors duration-500">
                            {p.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* System log */}
          <Reveal>
            <div className="border-gradient rounded-lg p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-4 h-4 text-white/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{tx.logTitle}</span>
              </div>
              <p className="text-xs text-white/20 mb-6">{tx.logSub}</p>
              <div className="space-y-4">
                {logEntries.map((entry, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <span className="font-mono text-[10px] text-white/20 mt-0.5 shrink-0 tabular-nums">{entry.date}</span>
                    <div className="flex-1">
                      <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors leading-relaxed">{entry.text}</p>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/20 shrink-0 border border-white/10 rounded px-2 py-0.5">{entry.tag}</span>
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
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">06 — {tx.gateway}</span>
              <div className="w-12 h-px bg-gradient-to-r from-white/15 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-8 text-white/90 leading-[1.2]">
              {tx.gatewayTitle1}<br /><span className="text-white/45">{tx.gatewayTitle2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-sm text-white/35 max-w-md mx-auto mb-6 leading-[1.8]">{tx.gatewaySub}</p>
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
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
              <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider">
                {lang === "pt" ? "ou" : "or"}
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
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
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25 mb-6 block">{tx.investTitle}</span>
              <p className="text-xs text-white/30 mb-6">{tx.investSub}</p>
              <div className="space-y-4">
                {investData.map((d, i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4">
                    <span className="text-xs text-white/30 shrink-0">{d.label}</span>
                    <div className="flex-1 border-b border-dotted border-white/8" />
                    <span className="font-mono text-xs text-white/55 text-right">{d.value}</span>
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
      <footer className="py-16 pb-24 xl:pb-16 px-6 border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">{tx.metaTitle}</span>
            <p className="font-mono text-[10px] text-white/20 mt-3 max-w-md mx-auto leading-relaxed">{tx.metaSub}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">GTZEN — Substrato v3.0</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-green-500/50" />
                <span className="font-mono text-[8px] text-white/20">ONLINE</span>
              </div>
              <span className="font-mono text-[8px] text-white/15">{new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
