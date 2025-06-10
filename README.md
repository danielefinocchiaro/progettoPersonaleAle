# Spotify Clone App

A React-based Spotify clone built with Vite, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on both desktop and mobile
- Music streaming functionality with play/pause controls
- Interactive user interface similar to Spotify
- Dynamic greeting based on time of day
- Customizable song sections

## Code Structure Optimizations

### Component Generalization

We've implemented a component-based architecture with reusable components:

- `Section`: A generic section component that can be customized for different content types
- `Card`: A unified card component with optional audio playback functionality
- Responsive layouts using Tailwind classes

### Performance Improvements

- Time-based rendering with React hooks
- Optimized component rendering
- Proper TypeScript typing for better development experience

## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [tRPC](https://trpc.io/) for API communication

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```
