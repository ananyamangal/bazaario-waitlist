# Bazaario Waitlist

Next.js app (waitlist + MongoDB). Build and deploy from this repo root.

## Deploying on Vercel

1. **Root Directory**: Leave as **`.`** (repo root). The app and `package.json` are at the root.

2. **Environment variables** (for MongoDB):
   - **Settings** → **Environment Variables**
   - Add **`MONGODB_URI`** with your MongoDB Atlas connection string (same value as in `.env.local`)

3. **Deploy**: Push to your connected branch or trigger a new deployment.
