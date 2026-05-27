import { useState, useEffect, useCallback } from "react";
import "@/index.css";
import Scheduler from "@/components/Scheduler";
import ErrorBoundary from "@/components/ErrorBoundary";
import AboutPage from "@/components/pages/AboutPage";
import FaqPage from "@/components/pages/FaqPage";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";

function App(): React.ReactElement {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <ErrorBoundary>
      {path === "/about" ? (
        <AboutPage navigate={navigate} />
      ) : path === "/faq" ? (
        <FaqPage navigate={navigate} />
      ) : path === "/privacy-policy" ? (
        <PrivacyPolicyPage navigate={navigate} />
      ) : (
        <Scheduler navigate={navigate} />
      )}
    </ErrorBoundary>
  );
}

export default App;
