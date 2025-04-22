# GymBro - AI-Powered Fitness Assistant

GymBro is a modern web application that helps users create personalized workout and meal plans using AI. It features a credit-based system where users can purchase credits to generate plans.

## Features

- 🤖 AI-generated personalized workout plans
- 🥗 AI-generated personalized meal plans
- 📊 Weight tracking and progress monitoring
- 💳 Credit-based system for plan generation
- 🔒 Secure authentication with Clerk
- 💰 Stripe integration for credit purchases
- 📱 Responsive design for all devices

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk
- **Payments:** Stripe
- **AI:** OpenAI GPT-3.5
- **Styling:** Tailwind CSS with shadcn/ui
- **API Layer:** tRPC for end-to-end type safety

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- PostgreSQL database
- Stripe account
- Clerk account
- OpenAI API key

### Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/joysamaddar/gymbro.git
cd gymbro
```

2. Install dependencies:

```bash
npm install
```

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

## Stripe Webhook Setup

For local development, you'll need to set up Stripe webhooks:

1. Install the Stripe CLI:

```bash
brew install stripe/stripe-cli/stripe
```

2. Log in to Stripe:

```bash
stripe login
```

3. Start webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

4. Copy the webhook signing secret and add it to your `.env` file.

## Credit System

The application uses a credit-based system:

- New users receive 2 free credits
- Each workout plan or meal plan generation costs 1 credit
- Users can purchase additional credits

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'FEAT:Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [OpenAI](https://openai.com/)
- [shadcn/ui](https://ui.shadcn.com/)
