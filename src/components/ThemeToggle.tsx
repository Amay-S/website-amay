"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";
import { cx } from "./ui";

type Theme = "light" | "dark";

/** The source of truth is <html data-theme>, set before paint by the boot script. */
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function apply(t: Theme) {
  document.documentElement.dataset.theme = t;
}

export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => null);
  const isDark = theme === "dark";

  // Follow the OS setting live until the visitor picks one explicitly.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!localStorage.getItem("theme")) apply(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => {
        const t: Theme = isDark ? "light" : "dark";
        apply(t);
        localStorage.setItem("theme", t);
      }}
      aria-label={label}
      title={label}
      className={cx(
        "grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface text-fg-muted transition-colors hover:border-border-strong hover:text-fg",
        className,
      )}
    >
      {/* Both icons render; CSS picks one, so there's no hydration flash. */}
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden />
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
    </button>
  );
}
