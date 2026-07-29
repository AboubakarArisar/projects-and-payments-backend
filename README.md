# Steward API — Backend

This repository contains the backend API for **Steward — Projects & Payments**, a project, task, team, payment, and AI management application for freelancers and small software teams.

It was developed by **Abou Bakar** as an **ACT-AI Final Assignment Project**.

## Project Links

- **Live Application:** https://trysteward.vercel.app/
- **Backend API:** https://projects-and-payments-backend.onrender.com
- **Frontend Repository:** https://github.com/AboubakarArisar/projects-and-payments
- **Backend Repository:** https://github.com/AboubakarArisar/projects-and-payments-backend

## Backend Responsibilities

The backend handles:

- User registration and login
- Owner login
- JWT authentication
- Password hashing
- Project management
- Task management
- Team-member management
- Incoming and outgoing transactions
- Email functionality
- Google Gemini AI generation
- AI generation history
- MongoDB data storage

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcrypt
- Google GenAI SDK
- Gemini 2.5 Flash
- Nodemailer
- Nodemailer Express Handlebars
- CORS
- dotenv
- Nodemon

## Main Features

### Authentication

- User registration
- User login
- Owner login
- Password hashing with bcrypt
- JWT access tokens
- Protected API routes
- Username availability checking
- Email availability checking

### Project Management

- Create projects
- Retrieve projects
- Retrieve a single project
- Update projects
- Delete projects
- Update project status

### Task Management

- Create tasks
- Retrieve tasks
- Update tasks
- Delete tasks
- Update task status
- Associate tasks with projects

### Team Management

- Add team members
- Retrieve team members
- Update member information
- Delete members

### Transaction Management

- Record incoming transactions
- Record outgoing transactions
- Retrieve transaction records
- Delete transaction records
- Supply financial data to the frontend dashboard

### Email Service

- Nodemailer integration
- Gmail SMTP support
- Handlebars email templates
- Environment-based email credentials

## AI-Powered Features

AI processing is implemented in:

```text
src/services/ai.service.js
```

The backend uses the Google GenAI SDK and defaults to:

```text
gemini-2.5-flash
```

The model can be changed through the `GEMINI_MODEL` environment variable.

### 1. Client Requirement Analyzer

```http
POST /ai/analyze-requirements
```

Analyzes raw client communication and produces:

- Summary
- Requested features
- Missing requirements
- Clarification questions
- Estimated complexity
- Suggested timeline
- Suggested budget range

### 2. Proposal Generator

```http
POST /ai/proposal
```

Creates:

- Greeting
- Requirement understanding
- Proposed solution
- Deliverables
- Timeline
- Pricing placeholder
- Closing

### 3. Fiverr and Upwork Gig Generator

```http
POST /ai/gig
```

Creates:

- SEO-friendly title
- Service descriptions
- Search tags
- Frequently asked questions
- Basic, Standard, and Premium packages
- Pricing suggestions

### 4. Professional Client Reply Generator

```http
POST /ai/reply
```

Produces a concise, professional, ready-to-send client response based on a situation, tone, and context.

### 5. Meeting Notes Summarizer

```http
POST /ai/meeting-notes
```

Returns:

- Meeting summary
- Action items
- Decisions
- Follow-up questions

## AI Prompt Design

The AI service uses specialized instructions for each tool.

The shared design principles are:

> Use only the information supplied by the user. Do not invent requirements, prices, timelines, decisions, or features. Adopt the role required by the selected tool. Return concise, practical, professional, and structured information.

The AI responses use structured response schemas so that the frontend receives predictable JSON results.

## AI History Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/ai/history` | Save an AI result |
| `GET` | `/ai/history` | Retrieve AI history |
| `DELETE` | `/ai/history/:id` | Delete one history item |
| `DELETE` | `/ai/history` | Clear AI history |

## API Authentication

Public authentication routes do not require a token.

All project, task, member, transaction, email, and AI routes require a valid JWT.

Send the token in the authorization header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

## API Route Groups

| Group | Purpose |
|---|---|
| `/register` | User registration |
| `/login` | User authentication |
| `/owner/login` | Owner authentication |
| `/projects` | Project operations |
| `/tasks` | Task operations |
| `/members` | Team-member operations |
| `/transactions` | Payment operations |
| `/send` | Email operations |
| `/ai/*` | AI generation and history |

## Local Installation

### Requirements

- Node.js
- npm
- Git
- MongoDB or MongoDB Atlas
- Google Gemini API key
- Gmail App Password for email functionality

### 1. Clone the Repository

```bash
git clone https://github.com/AboubakarArisar/projects-and-payments-backend.git
cd projects-and-payments-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create the Configuration File

The server reads environment variables from:

```text
src/config/config.env
```

Copy the provided example:

```bash
cp src/config/config.env.example src/config/config.env
```

On Windows:

```bash
copy src\config\config.env.example src\config\config.env
```

### 4. Add Environment Variables

```env
PORT=5000
NODE_ENV=DEVELOPMENT

DB_LOCAL_URI=mongodb://127.0.0.1:27017

JWT_SECRET=replace_with_a_long_random_secret

SMTP_USER=your_gmail_address@gmail.com
SMTP_PASSWORD=your_gmail_app_password
SMTP_FROM_NAME=Steward
SMTP_FROM_EMAIL=your_gmail_address@gmail.com

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

For MongoDB Atlas:

```env
DB_LOCAL_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net
```

The application adds the project database name to the MongoDB connection URI.

### 5. Start the Backend

```bash
npm start
```

For Windows development mode:

```bash
npm run dev
```

The backend runs at:

```text
http://localhost:5000
```

Opening the root endpoint returns:

```json
{
  "message": "Welcome to the Projects Payment API"
}
```

## Connect the Frontend

Set this value in the frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Restart the frontend after changing environment variables.

## Deployment Variables

Add these values through the backend hosting dashboard:

```env
PORT=5000
NODE_ENV=PRODUCTION
DB_LOCAL_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
SMTP_USER=your_email
SMTP_PASSWORD=your_email_app_password
SMTP_FROM_NAME=Steward
SMTP_FROM_EMAIL=your_sender_email
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

## Security

- Passwords are hashed before storage.
- Protected routes require JWT authentication.
- Gemini API requests are processed on the server.
- API keys and database credentials use environment variables.
- Gmail should use an App Password.
- `src/config/config.env` must never be committed.
- Production secrets must be configured through the hosting provider.

## Frontend Repository

https://github.com/AboubakarArisar/projects-and-payments

## Author

**Abou Bakar**

ACT-AI Final Assignment Project

GitHub: https://github.com/AboubakarArisar

## License

See the [LICENSE](LICENSE) file.
