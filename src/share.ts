import html2canvas from "html2canvas";

export type Platform = "x" | "linkedin" | "instagram";

// The task requires the hashtag "#FramedInGoa" with "FING" capitalized,
// i.e. exactly #FramedINGoa. Keep it in one place so it can't drift.
export const REQUIRED_HASHTAG = "#FramedINGoa";

export function getPromoText(name: string): string {
  const displayName = name.trim() || "Builder";
  return [
    "✈️ Boarding Hacker House Goa 2026!",
    "",
    `I'm ${displayName} and I'm ready to BUILD → SHIP → LAUNCH.`,
    "",
    "See you in Goa 🌴",
    "",
    REQUIRED_HASHTAG,
  ].join("\n");
}

export function getPassFilename(name: string): string {
  const slug = name.trim().replace(/\s+/g, "-").toLowerCase() || "builder";
  return `hh-goa-${slug}.png`;
}

// Renders the boarding-pass DOM element to a PNG blob. Both the download
// button and every share button call this, so the image is always the
// pass exactly as generated at click-time (correct name, correct photo).
export async function renderPassBlob(passElement: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(passElement, {
    scale: 3,
    backgroundColor: "#eee8da",
    useCORS: true,
    logging: false,
  });

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not create image from canvas"));
    }, "image/png");
  });
}

export function triggerBlobDownload(blob: Blob, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 5000);
}

export interface ShareButtons {
  x: HTMLButtonElement;
  linkedin: HTMLButtonElement;
  instagram: HTMLButtonElement;
}

export interface InitShareOptions {
  passElement: HTMLElement;
  buttons: ShareButtons;
  getPassengerName: () => string;
  isPhotoUploaded: () => boolean;
}

/**
 * Wires up the three share buttons. On click, each one:
 *  1. renders the boarding pass that was JUST generated into a PNG,
 *  2. builds the promo text with the required hashtag,
 *  3. hands both straight to the platform.
 *
 * Real device / browser behavior:
 *  - Anywhere the Web Share API supports file attachments (basically all
 *    mobile browsers, and the apps for X/LinkedIn/Instagram show up in
 *    that share sheet) -> ONE tap: image + caption arrive already
 *    attached in the post composer. This is the true one-click path.
 *  - On desktop, no webpage is allowed to push an image directly into
 *    X / LinkedIn / Instagram's own composer — browsers block that for
 *    security, and none of the three offer a public "prefill + attach
 *    image" web endpoint. So on desktop we auto-download the just-generated
 *    pass image AND open the platform with the caption already typed in;
 *    the only manual step left is dragging the already-downloaded image
 *    into the box that's already open in front of you.
 */
export function initShareButtons(options: InitShareOptions) {
  const { passElement, buttons, getPassengerName, isPhotoUploaded } = options;

  async function shareViaPlatform(platform: Platform) {
    if (!isPhotoUploaded()) {
      alert("Upload your photo first!");
      return;
    }

    const btn = buttons[platform];
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "...";

    try {
      const name = getPassengerName();
      const blob = await renderPassBlob(passElement);
      const text = getPromoText(name);
      const filename = getPassFilename(name);
      const file = new File([blob], filename, { type: "image/png" });

      // Best case: native share sheet — image is attached automatically.
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

      // Desktop fallback: download the pass image + open a pre-filled composer.
      triggerBlobDownload(blob, filename);

      if (platform === "x") {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
          "_blank",
          "noopener,noreferrer"
        );
      } else if (platform === "linkedin") {
        window.open(
          `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
            text
          )}`,
          "_blank",
          "noopener,noreferrer"
        );
      } else {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          // Clipboard permission can be blocked — not fatal, alert covers it.
        }
        alert(
          "Your boarding pass image downloaded and the caption was copied.\n\nOpen Instagram, start a new post, attach the image, and paste the caption."
        );
        window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      if ((error as Error)?.name !== "AbortError") {
        console.error(error);
        alert("Could not prepare your boarding pass for sharing. Please try again.");
      }
    } finally {
      btn.disabled = !isPhotoUploaded();
      btn.textContent = originalText;
    }
  }

  buttons.x.addEventListener("click", () => void shareViaPlatform("x"));
  buttons.linkedin.addEventListener("click", () => void shareViaPlatform("linkedin"));
  buttons.instagram.addEventListener("click", () => void shareViaPlatform("instagram"));

  return { shareViaPlatform };
}