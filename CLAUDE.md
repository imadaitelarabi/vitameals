# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vitameals is a fullstack application that allows parents to easily schedule and manage meals for their children during school hours. The project consists of three main components:

- **Mobile App**: React Native/Expo application for parents to manage meals on mobile
- **Web App**: Next.js application providing web interface for the same functionality  
- **Database**: Supabase backend with PostgreSQL database for data storage and authentication

## Tech Stack

- **Mobile**: React Native 0.79.5, Expo ~53.0.20, Expo Router for navigation, TypeScript
- **Web**: Next.js 15.4.3, React 19.1.0, TailwindCSS 4, TypeScript
- **Database**: Supabase (PostgreSQL 17), with local development support
- **Shared**: Universal TypeScript types generated from database schema

## Development Commands

### Main Project Commands (use from root directory)
```bash
# Complete development setup - installs dependencies and starts all services
make dev-setup

# Start all services (database, mobile, web)
make start-all

# Stop all services
make stop-all

# Check status of all services
make status

# Individual services
make mobile-only    # Start mobile app only
make web-only       # Start web app only  
make db-only        # Start database only

# View logs
make logs           # Show recent logs
make logs-follow    # Follow logs in real-time

# Cleanup
make cleanup        # Stop services and clean temporary files
```

### Mobile App Commands (cd mobile/)
```bash
npm start           # Start Expo development server
npm run android     # Start on Android emulator
npm run ios         # Start on iOS simulator  
npm run web         # Start web version
npm run lint        # Run ESLint
```

### Web App Commands (cd web/)
```bash
npm run dev         # Start Next.js development server with Turbopack
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run Next.js linting
```

### Database Commands (cd supabase/)
```bash
make db-local       # Start local Supabase instance
make migrate        # Interactive migration (prompts for environment)
make gen-types      # Generate universal TypeScript types
make db-status      # Show migration status
make switch-to-local    # Switch to local development environment
make env-status     # Show current environment status
```

## Architecture

### Project Structure
```
vitameals/
├── mobile/          # React Native/Expo mobile app
│   ├── app/        # File-based routing with Expo Router
│   ├── components/ # Reusable UI components
│   ├── constants/  # App constants and configurations
│   └── hooks/      # Custom React hooks
├── web/            # Next.js web application  
│   └── src/app/    # App Router file-based routing
├── supabase/       # Database configuration and migrations
│   ├── migrations/ # Database schema migrations
│   └── config.toml # Supabase local configuration
└── types/          # Universal TypeScript types (generated)
    └── database.types.ts # Shared database types for both apps
```

### Development Workflow

1. **Start Development**: Run `make start-all` from root to start all services
2. **Universal Types**: Database types are generated at `./types/database.types.ts` and shared between mobile and web
3. **Environment Switching**: Use `make switch-to-local` or `make switch-to-prod PROJECT_REF=xxx` to switch between local and production databases
4. **Mobile Development**: Scan QR code from mobile.log with Expo Go app for testing
5. **Web Development**: Access web app at http://localhost:3000
6. **Database**: Supabase Studio available at http://localhost:54323

### Key Development Notes

- Both mobile and web apps share the same TypeScript database types for consistency
- Mobile app uses Expo Router for file-based navigation
- Web app uses Next.js App Router with TailwindCSS for styling
- Local Supabase runs on Docker with PostgreSQL 17
- Universal types are regenerated when database schema changes
- Environment files (.env) need to be configured when switching between local/production

### Port Allocation
- Web App: http://localhost:3000
- Supabase API: http://localhost:54321  
- Supabase Studio: http://localhost:54323
- Database: localhost:54322

### Testing and Linting
- Mobile: `npm run lint` (ESLint with Expo config)
- Web: `npm run lint` (Next.js linting)
- Always run linting before committing changes

## Theme System & Component Development Guidelines

### Theme Rules - ALWAYS FOLLOW THESE

**Universal Theme Requirements:**
- **MANDATORY**: Always use the established blue theme (`#3b82f6` primary, `#60a5fa` for dark mode)
- **MANDATORY**: Reference theme colors from the proper source for each platform
- **MANDATORY**: Support both light and dark mode variants
- **MANDATORY**: Use consistent color naming conventions across projects

### Web Project Theme Usage

**Required Implementation:**
```tsx
// Use TailwindCSS theme classes - these map to our CSS variables
className="bg-primary text-primary-foreground"
className="bg-secondary text-secondary-foreground" 
className="border-border text-muted-foreground"

// For custom CSS, use CSS variables
style={{ backgroundColor: 'var(--primary)' }}
```

**Available Theme Classes:**
- Primary: `bg-primary`, `text-primary`, `border-primary`
- Secondary: `bg-secondary`, `text-secondary`
- Accent: `bg-accent`, `text-accent`
- Muted: `bg-muted`, `text-muted-foreground`
- States: `bg-success`, `bg-warning`, `bg-error`
- Borders: `border-border`, `ring-ring`

### Mobile Project Theme Usage

**Required Implementation:**
```tsx
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

// Method 1: Direct color access
<View style={{ backgroundColor: Colors.light.primary }}>

// Method 2: Theme-aware (recommended)
const backgroundColor = useThemeColor(
  { light: Colors.light.primary, dark: Colors.dark.primary },
  'primary'
);
```

**Available Theme Colors:**
- Primary: `primary`, `primaryForeground`
- Secondary: `secondary`, `secondaryForeground`  
- Accent: `accent`, `accentForeground`
- Muted: `muted`, `mutedForeground`
- Legacy: `tint` (maps to primary)
- States: `success`, `warning`, `error`
- UI: `border`, `input`

### Component Development Rules

**MANDATORY Theme Requirements:**
1. **Never hardcode colors** - always use theme system
2. **Test in both light/dark modes** before considering complete
3. **Use semantic color names** (primary, secondary) not hex values
4. **Maintain color contrast ratios** for accessibility
5. **Follow platform conventions** (TailwindCSS for web, React Native styles for mobile)

**Component Standards:**
- Use TypeScript for all components
- Create reusable, composable components
- Implement proper error boundaries
- Follow accessibility guidelines (WCAG 2.1)
- Use consistent naming conventions
- Document complex components with JSDoc

**File Organization:**
- Web: Place components in `web/src/components/`
- Mobile: Place components in `mobile/components/`
- Shared logic: Consider `shared/` directory for utilities

### Shared Theme Reference

For advanced use cases, reference the shared theme file:
```tsx
import { theme } from '../shared/theme';
// Use theme.colors.light.primary or theme.colors.dark.primary
```