/**
 * @synetics/ui - Toggle Atom Component
 * Atomic Design: Atom Layer
 * FSP Slice: components/atoms/toggle
 * Wraps <syn-toggle> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/atoms/toggle';
import type { ToggleSize } from '@synetics/elements/atoms/toggle';

export interface IToggleProps {
  checked?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
  size?: ToggleSize;
  class?: string;
  onChange?: (e: CustomEvent<{ checked: boolean }>) => void;
}

export const Toggle: ISyneticsComponent<IToggleProps> = function Toggle(props: IToggleProps) {
  const {
    checked = false,
    disabled = false,
    size = 'md',
    class: className = '',
    onChange,
  } = props;

  const isChecked = typeof checked === 'function' ? checked() : checked;
  const isDisabled = typeof disabled === 'function' ? disabled() : disabled;

  const el = document.createElement('syn-toggle');
  el.setAttribute('size', size);
  if (isChecked) el.setAttribute('checked', '');
  if (isDisabled) el.setAttribute('disabled', '');
  if (className) el.className = className;

  if (onChange) el.addEventListener('change', onChange as EventListener);

  return el;
} as any;
