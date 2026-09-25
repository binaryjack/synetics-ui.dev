/**
 * @synetics/ui - Card Organism Component
 * Atomic Design: Organism Layer
 * FSP Slice: components/organisms/card
 * Wraps <syn-card> Web Component into a clean, reactive Synetics component.
 */

import type { ISyneticsComponent } from '@synetics/synetics.dev';
import '@synetics/elements/molecules/card';
import type { CardElevation } from '@synetics/elements/molecules/card';

export interface ICardProps {
  header?: any;
  footer?: any;
  elevation?: CardElevation;
  bordered?: boolean;
  class?: string;
  children?: any;
}

export const Card: ISyneticsComponent<ICardProps> = function Card(props: ICardProps) {
  const {
    header,
    footer,
    elevation = 'sm',
    bordered = true,
    class: className = '',
    children,
  } = props;

  const el = document.createElement('syn-card');
  el.setAttribute('elevation', elevation);
  if (bordered) el.setAttribute('bordered', '');
  if (className) el.className = className;

  if (header) {
    const headerWrapper = document.createElement('div');
    headerWrapper.setAttribute('slot', 'header');
    if (typeof header === 'string') {
      headerWrapper.textContent = header;
    } else if (header instanceof Node) {
      headerWrapper.appendChild(header);
    }
    el.appendChild(headerWrapper);
  }

  if (children) {
    if (typeof children === 'string') {
      el.appendChild(document.createTextNode(children));
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

  if (footer) {
    const footerWrapper = document.createElement('div');
    footerWrapper.setAttribute('slot', 'footer');
    if (typeof footer === 'string') {
      footerWrapper.textContent = footer;
    } else if (footer instanceof Node) {
      footerWrapper.appendChild(footer);
    }
    el.appendChild(footerWrapper);
  }

  return el;
} as any;
