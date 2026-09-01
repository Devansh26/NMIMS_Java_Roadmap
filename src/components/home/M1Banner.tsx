import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, NotebookPen } from "lucide-react";

export function M1Banner() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/question-bank"
          className="group flex items-center gap-4 rounded-2xl border border-brand-500/30 bg-gradient-to-r from-brand-500/10 via-brand-500/5 to-transparent p-4 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover sm:p-5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
            <NotebookPen size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-ink">M1 Question Bank is live</p>
            <p className="text-[13px] text-ink-dim">
              Practice questions for this week's 10-mark test — Theory and Lab kept separate.
            </p>
          </div>
          <ArrowRight size={17} className="shrink-0 text-brand-500 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
