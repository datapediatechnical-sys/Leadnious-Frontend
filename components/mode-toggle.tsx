"use client"

import * as React from "react"
import { Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"

export function ModeToggle() {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
    }

    const isDark = resolvedTheme === "dark"

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-input bg-card text-foreground transition-all hover:bg-accent hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
            aria-label="Toggle theme"
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 transition-opacity group-hover:opacity-100" />

            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div
                        key="full-moon"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        {/* Full Moon: A filled circle with a glow */}
                        <div className="h-5 w-5 rounded-full bg-amber-50 shadow-[0_0_12px_rgba(251,191,36,0.6)] ring-2 ring-amber-100/50" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="half-moon"
                        initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        {/* Half Moon */}
                        <Moon className="h-5 w-5 fill-indigo-600 text-indigo-600 drop-shadow-sm" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    )
}
