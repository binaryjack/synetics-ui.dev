/**
 * @synetics/ui - Button Atom Wrapper
 * Atomic Design: Atom Layer
 * FSP Slice: components/atoms/button
 * Wraps agnostic <syn-button> Web Component into a reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/atoms/button';
import type { ButtonSize, ButtonVariant } from '@synetics/elements/atoms/button';

export interface IButtonProps {
  variant?: ButtonVariant | (() => ButtonVariant);
  size?: ButtonSize | (() => ButtonSize);
  disabled?: boolean | (() => boolean);
  loading?: boolean | (() => boolean);
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  onClick?: (event: MouseEvent) => void;
  children?: any;
}

/**
 * Clean, lightweight Synetics Button atom delegating rendering to <syn-button>
 */
export const Button: ISyneticsComponent<IButtonProps> = function Button(props: IButtonProps) {
  const {
    variant = 'solid',
    size = 'md',
    disabled = false,
    loading = false,
    type = 'button',
    class: className = '',
    onClick,
    children,
  } = props;

  const currentVariant = typeof variant === 'function' ? variant() : variant;
  const currentSize = typeof size === 'function' ? size() : size;
  const isDisabled = typeof disabled === 'function' ? disabled() : disabled;
  const isLoading = typeof loading === 'function' ? loading() : loading;

  const el = document.createElement('syn-button');
  el.setAttribute('variant', currentVariant);
  el.setAttribute('size', currentSize);
  el.setAttribute('type', type);

  if (isDisabled) el.setAttribute('disabled', '');
  if (isLoading) el.setAttribute('loading', '');
  if (className) el.className = className;
  if (onClick) el.addEventListener('click', onClick);

  if (children) {
    if (typeof children === 'string') {
      el.textContent = children;
    } else if (children instanceof Node) {
      el.appendChild(children);
    } else if (Array.isArray(children)) {
      for (const child of children) {
        if (typeof child === 'string') {
          el.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          el.appendChild(child);
        }
      }
    }
  }

  return el;
} as any;
