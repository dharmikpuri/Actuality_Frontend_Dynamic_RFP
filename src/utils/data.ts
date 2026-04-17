import type { RfpBlockType } from "../types";

export const data: RfpBlockType[] = [
  {
    type: "heading",
    level: 1,
    content: "Project Overview",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=710&auto=format&fit=crop",
    alt: "System Architecture Diagram",
    caption: "Fig 1. High-level architecture overview",
  },
  {
    type: "paragraph",
    content:
      "This project involves the design and development of a modern enterprise platform focused on scalability, performance, and user experience.",
  },
  {
    type: "paragraph",
    content:
      "The platform aims to streamline operations, enhance user engagement, and provide a flexible architecture for future growth.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Cloud-native architecture",
      "Microservices-based backend",
      "Responsive dashboard UI",
    ],
  },

  {
    type: "heading",
    level: 2,
    content: "Architecture Overview",
  },
  {
    type: "paragraph",
    content:
      "The system architecture is designed with modular services ensuring scalability, maintainability, and fault tolerance.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Service-oriented architecture",
      "Horizontal scalability",
      "API-first design approach",
    ],
  },

  {
    type: "heading",
    level: 2,
    content: "Phase 1: Discovery & Planning",
  },
  {
    type: "paragraph",
    content:
      "During the initial phase, the team will conduct stakeholder interviews and gather requirements to define the project scope and timeline.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Conduct stakeholder interviews",
      "Prepare requirement documentation",
      "Define project timeline",
    ],
  },
  {
    type: "heading",
    level: 2,
    content: "Phase 2: Design",
  },
  {
    type: "paragraph",
    content:
      "The design phase focuses on usability, accessibility standards, and maintaining a consistent visual language across modules.",
  },
  {
    type: "list",
    style: "unordered",
    items: ["Accessibility compliance (WCAG)", "Component reusability"],
  },
  {
    type: "paragraph",
    content:
      "Additionally, the design ensures scalability and modular architecture for long-term maintainability and flexibility.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Responsive design patterns",
      "Reusable UI components",
      "Design tokens and theming",
    ],
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1604074131665-7a4b13870ab4?q=80&w=687&auto=format&fit=crop",
    alt: "Design Mockup",
    caption: "Fig 2. Design phase preview",
  },

  {
    type: "heading",
    level: 2,
    content: "Phase 3: Development",
  },
  {
    type: "paragraph",
    content:
      "The development phase involves building both frontend and backend systems using modern technologies and best practices.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Frontend using React & TypeScript",
      "Backend using Node.js",
      "API integration and testing",
    ],
  },

  {
    type: "heading",
    level: 2,
    content: "Testing & Quality Assurance",
  },
  {
    type: "paragraph",
    content:
      "Comprehensive testing ensures the system is reliable, secure, and performs efficiently under different conditions.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Run unit tests",
      "Perform integration testing",
      "Conduct user acceptance testing",
    ],
  },

  {
    type: "heading",
    level: 2,
    content: "Deployment",
  },
  {
    type: "paragraph",
    content:
      "The final product will be deployed on cloud infrastructure with continuous integration and delivery pipelines.",
  },
  {
    type: "list",
    style: "ordered",
    items: [
      "Setup cloud infrastructure (AWS/Azure)",
      "Configure CI/CD pipelines",
      "Enable monitoring and logging",
    ],
  },

  {
    type: "heading",
    level: 2,
    content: "Maintenance & Support",
  },
  {
    type: "paragraph",
    content:
      "Post-deployment support ensures the application remains stable, secure, and continuously improved with updates.",
  },
  {
    type: "list",
    style: "unordered",
    items: [
      "Bug fixes and updates",
      "Performance monitoring",
      "Feature enhancements",
    ],
  },
];
