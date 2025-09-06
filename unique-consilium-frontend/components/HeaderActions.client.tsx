"use client";
import * as React from 'react';
import { HeaderGlobalBar, HeaderGlobalAction, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import { Search, Globe, UserAvatar } from '@carbon/icons-react';

interface Props {
  ThemeSwitcher: React.ComponentType<any>;
  onOpenSearch: () => void;
  localeOpen: boolean;
  setLocaleOpen: (v: boolean) => void;
  accountOpen: boolean;
  setAccountOpen: (v: boolean) => void;
}

// Isolated client-only header actions to prevent SSR/client DOM mismatches (popover/tooltip containers).
export default function HeaderActions({ ThemeSwitcher, onOpenSearch, localeOpen, setLocaleOpen, accountOpen, setAccountOpen }: Props) {
  return (
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Search" onClick={onOpenSearch}>
        <Search />
      </HeaderGlobalAction>
      <ThemeSwitcher />
      <OverflowMenu
        className={`cds--header__action${localeOpen ? ' cds--header__action--active' : ''}`}
        aria-label="Locale"
        renderIcon={Globe}
        size="lg"
        direction="bottom"
        flipped
        open={localeOpen}
        onOpen={() => setLocaleOpen(true)}
        onClose={() => setLocaleOpen(false)}
      >
        <OverflowMenuItem disabled itemText="United States — English (default)" />
        <OverflowMenuItem itemText="Türkiye — English" />
      </OverflowMenu>
      <OverflowMenu
        className={`cds--header__action${accountOpen ? ' cds--header__action--active' : ''}`}
        aria-label="Account"
        renderIcon={UserAvatar}
        size="lg"
        direction="bottom"
        flipped
        open={accountOpen}
        onOpen={() => setAccountOpen(true)}
        onClose={() => setAccountOpen(false)}
      >
        <OverflowMenuItem href="/customer-login" itemText="Customer login" />
        <OverflowMenuItem href="/manufacturer-login" itemText="Manufacturer login" />
        <OverflowMenuItem href="/field-sales-representative-login" itemText="Field sales representative login" />
      </OverflowMenu>
    </HeaderGlobalBar>
  );
}
