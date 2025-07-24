# VitaMeals - Main Project Makefile
# Provides commands to manage all project services

.PHONY: help start-all stop-all restart-all status dev-setup cleanup check-tools mobile-only web-only db-only logs logs-follow

# Default target
help:
	@echo "VitaMeals - Main Project Management Commands"
	@echo ""
	@echo "🚀 Service Management:"
	@echo "  start-all        - Start all project services (Supabase + Mobile + Web)"
	@echo "  stop-all         - Stop all project services"
	@echo "  restart-all      - Restart all project services"
	@echo "  status           - Show status of all services"
	@echo ""
	@echo "🎯 Individual Services:"
	@echo "  mobile-only      - Start mobile app only (Expo)"
	@echo "  web-only         - Start web app only (Next.js)"
	@echo "  db-only          - Start database only (Supabase)"
	@echo ""
	@echo "🛠️  Development Setup:"
	@echo "  dev-setup        - Complete development environment setup"
	@echo "  check-tools      - Verify all required tools are installed"
	@echo ""
	@echo "🧹 Cleanup:"
	@echo "  cleanup          - Stop services and clean up processes"
	@echo ""
	@echo "📄 Logs:"
	@echo "  logs             - Show recent logs from all services"
	@echo "  logs-follow      - Follow logs in real-time"
	@echo ""
	@echo "📊 Examples:"
	@echo "  make start-all   # Start database, mobile, and web"
	@echo "  make stop-all    # Stop all services"
	@echo "  make status      # Check what's running"
	@echo ""
	@echo "💡 Individual Service Commands:"
	@echo "  Database: cd supabase && make db-local / make db-local-stop"
	@echo "  Mobile:   cd mobile && npm start"
	@echo "  Web:      cd web && npm run dev"

# Start all project services
start-all:
	@echo "🚀 Starting VitaMeals Development Environment"
	@echo "============================================"
	@echo ""
	@echo "1️⃣ Checking Docker and Supabase status..."
	@if ! command -v docker >/dev/null 2>&1; then \
		echo "❌ Docker not found. Please install Docker first."; \
		exit 1; \
	fi
	@if ! docker info >/dev/null 2>&1; then \
		echo "❌ Docker is not running. Please start Docker first."; \
		exit 1; \
	fi
	@echo "✅ Docker is running"
	@echo ""
	@echo "2️⃣ Starting Supabase local instance..."
	@echo "🔍 Checking for stopped containers..."
	@STOPPED_CONTAINERS=$$(docker ps -a --filter "name=supabase_" --filter "status=exited" --format "{{.Names}}" | wc -l | tr -d ' '); \
	if [ $$STOPPED_CONTAINERS -gt 0 ]; then \
		echo "⚠️  Found $$STOPPED_CONTAINERS stopped Supabase containers"; \
		echo "🧹 Cleaning up stopped containers first..."; \
		cd supabase && supabase stop 2>/dev/null || true; \
		echo "🔄 Restarting with fresh containers..."; \
	fi
	@cd supabase && make db-local
	@echo ""
	@echo "3️⃣ Generating universal types..."
	@cd supabase && make gen-types
	@echo ""
	@echo "4️⃣ Starting Mobile app (Expo)..."
	@echo "📱 Mobile app will be available via Expo Go"
	@echo "🔄 Starting mobile in background..."
	@cd mobile && npm start > ../mobile.log 2>&1 &
	@echo "✅ Mobile app started in background (logs: mobile.log)"
	@echo ""
	@echo "5️⃣ Starting Web app (Next.js)..."
	@echo "🌐 Web app will be available at: http://localhost:3000"
	@echo "🔄 Starting web in background..."
	@cd web && npm run dev > ../web.log 2>&1 &
	@echo "✅ Web app started in background (logs: web.log)"
	@echo ""
	@echo "🎉 All services are now running!"
	@echo ""
	@echo "📱 Mobile: Expo CLI running (check mobile.log for QR code)"
	@echo "🌐 Web: http://localhost:3000"
	@echo "📊 Supabase Studio: http://localhost:54323"
	@echo "🔗 Supabase API: http://localhost:54321"
	@echo "📄 Universal Types: ./types/database.types.ts"
	@echo ""
	@echo "📊 Use 'make status' to check service status"
	@echo "🛑 Use 'make stop-all' to stop all services"

