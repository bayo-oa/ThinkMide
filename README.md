# ThinkMide portfolio

Next.js (App Router) + Sanity. Shows placeholder content until Sanity is connected.

## Run
```
npm install
cp .env.example .env.local   # add your Sanity project ID
npm run dev
```
Edit content at `/studio`. Create a project at sanity.io/manage, add its ID to `.env.local` and to Vercel env vars, and add your Vercel domain and `http://localhost:3000` under API > CORS origins.
