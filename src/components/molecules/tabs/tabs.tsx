/**
 * @synetics/ui - Tabs Molecule Component Suite
 * Atomic Design: Molecule Layer
 * FSP Slice: components/molecules/tabs
 * Wraps <syn-tabs>, <syn-tab>, and <syn-tab-panel> into clean Synetics components.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/molecules/tabs';

export interface ITabProps {
  panel: string;
  active?: boolean;
  disabled?: boolean;
  class?: string;
  children?: any;
}

export const Tab: ISyneticsComponent<ITabProps> = function Tab(props: ITabProps) {
  const { panel, active = false, disabled = false, class: className = '', children } = props;

  const el = document.createElement('syn-tab');
  el.setAttribute('panel', panel);
  el.setAttribute('slot', 'nav');
  if (active) el.setAttribute('active', '');
  if (disabled) el.setAttribute('disabled', '');
  if (className) el.className = className;

  if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (children instanceof Node) {
      el.appendChild(children);
    }
  }

  return el;
} as any;

export interface ITabPanelProps {
  name: string;
  active?: boolean;
  class?: string;
  children?: any;
}

export const TabPanel: ISyneticsComponent<ITabPanelProps> = function TabPanel(props: ITabPanelProps) {
  const { name, active = false, class: className = '', children } = props;

  const el = document.createElement('syn-tab-panel');
  el.setAttribute('name', name);
  if (active) el.setAttribute('active', '');
  if (className) el.className = className;

  if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (children instanceof Node) {
      el.appendChild(children);
    }
  }

  return el;
} as any;

export interface ITabsProps {
  value?: string;
  class?: string;
  onTabShow?: (e: CustomEvent<{ panel: string; tab: HTMLElement }>) => void;
  children?: any;
}

export const Tabs: ISyneticsComponent<ITabsProps> = function Tabs(props: ITabsProps) {
  const { value = '', class: className = '', onTabShow, children } = props;

  const el = document.createElement('syn-tabs');
  if (value) el.setAttribute('value', value);
  if (className) el.className = className;

  if (onTabShow) {
    el.addEventListener('syn-tab-show', onTabShow as EventListener);
  }

  if (children) {
    if (Array.isArray(children)) {
      for (const child of children) {
        if (child instanceof Node) el.appendChild(child);
      }
    } else if (children instanceof Node) {
      el.appendChild(children);
    }
  }

  return el;
} as any;