# Stop all project services
stop-all:
	@echo "🛑 Stopping VitaMeals Development Environment"
	@echo "============================================"
	@echo ""
	@echo "1️⃣ Stopping Mobile app (Expo)..."
	@-pkill -f "expo.*start" 2>/dev/null || true
	@-pkill -f "@expo/cli.*start" 2>/dev/null || true
	@-pkill -f "expo-cli.*start" 2>/dev/null || true
	@echo "✅ Mobile app stopped"
	@echo ""
	@echo "2️⃣ Stopping Web app (Next.js)..."
	@-pkill -f "next.*dev" 2>/dev/null || true
	@-pkill -f "node.*next" 2>/dev/null || true
	@echo "✅ Web app stopped"
	@echo ""
	@echo "3️⃣ Stopping Supabase local instance..."
	@cd supabase && make db-local-stop || true
	@echo ""
	@echo "4️⃣ Cleaning up any remaining processes..."
	@-pkill -f "node.*expo" 2>/dev/null || true
	@-pkill -f "node.*next" 2>/dev/null || true
	@-pkill -f "metro" 2>/dev/null || true
	@echo "✅ Cleanup completed"
	@echo ""
	@echo "🎉 All services have been stopped!"

# Restart all services
restart-all:
	@echo "🔄 Restarting VitaMeals Development Environment"
	@echo "=============================================="
	@make stop-all
	@sleep 3
	@make start-all

# Show status of all services
status:
	@echo "📊 VitaMeals Services Status"
	@echo "============================"
	@echo ""
	@echo "🗄️  Database Services (Supabase):"
	@echo "-----------------------------------"
	@if command -v supabase >/dev/null 2>&1; then \
		cd supabase && supabase status 2>/dev/null || echo "❌ Supabase not running"; \
	else \
		echo "❌ Supabase CLI not found"; \
	fi
	@echo ""
	@echo "📱 Mobile Services (Expo):"
	@echo "--------------------------"
	@if pgrep -f "expo.*start" >/dev/null 2>&1; then \
		echo "✅ Expo development server is running"; \
		echo "📱 Check mobile.log for QR code to scan with Expo Go"; \
	else \
		echo "❌ Expo development server is not running"; \
	fi
	@echo ""
	@echo "🌐 Web Services (Next.js):"
	@echo "---------------------------"
	@if pgrep -f "next.*dev" >/dev/null 2>&1; then \
		echo "✅ Next.js development server is running"; \
		echo "🌐 Web URL: http://localhost:3000"; \
	else \
		echo "❌ Next.js development server is not running"; \
	fi
	@echo ""
	@echo "📄 Universal Types:"
	@echo "------------------"
	@if [ -f "types/database.types.ts" ]; then \
		echo "✅ Universal types exist at ./types/database.types.ts"; \
		echo "📅 Last updated: $$(stat -f "%Sm" types/database.types.ts 2>/dev/null || stat -c "%y" types/database.types.ts 2>/dev/null || echo "unknown")"; \
	else \
		echo "❌ Universal types not found - run 'cd supabase && make gen-types'"; \
	fi
	@echo ""
	@echo "🔍 Process Details:"
	@echo "------------------"
	@echo "Mobile processes:"
	@pgrep -fl "expo\|metro" 2>/dev/null || echo "  No mobile processes found"
	@echo ""
	@echo "Web processes:"
	@pgrep -fl "next.*dev" 2>/dev/null || echo "  No web processes found"
	@echo ""
	@echo "Supabase processes:"
	@pgrep -fl "supabase\|postgres\|gotrue\|realtime\|storage\|edge-runtime" 2>/dev/null | head -5 || echo "  No Supabase processes found"
	@echo ""
	@echo "📁 Log files:"
	@if [ -f "mobile.log" ]; then \
		echo "  📱 Mobile logs: ./mobile.log"; \
	fi
	@if [ -f "web.log" ]; then \
		echo "  🌐 Web logs: ./web.log"; \
	fi

