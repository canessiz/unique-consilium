'use client';

import * as React from 'react';
import { Tile, Tag, Toggle, Button, InlineNotification } from '@carbon/react';
import { usePathname } from 'next/navigation';

export type NavPanelKey = 'principles' | 'services' | null;

export type NavDebugState = {
  route: string;
  openPanel: NavPanelKey;
  overlayVisible: boolean;
  headerBottomVar: string;
  searchOpen: boolean;
  accountOpen: boolean;
  localeOpen: boolean;
  lastInteraction?: string;
  timestamp: number;
};

export type NavDebugProps = {
  forceVisible?: boolean;
  className?: string;
  floating?: boolean;
  watchDom?: boolean; // default true
  useEventBus?: boolean;
  onStateChange?: (s: NavDebugState) => void;
};

const initialState = (route: string): NavDebugState => ({
  route,
  openPanel: null,
  overlayVisible: false,
  headerBottomVar: '',
  searchOpen: false,
  accountOpen: false,
  localeOpen: false,
  lastInteraction: undefined,
  timestamp: Date.now(),
});

function readDom(): Partial<NavDebugState> {
  const principles = document.getElementById('uc-mega-principles');
  const services = document.getElementById('uc-mega-services');
  const overlay = document.querySelector('.uc-nav-overlay') as HTMLElement | null;
  const searchModal = document.querySelector('[aria-label="Search dialog"]');
  const accountBtn = document.querySelector('.cds--header__action[aria-label="Account"]') as HTMLElement | null;
  const localeBtn = document.querySelector('.cds--header__action[aria-label="Locale"]') as HTMLElement | null;
  const headerBottomVar = getComputedStyle(document.documentElement).getPropertyValue('--uc-header-bottom').trim();

  let openPanel: NavPanelKey = null;
  if (principles && !principles.hasAttribute('hidden')) openPanel = 'principles';
  if (services && !services.hasAttribute('hidden')) openPanel = 'services';

  return {
    openPanel,
    overlayVisible: !!overlay && (overlay.offsetParent !== null || getComputedStyle(overlay).display !== 'none'),
    headerBottomVar,
    searchOpen: !!searchModal,
    accountOpen: !!accountBtn && accountBtn.classList.contains('cds--header__action--active'),
    localeOpen: !!localeBtn && localeBtn.classList.contains('cds--header__action--active'),
  };
}

const POLL_INTERVAL = 600; // ms (lightweight)

