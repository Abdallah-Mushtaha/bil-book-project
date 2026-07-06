# From "Free Work" to a Production-Ready, Secure Platform 🙌

A writer asked me to build her a digital book-selling platform. The budget wasn't there, and she asked for the work for free. I refused to stop at that point — I built it myself, and found a vulnerability in it that would have let anyone download the book without paying for it.

A story that started with a request for "free work" and ended with a technical challenge that made me re-examine everything I knew about Security and Testing.

Readers of this book were scattered everywhere, and the problem was the lack of a unified payment method; every customer paid a different way, and that was a major obstacle to selling the book online.

I proposed a solution: a complete digital book-selling platform unifying payments via PayPal for most countries. I built a demo, she liked the work, but since she was a new writer with her first book, she couldn't cover the project's budget.

I turned the situation into a personal challenge: build a complete, professional version with real security and quality standards — _"Building a production-ready, secure platform — not for a client this time, but for myself."_

The result was a fully integrated digital book-selling platform, from the landing page all the way to a secure book download.

## 🟡 Key Technical Decisions

- Built a complete payment flow: PayPal sandbox → order tracking on Supabase.
- Used Clerk for authentication instead of building an auth system from scratch — saved time and delivered a much higher level of security.

## 🟡 The Hardest Challenge

During the security review, I discovered that some API routes were trusting the `userId` coming from query params in the URL itself, instead of verifying the actual user identity through the session. This is a known vulnerability called **IDOR (Insecure Direct Object Reference)** — anyone who knew an Order ID could download a book they never purchased! I fixed it completely by tying every request to an authenticated Clerk session, not to a value coming from the client.

## 🟡 Going Further — A Full Protection Layer Review

I didn't stop there. I reviewed the entire protection layer from start to finish:

- Converted the storage bucket from public to fully private, so there would be no fixed static public URL that anyone could open directly without going through the application code.
- Even if someone managed to obtain the file download link itself, the signed URL expires after only 60 seconds — so if it ever leaked or was stolen, it becomes useless before anyone could use it.

## 🟡 Testing: The Step I Kept Postponing

After identifying and fixing all of this, I finally tackled something I kept telling myself "wasn't the time" for, even though it's a critical part of the work: **Testing**.

I learned testing from scratch and wrote my first-ever unit tests using Vitest, reaching 12 passing test cases across four different API routes. I also wrote real integration tests against an isolated test database, completely separate from production data. Most importantly, I wrote a dedicated regression test to prevent the same IDOR vulnerability from ever coming back.

## 🔵 Tech Stack

**Framework & Language**

- Next.js 16.2.9
- React 19.2.4 / React DOM 19.2.4
- TypeScript 5

**Auth, Backend & Payments**

- Clerk (`@clerk/nextjs` 7.5.9) — Authentication
- Supabase (`@supabase/supabase-js` 2.108.2) — Database / order tracking
- PayPal (`@paypal/react-paypal-js` 10.1.0) — Payment flow
- Vercel Blob (`@vercel/blob` 2.5.0) — Secure file storage

**UI & Interaction**

- Tailwind CSS 4.3.1 (`@tailwindcss/postcss` 4.3.1)
- Radix UI Dialog (`@radix-ui/react-dialog` 1.1.18)
- Framer Motion 12.42.0
- react-pageflip 2.0.3

**Testing**

- Vitest 4.1.9
- @testing-library/react 16.3.2
- @testing-library/jest-dom 6.9.1
- jsdom 29.1.1
- vite-tsconfig-paths 6.1.1

**Tooling**

- ESLint 9 (`eslint-config-next` 16.2.9)
- PostCSS 8.5.15

## Why I'm Sharing This

My goal in sharing this story isn't just a portfolio showcase. I want every independent frontend developer to see that Security and Testing aren't "nice-to-have" — they're fundamentals that must be part of any project involving real payments or user data.

The live demo and GitHub repo links are in the first comment 👇

Honestly — when you find a vulnerability, do you fix it and move on, or do you go back and audit the rest of the code for similar issues before continuing?

`#WebSecurity #SoftwareTesting #NextJS #ReactJS #FrontendEngineering`

---

### 💬 First Comment

🔗 **Live Demo:** https://bil-book-project.vercel.app/
🔗 **GitHub Repo:** https://github.com/Abdallah-Mushtaha/bil-book-project
