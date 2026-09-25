/**
 * @synetics/ui - Badge Molecule Component
 * Atomic Design: Molecule Layer
 * FSP Slice: components/molecules/badge
 * Wraps <syn-badge> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/atoms/badge';
import type { BadgeColor, BadgeSize, BadgeVariant } from '@synetics/elements/atoms/badge';

export interface IBadgeProps {
  color?: BadgeColor;
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  class?: string;
  label?: string;
  children?: any;
}

export const Badge: ISyneticsComponent<IBadgeProps> = function Badge(props: IBadgeProps) {
  const {
    color = 'primary',
    variant = 'solid',
    size = 'md',
    pill = false,
    class: className = '',
    label,
    children,
  } = props;

  const el = document.createElement('syn-badge');
  el.setAttribute('color', color);
  el.setAttribute('variant', variant);
  el.setAttribute('size', size);
  if (pill) el.setAttribute('pill', '');
  if (className) el.className = className;

  const content = children !== undefined ? children : label;

  if (content) {
    if (typeof content === 'string') {
      el.textContent = content;
    } else if (content instanceof Node) {
      el.appendChild(content);
    } else if (Array.isArray(content)) {
      for (const item of content) {
        if (typeof item === 'string') {
          el.appendChild(document.createTextNode(item));
        } else if (item instanceof Node) {
          el.appendChild(item);
        }
      }
    }
  }

  return el;
} as any;
