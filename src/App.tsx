import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { HomePage } from "@/pages/HomePage";
import { UnitPage } from "@/pages/UnitPage";
import { TopicPage } from "@/pages/TopicPage";
import { QuestionBankPage } from "@/pages/QuestionBankPage";
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
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
