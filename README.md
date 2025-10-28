# CampusGrid - Professional School Admin Panel

A modern, high-end admin panel for school management with beautiful UI/UX design.

## 🚀 Quick Start

### Development Mode
```bash
npm install
npm run dev
```
Access at: http://localhost:5173

### Docker Production Mode
```bash
docker-compose up --build -d
```
Access at: http://localhost:5000

### Docker Commands
```bash
# Build and start
docker-compose up --build -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up --build --force-recreate
```

## 📱 Pages & Features

### 1. Login Page (`/login`)
- Split-screen professional design
- Branded left panel with animated gradients
- Feature highlights with statistics
- Modern form inputs with icons
- Demo credentials display

### 2. Dashboard (`/dashboard`)
- Real-time statistics cards (4 metrics)
- Quick action buttons
- Recent activity feed
- Side panel with quick stats
- Responsive grid layout

### 3. Onboarding Wizard (`/onboarding`)
- Multi-step wizard (3 steps)
- Visual progress indicator
- School information form
- Administrator account setup
- Final confirmation step

## 🎨 Design Features

- ✨ Modern gradient design (blue-to-purple)
- 🎭 Animated backgrounds with blur effects
- 💫 Smooth hover animations and transitions
- 📱 Fully responsive design
- 🎯 Professional icons (Lucide React)
- 🌈 Tailwind CSS with custom components

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Docker** - Containerization
- **Nginx** - Production server

## 📦 Docker Configuration

### Build Process
1. **Stage 1 (Builder)**: Uses Node 20 to build React app
2. **Stage 2 (Production)**: Uses Nginx Alpine to serve static files

### Ports
- **Development**: `5173`
- **Production**: `5000`

### Nginx Features
- SPA routing support
- Gzip compression
- Static asset caching
- Optimized for production

## 🎯 Project Structure

```
campusgrid/
├── src/
│   ├── pages/
│   │   ├── Login.jsx            # Login page
│   │   ├── Dashboard.jsx         # Dashboard
│   │   └── OnboardingWizard.jsx # Onboarding
│   ├── App.jsx                  # Router setup
│   └── index.css                # Tailwind styles
├── Dockerfile                   # Multi-stage build
├── docker-compose.yml          # Docker orchestration
└── nginx.conf                   # Production config
```

## 🌟 Key Highlights

✅ Professional split-screen login  
✅ Modern gradient designs  
✅ Interactive dashboard with stats  
✅ Multi-step onboarding wizard  
✅ Beautiful animations and transitions  
✅ Fully responsive design  
✅ Docker containerized  
✅ Production-ready with Nginx  

## 📊 Container Status

```bash
# Check running container
docker ps | grep campusgrid

# View logs
docker logs campusgrid

# Access container
docker exec -it campusgrid sh
```

## 🔧 Environment

- **Node**: 20-alpine
- **Web Server**: Nginx Alpine
- **Build**: Vite
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React

## 📝 Notes

The application is fully containerized and production-ready. Access it at:
- **Development**: http://localhost:5173
- **Production**: http://localhost:5000