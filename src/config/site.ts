export const SITE = {
  name: "Pavan Hutagi",
  role: "Frontend Engineer & Architect",
  title: "Pavan Hutagi | Frontend Engineer & Architect",
  description:
    "The portfolio of Pavan Hutagi — Frontend Engineer & Architect with 7+ years building scalable, high-performance web applications. Rendered in real time with WebGPU.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pavanhutagi.com",
  locale: "en_IN",
  location: "Bengaluru, India",
  links: {
    github: "https://github.com/pavanhutagi",
    linkedin: "https://www.linkedin.com/in/pavanhutagi",
    email: "mailto:hello@pavanhutagi.com",
  },
} as const;
