export type RfpBlockType = {
  type: "heading" | "paragraph" | "list" | "image";
  level?: number;
  content?: string;
  items?: string[];
  style?: "unordered" | "ordered";
  src?: string;
  alt?: string;
  caption?: string;
};