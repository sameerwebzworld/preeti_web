"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number; // ms, 0 = persistent
  progress?: boolean;
}

interface ToastContextValue {
  success: (title: string, message?: string, duration?: number) => void;
  error: (title: string, message?: string, duration?: number) => void;
  warning: (title: string, message?: string, duration?: number) => void;
  info: (title: string, message?: string, duration?: number) => void;
  loading: (title: string, message?: string) => string; // returns id
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

// ─── Config ───────────────────────────────────────────────────────────────────

const CONFIG = {
  success: {
    bg: "#f0fdf4",
    border: "#86efac",
    iconBg: "#22c55e",
    titleColor: "#14532d",
    msgColor: "#166534",
    barColor: "#22c55e",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    bg: "#fef2f2",
    border: "#fca5a5",
    iconBg: "#ef4444",
    titleColor: "#450a0a",
    msgColor: "#7f1d1d",
    barColor: "#ef4444",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  warning: {
    bg: "#fffbeb",
    border: "#fcd34d",
    iconBg: "#f59e0b",
    titleColor: "#451a03",
    msgColor: "#78350f",
    barColor: "#f59e0b",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  info: {
    bg: "#eff6ff",
    border: "#93c5fd",
    iconBg: "#3b82f6",
    titleColor: "#172554",
    msgColor: "#1e3a8a",
    barColor: "#3b82f6",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
  loading: {
    bg: "#f8fafc",
    border: "#cbd5e1",
    iconBg: "#6366f1",
    titleColor: "#0f172a",
    msgColor: "#334155",
    barColor: "#6366f1",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
        <path d="M21 12a9 9 0 11-6.219-8.56" />
      </svg>
    ),
  },
};

// ─── Single Toast Item ────────────────────────────────────────────────────────

const ToastCard = ({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) => {
  const cfg = CONFIG[toast.type];
  const [progress, setProgress] = useState(100);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const duration = toast.duration ?? 4000;

  // entrance animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // progress bar + auto-dismiss
  useEffect(() => {
    if (duration === 0 || toast.type === "loading") return;
    const step = 50;
    const decrement = (step / duration) * 100;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current!);
          handleDismiss();
          return 0;
        }
        return prev - decrement;
      });
    }, step);
    return () => clearInterval(intervalRef.current!);
  }, [duration]);

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), 320);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
        minWidth: "320px",
        maxWidth: "400px",
        width: "100%",
        transform: visible && !leaving ? "translateY(0) scale(1)" : "translateY(110%) scale(0.96)",
        opacity: visible && !leaving ? 1 : 0,
        transition: "transform 0.32s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease",
        position: "relative",
      }}
    >
      {/* Main row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 14px 12px 14px" }}>

        {/* Icon */}
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: cfg.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "1px",
          }}
        >
          {cfg.icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            margin: 0,
            fontSize: "14px",
            fontWeight: 600,
            color: cfg.titleColor,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}>
            {toast.title}
          </p>
          {toast.message && (
            <p style={{
              margin: "3px 0 0",
              fontSize: "13px",
              color: cfg.msgColor,
              lineHeight: 1.5,
              opacity: 0.85,
            }}>
              {toast.message}
            </p>
          )}
        </div>

        {/* Close button */}
        {toast.type !== "loading" && (
          <button
            onClick={handleDismiss}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "6px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: 0.5,
              transition: "opacity 0.15s, background 0.15s",
              padding: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.07)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.5";
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cfg.titleColor} strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Progress bar */}
      {duration > 0 && toast.type !== "loading" && (
        <div style={{ height: "3px", background: "rgba(0,0,0,0.06)", position: "relative" }}>
          <div
            style={{
              height: "100%",
              background: cfg.barColor,
              width: `${progress}%`,
              transition: "width 0.05s linear",
              borderRadius: "0 0 3px 3px",
            }}
          />
        </div>
      )}
    </div>
  );
};

// ─── Provider ─────────────────────────────────────────────────────────────────

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((item: Omit<ToastItem, "id">): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setToasts((prev) => [...prev, { ...item, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => setToasts([]), []);

  const success = useCallback(
    (title: string, message?: string, duration = 4000) =>
      add({ type: "success", title, message, duration }),
    [add]
  );

  const error = useCallback(
    (title: string, message?: string, duration = 5000) =>
      add({ type: "error", title, message, duration }),
    [add]
  );

  const warning = useCallback(
    (title: string, message?: string, duration = 4500) =>
      add({ type: "warning", title, message, duration }),
    [add]
  );

  const info = useCallback(
    (title: string, message?: string, duration = 4000) =>
      add({ type: "info", title, message, duration }),
    [add]
  );

  const loading = useCallback(
    (title: string, message?: string): string =>
      add({ type: "loading", title, message, duration: 0 }),
    [add]
  );

  return (
    <ToastContext.Provider value={{ success, error, warning, info, loading, dismiss, dismissAll }}>
      {children}

      {/* ── Spin keyframe ── */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* ── Toast container — bottom-right ── */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column-reverse",
          gap: "10px",
          alignItems: "flex-end",
          pointerEvents: "none",
        }}
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: "all" }}>
            <ToastCard toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;