# Vitameals

Vitameals is a fullstack application that allows parents to easily schedule and manage meals for their children during school hours.

## 🚀 Quick Start

Get the entire development environment running in one command:

```bash
make dev-setup
```

This will:
- Install all dependencies (mobile + web)
- Start local Supabase database
- Generate universal TypeScript types
- Start mobile and web development servers

**Access your apps:**
- 📱 **Mobile**: Scan QR code in `mobile.log` with [Expo Go app](https://expo.dev/go)
- 🌐 **Web**: http://localhost:3000
- 📊 **Database Studio**: http://localhost:54323

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Docker Desktop** - [Download here](https://docker.com/get-started)
- **Expo Go app** on your phone - [iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

**Install global tools:**
```bash
# Install Expo CLI and Supabase CLI
npm install -g @expo/cli supabase
```

## 🏗️ Project Architecture

This is a monorepo with three main components:

```
vitameals/
├── mobile/          # 📱 React Native/Expo app
├── web/            # 🌐 Next.js web app  
├── supabase/       # 🗄️ Database & backend
└── types/          # 🔄 Shared TypeScript types
```

**Tech Stack:**
- **Mobile**: React Native, Expo, Expo Router
- **Web**: Next.js 15, React 19, TailwindCSS
- **Database**: Supabase (PostgreSQL)  
- **Language**: TypeScript throughout

## 🛠️ Development Commands

### Main Project Commands
```bash
# 🚀 Complete setup (recommended for new team members)
make dev-setup

# 🏃‍♂️ Quick start (if already set up)
make start-all

# 📊 Check what's running
make status

# 🛑 Stop everything
make stop-all

# 📄 View logs
make logs           # Recent logs
make logs-follow    # Follow in real-time

# 🧹 Clean up (stops services + removes temp files)
make cleanup
```

### Individual Services
```bash
# Start just one service
make mobile-only    # 📱 Mobile app only
make web-only       # 🌐 Web app only
make db-only        # 🗄️ Database only
```

### Working with Individual Apps

**Mobile App** (`cd mobile/`):
```bash
npm start           # Start development server
npm run ios         # Open iOS simulator
npm run android     # Open Android emulator
npm run lint        # Run linting
```

**Web App** (`cd web/`):
```bash
npm run dev         # Start development server
npm run build       # Build for production  
npm run lint        # Run linting
```

**Database** (`cd supabase/`):
```bash
make gen-types      # Generate TypeScript types
make db-status      # Check migration status
make migrate        # Run database migrations
```

## 🔧 Environment Setup

### Local Development (Default)
The project is configured for local development by default. When you run `make start-all`, it uses:
- Local Supabase instance (Docker)
- Generated universal types at `./types/database.types.ts`

### Production Environment
To work with production data:
```bash
cd supabase
make switch-to-prod PROJECT_REF=your_project_ref
```

Check current environment:
```bash
cd supabase
make env-status
```

## 📱 Mobile Development

1. **Install Expo Go** on your phone
2. **Start the mobile app**: `make mobile-only` or `npm start` in `mobile/`
3. **Scan QR code**: Check `mobile.log` file for the QR code
4. **Develop**: Files auto-reload as you edit

**Key mobile files:**
- `mobile/app/` - File-based routing screens
- `mobile/components/` - Reusable UI components

## 🌐 Web Development

1. **Start web app**: `make web-only` or `npm run dev` in `web/`
2. **Open browser**: http://localhost:3000
3. **Develop**: Hot reload enabled

**Key web files:**
- `web/src/app/` - Next.js App Router pages
- TailwindCSS for styling

## 🗄️ Database Development

**Local database** (default):
- **Studio**: http://localhost:54323
- **API**: http://localhost:54321
- **Direct connection**: localhost:54322

**Common database tasks:**
```bash
cd supabase

# Generate types after schema changes
make gen-types

# Create new migration
make new-migration NAME=add_user_table

# Apply migrations
make migrate

# Reset database (⚠️ destructive)
make db-reset
```

## 🔄 Shared Types

The project uses **universal TypeScript types** generated from the database schema:
- **Location**: `./types/database.types.ts`
- **Used by**: Both mobile and web apps
- **Regenerate**: `cd supabase && make gen-types`

## 🐛 Troubleshooting

**Services won't start?**
```bash
make cleanup        # Stop everything and clean up
make check-tools    # Verify all tools are installed
make start-all      # Try starting again
```

**Docker issues?**
- Ensure Docker Desktop is running
- Try `docker ps` to see running containers

**Port conflicts?**
- Web: 3000, Supabase: 54321-54323
- Stop other services using these ports

**Mobile app not connecting?**
- Check `mobile.log` for the QR code
- Ensure phone and computer are on same network
- Try restarting with `make mobile-only`

## 📚 Useful Resources

- **Expo Documentation**: https://docs.expo.dev/
- **Next.js Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Project Architecture**: See `CLAUDE.md` for technical details

## 🤝 Contributing

1. **Create feature branch**: `git checkout -b feature/your-feature`
2. **Run linting**: `npm run lint` in respective apps
3. **Test locally**: Ensure both mobile and web work
4. **Commit changes**: Use clear, descriptive messages
5. **Push and create PR**: Target `main` branch

---

**Need help?** Check the logs with `make logs` or reach out to the team! 🙋‍♂️