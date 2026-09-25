# @synetics/ui

<p align="center">
  <strong>Component library for the Synetics framework</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.7.0--alpha-blue" alt="Version 0.7.0-alpha"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0+-blue" alt="TypeScript 5.0+"/>
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License"/>
  <img src="https://img.shields.io/badge/Synetics-0.7.0--alpha-blueviolet" alt="Synetics 0.7.0-alpha"/>
</p>

<p align="center">
  <a href="#about">About</a> •
  <a href="#installation">Installation</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#components">Components</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <strong><a href="https://www.linkedin.com/in/tadeopiana/">follow me</a></strong>
</p>

---

## About

**@synetics/ui** is the official component library for the Synetics framework. It provides production-ready, accessible UI components built with fine-grained reactivity, TailwindCSS styling, and a fluent builder API for configuration.

### Key Features

- 🎨 **Design Tokens**: Uses [@synetics/design-tokens](https://github.com/binaryjack/synetics-design-system) for consistent styling
- 📏 **Size System**: Standardized sizing (xs, sm, md, lg, xl) across all components
- 🎭 **Variant System**: Multiple style variants (solid, outline, ghost, soft)
- 🏗️ **Builder Pattern**: Fluent API for component configuration
- 🎯 **Type-Safe**: Full TypeScript support with strict typing
- ♿ **Accessible**: ARIA attributes and keyboard navigation built-in
- 🚀 **Synetics-Native**: Built specifically for Synetics's reactivity system
- 💅 **TailwindCSS**: Utility-first styling with custom configuration
- 📦 **Modular**: Clean architecture with one item per file

---

## 🎨 Live Showcase

**Explore 80+ Advanced Examples:** [GitHub Pages Showcase](#) _(Coming Soon)_

The showcase demonstrates production-grade patterns from the Synetics ecosystem:

### Featured Patterns

#### 1. **Portal/PortalSlot Architecture**

```typescript
// Modal with content projection - logic stays local, UI projects globally
<Modal id="demo" isOpen={isOpen} onClose={closeModal} />
<Portal id="demo" target="body">
  <input value={localData()} onInput={updateLocalData} />
  {/* Component scope preserved, UI rendered in portal */}
</Portal>
```

**Benefits:**

- UI projected to global DOM (modal, tooltip, dropdown)
- State and logic remain in component scope
- Clean separation of concerns
- No prop drilling

#### 2. **Error Boundaries (Tryer/Catcher)**

```typescript
// Graceful error handling with isolated boundaries
<Tryer>
  <ComponentThatMightFail />
  <Catcher>
    {(error) => <ErrorDisplay error={error} />}
  </Catcher>
</Tryer>
```

**Features:**

- Independent error boundaries
- Prevents app-wide crashes
- Fallback UI for failed sections
- Error propagation control

#### 3. **Signal-Based Reactivity**

```typescript
// Fine-grained updates with automatic dependency tracking
const [count, setCount] = createSignal(0);
const double = createMemo(() => count() * 2);

// Only subscribed DOM nodes update - no virtual DOM diffing
<div>{count()}</div>  {/* Updates when count changes */}
<div>{double()}</div> {/* Updates when count changes */}
```

#### 4. **Resource Caching**

```typescript
// Stale-while-revalidate with automatic cache management
const user = createResource(() => fetchUser(id), {
  staleTime: 5000 // Fresh for 5 seconds
});

// Instant cache hits, background revalidation
<Show when={user.data}>
  {(u) => <Profile user={u} />}
</Show>
```

#### 5. **Dependency Injection**

```typescript
// ServiceManager with lifecycle management
const services = new ServiceManager();

services.register('analytics', () => new Analytics(), {
  lifetime: 'singleton', // Single instance app-wide
});

// Use in components
const analytics = inject('analytics');
analytics.track('event');
```

#### 6. **Control Flow Primitives**

```typescript
// Declarative control flow with proper keying
<Show when={isLoggedIn()}><Dashboard /></Show>
<For each={items()}>{(item) => <Item {...item} />}</For>
<Index each={colors()}>{(color, i) => <Color value={color()} />}</Index>
```

### Showcase Structure

📁 **src/showcase/**

```
├── reactivity/         # Signal, memo, effect demos
├── portal/            # Modal, tooltip portals
├── error-boundary/    # Tryer/Catcher patterns
├── resource/          # Data fetching, caching
├── di/                # Dependency injection
├── control-flow/      # Show, For, Index
└── components/        # Component composition
```

🔗 **View Source:** [packages/synetics-ui.dev/src/showcase](./src/showcase)

### Run Showcase Locally

```bash
pnpm showcase:dev  # Development server
pnpm showcase:build # Build for production
```

---

## Installation

```bash
pnpm add @synetics/ui
```

### Dependencies

The component library requires:

- `pulsar` - The Synetics framework
- `@synetics/design-tokens` - Design system tokens
- `tailwindcss` - Utility-first CSS framework

---

## Quick Start

### Builder Pattern Configuration

All components use a fluent builder pattern for configuration:

```typescript
import { ComponentConfig, Button } from '@synetics/ui';

// Create a configuration
const config = new ComponentConfig('primary') // Start with color
  .variant('solid') // Set variant
  .size('lg') // Set size
  .rounded('md') // Border radius
  .shadow('lg') // Shadow
  .fullWidth() // Full width
  .build(); // Build final config

// Use configuration with component
const myButton = Button({
  config,
  label: 'Click Me',
  onclick: () => console.log('Clicked!'),
});
```

### Simple Usage

```typescript
import { PrimaryButton, Input, Badge } from '@synetics/ui';

// Use factory variants for quick setup
const saveButton = PrimaryButton({
  label: 'Save Changes',
  onclick: () => saveFn(),
});

const emailInput = Input({
  type: 'email',
  placeholder: 'your@email.com',
  required: true,
});

const statusBadge = Badge({
  label: 'Active',
  color: 'success',
});
```

---

## Components

### Atoms

- **Button** - Interactive button with variants, sizes, icons, loading states
- **Input** - Text input with prefix/suffix, error states, validation
- **Checkbox** - Accessible checkbox with indeterminate state
- **Radio** - Radio button for single selections
- **Toggle** - Switch/toggle component for boolean states
- **Textarea** - Multi-line text input
- **Spinner** - Loading spinner with size variants
- **Skeleton** - Skeleton loader for content placeholders
- **Typography** - Heading, paragraph, and text components

### Molecules

- **Badge** - Status and label badges with colors and variants
- **Button Group** - Grouped buttons with shared configuration
- **Label** - Form labels with required indicators
- **Radio Group** - Radio button groups with shared state

### Organisms

- **Card** - Container with header, body, footer sections

### ComponentConfig Builder API

```typescript
new ComponentConfig(color) // 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral'
  .variant(value) // 'solid' | 'outline' | 'ghost' | 'soft'
  .size(value) // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  .rounded(value) // 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  .shadow(value) // 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  .border(boolean) // Enable/disable border
  .disabled(boolean) // Disabled state
  .loading(boolean) // Loading state
  .fullWidth(boolean) // Full width
  .transition(boolean) // Enable transitions
  .transitionDuration(value) // 'fast' | 'normal' | 'slow'
  .hover(boolean) // Enable hover effects
  .focus(boolean) // Enable focus effects
  .active(boolean) // Enable active effects
  .className(string) // Additional CSS classes
  .build(); // Returns IComponentConfig
```

---

## Roadmap

### ✅ v0.1.0 - Foundation (Current)

- ✅ Atoms: Button, Input, Checkbox, Radio, Toggle, Textarea, Spinner, Skeleton, Typography
- ✅ Molecules: Badge, Button Group, Label, Radio Group
- ✅ Organisms: Card
- ✅ Builder pattern API
- ✅ Design token integration
- ✅ TypeScript strict mode
- ✅ TailwindCSS integration

### 🚧 v0.2.0 - Enhanced Components (Q2 2026)

- 🔄 **Select** - Dropdown select with search and multi-select
- 🔄 **Modal** - Dialog and modal components
- 🔄 **Dropdown** - Menu dropdown with keyboard navigation
- 🔄 **Tabs** - Tab navigation component
- 🔄 **Accordion** - Collapsible content panels
- 🔄 **Toast** - Toast notifications system
- 🔄 **Tooltip** - Contextual tooltips
- 🔄 **Popover** - Popover content containers

### 🎯 v0.3.0 - Advanced Components (Q3 2026)

- 📋 **Table** - Data table with sorting, filtering, pagination
- 📊 **Chart** - Basic chart components (bar, line, pie)
- 📅 **Date Picker** - Calendar date selection
- 🎨 **Color Picker** - Color selection component
- 📁 **File Upload** - Drag-and-drop file upload
- 🔍 **Search** - Search input with suggestions
- 🏷️ **Tag Input** - Multi-tag input component
- 📝 **Rich Text Editor** - WYSIWYG editor

### 🌟 v1.0.0 - Production Ready (Q4 2026)

- 🎨 **Theming System** - Custom theme creation and switching
- 📱 **Responsive Utilities** - Mobile-first responsive components
- 🌙 **Dark Mode** - Complete dark mode support
- ♿ **A11y Audit** - Full accessibility compliance
- 📖 **Storybook** - Interactive component documentation
- 🧪 **Test Coverage 90%+** - Comprehensive test suite
- 📦 **Tree Shaking** - Optimized bundle sizes
- 🎭 **Animation Library** - Pre-built animation presets

---

## Ecosystem

Part of the Synetics framework ecosystem:

| Package                   | Description                      | Repository                                                   |
| ------------------------- | -------------------------------- | ------------------------------------------------------------ |
| **synetics.dev**            | Main reactive framework          | [GitHub](https://github.com/binaryjack/synetics.dev)           |
| **@synetics/ui**            | Component library (this package) | [GitHub](https://github.com/binaryjack/synetics-ui.dev)        |
| **@synetics/design-tokens** | Design tokens & brand assets     | [GitHub](https://github.com/binaryjack/synetics-design-system) |
| **@synetics/transformer**   | JSX transformer                  | [GitHub](https://github.com/binaryjack/synetics-transformer)   |
| **@synetics/vite-plugin**   | Vite integration                 | [GitHub](https://github.com/binaryjack/synetics-vite-plugin)   |
| **synetics-demo**           | Example applications             | [GitHub](https://github.com/binaryjack/synetics-demo)          |

---

## Contributing

Contributions welcome! We need help with:

- 🎨 **New Components** - Build additional UI components
- ♿ **Accessibility** - Improve ARIA support and keyboard navigation
- 📖 **Documentation** - Add examples and usage guides
- 🧪 **Tests** - Increase test coverage
- 🐛 **Bug Fixes** - Report and fix issues
- 💡 **Feature Requests** - Suggest new components or improvements

### Development Setup

```bash
# Clone the repository
git clone https://github.com/binaryjack/synetics-ui.dev.git
cd synetics-ui.dev

# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev
```

### Code Guidelines

- ✅ One item per file (interfaces, types, implementations)
- ✅ TypeScript strict mode (no `any` types)
- ✅ Prototype-based classes for components
- ✅ Use `Synetics.HtmlExtends<T>` for HTML props
- ✅ Builder pattern for component configuration
- ✅ Comprehensive JSDoc comments

---

## License

MIT License - Copyright (c) 2026 Synetics framework

See [LICENSE](./LICENSE) for full details.

---

## Acknowledgments

Built with ⚡ by [Tadeo Piana](https://www.linkedin.com/in/tadeopiana/) and contributors.

Design inspiration from:

- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component design
- [Headless UI](https://headlessui.com/) - Unstyled accessible components

---

<p align="center">
  <strong>@synetics/ui - v0.1.0</strong><br/>
  Component library for the Synetics framework
</p>

<p align="center">
  <a href="https://github.com/binaryjack/synetics-ui.dev">GitHub</a> •
  <a href="https://github.com/binaryjack/synetics.dev">Synetics framework</a> •
  <a href="https://www.linkedin.com/in/tadeopiana/">Connect with the Creator</a>
</p>
