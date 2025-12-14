# Bolowe's Resort Frontend

A modern React-based frontend application for Bolowe's Resort, built with TypeScript, Vite, and Material-UI.

## 🚀 Features

- **Responsive Design**: Modern UI with Tailwind CSS and Material-UI components
- **Booking System**: Accommodation and package booking functionality
- **Admin Dashboard**: Complete admin panel for managing reservations, rooms, and packages
- **Event Management**: Event and meeting booking system
- **Attractions**: Showcase of resort attractions
- **Payment Integration**: Integrated payment processing

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 16.x or higher)
- **Yarn** (package manager) - [Install Yarn](https://yarnpkg.com/getting-started/install)
- **Git** (for cloning the repository)

### Check your installations:

```bash
node --version
yarn --version
git --version
```

## 📥 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Bolowe-s-resort-frontend-main
```

Replace `<repository-url>` with the actual URL of your repository.

### 2. Install Dependencies

Install all required dependencies using Yarn:

```bash
yarn install
```

This will install all the project dependencies listed in `package.json`.

## 🏃 Running the Project

### Development Mode

To start the development server:

```bash
yarn dev
```

The application will be available at:
- **Local**: `http://localhost:5173`
- **Network**: The terminal will display the network URL (accessible from other devices on your network)

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Source maps for debugging
- Fast refresh for React components

### Build for Production

To create a production build:

```bash
yarn build
```

This will:
1. Run TypeScript type checking (`tsc`)
2. Build the optimized production bundle using Vite
3. Output the build files to the `dist/` directory

### Preview Production Build

To preview the production build locally:

```bash
yarn preview
```

This serves the production build from the `dist/` directory.

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start the development server |
| `yarn build` | Build the project for production |
| `yarn preview` | Preview the production build locally |

## 📁 Project Structure

```
Bolowe-s-resort-frontend-main/
├── src/
│   ├── components/          # React components
│   │   ├── admin/           # Admin dashboard components
│   │   └── organisms/       # Main page components
│   ├── services/            # API service functions
│   ├── utils/              # Utility functions
│   ├── types/              # TypeScript type definitions
│   ├── styles/             # Global styles
│   ├── assets/             # Images, fonts, and static assets
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Application entry point
├── public/                 # Public assets
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.cjs     # Tailwind CSS configuration
```

## 🔧 Configuration

### Environment Variables

If you need to configure environment variables, create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

### Proxy Configuration

The project is configured to proxy API requests to `https://boloweisworldresort.com/` as specified in `package.json`.

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   - If port 5173 is already in use, Vite will automatically try the next available port
   - You can also specify a different port: `yarn dev --port 3000`

2. **Dependencies Installation Issues**
   - Delete `node_modules` and `yarn.lock` (if using npm)
   - Run `yarn install` again

3. **TypeScript Errors**
   - Run `yarn build` to see detailed TypeScript error messages
   - Ensure all dependencies are properly installed

4. **Module Not Found Errors**
   - Clear the cache: `yarn cache clean`
   - Reinstall dependencies: `rm -rf node_modules && yarn install`

## 📦 Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Routing
- **Material-UI (MUI)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Day.js** - Date manipulation
- **Formik** - Form handling
- **React Hook Form** - Form validation
- **Framer Motion** - Animation library

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 📞 Support

For support, email [your-email@example.com] or open an issue in the repository.

---

**Note**: Make sure the backend API is running and accessible before testing the full functionality of the application.

