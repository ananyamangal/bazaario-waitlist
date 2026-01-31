# Bazaario Waitlist

The Next.js app lives in **`bazaario-website-design/`**.

## Deploying on Vercel

1. **Set Root Directory** (required):
   - Open your project on [Vercel](https://vercel.com) → **Settings** → **General**
   - Under **Root Directory**, click **Edit**
   - Enter: **`bazaario-website-design`**
   - Click **Save**

2. **Environment variables** (for MongoDB):
   - **Settings** → **Environment Variables**
   - Add **`MONGODB_URI`** with your MongoDB Atlas connection string (use the same value as in `.env.local`)

3. **Redeploy**: Deployments → … on latest deployment → **Redeploy**

After step 1, Vercel will detect Next.js from `package.json` in that folder and use the `vercel.json` there for the build.
