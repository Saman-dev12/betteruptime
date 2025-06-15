# 🌐 Uptime Monitoring Dashboard

A full-stack application to monitor website uptime, response times, and performance trends — built with **Next.js**, **Express**, **Prisma**, **TailwindCSS**, and **Clerk Auth**.

![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs)
![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss)
![Clerk Auth](https://img.shields.io/badge/Clerk-Auth-blueviolet)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql)

---

## ✨ Features

- 🔐 **Clerk authentication** (Sign in, Sign out, Webhooks)
- 📶 Add and manage monitors for websites or APIs
- 📊 Uptime summaries: last 24h, 7d, 30d
- 📉 Charts for response time and uptime trends
- ⚠️ Alerts and error boundaries with beautiful UI
- 🌙 Dark mode supported
- 🌍 Server-side logging via Express backend + Prisma
- ⏱ Configurable check frequency (in seconds or minutes)

---

## 🧱 Tech Stack

| Layer        | Tech                     |
| ------------ | ------------------------ |
| Frontend     | Next.js 14, TailwindCSS, ShadCN UI |
| Auth         | Clerk                    |
| Backend      | Express.js               |
| Database     | Prisma + PostgreSQL      |
| Monitoring   | Custom ping service      |
| Deployment   | Vercel / Railway / Render (customizable) |

---

## 🛠️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Saman-dev12/betteruptime.git
cd betteruptime
```

### 2. Install dependencies

```bash
cd betterstack
pnpm install
# or
npm install
```

```bash
cd betterstack-backend
pnpm install
# or
npm install
```

### 3. Set up environment variables

Create a `.env` file in the betterstack:

```env
CLERK_SECRET_KEY=your-secret
CLERK_PUBLISHABLE_KEY=your-publishable-key
```

Create a `.env` file in the betterstack-backend:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/uptime
CLERK_SECRET_KEY=your-secret
CLERK_PUBLISHABLE_KEY=your-publishable-key
PORT = 8000
CLERK_WEBHOOK_SECRET=your-webhook-secret-key
```


> 💡 Use [Clerk.dev](https://clerk.dev) for authentication keys and [Railway](https://railway.app) or [Supabase](https://supabase.io) for PostgreSQL hosting.

### 4. Run Prisma

```bash
cd betterstack-backend
npx prisma generate
npx prisma migrate dev
```

### 5. Start development servers

- **Frontend (Next.js)**

```bash
cd betterstack
pnpm dev
# or npm run dev
```

- **Backend (Express)**

```bash
cd betterstack-backend
pnpm run server.ts
```

Run worker
```bash
cd betterstack-backend
pnpm run worker/worker.ts
```

---

## 🔍 Project Structure

```
.
├── app/                # Next.js frontend
├── betterstack-backend/            # Express.js API
├── prisma/             # Prisma schema
├── components/         # UI Components (Shadcn)
├── utils/                # Utilities and helpers
├── public/             # Static assets
├── styles/             # Tailwind & globals
└── README.md
```

---

## 🔐 Authentication via Clerk

- Clerk webhooks sync users to the database.
- You must configure webhook endpoints in Clerk Dashboard (e.g., `/api/user/webhook`).
- Protected API routes use `clerkAuthMiddleware`.

---

## 🚧 TODO / Future Improvements

- [ ] Email notifications on downtime
- [ ] Mobile-first UI enhancements
- [ ] Retry logic for failed requests
- [ ] Analytics dashboard for multiple monitors

---


## 💬 Feedback or Contributions

Pull requests, issues, and feature suggestions are welcome!

> Made with ❤️ by Saman(https://github.com/Saman-dev12)
