export const getBotResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();

  // Greetings
  if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
    return "Hello there! How can I help you today?";
  }

  // Help requests
  else if (lowerInput.includes("help") || lowerInput.includes("assist")) {
    return "I'd be happy to help! I can answer questions about my services, experience, or you can use the form on the right to send me a message directly.";
  }

  // Contact information
  else if (
    lowerInput.includes("contact") ||
    lowerInput.includes("email") ||
    lowerInput.includes("phone") ||
    lowerInput.includes("reach")
  ) {
    return "You can contact me using the form on the right, or email me directly at pavanhutagi@gmail.com. I'll get back to you as soon as possible!";
  }

  // Services and products
  else if (
    lowerInput.includes("service") ||
    lowerInput.includes("product") ||
    lowerInput.includes("offer") ||
    lowerInput.includes("do you")
  ) {
    return "I offer web development, design, and consulting services. Is there a specific service you'd like to know more about?";
  }

  // Pricing inquiries
  else if (
    lowerInput.includes("price") ||
    lowerInput.includes("cost") ||
    lowerInput.includes("quote") ||
    lowerInput.includes("expensive") ||
    lowerInput.includes("cheap")
  ) {
    return "My pricing depends on your specific project needs. Fill out the contact form with your project details, and I'll be happy to provide you with a custom quote!";
  }

  // Gratitude
  else if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
    return "You're welcome! Happy to help. Is there anything else you'd like to know?";
  }

  // Goodbyes
  else if (
    lowerInput.includes("bye") ||
    lowerInput.includes("goodbye") ||
    lowerInput.includes("see you")
  ) {
    return "Thanks for chatting! Feel free to come back if you have any more questions. Have a great day!";
  }

  // Personal information
  else if (
    lowerInput.includes("company") ||
    lowerInput.includes("about") ||
    lowerInput.includes("who are you")
  ) {
    return "I'm a dedicated developer focused on creating amazing digital experiences. Check out my About section to learn more about my background and skills!";
  }

  // Location
  else if (
    lowerInput.includes("where") ||
    lowerInput.includes("location") ||
    lowerInput.includes("address")
  ) {
    return "I'm based in [Your Location], but I work with clients globally! The internet is my playground.";
  }

  // Timeline questions
  else if (
    lowerInput.includes("how long") ||
    lowerInput.includes("timeline") ||
    lowerInput.includes("deadline") ||
    lowerInput.includes("when")
  ) {
    return "Project timelines vary based on scope and requirements. I work efficiently to meet your deadlines! Contact me with your project details for a more specific estimate.";
  }

  // AI/Bot awareness
  else if (
    lowerInput.includes("ai") ||
    lowerInput.includes("bot") ||
    lowerInput.includes("robot") ||
    lowerInput.includes("human") ||
    lowerInput.includes("real person")
  ) {
    return "Yep, I'm a friendly bot here to help answer your questions! For more complex inquiries, you can reach out to me directly through the contact form.";
  }

  // Jokes
  else if (
    lowerInput.includes("joke") ||
    lowerInput.includes("funny") ||
    lowerInput.includes("laugh")
  ) {
    return "Why don't programmers like nature? It has too many bugs and no debugging tool! Ba dum tss!";
  }

  // Portfolio/examples
  else if (
    lowerInput.includes("portfolio") ||
    lowerInput.includes("example") ||
    lowerInput.includes("work") ||
    lowerInput.includes("project")
  ) {
    return "I've worked on some amazing projects! Check out my portfolio section to see examples of my work across different industries.";
  }

  // Technology stack
  else if (
    lowerInput.includes("tech") ||
    lowerInput.includes("stack") ||
    lowerInput.includes("framework") ||
    lowerInput.includes("language")
  ) {
    return "I'm proficient in modern technologies like React, Node.js, and various other frameworks and languages. I choose the right tools for each unique project!";
  }

  // Skills and expertise
  else if (
    lowerInput.includes("skill") ||
    lowerInput.includes("expert") ||
    lowerInput.includes("specialty") ||
    lowerInput.includes("good at")
  ) {
    return "My core skills include front-end and back-end development, responsive design, API integration, and performance optimization. I'm particularly strong in creating intuitive user experiences!";
  }

  // Experience
  else if (
    lowerInput.includes("experience") ||
    lowerInput.includes("years") ||
    lowerInput.includes("background") ||
    lowerInput.includes("history")
  ) {
    return "I have 6 years of experience in web development, working with clients ranging from startups to established businesses. My diverse background allows me to tackle a wide range of projects!";
  }

  // Education and certifications
  else if (
    lowerInput.includes("education") ||
    lowerInput.includes("degree") ||
    lowerInput.includes("certification") ||
    lowerInput.includes("qualified")
  ) {
    return "I hold a degree in masters of computer application and have several certifications in web technologies. I'm also constantly learning to stay up-to-date with the latest industry trends!";
  }

  // Availability
  else if (
    lowerInput.includes("available") ||
    lowerInput.includes("start") ||
    lowerInput.includes("schedule") ||
    lowerInput.includes("busy")
  ) {
    return "I'm currently taking on new projects! My availability varies, so please reach out with your timeline and I'll let you know if it works with my schedule.";
  }

  // Process
  else if (
    lowerInput.includes("process") ||
    lowerInput.includes("workflow") ||
    lowerInput.includes("approach") ||
    lowerInput.includes("how do you work")
  ) {
    return "My process typically involves discovery, planning, design, development, testing, and launch phases. I believe in collaborative work and keeping clients informed throughout the project!";
  }

  // Testimonials and reviews
  else if (
    lowerInput.includes("testimonial") ||
    lowerInput.includes("review") ||
    lowerInput.includes("feedback") ||
    lowerInput.includes("client say")
  ) {
    return "I've been fortunate to work with amazing clients who've shared positive feedback about our collaborations. Check out the testimonials section to see what they have to say!";
  }

  // Maintenance and support
  else if (
    lowerInput.includes("maintenance") ||
    lowerInput.includes("support") ||
    lowerInput.includes("after") ||
    lowerInput.includes("ongoing")
  ) {
    return "I offer ongoing maintenance and support packages to keep your website or application running smoothly after launch. We can discuss the details based on your specific needs!";
  }

  // Hosting and domains
  else if (
    lowerInput.includes("hosting") ||
    lowerInput.includes("domain") ||
    lowerInput.includes("server") ||
    lowerInput.includes("website up")
  ) {
    return "I can help with hosting recommendations and setup, as well as domain registration if needed. I'll make sure your website is secure and performs well!";
  }

  // Social media
  else if (
    lowerInput.includes("social") ||
    lowerInput.includes("linkedin") ||
    lowerInput.includes("twitter") ||
    lowerInput.includes("instagram") ||
    lowerInput.includes("github")
  ) {
    return "You can find me on various social platforms! Check out the social links in the footer to connect with me on LinkedIn, GitHub, Twitter, and more.";
  }

  // Blog or content
  else if (
    lowerInput.includes("blog") ||
    lowerInput.includes("article") ||
    lowerInput.includes("content") ||
    lowerInput.includes("write")
  ) {
    return "I occasionally share insights and tips on my blog. Feel free to check it out for some useful content related to web development and design!";
  }

  // Collaboration
  else if (
    lowerInput.includes("collaborate") ||
    lowerInput.includes("partner") ||
    lowerInput.includes("together") ||
    lowerInput.includes("team up")
  ) {
    return "I'm always open to interesting collaborations! Whether you're another developer, designer, or business looking to partner up, let's discuss how we can work together.";
  }

  // Default response
  else {
    return "I'm not sure I understand. Could you try rephrasing that? I'm here to help with questions about my services, experience, or projects!";
  }
};
