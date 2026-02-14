# 📋 Jira Clone

A full-featured project management application inspired by Jira, built with **Next.js 14**, **Appwrite**, and **Hono**. Manage workspaces, projects, and tasks with an intuitive interface featuring multiple views, drag-and-drop Kanban boards, and real-time analytics.

## ✨ Features

- **Authentication** — Email/password login and sign-up, plus OAuth with GitHub and Google
- **Workspaces** — Create and manage isolated workspaces with invite-based collaboration
- **Projects** — Organize work into projects within each workspace, complete with custom image uploads
- **Task Management** — Full CRUD for tasks with assignees, due dates, descriptions, and status tracking
- **Multiple Views** — Switch between **Table**, **Kanban Board**, and **Calendar** views for tasks
- **Kanban Drag & Drop** — Reorder tasks and change statuses by dragging cards across columns
- **Advanced Filtering** — Filter tasks by status, assignee, project, and due date
- **Analytics Dashboard** — Visual charts and metrics for workspace and project-level insights
- **Member Management** — Role-based access control (Admin / Member) with invite links
- **Responsive Design** — Mobile-friendly layout with a collapsible sidebar and bottom drawer modals

## 🛠 Tech Stack

| Layer          | Technology                                                                  |
| -------------- | --------------------------------------------------------------------------- |
| Framework      | [Next.js 14](https://nextjs.org/) (App Router)                              |
| Language       | [TypeScript](https://www.typescriptlang.org/)                               |
| Backend / BaaS | [Appwrite](https://appwrite.io/) (Auth, Database, Storage)                  |
| API Layer      | [Hono](https://hono.dev/) (lightweight API routes with Zod validation)      |
| Data Fetching  | [TanStack React Query](https://tanstack.com/query)                          |
| UI Components  | [Radix UI](https://www.radix-ui.com/) / [shadcn/ui](https://ui.shadcn.com/) |
| Styling        | [Tailwind CSS](https://tailwindcss.com/)                                    |
| Charts         | [Recharts](https://recharts.org/)                                           |
| Calendar       | [React Big Calendar](http://jquense.github.io/react-big-calendar/)          |
| Drag & Drop    | [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)                    |
| Forms          | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)   |
| Runtime        | [Bun](https://bun.sh/)                                                      |

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) 18+ **or** [Bun](https://bun.sh/) 1.0+
- An [Appwrite](https://appwrite.io/) instance (cloud or self-hosted)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/BhushanLagare7/jira.git
cd jira
```

### 2. Install dependencies

```bash
bun install
# or
npm install
```

### 3. Set up Appwrite

Create the following resources in your Appwrite project:

1. **Database** with collections for `workspaces`, `projects`, `tasks`, and `members`
2. **Storage bucket** for workspace/project images
3. **OAuth providers** (GitHub and/or Google) — configure in _Appwrite Console → Auth → Settings_

### 4. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=<your-project-id>

NEXT_PUBLIC_APPWRITE_DATABASE_ID=<your-database-id>
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=<workspaces-collection-id>
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=<members-collection-id>
NEXT_PUBLIC_APPWRITE_PROJECTS_ID=<projects-collection-id>
NEXT_PUBLIC_APPWRITE_TASKS_ID=<tasks-collection-id>
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=<images-bucket-id>

NEXT_APPWRITE_KEY=<your-appwrite-api-key>
```

### 5. Start the development server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── (auth)/             # Sign-in / Sign-up pages
│   ├── (dashboard)/        # Main dashboard with workspace views
│   ├── (standalone)/       # Standalone pages (create workspace, settings)
│   └── api/                # API route handler (Hono)
├── components/             # Shared UI components (sidebar, navbar, modals)
│   └── ui/                 # shadcn/ui primitives (button, dialog, etc.)
├── features/               # Feature-based modules
│   ├── auth/               # Authentication (login, register, OAuth, sessions)
│   ├── workspaces/         # Workspace CRUD, invite system, settings
│   ├── projects/           # Project CRUD and analytics
│   ├── tasks/              # Task CRUD, Kanban, Calendar, Table views
│   └── members/            # Member management and roles
├── hooks/                  # Shared custom React hooks
└── lib/                    # Utilities (Appwrite clients, middleware, helpers)
```

## 📜 Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `bun dev`       | Start development server |
| `bun run build` | Build for production     |
| `bun start`     | Start production server  |
| `bun run lint`  | Run ESLint               |

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source. See the [LICENSE](LICENSE) file for details.
