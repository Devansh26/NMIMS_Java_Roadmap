import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/pages/HomePage";
import { UnitPage } from "@/pages/UnitPage";
import { TopicPage } from "@/pages/TopicPage";
import { QuestionBankPage } from "@/pages/QuestionBankPage";
import { QuizBankPage } from "@/pages/QuizBankPage";
import { MiniProjectPage } from "@/pages/MiniProjectPage";
import { AssignmentsPage } from "@/pages/AssignmentsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unit/:unitId" element={<UnitPage />} />
        <Route path="/unit/:unitId/:topicId" element={<TopicPage />} />
        <Route path="/question-bank" element={<QuestionBankPage />} />
        <Route path="/quiz-bank" element={<QuizBankPage />} />
        <Route path="/mini-project" element={<MiniProjectPage />} />
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
