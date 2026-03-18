# Rajarshi Saha | Machine Learning Engineer Portfolio OS

An interactive Windows-inspired portfolio website for Rajarshi Saha, featuring a custom desktop experience with applications like Terminal, Notepad, and File Explorer.

## Features

- **Interactive Desktop Interface**: Windows-style desktop with icons, taskbar, and start menu.
- **Multitasking Support**: Open and switch between multiple windows.
- **Terminal App**: Command-line interface for exploring the portfolio.
- **File Explorer**: Browse projects, skills, and education in a folder-based structure.
- **Notepad App**: View personal bio and technical toolkit in a simple editor.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or bun

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```sh
   cd interactive-portfolio-os
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Development

The project structure is as follows:

- `src/components/apps`: Individual applications (Terminal, Notepad, File Explorer).
- `src/components/os`: OS-level components (Taskbar, StartMenu, Window management).
- `src/contexts`: Global state management for windowing and themes.
- `src/lib`: Utility functions and application definitions.

## Deployment

The project can be deployed to any static site hosting provider like Vercel, Netlify, or GitHub Pages.

```sh
npm run build
```

The build artifacts will be in the `dist/` directory.
