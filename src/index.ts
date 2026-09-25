/**
 * @synetics/ui - Component Library
 *
 * Re-exports UI components and design tokens for the Synetics framework.
 */

// Re-export design tokens and agnostic web components
export * from '@synetics/design-tokens';
export * from '@synetics/elements';

// Atomic Design: Atoms Layer
export * from './components/atoms/avatar/index';
export * from './components/atoms/button/index';
export * from './components/atoms/checkbox/index';
export * from './components/atoms/input/index';
export * from './components/atoms/radio/index';
export * from './components/atoms/spinner/index';
export * from './components/atoms/toggle/index';
export * from './components/atoms/typography/index';

// Atomic Design: Molecules Layer
export * from './components/molecules/alert/index';
export * from './components/molecules/badge/index';
export * from './components/molecules/label/index';
export * from './components/molecules/tabs/index';

// Atomic Design: Organisms Layer
export * from './components/organisms/card/index';
export * from './components/organisms/dialog/index';
export * from './components/organisms/table';
export * from './components/organisms/toast';
