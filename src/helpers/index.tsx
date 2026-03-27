import Image from "next/image";

type FloatImg = {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: number;
  height: number;
  reactivity: number;
};

export const floatImages: FloatImg[] = [
  {
    src: "/1.png",
    alt: "Workspace",
    top: "-5%",
    left: "10%",
    width: 263,
    height: 173,
    reactivity: 1,
  },
  {
    src: "/2.png",
    alt: "Technology",
    top: "5%",
    left: "40%",
    width: 155,
    height: 155,
    reactivity: 0.9,
  },
  {
    src: "/3.png",
    alt: "AI",
    top: "-1%",
    left: "64%",
    width: 215,
    height: 120,
    reactivity: 1,
  },
  {
    src: "/8.png",
    alt: "Team",
    top: "27%",
    right: "-1%",
    width: 200,
    height: 120,
    reactivity: 0.7,
  },
  {
    src: "/7.png",
    alt: "VR Innovation",
    bottom: "5%",
    right: "-2%",
    width: 285,
    height: 300,
    reactivity: 0.8,
  },
  {
    src: "/6.png",
    alt: "Strategy Meeting",
    bottom: "10%",
    left: "57%",
    width: 185,
    height: 105,
    reactivity: 0.85,
  },
  {
    src: "/5.png",
    alt: "Developer",
    bottom: "7%",
    left: "20%",
    width: 300,
    height: 200,
    reactivity: 0.9,
  },
  {
    src: "/4.png",
    alt: "Office Team",
    bottom: "47%",
    left: "-1%",
    width: 180,
    height: 215,
    reactivity: 0.75,
  },
];

export const floatImagesForServices: FloatImg[] = [
  {
    src: "/Services1.png",
    alt: "Workspace",
    top: "-5%",
    left: "10%",
    width: 263,
    height: 173,
    reactivity: 1,
  },
  {
    src: "/Services2.png",
    alt: "Technology",
    top: "5%",
    left: "40%",
    width: 155,
    height: 155,
    reactivity: 0.9,
  },
  {
    src: "/Services3.png",
    alt: "AI",
    top: "-1%",
    left: "64%",
    width: 215,
    height: 120,
    reactivity: 1,
  },
  {
    src: "/Services4.png",
    alt: "Team",
    top: "27%",
    right: "-1%",
    width: 200,
    height: 120,
    reactivity: 0.7,
  },
  {
    src: "/Services5.png",
    alt: "VR Innovation",
    bottom: "5%",
    right: "-2%",
    width: 285,
    height: 300,
    reactivity: 0.8,
  },
  {
    src: "/Services6.png",
    alt: "Strategy Meeting",
    bottom: "10%",
    left: "57%",
    width: 185,
    height: 105,
    reactivity: 0.85,
  },
  {
    src: "/Services7.png",
    alt: "Developer",
    bottom: "7%",
    left: "20%",
    width: 300,
    height: 200,
    reactivity: 0.9,
  },
  {
    src: "/Services8.png",
    alt: "Office Team",
    bottom: "47%",
    left: "-1%",
    width: 180,
    height: 215,
    reactivity: 0.75,
  },
];
export const FAQS = [
  {
    q: "What makes Happy2Tech different?",
    a: `Happy2Tech abandons the rigid grid. Instead, you get organic shapes, glassmorphic layers,
and a service wheel that responds to how you actually work. It's technology built on intention,
not convention.`,
  },
  {
    q: "How do I integrate my tools?",
    a: `Integration happens in seconds. Connect your platforms through the Happy2Tech service wheel,
and everything flows together without friction. No complex setup. No waiting.`,
  },
  {
    q: "Will parallax work on mobile?",
    a: `Parallax is optimized for desktop and tablet experiences where it shines. Mobile gets a streamlined,
touch-friendly version that keeps the same fluid feeling without the overhead.`,
  },
  {
    q: "Can I customize the interface?",
    a: `Yes. The borderless layout adapts to your workflow. Adjust colors, rearrange sections, and make
Happy2Tech feel like it was built just for you.`,
  },
  {
    q: "What about security and privacy?",
    a: `Your data stays yours. Happy2Tech uses enterprise-grade encryption and never sells your information.
We built this for people who care about what matters.`,
  },
];
export const cards = [
  {
    img: "/About 1.png",
    alt: "Strategic Clarity",
    title: "Strategic Clarity",
    body: "Businesses don't just need technology; they need clarity. We bridge the gap between fragmented systems and your long-term vision with thoughtful, strategic planning.",
  },
  {
    img: "/About 2.png",
    alt: "Technical Depth",
    title: "Technical Depth",
    body: "Our team of experienced developers and architects focuses on scalability, security, and sustainability from day one, ensuring every technical decision supports business growth.",
  },
  {
    img: "/About 3.png",
    alt: "Global Mindset",
    title: "Global Mindset",
    body: "Operating with a global perspective, we respect cultural dynamics and time zones to ensure seamless collaboration and excellence, wherever your business is located.",
  },
];
export const visionItems = [
  {
    title: "We Start With Your Business",
    body: "Every system we create begins with understanding your goals. Technology follows strategy, not the other way around. We invest time in understanding your operations, your challenges, your users, and your market environment.",
  },
  {
    title: "Clear Communication",
    body: "Our strategic approach ensures that every technological decision—from platform to architecture aligns with your long-term vision. We keep you informed. Updates, milestones, and progress reports make sure you always know what’s happening.",
  },
  {
    title: "Built to Grow",
    body: " Your systems are designed to grow with your business. More users, new markets, or added features won’t slow you down. We focus on scalability, security, and sustainability to create measurable outcomes and sustainable change.",
  },
];
export const strategyItems = [
  {
  title: "Technical Skill",
  body: "Our engineers bring deep expertise across modern stacks — from cloud-native infrastructure to scalable APIs and responsive frontends. We don't just build what works today; we architect systems that stay reliable, maintainable, and secure as your business grows.",
},
{
  title: "High Quality",
  body: "Quality isn't a final step — it's built into every stage of our process. We run thorough testing across performance, usability, accessibility, and security before anything goes live, so you can launch with confidence and your users get a seamless experience from day one.",
},
{
  title: "Global Experience",
  body: "We've partnered with businesses across Europe, the Middle East, and beyond. We understand that working across borders means more than just managing time zones — it means adapting to different markets, communication styles, and business cultures to deliver results that truly fit your context.",
},
];

