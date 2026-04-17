import type { RfpBlockType } from "../types";

const RfpBlock = ({
  block,
  onEdit,
}: {
  block: RfpBlockType;
  onEdit: (value: string, index?: number) => void;
}) => {
  // HEADIGN SECTION
  if (block.type === "heading") {
    const level = block.level || 1;

    if (level === 1)
      return (
        <h1
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
          className="font-bold text-2xl mb-3 text-gray-900 break-words"
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
          className="font-semibold text-xl mb-2 text-gray-900 break-words"
        >
          {block.content}
        </h2>
      );

    if (level === 3)
      return (
        <h3
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
          className="font-semibold text-xl mb-2 text-gray-900 break-words"
        >
          {block.content}
        </h3>
      );

    return (
      <h4
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
        className="font-semibold text-xl mb-2 text-gray-900 break-words"
      >
        {block.content}
      </h4>
    );
  }

  // PARAGRAPH SECTION
  if (block.type === "paragraph") {
    return (
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
        className="mb-3 text-sm text-gray-700 leading-relaxed break-words"
      >
        {block.content}
      </p>
    );
  }

  // LIST SECTION
  if (block.type === "list") {
    return (
      <ul
        className={`ml-5 mb-3 text-sm text-gray-700 space-y-1 ${
          block.style === "ordered" ? "list-decimal" : "list-disc"
        }`}
      >
        {block.items?.map((item, i) => (
          <li
            key={i}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onEdit(e.currentTarget.textContent || "", i)}
            className="break-words"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  // IMAGE SECTION
  if (block.type === "image") {
    return (
      <div className="mb-4">
       <img
  src={block.src}
  crossOrigin="anonymous"
  referrerPolicy="no-referrer"
  alt={block.alt}
  className="w-full h-[160px] object-cover rounded-md"
/>
        {block.caption && (
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onEdit(e.currentTarget.textContent || "")}
            className="text-xs text-gray-500 text-center mt-2"
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
