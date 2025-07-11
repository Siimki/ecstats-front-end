# 🚴 Estonian Cycling Stats Front-End

This is the front-end for the Estonian Cycling Stats. Built to connect with a custom Go + PostgreSQL backend.

---

## 🚀 Features

- 🔍 Rider & team search (backend-connected)
- 🧑‍🚴 Rider profile pages
- 🏁 Race profile pages
- 🏆 Rankings overview
- 📊 Statistics dashboard
- 📅 Calendar (work-in-progress)
- 📰 News and Race page placeholders

**Planned:**
- 🥇 Achievement badges on profiles
- 🧩 Merge calendar and rider list into one streamlined view

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) (React framework)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first styling)
- [shadcn/ui](https://ui.shadcn.com/) (component library)
- [Lucide Icons](https://lucide.dev/) (clean SVG icon set)

---

## ⚙️ Getting Started

Make sure you have Node.js installed. Then:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
/app/               → Routing and page components (Next.js App Router)
/components/        → Reusable UI components (cards, layout, badges)
/lib/               → Utility functions and helpers
/types/             → TypeScript type definitions
/public/            → Static files like images or icons
```

---

## 🔌 API / Backend Connection

All data is fetched from the back-end API (Go) running locally on:

```
http://localhost:1337
```

Make sure the backend is running and accessible during development.
