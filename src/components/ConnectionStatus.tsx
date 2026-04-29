import { useEffect, useState } from "react";
import { checkHealth, getApiBase } from "@/lib/api";

type ConnectionState = "checking" | "ok" | "fail";

interface ConnectionStatusProps {
  bump: number;
}

interface HealthResponse {
  status?: string;
}

export default function ConnectionStatus({ bump }: ConnectionStatusProps) {
  const [state, setState] = useState<ConnectionState>("checking");
  const [base, setBase] = useState(getApiBase());

  useEffect(() => {
    let cancelled = false;
    async function ping() {
      setState("checking");
      setBase(getApiBase());
      try {
        const data = (await checkHealth()) as HealthResponse;
        if (!cancelled) setState(data?.status === "ok" ? "ok" : "fail");
      } catch {
        if (!cancelled) setState("fail");
      }
    }
    ping();
    const id = setInterval(ping, 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [bump]);

  const color =
    state === "ok" ? "#22c55e" : state === "checking" ? "#a1a1aa" : "#ef4444";
  const label =
    state === "ok"
      ? "CONNECTED"
      : state === "checking"
        ? "PROBING"
        : "OFFLINE";

  return (
    <div
      className="flex items-center gap-3 px-3 py-2 bg-carbon border border-[#2a2a2a]"
      data-testid="api-status-indicator"
    >
      <span
        className="inline-block w-2.5 h-2.5 pulse-dot"
        style={{ background: color }}
      />
      <div className="flex flex-col leading-tight">
        <span
          className="text-[10px] tracking-[0.2em] text-muted-foreground mono"
          style={{ color }}
        >
          {label}
        </span>
        <span
          className="text-[11px] text-muted-foreground mono truncate max-w-[220px]"
          title={base}
          data-testid="api-status-base-url"
        >
          {base.replace(/^https?:\/\//, "")}
        </span>
      </div>
    </div>
  );
}
