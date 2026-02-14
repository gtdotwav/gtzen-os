"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
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
} from "lucide-react"
import dynamic from "next/dynamic"

const ShaderBackground = dynamic(() => import("@/components/shader-background"), {
  ssr: false,
})

/* ═══════════════════════════════════════
   SECTION: Scroll-aware wrapper
   ═══════════════════════════════════════ */
function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   SECTION: System Node (interactive)
   ═══════════════════════════════════════ */
function SystemNode({
  label,
  description,
  icon: Icon,
  index,
}: {
  label: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  index: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="border-gradient rounded-lg p-6 transition-all duration-500 hover:bg-white/[0.03]">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-md bg-white/[0.05] flex items-center justify-center">
              <Icon className="w-5 h-5 text-white/60" />
            </div>
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-md bg-white/10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-mono text-sm text-white/90 mb-1">{label}</h3>
            <p className="text-xs text-white/40 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   SECTION: Case Study Card
   ═══════════════════════════════════════ */
function CaseStudy({
  number,
  title,
  thesis,
  layers,
  result,
  index,
}: {
  number: string
  title: string
  thesis: string
  layers: string[]
  result: string
  index: number
}) {
  return (
    <RevealSection delay={index * 0.15}>
      <div className="border-gradient rounded-lg p-8 group hover:bg-white/[0.02] transition-all duration-700">
        <div className="flex items-baseline gap-4 mb-6">
          <span className="font-mono text-xs text-white/20">{number}</span>
          <h3 className="text-xl font-light tracking-tight text-white/90">{title}</h3>
        </div>

        <p className="text-sm text-white/50 mb-6 leading-relaxed max-w-lg">
          {thesis}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {layers.map((layer, i) => (
            <span
              key={i}
              className="font-mono text-[10px] uppercase tracking-widest text-white/30 border border-white/10 rounded-full px-3 py-1"
            >
              {layer}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-white/40 group-hover:text-white/60 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
          {result}
        </div>
      </div>
    </RevealSection>
  )
}

/* ═══════════════════════════════════════
   MAIN PAGE — SUBSTRATO
   ═══════════════════════════════════════ */
export default function SubstratoPage() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [activeLayer, setActiveLayer] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const systemNodes = [
    { label: "Branding Estratégico", description: "Marcas construídas como sistemas vivos — identidade, posicionamento e narrativa como arquitetura.", icon: Hexagon },
    { label: "IA Aplicada", description: "Inteligência artificial como camada operacional — automação de decisões, não de tarefas.", icon: Cpu },
    { label: "E-commerce & Performance", description: "Sistemas de aquisição e conversão engenhados para escala composta.", icon: Target },
    { label: "Arquitetura de Produto", description: "Design de produtos digitais pela lente de sistemas — cada feature é uma decisão estrutural.", icon: Layers },
    { label: "Automação & Prompts", description: "Infraestrutura invisível que elimina atrito — da operação à criação.", icon: Zap },
    { label: "Ecossistemas Digitais", description: "Plataformas onde cada parte alimenta o todo — efeitos de rede por design.", icon: GitBranch },
  ]

  const caseStudies = [
    {
      number: "001",
      title: "DryOn",
      thesis: "Uma marca de secadores não é sobre secadores. É sobre a narrativa de cuidado, performance e identidade que o produto carrega. Construí a DryOn como um sistema de marca — do posicionamento ao ecossistema digital.",
      layers: ["branding", "e-commerce", "narrativa", "performance"],
      result: "Marca operando como ecossistema completo",
    },
    {
      number: "002",
      title: "Infraestrutura de IA",
      thesis: "IA não é ferramenta. É camada de infraestrutura. Projetei pipelines de automação e arquiteturas de prompt que transformam operações manuais em sistemas autônomos de decisão.",
      layers: ["prompt engineering", "automação", "LLMs", "sistemas"],
      result: "Operações que pensam sozinhas",
    },
    {
      number: "003",
      title: "Ativos Digitais",
      thesis: "Cada conteúdo, template e sistema que crio é projetado como ativo — algo que gera valor composto ao longo do tempo, não apenas no momento da publicação.",
      layers: ["produtos digitais", "escala", "IP", "distribuição"],
      result: "Portfólio de ativos que escalam sem operação",
    },
  ]

  const layers = [
    { name: "Visão", desc: "O que o mercado ainda não vê" },
    { name: "Arquitetura", desc: "Como as peças se conectam" },
    { name: "Execução", desc: "Do blueprint à realidade" },
    { name: "Escala", desc: "Sistemas que crescem sozinhos" },
  ]

  return (
    <main className="relative min-h-screen bg-black text-white">
      {/* Cursor glow */}
      <div
        className="cursor-glow hidden lg:block"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* ═══ HERO ═══ */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <ShaderBackground />

        <div className="absolute inset-0 grid-bg opacity-40" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mb-12 flex items-center justify-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              sistema ativo — substrato v1.0
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8 glitch-hover"
          >
            Eu não construo{" "}
            <span className="italic text-white/50">produtos</span>
            <br />
            <span className="text-white/90">
              Eu construo a{" "}
              <span className="relative inline-block">
                infraestrutura
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.8, duration: 1 }}
                />
              </span>
            </span>
            <br />
            <span className="text-white/40">por trás deles.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="font-mono text-xs sm:text-sm text-white/30 max-w-xl mx-auto leading-relaxed tracking-wide"
          >
            Estrategista de sistemas. Arquiteto de marcas.
            <br />
            Onde IA, branding e escala convergem — esse é o substrato.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/15">
            descer para entrar
          </span>
          <ChevronDown className="w-4 h-4 text-white/15 animate-bounce" />
        </motion.div>
      </motion.section>

      {/* ═══ MANIFESTO ═══ */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-8 h-px bg-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                00 — Tese
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={0.2}>
            <p className="text-2xl sm:text-3xl font-light leading-relaxed text-white/70 mb-8">
              A maioria constrói features.
              <br />
              <span className="text-white/90">Eu construo as condições</span> para que
              features tenham razão de existir.
            </p>
          </RevealSection>

          <RevealSection delay={0.4}>
            <p className="text-sm text-white/35 leading-relaxed max-w-xl">
              Não sou designer. Não sou desenvolvedor. Não sou marqueteiro.
              Sou a camada que conecta tudo isso — o substrato.
              A infraestrutura de pensamento que transforma ambiguidade em arquitetura,
              e arquitetura em sistemas que operam sozinhos.
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══ OPERATING SYSTEM — Mind Map ═══ */}
      <section className="relative py-32 px-6 grid-bg">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                01 — Sistema Operacional
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4 text-white/90">
              Mapa do sistema
            </h2>
            <p className="text-sm text-white/35 max-w-lg mb-16">
              Cada competência não é uma skill isolada — é um nó num sistema
              onde tudo se conecta e se amplifica.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemNodes.map((node, i) => (
              <SystemNode key={node.label} {...node} index={i} />
            ))}
          </div>

          <RevealSection delay={0.3}>
            <div className="mt-20 border-gradient rounded-lg p-8">
              <div className="flex items-center gap-3 mb-8">
                <Terminal className="w-4 h-4 text-white/30" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                  stack de pensamento
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {layers.map((layer, i) => (
                  <div
                    key={layer.name}
                    className={`p-4 rounded-md transition-all duration-500 cursor-pointer ${
                      activeLayer === i
                        ? "bg-white/[0.06] border border-white/10"
                        : "bg-white/[0.02] border border-transparent"
                    }`}
                    onClick={() => setActiveLayer(i)}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/20 mb-2">
                      L{i}
                    </div>
                    <div className="text-sm text-white/80 mb-1">{layer.name}</div>
                    <div className="text-[11px] text-white/30">{layer.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══ PROOF — Case Studies ═══ */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                02 — Provas de Sistema
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4 text-white/90">
              Não é portfólio. É arqueologia de decisões.
            </h2>
            <p className="text-sm text-white/35 max-w-lg mb-16">
              Cada projeto é uma demonstração de como penso, não do que faço.
              O resultado é consequência da arquitetura.
            </p>
          </RevealSection>

          <div className="space-y-4">
            {caseStudies.map((study, i) => (
              <CaseStudy key={study.number} {...study} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SIGNAL — Provocations ═══ */}
      <section className="relative py-32 px-6 grid-bg">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                03 — Sinal
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-16 text-white/90">
              Fragmentos de sistema
            </h2>
          </RevealSection>

          <div className="space-y-12">
            {[
              {
                text: "Automação sem arquitetura é apenas velocidade aplicada ao caos.",
                tag: "sobre automação",
              },
              {
                text: "Uma marca não é identidade visual. É a decisão estrutural mais importante do negócio.",
                tag: "sobre branding",
              },
              {
                text: "IA não substitui pessoas. Substitui os processos que impedem pessoas de pensar.",
                tag: "sobre IA",
              },
              {
                text: "Escala não é crescer. É construir algo que cresce sem precisar de você.",
                tag: "sobre escala",
              },
            ].map((quote, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="flex items-start gap-6 group">
                  <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent mt-1 shrink-0" />
                  <div>
                    <p className="text-lg sm:text-xl font-light text-white/60 group-hover:text-white/80 transition-colors duration-500 leading-relaxed mb-2">
                      {quote.text}
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
                      {quote.tag}
                    </span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GATEWAY — Contact ═══ */}
      <section className="relative py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="w-8 h-px bg-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                04 — Gateway
              </span>
              <div className="w-8 h-px bg-white/20" />
            </div>
          </RevealSection>

          <RevealSection delay={0.2}>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-6 text-white/90">
              Se você chegou até aqui,
              <br />
              <span className="text-white/50">provavelmente pensa parecido.</span>
            </h2>
          </RevealSection>

          <RevealSection delay={0.4}>
            <p className="text-sm text-white/35 max-w-md mx-auto mb-12 leading-relaxed">
              Não estou buscando projetos. Estou buscando problemas
              que mereçam sistemas como resposta.
            </p>
          </RevealSection>

          <RevealSection delay={0.6}>
            <a
              href="mailto:businessgeander@gmail.com"
              className="inline-flex items-center gap-3 font-mono text-sm text-white/60 hover:text-white/90 transition-all duration-500 group border border-white/10 hover:border-white/20 rounded-full px-8 py-4"
            >
              <span>Iniciar conversa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </RevealSection>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/15">
            GTZEN — Substrato v1.0
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-500/40" />
              <span className="font-mono text-[9px] text-white/15">ONLINE</span>
            </div>
            <span className="font-mono text-[9px] text-white/10">
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
