import { useEffect, useRef, useState } from "react";
import RfpBlock from "./RfpBlock";
import type { RfpBlockType } from "../types";
import { exportToPDF } from "../utils/exportPdf";


const PAGE_HEIGHT = 800;

const RfpRenderer = ({ data }: { data: RfpBlockType[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pages, setPages] = useState<RfpBlockType[][]>([]);
  const [refresh, setRefresh] = useState(0);
  const [exporting, setExporting] = useState(false);

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
          ? `<img src="${block.src}" style="height:160px;width:100%;" />`
          : block.type === "heading"
          ? `<h1 style="font-size:22px;font-weight:bold;">${block.content}</h1>`
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

const handleExportPDF = async () => {
  try {
    setExporting(true);
    await exportToPDF({
      pageRefs,
      data,
    });
  } catch (err) {
    console.error("PDF export failed:", err);
    alert("PDF export failed. Please try again.");
  } finally {
    setExporting(false);
  }
};

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[900px] mx-auto flex items-center justify-between px-6 py-3">
          <img
            src="https://www.actuality.live/__0101__new__actuality__/assets/actuality.svg"
            alt="Actuality logo"
            className="h-6"
          />

          <button
            onClick={handleExportPDF}
            disabled={exporting || pages.length === 0}
            className="flex items-center gap-2 bg-black text-white text-sm px-4 py-2 rounded-md disabled:opacity-50"
          >
            {exporting ? "Exporting..." : "Export PDF"}
          </button>
        </div>
      </div>

      {/* PAGES SECTION*/}
      <div className="py-6 space-y-6">
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
              ref={(el) => {
                pageRefs.current[pageIndex] = el;
              }}
              className="bg-white shadow-xl border w-[900px] h-[800px] mx-auto flex flex-col rounded-md overflow-hidden"
            >
              {/* HEADER SECTION*/}
              <div className="flex items-center justify-between px-6 py-3 border-b text-sm text-gray-500">
                <span>Actuality - RFP</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              {/* CONTENT SECTION*/}
              <div className="flex flex-1 px-4 py-4">
                {cols.map((col, i) => (
                  <div
                    key={i}
                    className="flex-1 px-3 border-r last:border-none"
                  >
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

              {/* FOOTER SECTION*/}
              <div className="text-center text-xs text-gray-400 pb-2 border-t">
                Page {pageIndex + 1} of {pages.length}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RfpRenderer;