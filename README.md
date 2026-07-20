# CreatorSpace

A full-stack publishing platform where you can write posts, upload images, and browse content from others. Built with the MERN stack — MongoDB, Express, React, and Node.js.

---

## What it does

- Create posts with a title, description, and cover image
- Images are uploaded and stored on Cloudinary
- Browse all posts in a live feed with search
- Delete posts (the image gets cleaned up from Cloudinary automatically)
- Fully responsive — works on desktop and mobile

---

## Tech stack

**Frontend**
- React 19 + Vite
- Framer Motion for animations
- React Hook Form for form handling
- React Hot Toast for notifications
- Tailwind CSS + custom CSS variables

**Backend**
- Node.js + Express
- MongoDB via Mongoose
- Cloudinary for image storage
- Multer for file uploads
- express-validator for input validation

---

## Running locally

You need Node.js 18+, a MongoDB database (Atlas works fine), and a Cloudinary account.

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Set up the backend

```bash
cd backend
```

Create a `.env` file and fill it in:

```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/social_app
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
UPLOAD_LIMIT_MB=10
```

Then start it:

```bash
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

### 3. Set up the frontend

```bash
cd frontend
```

Create a `.env` file and fill it in:

```
VITE_API_URL=http://localhost:5000/api
```

Then start it:

```bash
npm install
npm run dev
```

The app opens at `http://localhost:5173`.

---

## Deploying to Render

This project ships with a `render.yaml` at the root that configures both services.

### Steps

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and create a new account (or log in)
3. Click **New** → **Blueprint** and connect your GitHub repo
4. Render will detect the `render.yaml` and set up both services automatically
5. You'll need to manually fill in the environment variables marked `sync: false` in the Render dashboard:
   - `MONGODB_URI`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
   - `CLIENT_URL` → set this to your frontend Render URL (e.g. `https://creatorspace-frontend.onrender.com`)
   - `VITE_API_URL` → set this to your backend Render URL + `/api` (e.g. `https://creatorspace-api.onrender.com/api`)

> **Note:** Free tier Render services spin down after inactivity. The first request after idle may take 30–60 seconds.

---

## Project structure

```
├── backend/
│   └── src/
│       ├── config/         # DB and Cloudinary setup
│       ├── constants/      # Shared limits and allowed MIME types
│       ├── controllers/    # Route handlers
│       ├── middlewares/    # Upload, validation, error handling
│       ├── models/         # Mongoose schemas
│       ├── repositories/   # Database queries
│       ├── routes/         # Express routers
│       ├── services/       # Business logic
│       ├── utils/          # ApiError, response helpers, asyncHandler
│       └── validators/     # express-validator rules
│
├── frontend/
│   └── src/
│       ├── api/            # Axios instance and API calls
│       ├── components/     # Shared UI: cards, forms, feedback, layout
│       ├── constants/      # App-wide constants and animation configs
│       ├── features/       # PostFeed component
│       ├── hooks/          # usePosts data hook
│       └── pages/          # Home and NotFound pages
│
├── render.yaml             # Render deployment blueprint
└── README.md
```

---

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/posts` | Get all posts |
| `POST` | `/api/posts` | Create a post (multipart/form-data) |
| `DELETE` | `/api/posts/:id` | Delete a post |

---

## License

MIT
