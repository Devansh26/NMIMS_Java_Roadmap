import { motion } from "framer-motion";
import { Sparkles, ListChecks, BrainCircuit } from "lucide-react";
import { totalTopicCount, totalQuizCount } from "@/content/units";

export function Hero() {
  return (
    <div className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[110px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-dim shadow-card"
        >
          <Sparkles size={13} className="text-brand-500" />
          702CO0C075 · Object Oriented Programming · AY 2026-27
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl"
        >
          Learn OOP by <span className="text-brand-500">seeing it click</span>,
          not by memorizing slides.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-5 max-w-xl text-[15.5px] leading-relaxed text-ink-dim"
        >
          An interactive companion for lecture hours — real code, real analogies, and a
          quick check after every idea. Work through it at your own pace; your progress
          stays saved on this device.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-ink-mute"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5">
            <ListChecks size={13} className="text-cyan-500" /> {totalTopicCount()} topics live now
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5">
            <BrainCircuit size={13} className="text-violet-500" /> {totalQuizCount()} quick-check quizzes
          </span>
        </motion.div>
      </div>
    </div>
  );
}
