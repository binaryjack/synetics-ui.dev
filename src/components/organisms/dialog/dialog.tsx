/**
 * @synetics/ui - Dialog Organism Component
 * Atomic Design: Organism Layer
 * FSP Slice: components/organisms/dialog
 * Wraps <syn-dialog> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/organisms/dialog';

export interface IDialogProps {
  open?: boolean | (() => boolean);
  heading?: string;
  noHeader?: boolean;
  class?: string;
  children?: any;
  footer?: any;
  onShow?: () => void;
  onHide?: () => void;
}

export const Dialog: ISyneticsComponent<IDialogProps> = function Dialog(props: IDialogProps) {
  const {
    open = false,
    heading = '',
    noHeader = false,
    class: className = '',
    children,
    footer,
    onShow,
    onHide,
  } = props;

  const isOpen = typeof open === 'function' ? open() : open;

  const el = document.createElement('syn-dialog');
  if (heading) el.setAttribute('heading', heading);
  if (noHeader) el.setAttribute('no-header', '');
  if (isOpen) el.setAttribute('open', '');
  if (className) el.className = className;

  if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (children instanceof Node) {
      el.appendChild(children);
    }
  }

  if (footer) {
    if (footer instanceof Node) {
      (footer as HTMLElement).setAttribute('slot', 'footer');
      el.appendChild(footer);
    }
  }

  if (onShow) el.addEventListener('syn-after-show', onShow);
  if (onHide) el.addEventListener('syn-after-hide', onHide);

  return el;
} as any;
