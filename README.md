# 📚 "Acadeva" a Learning Management System Website Like Udemy Made Using [NextJS](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), Typescript, [Prisma](https://www.prisma.io/) As ORM, [CockroachDB](https://www.cockroachlabs.com/) As PostgreSQL, [Clerk](https://clerk.com/) For Authentication, [Stripe](https://stripe.com/in) For Payment, [Mux](https://www.mux.com/) For Video Processing, [Shadcn UI](https://ui.shadcn.com/) For User Interface And Much More.

## 🎯 Dummy Stripe Payment
Stripe Is In Test Mode. So, Use Dummy Card Numbers Given Below
```bash
INDIA - 4000003560000008
USA - 4242424242424242
```

## 🎯 Clone The Repo
```bash
git clone https://github.com/psykat1116/Acadeva.git
```

## 🎯 Run The Development
### !! - Don't Forget To Convert The Folder Name To Lowercase Otherwise, It Can Lead To A Problem - !!
```bash
cd Acadeva
npm run dev
```

## 🎯 .env File
### Create a .env file in the root folder with the following variable
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL= /sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL= /sign-up
DATABASE_URL=
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
MUX_TOKEN_ID=
MUX_TOKEN_SECRET=
NEXT_PUBLIC_SITE_URL = http://localhost:3000
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_TEACHER_ID=
```

## 🎯 Get Database Url
- Go Through [CockroachDB](https://www.cockroachlabs.com/) Website Create An Account & Create A Cluster. You can only create <b>Single</b> Cluster For Free.
- After Create Your Free Cluster Save The Password For Use In the DB Connection String.
- Choose Your Database, Language, OS, ORM, and User & Copy The URL string & Paste it Into The .env file.
- I Use Typescript & Prisma ORM
```bash
DATABASE_URL = postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=verify-full
```

## 🎯 Clerk Authentication
- Create Your Account And Create a New Application
- Set The Login And Sign Up for Medium Like Google, Github, Email, Phone No, etc
- Get `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` and paste into .env File
- Go Through the documentation

## 🎯 Stripe Integration
- Create Your Stripe Account and create a new project account
- Get The Secret Key & Set This Into `STRIPE_SECRET_KEY`
- For Testing The Webhook In the Local Environment Go Through the [Local Environemnt](https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local)
- First Download The [Stripe CLI](https://stripe.com/docs/stripe-cli)
- Run The Following Code Into The Terminal
  ```bash
  stripe login
  stripe listen --forward-to localhost:3000/api/webhook
  ```
- After Running This You Will Get A Code & Paste it into `STRIPE_WEBHOOK_SECRET`
- For Hosted Website Set `NEXT_PUBLIC_SITE_URL` to your hosted website URL
- Get Webhook Secret From [Here](https://dashboard.stripe.com/test/webhooks/create)
- Endpoint URL will be hosted website URL & Selected Events Will Be
  ```bash
  Checkout -> checkout.session.completed
  ```
- Update The STRIPE_WEBHOOK_SECRET to your hosted website `https://{website}/api/webhook`

## 🎯 Uploadthing Integration
- Go To Uploadthing Website Create An Account & Create a new app
- Get The API Keys In the `API keys section` And Set The Value Of `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`

## 🎯 Mux Integration
- Go To The MUX Website & Create An Account
- Get The `MUX_TOKEN_SECRET` From `Settings -> Access Tokens -> Generate New Token`
- You Will Also Get `MUX_TOKEN_ID` From There In The `Token ID` Column
