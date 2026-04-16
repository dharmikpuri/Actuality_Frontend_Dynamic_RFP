import type { RfpBlockType } from "../types";

export const data: RfpBlockType[] = [
  {
    type: "heading",
    level: 1,
    content: "Project Overview",
  },
  {
    type: "paragraph",
    content:
      "This project involves the design and development of a modern enterprise platform...",
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
    type: "image",
    src: "https://i.pinimg.com/736x/37/2f/ea/372fea679e94e69229518817361a3d40.jpg",
    alt: "System Architecture Diagram",
    caption: "Fig 1. High-level architecture overview",
  },
  {
    type: "heading",
    level: 2,
    content: "Phase 1: Discovery & Planning",
  },
  {
    type: "paragraph",
    content:
      "During the initial phase, the team will conduct stakeholder interviews...",
  },
];
