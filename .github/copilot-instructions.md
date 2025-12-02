# Copilot Instructions

## Project Overview

This is the frontend application, built with React 19, TypeScript, and Vite.

## Tech Stack

- **React 19** with React Compiler enabled
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **HeroUI** as the component library
- **Framer Motion** for animations

## Code Style Guidelines

### File Naming

- Use **kebab-case** for file names

### Formatting

- Use **tabs** for indentation
- Use **double quotes** for strings

### Import Statements

- For internal modules, use path aliases (e.g., `@/` for `src/`)

### Component Patterns

- Use functional components with hooks
- Prefer Tailwind CSS utility classes for styling

### File Structure

```
src/
  assets/       # Static assets
  App.tsx       # Main app component
  main.tsx      # Entry point
  providers.tsx # Context providers
  index.css     # Global styles with Tailwind
```

### Commit Message Conventions

```
<type>(<scope:optional>): <subject>
<body:optional>
<footer:optional>
```

## Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn lint` - Run Biome linter
- `yarn lint:fix` - Auto-fix lint issues

## Important Notes

- This project uses **Biome** instead of ESLint/Prettier
- Use HeroUI components when possible for consistent UI
