# Post Scheduler - Frontend

A modern, type-safe React frontend for scheduling social media posts with image upload, timezone support, and real-time status tracking.

## 🚀 Features

### Authentication
- ✅ User registration with username and timezone
- ✅ Secure login with JWT tokens
- ✅ Automatic token refresh (stay logged in for 7 days)
- ✅ Protected routes

### Post Management
- ✅ Create posts with text and images
- ✅ Schedule posts for future publishing
- ✅ Save drafts without scheduling
- ✅ **Status Filters**: View posts by status (All, Draft, Scheduled, Published, Failed)
- ✅ **Delete Posts**: Remove draft and scheduled posts
- ✅ Image upload with preview
- ✅ Real-time post status updates

### Timezone Support
- ✅ **30 Popular Timezones** (curated list)
- ✅ **Current Time Display** updates when timezone changes
- ✅ Timezone-aware scheduling
- ✅ **Past Date Prevention** - can't schedule for dates/times that have passed

### UI/UX
- ✅ Professional design with shadcn/ui components
- ✅ Responsive layout (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Loading states and error messages
- ✅ Real-time form validation

## 📋 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **UI Components**: shadcn/ui
- **State Management**: React Query (TanStack Query)
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Routing**: React Router v6

## 🛠️ Setup

### Prerequisites
- Node.js 18+ installed
- Backend API running on `http://localhost:3000`

### Installation

```bash
# Clone the repository
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend URL
VITE_API_URL=http://localhost:3000/api
```

### Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx        # Login form with validation
│   │   │   └── RegisterForm.tsx     # Registration form
│   │   ├── posts/
│   │   │   ├── PostComposer.tsx     # Create/schedule posts
│   │   │   ├── PostList.tsx         # List with filters
│   │   │   └── PostCard.tsx         # Individual post display
│   │   └── ui/                      # shadcn/ui components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── ...
│   ├── contexts/
│   │   └── AuthContext.tsx          # Authentication state
│   ├── pages/
│   │   ├── LoginPage.tsx            # Login page
│   │   ├── RegisterPage.tsx         # Registration page
│   │   └── DashboardPage.tsx        # Main dashboard
│   ├── lib/
│   │   ├── axios.ts                 # API client with auth
│   │   ├── utils.ts                 # Utility functions
│   │   └── validations/             # Zod schemas
│   ├── types/
│   │   ├── auth.types.ts            # Auth types
│   │   ├── post.types.ts            # Post types
│   │   └── api.types.ts             # API response types
│   ├── utils/
│   │   └── timezone.ts              # Timezone utilities
│   └── main.tsx                     # App entry point
├── public/
├── .env                             # Environment variables
├── tailwind.config.js               # Tailwind configuration
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite configuration
└── package.json
```

## 🎨 Key Features Explained

### Status Filters
Filter posts by status with visual badges showing count:
- **All Posts** - View everything
- **Drafts** (gray badge) - Unpublished posts
- **Scheduled** (yellow badge) - Waiting to publish
- **Published** (green badge) - Successfully posted
- **Failed** (red badge) - Publishing errors

### Post Composer
- **Draft Button**: Save without scheduling
- **Schedule Button**: Set date/time for publishing
- **Image Upload**: Preview before submission
- **Timezone Selector**: 30 popular timezones
- **Current Time Display**: Updates when timezone changes
- **Date Validation**: Can't select past dates/times

### Delete Functionality
- Delete button appears on **Draft** and **Scheduled** posts
- Confirmation dialog before deletion
- Instant UI update after deletion

### Timezone Features
Popular timezones organized by region:
- North America (7 zones)
- Europe (6 zones)
- Asia (7 zones)
- Australia & Pacific (4 zones)
- South America (2 zones)
- Africa (2 zones)

## 🔐 Authentication Flow

1. **Register**: Create account with username, email, password, timezone
2. **Login**: Get access token (15min) and refresh token (7 days)
3. **Auto-Refresh**: Token refreshes automatically on 401 errors
4. **Persist Session**: Stay logged in after page refresh
5. **Logout**: Clear tokens and redirect to login

## 📝 Environment Variables

```env
# Backend API URL
VITE_API_URL=http://localhost:3000/api
```

## 🧪 Testing

### Manual Testing
1. **Register** a new account
2. **Create a draft** post
3. **Schedule a post** for 2 minutes from now
4. **Upload an image** with a post
5. **Filter** by status
6. **Delete** a draft or scheduled post
7. **Wait** for scheduled post to publish
8. **Refresh** page - verify you stay logged in

### Status Filter Testing
- Click each filter button
- Verify badge counts are accurate
- Verify only matching posts display

### Timezone Testing
- Select different timezones
- Verify current time updates
- Schedule post and verify correct time

### Date Validation Testing
- Try to select a past date - should be disabled
- Try to select a past time - should be disabled

## 🎯 Type Safety

- ✅ 100% TypeScript
- ✅ No `any` types
- ✅ Strict compiler options
- ✅ Zod validation schemas
- ✅ Type-safe API responses

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Deploy dist/ folder to Netlify
```

### Environment Variables (Production)
Set `VITE_API_URL` to your production backend URL.

## 📚 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Accessible components
- `lucide-react` - Icons
- `class-variance-authority` - Component variants
- `clsx` / `tailwind-merge` - Class name utilities

### Data & Forms
- `@tanstack/react-query` - Server state management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `axios` - HTTP client

## 🐛 Troubleshooting

### Posts not loading
- Check backend is running on correct port
- Verify `VITE_API_URL` in `.env`
- Check browser console for errors

### Images not displaying
- Verify backend CORS configuration
- Check image URL format
- Ensure backend serves `/uploads` directory

### Token expired errors
- Refresh token should auto-refresh
- If persists, clear localStorage and re-login

### Timezone not updating
- Check browser console for errors
- Verify timezone value is valid IANA timezone

## 📄 License

MIT

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🎉 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
