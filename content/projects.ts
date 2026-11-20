import {
  Package,
  Shrink,
  Shuffle,
  BedSingle,
  PersonStanding,
} from "lucide-react";
import type { LegacyProject } from "@/types/content";

/**
 * The v1 project list, moved here unchanged (A4).
 * A5 replaces it with the final selection from docs/CONTENT.md §4.
 */
export const legacyProjects: LegacyProject[] = [
  {
    title: "AI Persona",
    description:
      "A modern analytics dashboard with real-time data visualization, user management, and subscription handling.",
    longDescription: `A sleek, animated AI web app where users build digital personas by selecting moods, professions, and interests — and AI generates a visual + textual representation of that persona. Think of it as a blend of an interactive toy, design showcase, and smart AI.

🧠 AI Features
1. OpenAI (GPT-4) generates personality bio, strengths, career path.
2. Local memory — shows previous generated personas in a card grid.`,
    summaryOfProject: {
      features: [
        {
          title: "Key Features",
          children: [
            "Landing Page with animated hero, smooth scroll, and CTA.",
            "Builder Page with:",
            "Left: Form to select mood, profession, interests.",
            "Right: Animated Persona Card (glassmorphic).",
            "On 'Generate': Calls OpenAI → shows name, bio, skills.",
            "Typewriter or shimmer loader animation.",
            "Saved Personas Grid:",
            "Shows generated personas with filters and animations.",
          ],
        },
      ],
      status: "Live and actively maintained",
    },
    image: "/images/AIPersona1.png",
    screenshots: [
      "/images/AIPersona1.png",
      "/images/AIPersona2.png",
      "/images/AIPersona3.png",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI", "Framer Motion"],
    demoUrl: "https://ai-persona-delta.vercel.app",
    githubUrl: "https://github.com/helloChirag28/AIPersona",
    icon: Package,
  },
  {
    title: "StrideX – Redefining Indian Streetwear",
    description:
      "Inspired by Nike x Adidas, designed for cool, fast, and fearless branding.",
    longDescription: `This premium landing page showcases StrideX's urban fashion identity through rich animations, video campaigns, and bold typography.
     Built with Next.js 14 and Framer Motion, the site delivers an
     immersive brand experience with product highlights, hype-building sections, and interactive visuals — designed to captivate fashion-forward users.`,
    summaryOfProject: {
      features: [
        "1. Fullscreen background video with bold headline: 'Unleash the Street Inside You.'",

        "2. Subheading + dual CTAs: Shop Now | Watch Campaign with animated text & 3D shoe.",

        "3. Horizontal split brand story: Left heading, Right photo grid with hover zoom.",

        "4. Scroll-triggered animations using Framer Motion for dynamic feel.",

        "5. Lifestyle taglines like 'Run. Jump. Dominate.' animate in subtly.",

        "6. Product showcase with horizontal scroll or parallax grid.",

        "7. Feature cards with gradient backgrounds, image zoom, and bounce effect.",

        "8. Tab switcher for Shoes | Apparel | Limited Drops.",

        "9. Full-width embedded campaign video with animated play button.",

        "10. User highlight slider with real content + overlay quotes: 'It's not fashion. It's expression.'",
      ],
      status: `This is a live demo application showcasing the design, animations, and responsiveness of the website.
 It is fully responsive across all devices and highlights the visual experience
 Functionality will be added based on user requirements and feature priorities as we move forward.`,
    },
    image: "/images/Stridex1.png",
    screenshots: [
      "/images/Stridex2.png",
      "/images/Stridex3.png",
      "/images/Stridex4.png",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "ShadCN/UI",
      "GSAP",
      "Vercel",
      "Bebas Neue",
      "Modern UI",
    ],
    demoUrl: "https://strid-ex.vercel.app/",
    githubUrl: "https://github.com/helloChirag28/stridEx",
    icon: Package,
  },
  {
    title: "Cine Prompt Generator",
    description:
      "A cinematic prompt builder for AI video tools — built for product lovers, creators.",
    longDescription: `Create cinematic AI video prompts for your products instantly.
Add product details, choose style & mood — get ready-to-use prompts for RunwayML, Pika, or Sora.
🔍 Key Highlights:
🎯 Product name, features & slogan input
🎨 Visual & music style selection
⚡ Instant prompt preview & copy
🧱 Built with Next.js, TailwindCSS, ShadCN
🎥 Perfect for ads, demos, and reels`,
    summaryOfProject: {
      features: [
        {
          title: "Interactive Prompt Builder",
          children: [
            "Dynamic form to input product details, features, visual style, and mood.",
            "Real-time cinematic prompt generation.",
          ],
        },
        {
          title: "Prompt Management Tools",
          children: [
            "Copy, share, and download generated prompts.",
            "Local storage support for saving and managing user prompts.",
          ],
        },
        {
          title: "Live Animated Preview Cards",
          children: [
            "Beautiful cards with smooth Framer Motion transitions.",
            "Cinematic preview with real-time updates.",
          ],
        },
        {
          title: "Template & Inspiration System",
          children: [
            "Pre-built templates for quick start.",
            "Random slogan/mood suggestions for creative exploration.",
          ],
        },
        {
          title: "Responsive UI/UX Design",
          children: [
            "Mobile-first design with grid system optimized for all screen sizes.",
            "Seamless experience across mobile, tablet, and desktop.",
          ],
        },
        {
          title: "Modern Aesthetic",
          children: [
            "Glassmorphism, gradient backgrounds, and micro-interactions.",
            "Cinematic color palette: deep blues, purples, golds.",
            "Professional typography for strong visual hierarchy.",
          ],
        },
      ],
      status: "Live and actively maintained",
    },
    image: "/images/Cine1.png",
    screenshots: [
      "/images/Cine1.png",
      "/images/Cine2.png",
      "/images/Cine3.png",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN/UI",
      "Framer Motion",
      "Prompt Engineering",
      "AI Tools",
      "RunwayML",
      "Pika Labs",
    ],
    demoUrl: "https://cine-prompt-generator.vercel.app",
    githubUrl: "https://github.com/helloChirag28/CinePromptGenerator",
    icon: Shrink,
  },
  {
    title: "FormForge AI Form Builder",
    description:
      'Build a smart, minimal, and highly usable AI Form Builder web application named "FormForge',
    longDescription: `The core idea is that users just write a single-line prompt like: "Create a job application form", and the system uses the OpenAI GPT API to auto-generate a full form:

with labeled fields, input types, validation rules, and sections if needed.

Users can preview the form, edit it manually, and export the final result as JSON or copy the HTML code.`,
    summaryOfProject: {
      features: [
        {
          title: "AI-Powered Form Generation (via Ollama)",
          children: [
            "Instantly generate entire forms from natural language prompts.",
            "Powered by Ollama (local LLM) for private, fast, and customizable AI inference.",
          ],
        },
        {
          title: "Real-Time Preview & Editing",
          children: [
            "Live preview of generated forms with seamless interaction.",
            "Drag-and-drop field reordering and inline customization.",
          ],
        },
        {
          title: "Flexible Export Options",
          children: [
            "Export form structure as JSON, HTML, or shareable links.",
            "Developer-friendly output for easy integration.",
          ],
        },
        {
          title: "Form Validation & Live Feedback",
          children: [
            "Real-time form validation with customizable rules.",
            "Visual error indicators and smooth error handling UX.",
          ],
        },
        {
          title: "Responsive SaaS-Style Interface",
          children: [
            "Modern, clean design inspired by top-tier SaaS products.",
            "Built for performance and clarity on all device sizes.",
          ],
        },
        {
          title: "Fully Responsive & Mobile-First",
          children: [
            "Adaptive layouts for mobile, tablet, and desktop.",
            "Touch-optimized interactions and scaling UI components.",
          ],
        },
        {
          title: "Polished UI/UX Details",
          children: [
            "Framer Motion animations, glass-morphism backgrounds, and card-based layouts.",
            "Inter font with well-structured visual hierarchy.",
            "Hover states, subtle shadows, and interactive loading effects.",
          ],
        },
      ],
      status: "Live and actively maintained",
    },
    image: "/images/FromFrog1.png",
    screenshots: [
      "/images/FromFrog1.png",
      "/images/FormFrog2.png",
      "/images/FormFrog3.png",
    ],
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Ollama",
      "ShadCN/UI",
      "Framer Motion",
      "Prompt Engineering",
      "AI Tools",
    ],
    demoUrl: "https://form-forge-six.vercel.app/",
    githubUrl: "https://github.com/helloChirag28/FormForge",
    icon: Shuffle,
  },
  {
    title: "Smart Invoice Generator — InvoicelyAI",
    description:
      "Build a modern, clean, and mobile-friendly Invoice Generator Web App called InvoicelyAI",
    longDescription: `The user can fill out a form with invoice details (client name, items, amounts, taxes, etc.), and on submit, the app will instantly generate a professional invoice PDF that can be downloaded or shared via link/email.

This is perfect for freelancers, small businesses, and agencies to generate and send branded invoices in a few clicks.`,
    summaryOfProject: {
      features: [
        "Professional invoice generation",
        "PDF export functionality",
        "Client management",
        "Tax calculation",
        "Email sharing",
      ],
      status: "Live and actively maintained",
    },
    image: "/images/Invoice2.png",
    screenshots: ["/images/Invocie1.png", "/images/Invoice2.png"],
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Invoice Generator",
      "PDF Export",
      "React Hook Form",
      "ShadCN UI",
      "Freelancing Tool",
      "SaaS",
      "Zod Validation",
    ],
    demoUrl: "https://invoicely-ai.vercel.app/",
    githubUrl: "https://github.com/helloChirag28/InvoicelyAI",
    icon: Shuffle,
  },
  {
    title: "Smart Booking System for Local Businesses -BookEase",
    description:
      "This is the demo application of Smart Booking System for Local Businesses",
    longDescription: `Build a Smart Booking System web application called "BookEase" – designed for local service-based businesses such as salons, gyms, yoga studios, massage centers, or coaching classes.
The app should support real-time slot booking, Stripe payment integration, and an AI assistant that helps users pick the best available time slot based on their preferences and past behavior.`,
    summaryOfProject: {
      features: [
        {
          title: "Real-Time Booking Engine",
          children: [
            "Supabase integration for live booking data sync.",
            "Instant availability checks with dynamic slot updates.",
          ],
        },
        {
          title: "Secure Payment System",
          children: [
            "Full Stripe integration with checkout, webhooks, and refunds.",
            "Professional UI using Stripe Elements for a seamless payment experience.",
          ],
        },
        {
          title: "AI-Powered Booking Assistant",
          children: [
            "Conversational AI modal powered by OpenAI API.",
            "Smart time slot suggestions based on user intent and history.",
          ],
        },
        {
          title: "Authentication & Admin Control",
          children: [
            "Secure login/signup with role-based access.",
            "Admin dashboard with real-time bookings, user data, and controls.",
          ],
        },
        {
          title: "Automated Notifications",
          children: [
            "Email confirmations and alerts for new, updated, or canceled bookings.",
            "Integration-ready for transactional email services (e.g., Resend, Postmark).",
          ],
        },
        {
          title: "Live Analytics & Dashboard",
          children: [
            "Real-time metrics on bookings, revenue, and user activity.",
            "Clean, responsive UI for both users and admins.",
          ],
        },
        {
          title: "Responsive & Polished UI/UX",
          children: [
            "Maintains gradient visuals and smooth animations.",
            "Optimized layout for mobile, tablet, and desktop experiences.",
            "Real-time slot coloring and visual feedback on booking states.",
          ],
        },
      ],
      status: `This is a demo version of the application showcasing the design, user flow, and core structure.
Currently, Supabase integration, Stripe payments, and authentication are not fully functional, as they require real accounts and secure setup. These features are temporarily disabled or mocked for demonstration purposes.
The app is also not fully responsive yet, as the primary focus has been on building the booking flow and UI/UX foundation.

This version is intended for previewing the concept, layout, and design before full production deployment.`,
    },
    image: "/images/Bookease1.png",
    screenshots: [
      "/images/Bookease1.png",
      "/images/Bookease2.png",
      "/images/Bookease3.png",
      "/images/Bookease4.png",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Stripe",
      "AI Assistant",
      "Tailwind CSSs",
      "Framer Motion",
      "ShadCN UI",
    ],
    demoUrl: "https://book-ease-theta.vercel.app/",
    githubUrl: "https://github.com/helloChirag28/BookEase",
    icon: BedSingle,
  },
  {
    title: "HabitPulse – Track. Grow. Stay Motivated.",
    description:
      "Build a modern, clean, and mobile-friendly AI-powered Habit Tracker web application named HabitPulse",
    longDescription: `This app helps users track habits, stay consistent with daily motivational reminders, and receive weekly AI-powered progress analysis & improvement tips.

The app should include habit creation, streak tracking, calendar view, and a CJ-style Motivation Bot that chats with the user and encourages them based on progress.`,
    summaryOfProject: {
      features: [
        "Habit tracking and streak monitoring",
        "AI-powered progress analysis",
        "Daily motivational reminders",
        "Calendar view",
        "CJ-style Motivation Bot",
      ],
      status: `The application is currently in demo mode showcasing the core features, UI/UX, and functionality flow.
     The Motivation Bot (CJ-style) is not fully functional yet, as OpenAI integration is pending.
    Currently, habit tasks and streaks are stored in local storage, simulating real app behavior for demonstration purposes.
    The UI is fully interactive, and users can test the habit creation, calendar view, and streak tracking flows.`,
    },
    image: "/images/Habbitplus1.png",
    screenshots: [
      "/images/Habbitplus1.png",
      "/images/Habbitplus2.png",
      "/images/Habitplus3.png",
    ],
    tags: [
      "Next.js",
      "Prisma",
      "Tailwind CSS",
      "OpenAI API",
      "Framer Motion",
      "AI Habit Tracker",
      "CJ Bot",
      "Mental Health App",
      "ShadCN/UI",
    ],
    demoUrl: "https://habit-pulse-nine.vercel.app/",
    githubUrl: "https://github.com/helloChirag28/HabitPulse",
    icon: PersonStanding,
  },
];
