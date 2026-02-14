"use client"

import { useEffect, useState } from "react"
import { MeshGradient } from "@paper-design/shaders-react"

export default function ShaderBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />
    )
  }

  return (
    <div className="absolute inset-0">
      <MeshGradient
        className="w-full h-full"
        colors={["#000000", "#0a0a0a", "#1a1a1a", "#111111"]}
        speed={0.3}
      />
      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />
    </div>
  )
}
