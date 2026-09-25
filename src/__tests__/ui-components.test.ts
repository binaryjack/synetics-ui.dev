/**
 * @synetics/ui - Automated Component Tests
 * Tests atomic TSX wrappers and their connection to agnostic Web Components.
 */

import { describe, expect, it } from 'vitest';
import { Button } from '../components/atoms/button';
import { Checkbox } from '../components/atoms/checkbox';
import { Alert } from '../components/molecules/alert';
import { Dialog } from '../components/organisms/dialog';
import { Radio } from '../components/atoms/radio';
import { Tabs, Tab, TabPanel } from '../components/molecules/tabs';
import { createSignal } from '@synetics/synetics.dev';

describe('@synetics/ui - Atomic Design TSX Components', () => {
  describe('Button Atom', () => {
    it('creates syn-button element with correct attributes', () => {
      const [variant] = createSignal<'solid' | 'outline'>('outline');

      const btn = Button({
        variant,
        size: 'sm',
        children: 'Submit Form',
      });

      expect(btn.tagName.toLowerCase()).toBe('syn-button');
      expect(btn.getAttribute('variant')).toBe('outline');
      expect(btn.getAttribute('size')).toBe('sm');
      expect(btn.textContent).toBe('Submit Form');
    });
  });

  describe('Checkbox Atom', () => {
    it('creates syn-checkbox with checked and label', () => {
      const cb = Checkbox({
        checked: true,
        label: 'Remember me',
        size: 'lg',
      });

      expect(cb.tagName.toLowerCase()).toBe('syn-checkbox');
      expect(cb.hasAttribute('checked')).toBe(true);
      expect(cb.getAttribute('size')).toBe('lg');
      expect(cb.textContent).toBe('Remember me');
    });
  });

  describe('Radio Atom', () => {
    it('creates syn-radio with name and value', () => {
      const r = Radio({
        name: 'role',
        value: 'admin',
        checked: true,
        label: 'Administrator',
      });

      expect(r.tagName.toLowerCase()).toBe('syn-radio');
      expect(r.getAttribute('name')).toBe('role');
      expect(r.getAttribute('value')).toBe('admin');
      expect(r.hasAttribute('checked')).toBe(true);
      expect(r.textContent).toBe('Administrator');
    });
  });

  describe('Alert Molecule', () => {
    it('creates syn-alert with variant and closable', () => {
      let closed = false;
      const alert = Alert({
        variant: 'danger',
        closable: true,
        children: 'An error occurred',
        onClose: () => {
          closed = true;
        },
      });

      expect(alert.tagName.toLowerCase()).toBe('syn-alert');
      expect(alert.getAttribute('variant')).toBe('danger');
      expect(alert.hasAttribute('closable')).toBe(true);
      expect(alert.textContent).toBe('An error occurred');
    });
  });

  describe('Tabs Molecule', () => {
    it('creates syn-tabs with nav tabs and panels', () => {
      const tabs = Tabs({
        value: 'tab1',
        children: [
          Tab({ panel: 'tab1', children: 'Tab 1' }),
          Tab({ panel: 'tab2', children: 'Tab 2' }),
          TabPanel({ name: 'tab1', children: 'Content 1' }),
          TabPanel({ name: 'tab2', children: 'Content 2' }),
        ],
      });

      expect(tabs.tagName.toLowerCase()).toBe('syn-tabs');
      expect(tabs.getAttribute('value')).toBe('tab1');
      expect(tabs.children.length).toBe(4);
    });
  });

  describe('Dialog Organism', () => {
    it('creates syn-dialog with heading and open state', () => {
      const dialog = Dialog({
        open: true,
        heading: 'Modal Title',
        children: 'Modal Body Content',
      });

      expect(dialog.tagName.toLowerCase()).toBe('syn-dialog');
      expect(dialog.getAttribute('heading')).toBe('Modal Title');
      expect(dialog.hasAttribute('open')).toBe(true);
    });
  });
});
