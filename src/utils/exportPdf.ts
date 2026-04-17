import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// convert image url to base64
const getImageData = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();

    return await new Promise((resolve, reject) => {
      const img = new Image();
      const tempUrl = URL.createObjectURL(blob);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width || 800;
        canvas.height = img.height || 600;

        const ctx = canvas.getContext("2d");
        if (ctx) ctx.drawImage(img, 0, 0);

        URL.revokeObjectURL(tempUrl);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };

      img.onerror = reject;
      img.src = tempUrl;
    });
  } catch (e) {
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        url
      )}`;
      return await getImageData(proxyUrl);
    } catch {
      console.warn("image failed", url);
      return "";
    }
  }
};

export const exportToPDF = async ({
  pageRefs,
  data,
}: {
  pageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  data: any[];
}) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [900, 800],
  });

  // get all images first
  const imageMap = new Map<string, string>();

  const images = data.filter((d) => d.type === "image" && d.src);

  for (let img of images) {
    if (!img.src) continue;
    const base64 = await getImageData(img.src);
    if (base64) imageMap.set(img.src, base64);
  }

  for (let i = 0; i < pageRefs.current.length; i++) {
    const el = pageRefs.current[i];
    if (!el) continue;

    const imgs = el.querySelectorAll("img");
    const originalSrc: string[] = [];

    imgs.forEach((img, idx) => {
      const src = img.getAttribute("src") || "";
      originalSrc[idx] = src;

      const newSrc = imageMap.get(src);
      if (newSrc) img.setAttribute("src", newSrc);
    });

    // wait images load
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) return resolve();
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    );

    const canvas = await html2canvas(el, {
      scale: 1.5,
      backgroundColor: "#fff",
    });

    // restore images
    imgs.forEach((img, idx) => {
      img.setAttribute("src", originalSrc[idx]);
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.85);

    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, 0, 900, 800);
  }

  pdf.save("actuality-rfp.pdf");
};