# Complete development environment setup
dev-setup:
	@echo "🛠️  VitaMeals Development Setup"
	@echo "==============================="
	@echo ""
	@echo "This will set up your complete development environment."
	@echo "⚠️  This may take several minutes..."
	@echo ""
	@read -p "Continue? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo ""; \
		echo "1️⃣ Checking required tools..."; \
		make check-tools; \
		echo ""; \
		echo "2️⃣ Installing mobile dependencies..."; \
		cd mobile && npm install; \
		echo ""; \
		echo "3️⃣ Installing web dependencies..."; \
		cd web && npm install; \
		echo ""; \
		echo "4️⃣ Setting up database environment..."; \
		cd supabase && make dev-setup; \
		echo ""; \
		echo "5️⃣ Starting all services..."; \
		make start-all; \
		echo ""; \
		echo "🎉 Development environment setup complete!"; \
		echo ""; \
		echo "📝 Next steps:"; \
		echo "  📱 Mobile: Scan QR code in mobile.log with Expo Go app"; \
		echo "  🌐 Web: Open http://localhost:3000"; \
		echo "  📊 Database: Open http://localhost:54323 for Supabase Studio"; \
		echo "  📄 Types: Universal types available at ./types/database.types.ts"; \
		echo ""; \
		echo "📊 Check service status with: make status"; \
		echo "🛑 Stop services with: make stop-all"; \
	else \
		echo "❌ Setup cancelled"; \
	fi

# Check if all required tools are installed
check-tools:
	@echo "🔍 Checking Required Development Tools"
	@echo "====================================="
	@echo ""
	@echo "Core Tools:"
	@if command -v node >/dev/null 2>&1; then \
		echo "✅ Node.js: $$(node --version)"; \
	else \
		echo "❌ Node.js not found - Install from https://nodejs.org/"; \
	fi
	@if command -v npm >/dev/null 2>&1; then \
		echo "✅ npm: $$(npm --version)"; \
	else \
		echo "❌ npm not found - Usually comes with Node.js"; \
	fi
	@if command -v make >/dev/null 2>&1; then \
		echo "✅ make: $$(make --version | head -1)"; \
	else \
		echo "❌ make not found - Install build tools for your OS"; \
	fi
	@echo ""
	@echo "Mobile Development:"
	@if command -v expo >/dev/null 2>&1; then \
		echo "✅ Expo CLI: $$(expo --version)"; \
	else \
		echo "❌ Expo CLI not found - Install with: npm install -g @expo/cli"; \
	fi
	@echo ""
	@echo "Database Tools:"
	@if command -v supabase >/dev/null 2>&1; then \
		echo "✅ Supabase CLI: $$(supabase --version)"; \
	else \
		echo "❌ Supabase CLI not found - Install with: npm install -g supabase"; \
	fi
	@if command -v docker >/dev/null 2>&1; then \
		echo "✅ Docker: $$(docker --version)"; \
	else \
		echo "❌ Docker not found - Required for local Supabase"; \
		echo "   Install from https://docker.com/get-started"; \
	fi
	@echo ""
	@echo "Project Files:"
	@if [ -f "mobile/package.json" ]; then \
		echo "✅ Mobile package.json found"; \
	else \
		echo "❌ Mobile package.json not found"; \
	fi
	@if [ -f "web/package.json" ]; then \
		echo "✅ Web package.json found"; \
	else \
		echo "❌ Web package.json not found"; \
	fi
	@if [ -f "supabase/config.toml" ]; then \
		echo "✅ Supabase config found"; \
	else \
		echo "❌ Supabase config not found"; \
	fi
	@echo ""
	@echo "Dependencies:"
	@if [ -d "mobile/node_modules" ]; then \
		echo "✅ Mobile dependencies installed"; \
	else \
		echo "⚠️  Mobile dependencies not installed - Run: cd mobile && npm install"; \
	fi
	@if [ -d "web/node_modules" ]; then \
		echo "✅ Web dependencies installed"; \
	else \
		echo "⚠️  Web dependencies not installed - Run: cd web && npm install"; \
	fi

