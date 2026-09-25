/**
 * @synetics/ui - Checkbox Atom Component
 * Atomic Design: Atom Layer
 * FSP Slice: components/atoms/checkbox
 * Wraps <syn-checkbox> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/atoms/checkbox';

export interface ICheckboxProps {
  checked?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
  indeterminate?: boolean | (() => boolean);
  size?: 'sm' | 'md' | 'lg';
  name?: string;
  value?: string;
  class?: string;
  label?: string;
  children?: any;
  onChange?: (e: CustomEvent<{ checked: boolean }>) => void;
}

export const Checkbox: ISyneticsComponent<ICheckboxProps> = function Checkbox(props: ICheckboxProps) {
  const {
    checked = false,
    disabled = false,
    indeterminate = false,
    size = 'md',
    name = '',
    value = 'on',
    class: className = '',
    label,
    children,
    onChange,
  } = props;

  const isChecked = typeof checked === 'function' ? checked() : checked;
  const isDisabled = typeof disabled === 'function' ? disabled() : disabled;
  const isIndeterminate = typeof indeterminate === 'function' ? indeterminate() : indeterminate;

  const el = document.createElement('syn-checkbox');
  el.setAttribute('size', size);
  if (name) el.setAttribute('name', name);
  if (value) el.setAttribute('value', value);
  if (isChecked) el.setAttribute('checked', '');
  if (isDisabled) el.setAttribute('disabled', '');
  if (isIndeterminate) el.setAttribute('indeterminate', '');
  if (className) el.className = className;

  if (label) {
    el.textContent = label;
  } else if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (children instanceof Node) {
      el.appendChild(children);
    }
  }

  if (onChange) {
    el.addEventListener('syn-change', onChange as EventListener);
  }

  return el;
} as any;
