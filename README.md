# Konferenciapp - Question Collector Application

This application is designed for collecting and managing questions during presentations at the Simonyi Conference. It allows attendees to submit questions, moderators to manage them, and presenters to display selected questions.

## Overview

This project is a Next.js application built using the App Router. It uses server actions for data fetching and mutations on the client-side. Data is stored in a PostgreSQL database, accessed via Prisma.

## Technologies Used

*   **Framework:** Next.js (App Router)
*   **Database:** Prisma (PostgreSQL)
*   **Authentication:** NextAuth.js
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui

## Setup Instructions

**Prerequisites:**

*   Node.js (version 18.17.0 or later, as specified in `package.json`)
*   npm
*   A PostgreSQL database (configured in Prisma schema)
*   Environment variables (see `.env.example`)

**Steps:**

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd konferenciapp-question-collector
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    *   Create a `.env` file in the root directory.
    *   Copy the contents of `.env.example` into `.env`.
    *   Fill in the required values

4.  **Database setup:**
    *   Ensure your PostgreSQL database is running.
    *   Run Prisma migrations:
        ```bash
        npx prisma migrate deploy
        ```
    *   (Optional) Seed the database:
        ```bash
        npx prisma db seed
        ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application should be accessible at `http://localhost:3000`.

## API Endpoints

Client-side data fetching and mutations are handled via internal server actions.

The following endpoints are known:

*   **`GET /api/presentation/[id]/question?userid=<userId>`:** Fetches questions for a specific presentation and user. Requires a `userid` query parameter.
*   **`POST /api/presentation/[id]/question`:** Creates a new question for a specific presentation.

## External API

The application interacts with an external API at the URL specified by the `CMSCH_CONFERENCES_API` environment variable. This API provides data about presentations, speakers, and other conference-related information.
