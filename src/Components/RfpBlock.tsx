import type { RfpBlockType } from "../types";

const RfpBlock = ({
  block,
  onEdit,
}: {
  block: RfpBlockType;
  onEdit: (value: string, index?: number) => void;
}) => {
  if (block.type === "heading") {
    const level = block.level || 1;

    if (level === 1)
      return (
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
          className="font-bold text-xl mb-2"
        >
          {block.content}
        </h1>
      );

    if (level === 2)
      return (
        <h2
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
          className="font-semibold text-lg mb-2"
        >
          {block.content}
        </h2>
      );

    return (
      <h3
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
        className="font-semibold mb-2"
      >
        {block.content}
      </h3>
    );
  }

  if (block.type === "paragraph") {
    return (
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
        className="mb-2 text-sm"
      >
        {block.content}
      </p>
    );
  }

  if (block.type === "list") {
    return (
      <ul
        className={`ml-4 mb-2 text-sm ${
          block.style === "ordered" ? "list-decimal" : "list-disc"
        }`}
      >
        {block.items?.map((item, i) => (
          <li
            key={i}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              onEdit(e.currentTarget.textContent || "", i)
            }
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "image") {
    return (
      <div className="mb-3">
        <img
          src={block.src}
          alt={block.alt}
          className="w-full h-[140px] object-cover"
        />
        {block.caption && (
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
            className="text-xs text-gray-500 text-center mt-1"
          >
            {block.caption}
          </p>
        )}
      </div>
    );
  }

  return null;
};

export default RfpBlock;