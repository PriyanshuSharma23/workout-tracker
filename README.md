# Workout Tracker

A modern, full-stack web application for tracking daily workouts, built with Next.js, TypeScript, Prisma, Clerk authentication, and Tailwind CSS. The app supports progressive web app (PWA) features, allowing you to install it on your device and use it offline.

## Features

- **User Authentication:** Secure sign-in and sign-up flows powered by Clerk.
- **Workout Logging:** Create, edit, and save daily workouts with custom exercises and sets.
- **Workout History:** View your complete workout history, with the ability to download your data as a CSV file.
- **Copy Workouts:** Easily copy a previous workout to today.
- **Calendar View:** Select a date to view or start a workout.
- **PWA Support:** Install the app on your device and use it offline.
- **Responsive UI:** Clean, mobile-friendly interface using Tailwind CSS and React.

## Tech Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM, PostgreSQL (or your preferred database)
- **Authentication:** Clerk
- **PWA:** Service Worker, Manifest

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- PostgreSQL (or another database supported by Prisma)
- Clerk account (for authentication)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/workout-tracker.git
   cd workout-tracker
