# Frontend

A modern React application built with Vite, TypeScript, and HeroUI.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool with HMR
- **Tailwind CSS 4** - Utility-first CSS framework
- **HeroUI** - Component library
- **Framer Motion** - Animation library
- **React Compiler** - Automatic optimizations via Babel plugin
- **Biome** - Linting and formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn

### Installation

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Build

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## Scripts

| Script     | Description                         |
| ---------- | ----------------------------------- |
| `dev`      | Start development server            |
| `build`    | Type check and build for production |
| `preview`  | Preview production build            |
| `lint`     | Run Biome linter                    |
| `lint:fix` | Fix linting issues automatically    |
| `prepare`  | Setup Husky git hooks               |

## Code Quality

This project uses **Biome** for linting and formatting instead of ESLint/Prettier.

### Biome Configuration

- Indent style: Tabs
- Quote style: Double quotes
- Auto-organize imports
- Auto-sort attributes
- Accessibility rules set to warn

### Pre-commit Hooks

Husky and lint-staged are configured to automatically lint and format staged files before each commit.
