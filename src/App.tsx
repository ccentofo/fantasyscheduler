import "@/index.css";
import Scheduler from "@/components/Scheduler";
import ErrorBoundary from "@/components/ErrorBoundary";

function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <Scheduler />
    </ErrorBoundary>
  );
}

export default App;
