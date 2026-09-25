/**
 * @synetics/ui - Input Atom Component
 * Atomic Design: Atom Layer
 * FSP Slice: components/atoms/input
 * Wraps <syn-input> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/atoms/input';
import type { InputSize } from '@synetics/elements/atoms/input';

export interface IInputProps {
  type?: string;
  value?: string | (() => string);
  placeholder?: string;
  size?: InputSize;
  disabled?: boolean | (() => boolean);
  readonly?: boolean;
  invalid?: boolean | (() => boolean);
  class?: string;
  onInput?: (e: Event) => void;
  onChange?: (e: Event) => void;
}

export const Input: ISyneticsComponent<IInputProps> = function Input(props: IInputProps) {
  const {
    type = 'text',
    value = '',
    placeholder = '',
    size = 'md',
    disabled = false,
    readonly = false,
    invalid = false,
    class: className = '',
    onInput,
    onChange,
  } = props;

  const currentVal = typeof value === 'function' ? value() : value;
  const isDisabled = typeof disabled === 'function' ? disabled() : disabled;
  const isInvalid = typeof invalid === 'function' ? invalid() : invalid;

  const el = document.createElement('syn-input');
  el.setAttribute('type', type);
  el.setAttribute('size', size);
  if (placeholder) el.setAttribute('placeholder', placeholder);
  if (currentVal) el.setAttribute('value', currentVal);
  if (isDisabled) el.setAttribute('disabled', '');
  if (readonly) el.setAttribute('readonly', '');
  if (isInvalid) el.setAttribute('invalid', '');
  if (className) el.className = className;

  if (onInput) el.addEventListener('input', onInput);
  if (onChange) el.addEventListener('change', onChange);

  return el;
} as any;
