# ⚛️ API Gateway Frontend

This is the frontend for the API Gateway system, built with React, Vite, and Material UI (MUI).

## 🚀 Features

- Modern React (hooks, context, functional components)
- Material UI for consistent design
- Authentication (login, protected routes)
- Role-based access (admin/viewer)
- Project dashboard (view, add, edit, delete projects)
- Change password
- Access requests management (admin)
- API logs viewing (admin)
- Toast notifications for feedback
- Responsive and accessible UI

## 📁 Folder Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── api/               # API client modules
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable UI components
│   ├── config/            # App configuration
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Main route pages
│   ├── theme/             # MUI theme customization
│   └── utils/             # Utility functions
├── .env.example           # Example environment variables
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
cd frontend
npm install
# or
yarn install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in the required values:
- `API_BASE_URL` — URL of the backend API (e.g., http://localhost:5000)
- `VITE_MANAGER_NAME` — Manager's name for display

### Running the App
```bash
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production
```bash
npm run build
# or
yarn build
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## 🧭 Main Pages & Routing

- `/login` — User login (public)
- `/dashboard` — Project dashboard (protected)
- `/change-password` — Change password (protected)
- `/access-requests` — Manage access requests (admin only)
- `/api-logs` — View API logs (admin only)

Routes are protected based on authentication and user role. Unauthenticated users are redirected to `/login`.

## 🔗 API Integration

All API requests use the `API_BASE_URL` from your `.env` file. Ensure the backend is running and accessible.

## 🎨 UI & Theming

- Uses Material UI (MUI) for components and theming
- Custom theme in `src/theme/`

## 🤝 Contributing

1. Fork and clone the repo
2. Create a new branch for your feature/fix
3. Follow existing code style and structure
4. Test your changes
5. Submit a pull request

---

For backend setup and API details, see the main [README.md](../backend/README.md)