# Clean up processes and temporary files
cleanup:
	@echo "🧹 Cleaning Up VitaMeals Environment"
	@echo "==================================="
	@echo ""
	@echo "🛑 Stopping all services..."
	@make stop-all
	@echo ""
	@echo "🗑️  Removing temporary files..."
	@-rm -f mobile.log 2>/dev/null || true
	@-rm -f web.log 2>/dev/null || true
	@-rm -rf mobile/.expo/* 2>/dev/null || true
	@-rm -rf web/.next/cache/* 2>/dev/null || true
	@echo "✅ Temporary files cleaned"
	@echo ""
	@echo "🔍 Checking for remaining processes..."
	@REMAINING=$$(pgrep -f "expo\|next.*dev\|supabase\|postgres.*vitameals" 2>/dev/null | wc -l); \
	if [ $$REMAINING -gt 0 ]; then \
		echo "⚠️  Found $$REMAINING remaining processes"; \
		echo "If needed, manually kill with: pkill -f 'expo\|next\|supabase'"; \
	else \
		echo "✅ No remaining processes found"; \
	fi
	@echo ""
	@echo "🎉 Cleanup completed!"

# Individual service shortcuts
mobile-only:
	@echo "📱 Starting mobile app only..."
	@echo "Expo will start and show QR code for Expo Go app"
	@cd mobile && npm start

web-only:
	@echo "🌐 Starting web app only..."
	@echo "Next.js will be available at: http://localhost:3000"
	@cd web && npm run dev

db-only:
	@echo "🗄️  Starting database only..."
	@cd supabase && make db-local

# Show service logs
logs:
	@echo "📄 VitaMeals Service Logs"
	@echo "========================"
	@echo ""
	@if [ -f "mobile.log" ]; then \
		echo "📱 Mobile logs (last 15 lines):"; \
		echo "-------------------------------"; \
		tail -15 mobile.log; \
		echo ""; \
	else \
		echo "📱 No mobile logs found (mobile.log)"; \
		echo ""; \
	fi
	@if [ -f "web.log" ]; then \
		echo "🌐 Web logs (last 15 lines):"; \
		echo "----------------------------"; \
		tail -15 web.log; \
		echo ""; \
	else \
		echo "🌐 No web logs found (web.log)"; \
		echo ""; \
	fi
	@echo "💡 Tips:"
	@echo "  • Follow mobile logs: tail -f mobile.log"
	@echo "  • Follow web logs: tail -f web.log"
	@echo "  • Supabase logs: cd supabase && supabase status"
	@echo "  • Follow all logs: make logs-follow"

# Follow logs in real-time
logs-follow:
	@echo "📄 Following VitaMeals logs (Ctrl+C to exit)..."
	@echo "==============================================="
	@if [ -f "mobile.log" ] && [ -f "web.log" ]; then \
		echo "Following both mobile and web logs..."; \
		tail -f mobile.log web.log; \
	elif [ -f "mobile.log" ]; then \
		echo "Following mobile logs only..."; \
		tail -f mobile.log; \
	elif [ -f "web.log" ]; then \
		echo "Following web logs only..."; \
		tail -f web.log; \
	else \
		echo "No logs found. Start services first with: make start-all"; \
	fi

# Quick development shortcuts
dev: start-all

# Generate types shortcut
gen-types:
	@echo "📝 Generating universal types..."
	@cd supabase && make gen-types

# Environment status check
env-status:
	@echo "🔍 Checking environment configuration..."
	@cd supabase && make env-status