const NavDebug: React.FC<NavDebugProps> = ({
  forceVisible,
  className,
  floating,
  watchDom = true,
  useEventBus = false,
  onStateChange,
}) => {
  const route = usePathname();
  const isDev = process.env.NODE_ENV !== 'production';
  const visible = isDev || forceVisible;
  const [state, setState] = React.useState<NavDebugState>(() => initialState(route));
  const stateRef = React.useRef(state);
  stateRef.current = state;

  // Merge helper
  const update = React.useCallback((patch: Partial<NavDebugState>) => {
    setState(prev => {
      const next = { ...prev, ...patch, timestamp: Date.now() };
      return next;
    });
  }, []);

  // Publish to callback
  React.useEffect(() => { if (onStateChange) onStateChange(state); }, [state, onStateChange]);

  // Route change resets certain transient values
  React.useEffect(() => {
    update({ route });
  }, [route, update]);

  // DOM polling
  React.useEffect(() => {
    if (!visible || !watchDom) return; // skip
    let mounted = true;
    let raf: number | undefined;
    const poll = () => {
      const domData = readDom();
      update(domData);
      if (mounted) {
        raf = window.setTimeout(poll, POLL_INTERVAL) as unknown as number;
      }
    };
    poll();
    return () => { mounted = false; if (raf) clearTimeout(raf); };
  }, [visible, watchDom, update]);

  // Event bus listener
  React.useEffect(() => {
    if (!visible || !useEventBus) return;
    const handler = (e: Event) => {
      const ce = e as CustomEvent<Partial<NavDebugState>>;
      update({ ...ce.detail });
    };
    window.addEventListener('uc:nav', handler as EventListener);
    return () => window.removeEventListener('uc:nav', handler as EventListener);
  }, [visible, useEventBus, update]);

  if (!visible) return null;

  // Actions
  const clickById = (id: string) => {
    const el = document.getElementById(id) as HTMLElement | null;
    el?.click();
  };
  const simulateEsc = () => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  const simulateOutside = () => document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
  const closeAll = () => {
    const overlay = document.querySelector('.uc-nav-overlay') as HTMLElement | null;
    if (overlay) overlay.click(); else simulateEsc();
  };
  const logState = () => console.table(stateRef.current);
  const copyState = () => {
    try {
      navigator.clipboard.writeText(JSON.stringify(stateRef.current, null, 2));
    } catch (e) {
      // noop
    }
  };

  const panelTagKind = (k: NavPanelKey): 'red' | 'green' | 'gray' => {
    if (k === 'principles' || k === 'services') return 'green';
    return 'gray';
  };

  const containerStyle: React.CSSProperties | undefined = floating ? {
    position: 'fixed',
    insetBlockEnd: '1rem',
    insetInlineEnd: '1rem',
    zIndex: 6000,
    width: '320px',
    maxWidth: '90vw',
  } : undefined;

  const body = (
    <Tile
      className={floating ? 'navdebug-tile navdebug-floating' : 'navdebug-tile'}
      data-testid="navdebug-tile"
    >
      <div className="navdebug-header" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBlockEnd: '0.5rem' }}>
        <strong>Nav Debug</strong>
        <Tag size="sm" type={isDev ? 'purple' : 'cool-gray'} data-testid="navdebug-env-tag">{isDev ? 'DEV' : 'PROD'}</Tag>
  <Tag size="sm" type={panelTagKind(state.openPanel)} data-testid="navdebug-openpanel-tag">{state.openPanel ?? 'none'}</Tag>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBlockEnd: '0.5rem' }}>
        <Toggle id="navdebug-watchdom" size="sm" labelText="Watch DOM" aria-label="Watch DOM" data-testid="navdebug-toggle-watchdom"
          toggled={watchDom} onToggle={() => update({ lastInteraction: 'toggle-watchDom' })} disabled />
        <Toggle id="navdebug-eventbus" size="sm" labelText="Event bus" aria-label="Event bus" data-testid="navdebug-toggle-eventbus"
          toggled={useEventBus} onToggle={() => update({ lastInteraction: 'toggle-eventBus' })} disabled />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBlockEnd: '0.75rem' }}>
        <Button kind="secondary" size="sm" onClick={() => { clickById('nav-trigger-principles'); update({ lastInteraction: 'toggle-principles' }); }} data-testid="navdebug-action-toggle-principles">Toggle Principles</Button>
        <Button kind="secondary" size="sm" onClick={() => { clickById('nav-trigger-services'); update({ lastInteraction: 'toggle-services' }); }} data-testid="navdebug-action-toggle-services">Toggle Services</Button>
        <Button kind="ghost" size="sm" onClick={() => { simulateEsc(); update({ lastInteraction: 'esc' }); }} data-testid="navdebug-actions-esc">Esc</Button>
        <Button kind="ghost" size="sm" onClick={() => { simulateOutside(); update({ lastInteraction: 'click-outside' }); }} data-testid="navdebug-actions-outside">Outside</Button>
        <Button kind="ghost" size="sm" onClick={() => { closeAll(); update({ lastInteraction: 'close-all' }); }} data-testid="navdebug-actions-closeall">Close All</Button>
      </div>
      <dl style={{ fontSize: '0.75rem', lineHeight: 1.4, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.25rem 0.5rem', margin: 0 }}>
        <dt>route</dt><dd data-testid="navdebug-route">{state.route}</dd>
        <dt>overlay</dt><dd data-testid="navdebug-overlay">{String(state.overlayVisible)}</dd>
        <dt>headerVar</dt><dd data-testid="navdebug-headervar">{state.headerBottomVar}</dd>
        <dt>localeOpen</dt><dd data-testid="navdebug-locale">{String(state.localeOpen)}</dd>
        <dt>accountOpen</dt><dd data-testid="navdebug-account">{String(state.accountOpen)}</dd>
        <dt>searchOpen</dt><dd data-testid="navdebug-search">{String(state.searchOpen)}</dd>
      </dl>
      <div role="status" aria-live="polite" data-testid="navdebug-status" style={{ marginTop: '0.5rem', fontSize: '0.625rem' }}>
        {state.lastInteraction ? `${state.lastInteraction} @ ${new Date(state.timestamp).toLocaleTimeString()}` : 'Idle'}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
        <Button kind="tertiary" size="sm" onClick={logState} data-testid="navdebug-actions-log">Log state</Button>
        <Button kind="tertiary" size="sm" onClick={copyState} data-testid="navdebug-actions-copy">Copy JSON</Button>
      </div>
      {/* Optional notification if not watching DOM/event bus */}
      {(!watchDom || !useEventBus) && (
        <InlineNotification
          lowContrast
          hideCloseButton
          kind="info"
          title="Passive"
          subtitle={!watchDom ? 'DOM watch disabled.' : 'Event bus off.'}
        />
      )}
    </Tile>
  );

  return (
    <div
      role="region"
      aria-label="Navigation debug"
      data-testid="navdebug-root"
      className={className}
      style={containerStyle}
    >
      {body}
    </div>
  );
};

export default NavDebug;
