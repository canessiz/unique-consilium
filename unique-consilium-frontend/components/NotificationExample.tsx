'use client';

import * as React from 'react';
import {
  InlineNotification,
  ToastNotification,
  ActionableNotification,
  Tile,
  Button,
  Toggle,
} from '@carbon/react';

export type ExampleKind = 'success' | 'info' | 'warning' | 'error';
export type ExampleMode = 'inline' | 'toast' | 'actionable';

export type ExampleConfig = {
  id: string;
  title: string;
  subtitle?: string;
  kind: ExampleKind;
  mode?: ExampleMode; // default inline
  lowContrast?: boolean;
  actionLabel?: string; // actionable
  onAction?: () => void;
  timeoutMs?: number; // toast auto-dismiss
  defaultOpen?: boolean; // default true
};

export type NotificationExampleProps = {
  forceVisible?: boolean;
  className?: string;
  floating?: boolean;
  examples?: ExampleConfig[];
  onCloseExample?: (id: string) => void;
};

interface RuntimeExample extends ExampleConfig {
  open: boolean; // render when true
  remaining?: number; // toast remaining ms
  timerId?: number; // internal timeout id
}

const DEFAULT_EXAMPLES: ExampleConfig[] = [
  {
    id: 'success-inline',
    title: 'Saved successfully',
    subtitle: 'Your changes were stored.',
    kind: 'success',
    mode: 'inline',
    lowContrast: true,
    defaultOpen: true,
  },
  {
    id: 'info-actionable',
    title: 'New policy available',
    subtitle: 'Review the updated terms.',
    kind: 'info',
    mode: 'actionable',
    actionLabel: 'Learn more',
    onAction: () => {
      // Placeholder action
      // eslint-disable-next-line no-console
      console.log('[NotificationExample] Learn more clicked');
    },
    defaultOpen: true,
  },
  {
    id: 'warn-inline',
    title: 'Incomplete fields',
    subtitle: 'Please fill required inputs.',
    kind: 'warning',
    mode: 'inline',
    defaultOpen: true,
  },
  {
    id: 'error-toast',
    title: 'Request failed',
    subtitle: 'Try again later.',
    kind: 'error',
    mode: 'toast',
    timeoutMs: 6000,
    defaultOpen: true,
  },
];

const liveMode = (kind: ExampleKind): { role: 'status' | 'alert'; ariaLive: 'polite' | 'assertive' } => {
  if (kind === 'warning' || kind === 'error') return { role: 'alert', ariaLive: 'assertive' };
  return { role: 'status', ariaLive: 'polite' };
};

