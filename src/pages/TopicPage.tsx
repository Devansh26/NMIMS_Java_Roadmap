import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { getAdjacentTopics, getUnit } from "@/content/units";
import { TopicSidebar } from "@/components/topic/TopicSidebar";
import { ContentBlockView } from "@/components/topic/ContentBlockView";
import { Quiz } from "@/components/topic/Quiz";
import { useProgress } from "@/lib/progress";

export function TopicPage() {
  const { unitId, topicId } = useParams();
  const unit = unitId ? getUnit(unitId) : undefined;
  const topic = unit?.topics.find((t) => t.id === topicId);
  const { prev, next } = unitId && topicId ? getAdjacentTopics(unitId, topicId) : { prev: null, next: null };

  const isComplete = useProgress((s) => (topic ? s.isTopicComplete(topic.id) : false));
  const markComplete = useProgress((s) => s.markTopicComplete);

  if (!unit || !topic) return <Navigate to="/" replace />;

  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:pt-10">
      <div className="flex gap-10">
        <TopicSidebar unit={unit} activeTopicId={topic.id} />

        <div className="min-w-0 flex-1">
          <Link
            to={`/unit/${unit.id}`}
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-mute transition hover:text-ink lg:hidden"
          >
            <ArrowLeft size={15} /> {unit.title}
          </Link>

          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-2xl"
          >
            <div className="mb-5 flex items-center gap-3 text-xs font-medium text-ink-mute">
              <span className="flex items-center gap-1">
                <Clock size={12} /> {topic.minutes} min read
              </span>
              {topic.quiz.length > 0 && (
                <span className="flex items-center gap-1">
                  <HelpCircle size={12} /> {topic.quiz.length} quick check{topic.quiz.length > 1 ? "s" : ""}
                </span>
              )}
              {isComplete && (
                <span className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle2 size={12} /> Completed
                </span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-[2.25rem]">
              {topic.title}
            </h1>
            <p className="mt-2 text-[15.5px] text-ink-dim">{topic.tagline}</p>

            <div className="mt-8">
              {topic.blocks.map((block, i) => (
                <ContentBlockView key={i} block={block} />
              ))}
            </div>

            {topic.quiz.length > 0 && (
              <div className="mt-10">
                <h2 className="mb-1 text-base font-bold text-ink">Quick Checks</h2>
                <p className="mb-4 text-sm text-ink-dim">Test yourself before moving on.</p>
                {topic.quiz.map((q, i) => (
                  <Quiz key={q.id} quiz={q} index={i} />
                ))}
              </div>
            )}

            <div className="mt-10 flex items-center justify-between border-t border-border pt-6">
              {prev ? (
                <Link
                  to={`/unit/${unit.id}/${prev.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-ink-dim transition hover:bg-surface-2"
                >
                  <ArrowLeft size={15} /> {prev.title}
                </Link>
              ) : (
                <span />
              )}

              <button
                onClick={() => markComplete(topic.id)}
                disabled={isComplete}
                className="hidden items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-canvas transition hover:opacity-90 disabled:opacity-40 sm:flex cursor-pointer disabled:cursor-default"
              >
                <CheckCircle2 size={15} /> {isComplete ? "Completed" : "Mark complete"}
              </button>

              {next ? (
                <Link
                  to={`/unit/${unit.id}/${next.id}`}
                  onClick={() => markComplete(topic.id)}
                  className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
                >
                  {next.title} <ArrowRight size={15} />
                </Link>
              ) : (
                <Link
                  to={`/unit/${unit.id}`}
                  onClick={() => markComplete(topic.id)}
                  className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-brand-600"
                >
                  Finish unit <ArrowRight size={15} />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
