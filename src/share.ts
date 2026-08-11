import html2canvas from "html2canvas";

export const REQUIRED_HASHTAG = "#FrameInGoa";

export function getPromoText(name: string): string {
  const displayName = name.trim() || "Builder";

  return [
    "🌴 Boarding Hacker House Goa 2026!",
    "",
    `I'm ${displayName} and I'm ready to BUILD → SHIP → LAUNCH.`,
    "",
    "See you in Goa.",
    "",
    REQUIRED_HASHTAG,
  ].join("\n");
}

export function getCardFilename(name: string): string {
  const slug =
    name.trim().replace(/\s+/g, "-").toLowerCase() || "builder";

  return `hh-goa-builder-${slug}.png`;
}

export async function renderCardBlob(cardElement: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(cardElement, {
    scale: 3,
    backgroundColor: "#006b45",
    useCORS: true,
    logging: false,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create image from canvas"));
    }, "image/png");
  });
}

export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.download = filename;
  link.href = url;
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

interface ShareOptions {
  cardElement: HTMLElement;
  button: HTMLButtonElement;
  getBuilderName: () => string;
  isPhotoUploaded: () => boolean;
}

export function initShareButtons(options: ShareOptions) {
  const {
    cardElement,
    button,
    getBuilderName,
    isPhotoUploaded,
  } = options;

  async function shareToX() {
    if (!isPhotoUploaded()) {
      alert("Upload your photo first!");
      return;
    }

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "PREPARING...";

    try {
      const blob = await renderCardBlob(cardElement);
      const filename = getCardFilename(getBuilderName());
      const file = new File([blob], filename, { type: "image/png" });
      const text = getPromoText(getBuilderName());

      /*
       * On supported mobile browsers, the native share sheet can carry
       * the generated PNG and caption directly into X.
       */
      if (
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "Hacker House Goa 2026",
          text,
        });
        return;
      }

      /*
       * Browsers cannot programmatically attach a local image to X's
       * web composer. We therefore save the exact generated card and
       * open X with the caption pre-filled.
       */
      triggerBlobDownload(blob, filename);

      const xUrl =
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

      window.open(xUrl, "_blank", "noopener,noreferrer");
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") {
        console.error(error);
        alert("Could not prepare your builder card for sharing.");
      }
    } finally {
      button.disabled = !isPhotoUploaded();
      button.textContent = originalText;
    }
  }

  button.addEventListener("click", () => void shareToX());

  return { shareToX };
}