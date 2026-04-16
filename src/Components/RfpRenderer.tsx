import { useEffect, useRef, useState } from "react";
import RfpBlock from "./RfpBlock";
import type { RfpBlockType } from "../types";

const PAGE_HEIGHT = 800;

const RfpRenderer = ({ data }: { data: RfpBlockType[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<RfpBlockType[][]>([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    let page: RfpBlockType[] = [];
    let height = 0;
    const result: RfpBlockType[][] = [];

    data.forEach((block, i) => {
      const el = document.createElement("div");

      el.style.visibility = "hidden";
      el.style.position = "absolute";
      el.style.width = "240px";
      el.style.fontSize = "14px";
      el.style.lineHeight = "1.5";

      el.innerHTML =
        block.type === "list"
          ? `<ul>${block.items?.map((x) => `<li>${x}</li>`).join("")}</ul>`
          : block.type === "image"
          ? `<img src="${block.src}" style="height:150px;width:100%;" />`
          : block.type === "heading"
          ? `<h1 style="font-size:20px;font-weight:bold;">${block.content}</h1>`
          : `<p>${block.content || ""}</p>`;

      document.body.appendChild(el);
      const h = el.offsetHeight;
      document.body.removeChild(el);

      const next = data[i + 1];

      if (
        height + h > PAGE_HEIGHT ||
        (block.type === "heading" &&
          next?.type === "paragraph" &&
          height > PAGE_HEIGHT - 150)
      ) {
        if (page.length) result.push(page);
        page = [];
        height = 0;
      }

      page.push(block);
      height += h;
    });

    if (page.length) result.push(page);

    setPages(result);
  }, [data, refresh]);

  return (
    <div className="bg-gray-100 min-h-screen py-10 space-y-8">
      <div ref={ref} />

      {pages.map((p, pageIndex) => {
        const grouped: RfpBlockType[][] = [];
        let current: RfpBlockType[] = [];

        p.forEach((block) => {
          if (block.type === "heading") {
            if (current.length) grouped.push(current);
            current = [block];
          } else {
            current.push(block);
          }
        });

        if (current.length) grouped.push(current);

        const cols: RfpBlockType[][] = [[], [], []];

        grouped.forEach((group, i) => {
          cols[i % 3].push(...group);
        });

        return (
          <div
            key={pageIndex}
            className="bg-white w-[850px] h-[800px] mx-auto p-6"
          >
            <div className="flex">
              {cols.map((col, i) => (
                <div key={i} className="w-1/3 px-3">
                  {col.map((b, j) => (
                    <div key={j} className="mb-4">
                      <RfpBlock
                        block={b}
                        onEdit={(val, idx) => {
                          if (
                            b.type === "list" &&
                            idx !== undefined &&
                            b.items
                          ) {
                            b.items[idx] = val;
                          } else {
                            b.content = val;
                          }
                          setRefresh((x) => x + 1);
                        }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-gray-400 mt-4">
              Page {pageIndex + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RfpRenderer;