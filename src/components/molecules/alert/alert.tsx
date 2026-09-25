/**
 * @synetics/ui - Alert Molecule Component
 * Atomic Design: Molecule Layer
 * FSP Slice: components/molecules/alert
 * Wraps <syn-alert> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/molecules/alert';

export interface IAlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  closable?: boolean;
  open?: boolean | (() => boolean);
  class?: string;
  children?: any;
  onClose?: () => void;
}

export const Alert: ISyneticsComponent<IAlertProps> = function Alert(props: IAlertProps) {
  const {
    variant = 'info',
    closable = false,
    open = true,
    class: className = '',
    children,
    onClose,
  } = props;

  const isOpen = typeof open === 'function' ? open() : open;

  const el = document.createElement('syn-alert');
  el.setAttribute('variant', variant);
  if (closable) el.setAttribute('closable', '');
  if (isOpen) el.setAttribute('open', '');
  if (className) el.className = className;

  if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (children instanceof Node) {
      el.appendChild(children);
    }
  }

  if (onClose) {
    el.addEventListener('syn-close', onClose);
  }

  return el;
} as any;
