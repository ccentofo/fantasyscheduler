import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Smartphone } from "lucide-react";
import { getApiBase, setApiBase, DEFAULT_BASE } from "@/lib/api";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved?: () => void;
  forceMobile: boolean;
  onForceMobileChange: (value: boolean) => void;
}

export default function SettingsDialog({
  open,
  onOpenChange,
  onSaved,
  forceMobile,
  onForceMobileChange,
}: SettingsDialogProps) {
  const [url, setUrl] = useState(getApiBase());

  useEffect(() => {
    if (open) setUrl(getApiBase());
  }, [open]);

  const save = () => {
    setApiBase(url);
    onOpenChange(false);
    onSaved?.();
  };
  const reset = () => setUrl(DEFAULT_BASE);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-none border-[#333] bg-carbon text-foreground max-w-lg w-[calc(100%-2rem)]"
        data-testid="settings-panel"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-3xl tracking-wide uppercase">
            Settings
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            API connection and display preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          <div className="space-y-2">
            <Label
              htmlFor="api-base-url"
              className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono"
            >
              API Base URL
            </Label>
            <Input
              id="api-base-url"
              value={url}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              placeholder={DEFAULT_BASE}
              className="rounded-none border-[#333] bg-obsidian mono focus-visible:ring-0 focus-visible:border-giants h-11"
              data-testid="api-base-url-input"
            />
            <p className="text-xs text-muted-foreground mono">
              Default: <span className="text-giants">{DEFAULT_BASE}</span>
            </p>
          </div>

          <div className="brutal-border p-4 bg-obsidian/50 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono">
              Docker quick start
            </p>
            <pre className="text-xs mono text-giants/90 overflow-x-auto whitespace-pre leading-relaxed">
{`docker load -i scheduler.tar
docker run -d -p 8000:8000 --name scheduler scheduler
curl ${DEFAULT_BASE || '<API_BASE_URL>'}/health`}
            </pre>
            <a
              href={`${url}/apidocs`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs text-giants hover:underline mono pt-1"
              data-testid="open-swagger-link"
            >
              Open Swagger UI <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Display preferences */}
          <div className="brutal-border p-4 bg-obsidian/50 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mono">
              Display
            </p>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Label
                  htmlFor="force-mobile-toggle"
                  className="flex items-center gap-2 text-sm text-foreground cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-giants" />
                  View Mobile Layout
                </Label>
                <p className="text-[11px] mono text-muted-foreground mt-1 leading-relaxed">
                  Force the phone-style layout (with bottom nav) on any screen
                  size — handy for previewing without a device.
                </p>
              </div>
              <Switch
                id="force-mobile-toggle"
                checked={!!forceMobile}
                onCheckedChange={onForceMobileChange}
                className="data-[state=checked]:bg-giants mt-1 shrink-0"
                data-testid="force-mobile-toggle"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="ghost"
            onClick={reset}
            className="rounded-none uppercase tracking-wider text-xs"
            data-testid="reset-api-url-btn"
          >
            Reset URL
          </Button>
          <Button
            onClick={save}
            className="rounded-none bg-giants text-white hover:bg-giantsDim uppercase tracking-wider font-bold text-xs"
            data-testid="save-api-url-btn"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
