import type { RfpBlockType } from "../types";

const RfpBlock = ({ block }: { block: RfpBlockType }) => {
  switch (block.type) {
    case "heading": {
      const level = block.level || 1;

      if (level === 1)
        return <h1 className="font-bold text-2xl mb-2">{block.content}</h1>;
      if (level === 2)
        return <h2 className="font-bold text-xl mb-2">{block.content}</h2>;
      if (level === 3)
        return <h3 className="font-bold text-lg mb-2">{block.content}</h3>;

      return <h4 className="font-bold mb-2">{block.content}</h4>;
    }

    case "paragraph":
      return <p className="mb-2">{block.content}</p>;

    case "list":
      return (
        <ul
          className={`ml-4 mb-2 ${
            block.style === "ordered" ? "list-decimal" : "list-disc"
          }`}
        >
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "image":
      return (
        <div className="mb-4">
          <img
            src={block.src}
            alt={block.alt}
            className="w-full h-48 object-cover rounded"
          />
          {block.caption && (
            <p className="text-sm text-gray-500">{block.caption}</p>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default RfpBlock;
