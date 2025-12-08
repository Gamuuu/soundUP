# SoundUP - E-commerce Platform

> Premium E-commerce website built with Next.js 16, React 19, and Tailwind CSS.

---

## 📁 Project Structure

```
sounduUP/
├── docs/                         # Documentation
│   └── project_overview.txt
│
├── src/
│   ├── app/                      # Next.js App Router (Pages & API)
│   │   ├── about-us/             # About Us page
│   │   ├── contact/              # Contact page
│   │   ├── experiences/          # Experiences page
│   │   ├── products/             # Products page
│   │   ├── promotion/            # Promotion page
│   │   │
│   │   ├── globals.css           # Global styles
│   │   ├── layout.js             # Root layout
│   │   └── page.js               # Home page
│   │
│   ├── assets/                   # Static assets (images, fonts, etc.)
│   │
│   ├── components/               # React Components (.jsx)
│   │   ├── home/                 # Home page specific sections
│   │   │   ├── Categories.jsx    # Product categories section
│   │   │   ├── Gallery.jsx       # Image gallery section
│   │   │   ├── Hero.jsx          # Hero/Landing section with animations
│   │   │   ├── Popular.jsx       # Popular products section
│   │   │   └── Promotion.jsx     # Promotional banners section
│   │   ├── layout/               # Global layout components (Navbar, Footer)
│   │   └── ui/                   # Reusable UI primitives
│   │       ├── NeonCube.jsx      # Interactive 3D Cube component
│   │       ├── ScrollNavigation.jsx # Side dot navigation
│   │       └── SectionHeading.jsx   # Standardized section titles
│   │
│   ├── hooks/                    # Custom React Hooks (Currently empty)
│   ├── services/                 # API Service functions (Currently empty)
│   ├── lib/                      # Database & External configs (Currently empty)
│   └── utils/                    # Helper/Utility functions (Currently empty)
│
├── public/                       # Public static files
├── tailwind.config.js            # Tailwind configuration
└── package.json                  # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sounduUP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds the application for production optimization. |
| `npm start` | Starts the production server (requires `npm run build` first). |
| `npm run lint` | Runs ESLint to check for code quality issues. |

---

## 🏗️ Architecture & Features

### Core Stack
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS 3
- **Animation:** Framer Motion (used for text transitions, scroll effects)
- **Icons:** Lucide React

### Key Features
- **Modern UI/UX:** Clean, dark-themed interface with neon accents.
- **Interactive 3D Elements:** Custom `NeonCube` component with mouse tracking and idle animations.
- **Scroll Snap Navigation:** Smooth scrolling sections with side navigation dots.
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile views.
- **Dynamic Animations:** Rotating text, marquee scrolling, and hover effects.

---

## 📏 Coding Conventions

### File Naming
- **Pages:** `page.js`, `layout.js` (Next.js conventions)
- **Components:** PascalCase with `.jsx` extension (e.g., `Hero.jsx`, `NeonCube.jsx`)
- **Utilities/Hooks:** camelCase with `.js` extension

### Directory Structure
- **Global UI:** `src/components/ui/` (Buttons, Headings, Primitives)
- **Feature Specific:** `src/components/[feature-name]/` (e.g., `src/components/home/`)
- **Layouts:** `src/components/layout/` (Navbar, Sidebar)

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.555.0",
    "next": "^16.0.7",
    "react": "^19.2.1",
    "react-dom": "^19.2.1"
  },
  "devDependencies": {
    "eslint": "^9.39.1",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17"
  }
}
```

---

## 🤝 Contributing

1. **Branching:** Create a new branch for each feature or bugfix (`feature/new-section`, `fix/nav-bug`).
2. **Commits:** Write clear, descriptive commit messages.
3. **Linting:** Ensure `npm run lint` passes before pushing.

---

## 📞 Contact

For questions or issues, please contact the development team.