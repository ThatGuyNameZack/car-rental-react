# Project Structure

## Directory Organization

```
car-rental/
├── src/
│   ├── pages/          # Page components (one per route)
│   ├── assets/         # Static assets (images, payment logos)
│   ├── App.tsx         # Router configuration
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles (Tailwind imports)
├── public/             # Public static assets
└── [config files]      # Root-level configuration
```

## Key Conventions

### Routing

- All routes are defined in `App.tsx` using `createBrowserRouter`
- Each route maps to a page component in `src/pages/`
- Route structure:
  - `/` - Homepage
  - `/listing` - Car listing page
  - `/car/:id` - Car detail page
  - `/payment` - Payment page
  - `/profile` - User profile
  - `/history` - Rental history

### Page Components

- Located in `src/pages/`
- Named with PascalCase and `.tsx` extension
- Each page is a functional component with TypeScript typing (`React.FC`)
- Pages handle their own state and navigation logic

### Component Patterns

- Use functional components with hooks (useState, useNavigate)
- TypeScript interfaces for props and data structures
- Inline data (mock data arrays within components)
- Navigation via `useNavigate()` hook from react-router-dom

### Styling

- Tailwind CSS utility classes for all styling
- Responsive design with mobile-first approach
- Consistent color scheme: blue-600 primary, gray scale for text
- Common patterns: rounded-xl for cards, shadow-sm/lg for elevation

### Assets

- Payment method logos stored in `src/assets/`
- External images via Unsplash URLs
- Icons from lucide-react library

## File Naming

- Components: PascalCase (e.g., `Homepage.tsx`, `CarDetailPage.tsx`)
- Config files: lowercase with dots (e.g., `vite.config.ts`, `tailwind.config.js`)
