/**
 * @synetics/ui - Radio Atom Component
 * Atomic Design: Atom Layer
 * FSP Slice: components/atoms/radio
 * Wraps <syn-radio> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/atoms/radio';

export interface IRadioProps {
  checked?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
  size?: 'sm' | 'md' | 'lg' | (() => 'sm' | 'md' | 'lg');
  name?: string;
  value?: string;
  label?: string;
  class?: string;
  onChange?: (e: CustomEvent<{ checked: boolean; value: string }>) => void;
  children?: any;
}

export const Radio: ISyneticsComponent<IRadioProps> = function Radio(props: IRadioProps) {
  const {
    checked = false,
    disabled = false,
    size = 'md',
    name = '',
    value = '',
    label = '',
    class: className = '',
    onChange,
    children,
  } = props;

  const isChecked = typeof checked === 'function' ? checked() : checked;
  const isDisabled = typeof disabled === 'function' ? disabled() : disabled;
  const currentSize = typeof size === 'function' ? size() : size;

  const el = document.createElement('syn-radio');
  if (isChecked) el.setAttribute('checked', '');
  if (isDisabled) el.setAttribute('disabled', '');
  if (currentSize) el.setAttribute('size', currentSize);
  if (name) el.setAttribute('name', name);
  if (value) el.setAttribute('value', value);
  if (className) el.className = className;

  if (onChange) {
    el.addEventListener('syn-change', onChange as EventListener);
  }

  const content = children || label;
  if (content) {
    if (typeof content === 'string') {
      el.textContent = content;
    } else if (content instanceof Node) {
      el.appendChild(content);
    }
  }

  return el;
} as any;
