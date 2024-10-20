# MCQ Hub

MCQ Hub is an interactive platform built to manage Multiple Choice Questions (MCQs). It allows users to create, manage, and take quizzes. The application is built using Next.js, Prisma, Postgres, and styled with Tailwind CSS. Authentication is implemented using NextAuth with providers such as Google and GitHub.

## Features

- **User Authentication**: Secure authentication using NextAuth with Google and GitHub providers.
- **MCQ Management**: Create, update, and delete MCQs.
- **Quiz Creation**: Allows users to generate quizzes based on available MCQs.
- **Quiz Attempting**: Users can attempt quizzes and get results.
- **Responsive Design**: Fully responsive layout using Tailwind CSS for mobile and desktop devices.
- **Server Actions**: Efficient handling of server-side operations using Next.js server actions.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js server actions, Prisma ORM, Postgres database
- **Authentication**: NextAuth (Google and GitHub providers)
- **Database**: Postgres, managed with Prisma ORM

## Installation

To set up MCQ Hub locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/om-baji/mcq-hub.git
    cd mcq-hub
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables in a `.env` file:
    ```
    DATABASE_URL=your_postgres_database_url
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

The application will be running at `http://localhost:3000`.