// In @/src/helpers — rename services to serviceKeys and remove all text fields

export const serviceKeys = [
  {
    id: "custom_software_development",
    eyebrow: "",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#B10D10]">
        <path d="M14.7 6.3a3 3 0 1 0-4.24 4.24l6.66 6.66a2 2 0 1 0 2.83-2.83L13.3 7.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.4 9.6 4 14m0 0 2 2m-2-2 4.4-4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    image: null,
    className: "lg:col-start-1 lg:row-start-1",
  },
  {
    id: "mobile_app_development",
    eyebrow: "Commerce",
    icon: null,
    image: "/mobileDev.svg",
    className: "lg:col-start-2 lg:row-start-1 lg:row-span-2",
  },
  {
    id: "it_consulting_and_strategy",
    eyebrow: "",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#B10D10]">
        <path d="M12 3 7 6v6c0 4 2.5 7 5 8 2.5-1 5-4 5-8V6l-5-3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M18 4h3v3m-6-2h2m-10 6H4v-3m4 10H5v-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    image: null,
    className: "lg:col-start-3 lg:row-start-1",
  },
  {
    id: "web_and_ecommerce_solutions",
    eyebrow: "Development",
    icon: null,
    image: "/web&commerce.svg",
    className: "lg:col-start-1 lg:row-start-2 lg:row-span-2",
  },
  {
    id: "cloud_and_devops_services",
    eyebrow: "",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#B10D10]">
        <path d="M7 18a4 4 0 1 1 .5-7.97A5.5 5.5 0 0 1 18 12a3.5 3.5 0 1 1-.5 6H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    image: null,
    className: "lg:col-start-2 lg:row-start-3",
  },
  {
    id: "systems_support_and_maintenance",
    eyebrow: "Support",
    icon: null,
    image: "/systemSupport.svg",
    className: "lg:col-start-3 lg:row-start-2 lg:row-span-2",
  },
];
export const buildKeys = [
  {
    id: "seo",
    hasBullets: false,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#C11212]">
        <path d="M4 18h16M6 18V7m4 11V10m4 8V5m4 13V9M3 5h18v13H3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    image: null,
    className: "lg:col-start-1 lg:row-start-1",
  },
  {
    id: "creative-digital-design",
    hasBullets: true,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#C11212]">
        <rect x="4" y="3.5" width="16" height="17" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 9.2c.9-1.5 3.6-1.5 4.3.4.4 1.2-.2 2.5-1.4 3.5L12 16l-2.9-2.9c-1.2-1-1.8-2.3-1.4-3.5.7-1.9 3.4-1.9 4.3-.4Z" fill="currentColor" />
      </svg>
    ),
    image: "/health.svg",
    className: "lg:col-start-2 lg:row-start-1 lg:row-span-2",
  },
  {
    id: "web-hosting-and-infrastructure",
    hasBullets: false,
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#C11212]">
        <path d="M12 4a6 6 0 1 0 5.2 9M12 7v10m2.2-7.5c0-1-1-1.8-2.2-1.8s-2.2.8-2.2 1.8S10.8 11 12 11s2.2.8 2.2 1.8-1 1.7-2.2 1.7-2.2-.8-2.2-1.7M18 14v4m0 0-2-2m2 2 2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    image: null,
    className: "lg:col-start-3 lg:row-start-1",
  },
  {
    id: "transforming-digital-learning",
    hasBullets: false,
    icon: null,
    image: "/transform.svg",
    className: "lg:col-start-1 lg:row-start-2",
  },
  {
    id: "high-performing-digital-commerce",
    hasBullets: false,
    icon: null,
    image: "/digital.svg",
    className: "lg:col-start-3 lg:row-start-2",
  },
];