export default function NotificationExample({
  forceVisible,
  className,
  floating,
  examples = DEFAULT_EXAMPLES,
  onCloseExample,
}: NotificationExampleProps) {
  const isDev = process.env.NODE_ENV !== 'production';
  const visible = isDev || forceVisible;
  const baseRef = React.useRef<ExampleConfig[]>(examples);

  const toRuntime = React.useCallback(
    (cfg: ExampleConfig): RuntimeExample => ({
      ...cfg,
      open: cfg.defaultOpen !== false,
      remaining: cfg.timeoutMs,
    }),
    []
  );

  const [items, setItems] = React.useState<RuntimeExample[]>(() => baseRef.current.map(toRuntime));
  const [lowContrastAll, setLowContrastAll] = React.useState(false);

  // Reset if examples prop identity changes
  React.useEffect(() => {
    baseRef.current = examples;
    setItems(examples.map(toRuntime));
  }, [examples, toRuntime]);

  const updateItem = (id: string, patch: Partial<RuntimeExample>) => {
    setItems(prev => prev.map(it => (it.id === id ? { ...it, ...patch } : it)));
  };

  const closeItem = (id: string) => {
    updateItem(id, { open: false });
    onCloseExample?.(id);
  };

  // Toast auto-dismiss management
  React.useEffect(() => {
    items.forEach(it => {
      if (it.mode === 'toast' && it.open && it.timeoutMs && it.timeoutMs > 0 && it.remaining && it.remaining > 0 && it.timerId == null) {
        const started = performance.now();
        const timer = window.setTimeout(() => {
          closeItem(it.id);
        }, it.remaining);
        updateItem(it.id, { timerId: timer });
        // store start time on element (closure)
        (window as any)[`__notifyex_start_${it.id}`] = started;
      }
      if ((!it.open || !it.timeoutMs || it.remaining === 0) && it.timerId) {
        clearTimeout(it.timerId);
        updateItem(it.id, { timerId: undefined });
      }
    });
    // cleanup on unmount
    return () => {
      items.forEach(it => { if (it.timerId) clearTimeout(it.timerId); });
    };
    // items intentionally in deps
  }, [items]);

  const pauseToast = (it: RuntimeExample) => {
    if (it.mode !== 'toast' || !it.open || !it.timerId) return;
    const start = (window as any)[`__notifyex_start_${it.id}`];
    clearTimeout(it.timerId);
    const elapsed = performance.now() - start;
    const remaining = Math.max(0, (it.remaining ?? 0) - elapsed);
    updateItem(it.id, { timerId: undefined, remaining });
  };

  const resumeToast = (it: RuntimeExample) => {
    if (it.mode !== 'toast' || !it.open || it.timerId || (it.remaining ?? 0) <= 0) return;
    const started = performance.now();
    const timer = window.setTimeout(() => closeItem(it.id), it.remaining);
    updateItem(it.id, { timerId: timer });
    (window as any)[`__notifyex_start_${it.id}`] = started;
  };

  if (!visible) return null;

  const anyClosed = items.some(i => !i.open);
  const allOpen = items.every(i => i.open);

  const openAll = () => setItems(baseRef.current.map(cfg => ({ ...toRuntime(cfg), open: true })));
  const closeAll = () => setItems(prev => prev.map(it => ({ ...it, open: false })));
  const resetAll = () => setItems(baseRef.current.map(toRuntime));

  const containerStyle: React.CSSProperties | undefined = floating ? {
    position: 'fixed',
    insetBlockEnd: '1rem',
    insetInlineEnd: '1rem',
    zIndex: 6000,
    maxWidth: '480px',
    width: 'min(480px, 100vw)',
  } : undefined;

  return (
    <div
      role="region"
      aria-label="Notification examples"
      className={className}
      style={containerStyle}
      data-testid="notifyex-root"
    >
      <Tile style={{ padding: '0.75rem 0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <strong style={{ fontSize: '0.875rem' }}>Notification Examples</strong>
          <Button kind="ghost" size="sm" onClick={resetAll} data-testid="notifyex-reset">Reset all</Button>
          {allOpen ? (
            <Button kind="ghost" size="sm" onClick={closeAll} data-testid="notifyex-closeall">Close all</Button>
          ) : (
            <Button kind="ghost" size="sm" onClick={openAll} data-testid="notifyex-openall">Open all</Button>
          )}
          <Toggle
            id="notifyex-lowcontrast"
            labelText="Low contrast (inline/actionable)"
            size="sm"
            aria-label="Low contrast override"
            data-testid="notifyex-lowcontrast"
            toggled={lowContrastAll}
            onToggle={() => setLowContrastAll(v => !v)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.filter(i => i.open).map(it => {
            const { role, ariaLive } = liveMode(it.kind);
            const commonProps = {
              key: it.id,
              kind: it.kind,
              title: it.title,
              subtitle: it.subtitle,
              lowContrast: it.mode !== 'toast' ? (lowContrastAll ? true : it.lowContrast) : undefined,
              onClose: () => closeItem(it.id),
              onMouseEnter: () => pauseToast(it),
              onMouseLeave: () => resumeToast(it),
              onFocus: () => pauseToast(it),
              onBlur: () => resumeToast(it),
              'data-testid': `notifyex-item-${it.id}`,
            } as const;

            return (
              <div role={role} aria-live={ariaLive} key={it.id} style={{ outline: 'none' }}>
                {it.mode === 'toast' && (
                  <ToastNotification
                    {...commonProps}
                    timeout={0} // we manage manually
                  />
                )}
                {it.mode === 'actionable' && (
                  <ActionableNotification
                    {...commonProps}
                    actionButtonLabel={it.actionLabel}
                    onActionButtonClick={it.onAction}
                    inline // ensure inline layout inside our stack
                  />
                )}
                {(!it.mode || it.mode === 'inline') && (
                  <InlineNotification
                    {...commonProps}
                  />
                )}
              </div>
            );
          })}
          {items.filter(i => i.open).length === 0 && (
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>No open notifications.</div>
          )}
        </div>
        <div role="status" aria-live="polite" style={{ fontSize: '0.625rem', opacity: 0.75 }}>
          {anyClosed ? 'Some notifications closed.' : 'All notifications open.'}
        </div>
      </Tile>
    </div>
  );
}
