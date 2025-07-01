
# 🏎️ Neon Racer - 3D Racing Game

A stunning React-based 3D racing game built with Three.js, featuring immersive gameplay, neon aesthetics, and smooth physics.

![Neon Racer](https://img.shields.io/badge/React-18-blue) ![Three.js](https://img.shields.io/badge/Three.js-r158-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## 🎮 Game Features

### 🚗 **Realistic Car Physics**
- Smooth WASD/Arrow key controls
- Dynamic car tilting and rotation
- Speed boost and brake mechanics
- Responsive handling with momentum

### 🛣️ **Infinite Racing Track**
- Procedurally generated endless road
- Dynamic lane markings and guardrails
- Immersive 3D environment with barriers
- Smooth scrolling background

### 🎯 **Gameplay Elements**
- **Obstacles**: Cars and traffic cones to avoid
- **Power-ups**: Collectible gems for bonus points
- **Scoring System**: Points for survival and collection
- **Lives System**: 3 lives with collision detection
- **Progressive Difficulty**: Speed increases over time

### 🎨 **Visual Effects**
- **Neon Aesthetics**: Purple, pink, and blue color scheme
- **Dynamic Lighting**: Multiple light sources and shadows
- **Particle System**: Atmospheric particles and effects
- **Car Details**: Headlights, wheels, windows, exhaust
- **Environmental Elements**: Street lights and neon accents

### 📱 **User Interface**
- **Real-time HUD**: Score, speed, and lives display
- **Game Menu**: Start screen with instructions
- **Pause System**: Space bar to pause/resume
- **Game Over Screen**: Final stats and restart option
- **Controls Guide**: On-screen control instructions

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git (to clone the repository)

### 🐳 Docker Setup (Recommended)

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd neon-racer
```

2. **Build and run with Docker Compose:**
```bash
# Production build
docker-compose up --build

# For development with hot reload
docker-compose --profile dev up --build
```

3. **Access the game:**
- Production: http://localhost:3000
- Development: http://localhost:8080

### 🛠️ Manual Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Build for production:**
```bash
npm run build
npm run preview
```

## 🎮 How to Play

### Controls
- **WASD** or **Arrow Keys**: Move car
- **W/↑**: Accelerate forward
- **S/↓**: Brake/Reverse
- **A/←**: Turn left
- **D/→**: Turn right
- **SPACE**: Pause/Resume game
- **ESC**: Return to menu

### Gameplay
1. **Start**: Click "START GAME" from the main menu
2. **Survive**: Avoid red cars and pink traffic cones
3. **Collect**: Grab blue power-up gems for bonus points
4. **Score**: Points increase over time and with collections
5. **Speed**: Game gets faster as you progress
6. **Lives**: You have 3 lives - don't crash!

## 🏗️ Architecture

### Project Structure
```
src/
├── components/
│   ├── game/
│   │   ├── RacingGame.tsx      # Main game component
│   │   ├── GameScene.tsx       # 3D scene orchestrator
│   │   ├── Car.tsx             # Player car with physics
│   │   ├── Track.tsx           # Infinite road system
│   │   ├── Obstacles.tsx       # Dynamic obstacles & power-ups
│   │   ├── ParticleSystem.tsx  # Visual effects
│   │   ├── Lighting.tsx        # Scene lighting setup
│   │   ├── GameUI.tsx          # HUD and interface
│   │   └── GameMenu.tsx        # Menu screens
│   └── hooks/
│       └── useKeyboardControls.tsx # Input handling
├── pages/
│   └── Index.tsx               # Main entry point
└── lib/
    └── utils.ts                # Utility functions
```

### Key Technologies
- **React 18**: Component architecture and state management
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers and components
- **Three.js**: 3D graphics and physics
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Styling and responsive design
- **Vite**: Fast build tool and development server

## 🐳 Docker Configuration

### Services
- **neon-racer**: Production service (port 3000)
- **neon-racer-dev**: Development service (port 8080)

### Docker Commands
```bash
# Build production image
docker build -t neon-racer .

# Run production container
docker run -p 3000:3000 neon-racer

# Development with hot reload
docker-compose --profile dev up

# Stop all services
docker-compose down

# View logs
docker-compose logs -f neon-racer
```

## 🎨 Customization

### Colors and Themes
Edit the color scheme in `src/index.css` and component files:
- Primary: Purple (#6c5ce7)
- Secondary: Pink (#e84393)
- Accent: Blue (#74b9ff)
- Warning: Yellow (#fdcb6e)

### Game Physics
Modify physics constants in `Car.tsx`:
- `speed`: Base acceleration
- `maxSpeed`: Maximum velocity
- Friction and momentum values

### Difficulty
Adjust game difficulty in `GameScene.tsx`:
- Obstacle spawn rate
- Speed progression curve
- Collision detection sensitivity

## 🚀 Performance Tips

1. **Optimize for Mobile**: Reduce particle count for mobile devices
2. **Shadow Quality**: Adjust shadow map size for performance
3. **Geometry Complexity**: Simplify 3D models if needed
4. **Frame Rate**: Target 60fps with adaptive quality

## 🔧 Development Notes

### Adding New Features
1. **New Obstacles**: Add types in `Obstacles.tsx`
2. **Power-ups**: Extend the power-up system
3. **Sound Effects**: Add Web Audio API integration
4. **Multiplayer**: Consider WebSocket integration

### Performance Monitoring
- Use React DevTools Profiler
- Monitor Three.js render stats
- Check memory usage with obstacles

## 📦 Deployment

### Production Deployment
1. Build the Docker image
2. Deploy to your preferred platform (AWS, Heroku, DigitalOcean)
3. Set up environment variables if needed
4. Configure domain and SSL

### Scaling
- Use CDN for static assets
- Consider server-side rendering for SEO
- Implement caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Credits

Built with ❤️ using:
- React Three Fiber ecosystem
- Lucide React icons
- Tailwind CSS framework
- Docker containerization

---

**Ready to race? Start your engines! 🏁**
