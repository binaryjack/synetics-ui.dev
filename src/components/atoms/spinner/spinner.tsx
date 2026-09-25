/**
 * @synetics/ui - Spinner Atom Component
 * Atomic Design: Atom Layer
 * FSP Slice: components/atoms/spinner
 * Wraps <syn-spinner> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/atoms/spinner';
import type { SpinnerSize } from '@synetics/elements/atoms/spinner';

export interface ISpinnerProps {
  size?: SpinnerSize;
  color?: string;
  class?: string;
  label?: string;
}

export const Spinner: ISyneticsComponent<ISpinnerProps> = function Spinner(props: ISpinnerProps) {
  const {
    size = 'md',
    color = 'primary',
    class: className = '',
    label = 'Loading',
  } = props;

  const el = document.createElement('syn-spinner');
  el.setAttribute('size', size);
  el.setAttribute('color', color);
  el.setAttribute('aria-label', label);
  if (className) el.className = className;

  return el;
} as any;
