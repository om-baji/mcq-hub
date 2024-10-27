# MCQ Hub

MCQ Hub is a modern, AI-powered platform for multiple-choice quizzes. The application includes timed quizzes, real-time feedback, and AI-generated questions, making it ideal for learning and testing knowledge across various domains.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure sign-up, login, and logout functionality with email verification.
- **AI-Powered Quizzes:** Uses the Gemini AI API for generating dynamic quiz questions.
- **Timed Quizzes:** Customizable time limits for each quiz session.
- **Real-time Feedback:** Immediate evaluation of answers with a responsive UI.
- **Progress Tracking:** Track and analyze quiz performance over time.
- **Responsive Design:** Mobile-friendly UI with modern, smooth transitions and rounded aesthetics.

## Tech Stack

- **Frontend:** Next.js, ShadCN, Tailwind CSS
- **Backend:** Next.js server actions, Node.js
- **Database:** MongoDB
- **AI Integration:** Gemini AI API
- **Authentication:** NextAuth with JWT (supports Google, GitHub, and custom credentials)
- **Other Libraries:** Axios for data fetching, React Hook Form for form handling, Zod for validation

## Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/om-baji/mcq-hub.git
    cd mcq-hub
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables** (see [Configuration](#configuration) for details)

4. **Run database migrations**
    ```bash
    npx prisma migrate dev
    ```

5. **Start the application**
    ```bash
    npm run dev
    ```

6. Access the app at `http://localhost:3000`.

## Usage

- **Quiz Creation:** Create quizzes by adding questions, options, tags, and setting the correct answer.
- **AI-Powered Questions:** Leverage Gemini AI for dynamic and engaging quiz questions.
- **Taking Quizzes:** Choose a quiz, answer questions, and receive instant feedback.
- **Timed Sessions:** Complete quizzes within the set time for an added challenge.
  
## Configuration

Add a `.env` file in the root directory with the following variables:

```plaintext
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
```