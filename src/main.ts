import "./style.css";
import heic2any from "heic2any";
import {
  initShareButtons,
  renderCardBlob,
  getCardFilename,
  triggerBlobDownload,
} from "./share.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
<div class="app">

  <nav class="navbar">
    <div class="brand">
      <div class="brand-mark">HH</div>
      <div>
        <div class="brand-name">HACKER HOUSE <span>GOA</span></div>
        <div class="brand-sub">28—31 OCT 2026 · INDIA</div>
      </div>
    </div>

    <div class="nav-right">
      <span class="live-dot"></span>
      BUILD YOUR ID
    </div>
  </nav>

  <main>

    <section class="hero">
      <div class="eyebrow"><span></span> HACKER HOUSE GOA 2026 · BUILDER ID</div>

      <h1>
        MAKE YOUR
        <span>BUILDER CARD.</span>
      </h1>

      <p>
        Upload your photo, tell us what you build, and get a Goa-ready
        Hacker House identity card in seconds.
      </p>

      <div class="hero-tags">
        <span>NO SIGNUP</span>
        <span>JPG · PNG · WEBP · HEIC</span>
        <span>READY TO SHARE</span>
      </div>
    </section>

    <section class="generator">

      <div class="builder-panel">
        <div class="panel-label"><span>01</span> YOUR DETAILS</div>

        <div class="field-group">
          <label for="nameInput">NAME</label>
          <input id="nameInput" type="text" maxlength="28" placeholder="Your name" autocomplete="name" />
        </div>

        <div class="field-group">
          <label for="roleInput">STACK / ROLE</label>
          <input id="roleInput" type="text" maxlength="32" placeholder="Rust · Solana · Backend" />
        </div>

        <div class="field-group">
          <label for="buildingInput">WHAT ARE YOU BUILDING?</label>
          <input id="buildingInput" type="text" maxlength="42" placeholder="Something people will use" />
        </div>

        <div class="title-preview">
          <div>
            <span class="mini-label">GENERATED BUILDER TITLE</span>
            <strong id="builderTitle">THE SHIP-IT MACHINE</strong>
          </div>
          <button id="rerollTitle" type="button" class="ghost-btn">↻ REROLL</button>
        </div>

        <div class="panel-label photo-label"><span>02</span> PASSENGER PHOTO</div>

        <div class="drop-zone" id="dropZone">
          <input
            type="file"
            id="fileInput"
            accept="image/png,image/jpeg,image/webp,image/heic,image/heif,.heic,.heif"
            hidden
          />

          <div class="upload-content" id="uploadContent">
            <div class="upload-icon">↑</div>
            <h3 id="uploadTitle">DROP YOUR PHOTO</h3>
            <p id="uploadSubtitle">JPG · PNG · WEBP · HEIC</p>
            <button class="upload-btn" id="uploadBtn" type="button">CHOOSE PHOTO</button>
          </div>

          <img id="previewImage" class="preview-image hidden" alt="Uploaded builder preview" />
          <button id="changePhoto" class="change-photo hidden" type="button">CHANGE PHOTO</button>
        </div>

        <div class="crop-tools">
          <span class="mini-label">PHOTO POSITION</span>
          <div class="position-buttons">
            <button type="button" data-position="50% 20%">TOP</button>
            <button type="button" data-position="50% 42%" class="active">CENTER</button>
            <button type="button" data-position="50% 68%">BOTTOM</button>
          </div>
        </div>

        <div class="instant-note">
          <span class="status-dot"></span>
          LIVE PREVIEW · YOUR PHOTO NEVER NEEDS TO BE CROPPED FIRST
        </div>
      </div>

      <div class="preview-panel">
        <div class="panel-label"><span>03</span> YOUR BUILDER ID</div>

        <div class="id-card" id="idCard">

          <div class="card-top">
            <div class="card-brand">
              <div class="tiny-type">HACKER HOUSE</div>
              <div class="goa-title">GOA <span>26</span></div>
            </div>

            <div class="card-event">
              <strong>BUILDER ID</strong>
              <span>HH / 2026</span>
            </div>
          </div>

          <div class="card-grid-art">
            <div class="sun"></div>
            <div class="sun-ray ray-1"></div>
            <div class="sun-ray ray-2"></div>
            <div class="sun-ray ray-3"></div>
            <div class="hill hill-one"></div>
            <div class="hill hill-two"></div>
            <div class="wave wave-one"></div>
            <div class="wave wave-two"></div>
          </div>

          <div class="card-photo-wrap">
            <div class="photo-corner tl"></div>
            <div class="photo-corner br"></div>

            <div class="card-photo">
              <div class="photo-placeholder" id="photoPlaceholder">
                <span>✦</span>
                <small>UPLOAD<br>YOUR PHOTO</small>
              </div>
              <img id="cardPhoto" class="card-photo-img hidden" alt="Builder photo" />
            </div>

            <div class="photo-stamp">
              <span>GOA</span>
              <strong>26</strong>
            </div>
          </div>

          <div class="identity-block">
            <div class="identity-kicker">HELLO, BUILDER</div>
            <div class="identity-name" id="cardName">YOUR NAME</div>
            <div class="identity-title" id="cardTitle">THE SHIP-IT MACHINE</div>

            <div class="identity-fields">
              <div>
                <span>STACK / ROLE</span>
                <strong id="cardRole">YOUR STACK</strong>
              </div>
              <div>
                <span>BUILDING</span>
                <strong id="cardBuilding">SOMETHING GREAT</strong>
              </div>
            </div>
          </div>

          <div class="card-bottom-art">
            <div class="palm palm-left">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
            <div class="palm palm-right">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
            <div class="sea-line line-a"></div>
            <div class="sea-line line-b"></div>
            <div class="pink-sun"></div>
            <div class="goa-script">गोवा</div>
          </div>

          <div class="card-footer">
            <span>#FrameInGoa</span>
            <span>BUILD · SHIP · LAUNCH</span>
            <span>28—31 OCT 2026</span>
          </div>

        </div>

        <div class="actions">
          <button id="downloadBtn" class="primary-btn" type="button" disabled>
            ↓ DOWNLOAD ID CARD
          </button>
          <button id="shareX" class="x-btn" type="button" disabled>
            𝕏 SHARE TO X
          </button>
        </div>

        <p class="share-hint" id="shareHint">
          Add a photo to unlock your downloadable card.
        </p>
      </div>

    </section>

    <section class="ticker">
      <div>BUILD</div><span>✦</span>
      <div>SHIP</div><span>✦</span>
      <div>LAUNCH</div><span>✦</span>
      <div>GOA</div><span>✦</span>
      <div>#FrameInGoa</div>
    </section>

    <section class="bottom-info">
      <div>
        <span>DESTINATION</span>
        <strong>GOA, INDIA</strong>
      </div>
      <div>
        <span>MISSION</span>
        <strong>BUILD SOMETHING REAL</strong>
      </div>
      <div>
        <span>FORMAT</span>
        <strong>BUILDER ID · SOCIAL READY</strong>
      </div>
    </section>

  </main>

  <footer>
    <span>HHGOA'26</span>
    <span>FRAME YOUR BUILD</span>
    <span>BUILDERS ONLY</span>
  </footer>
</div>
`;

const fileInput = document.querySelector<HTMLInputElement>("#fileInput")!;
const uploadBtn = document.querySelector<HTMLButtonElement>("#uploadBtn")!;
const dropZone = document.querySelector<HTMLDivElement>("#dropZone")!;
const uploadContent = document.querySelector<HTMLDivElement>("#uploadContent")!;
const uploadTitle = document.querySelector<HTMLHeadingElement>("#uploadTitle")!;
const uploadSubtitle = document.querySelector<HTMLParagraphElement>("#uploadSubtitle")!;
const previewImage = document.querySelector<HTMLImageElement>("#previewImage")!;
const cardPhoto = document.querySelector<HTMLImageElement>("#cardPhoto")!;
const photoPlaceholder = document.querySelector<HTMLDivElement>("#photoPlaceholder")!;
const changePhoto = document.querySelector<HTMLButtonElement>("#changePhoto")!;

const nameInput = document.querySelector<HTMLInputElement>("#nameInput")!;
const roleInput = document.querySelector<HTMLInputElement>("#roleInput")!;
const buildingInput = document.querySelector<HTMLInputElement>("#buildingInput")!;
const builderTitle = document.querySelector<HTMLElement>("#builderTitle")!;
const rerollTitle = document.querySelector<HTMLButtonElement>("#rerollTitle")!;

const cardName = document.querySelector<HTMLElement>("#cardName")!;
const cardRole = document.querySelector<HTMLElement>("#cardRole")!;
const cardBuilding = document.querySelector<HTMLElement>("#cardBuilding")!;
const cardTitle = document.querySelector<HTMLElement>("#cardTitle")!;

const downloadBtn = document.querySelector<HTMLButtonElement>("#downloadBtn")!;
const shareXBtn = document.querySelector<HTMLButtonElement>("#shareX")!;
const shareHint = document.querySelector<HTMLParagraphElement>("#shareHint")!;
const idCard = document.querySelector<HTMLElement>("#idCard")!;

let hasPhoto = false;
let objectUrl: string | null = null;
let selectedPosition = "50% 42%";
let titleOffset = 0;

const builderTitles = [
  "THE SHIP-IT MACHINE",
  "THE CHAIN WHISPERER",
  "THE PROTOCOL PIRATE",
  "THE BACKEND ALCHEMIST",
  "THE PIXEL HACKER",
  "THE INFRA CARTOGRAPHER",
  "THE DEBUGGING MONK",
  "THE PRODUCT BUILDER",
  "THE ZERO-DOWNTIME DREAMER",
  "THE WEEKEND SHIPPER",
];

function setPhotoState(uploaded: boolean) {
  hasPhoto = uploaded;
  downloadBtn.disabled = !uploaded;
  shareXBtn.disabled = !uploaded;
  shareHint.textContent = uploaded
    ? "Ready — download it or share it to X."
    : "Add a photo to unlock your downloadable card.";
}

setPhotoState(false);

function titleFromInputs(): string {
  const source = `${roleInput.value}|${buildingInput.value}|${titleOffset}`;
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    hash = (hash * 31 + source.charCodeAt(i)) | 0;
  }
  return builderTitles[Math.abs(hash) % builderTitles.length];
}

function refreshTitle() {
  const title = titleFromInputs();
  builderTitle.textContent = title;
  cardTitle.textContent = title;
}

function refreshCard() {
  cardName.textContent = nameInput.value.trim().toUpperCase() || "YOUR NAME";
  cardRole.textContent = roleInput.value.trim().toUpperCase() || "YOUR STACK";
  cardBuilding.textContent =
    buildingInput.value.trim().toUpperCase() || "SOMETHING GREAT";
  refreshTitle();
}

[nameInput, roleInput, buildingInput].forEach((input) => {
  input.addEventListener("input", refreshCard);
});

rerollTitle.addEventListener("click", () => {
  titleOffset += 1;
  refreshTitle();
});

function isHeicFile(file: File): boolean {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  return (
    type === "image/heic" ||
    type === "image/heif" ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  );
}

function setProcessingState(isProcessing: boolean) {
  uploadBtn.disabled = isProcessing;

  if (isProcessing) {
    uploadTitle.textContent = "PROCESSING PHOTO...";
    uploadSubtitle.textContent = "Converting HEIC for your browser";
  } else {
    uploadTitle.textContent = "DROP YOUR PHOTO";
    uploadSubtitle.textContent = "JPG · PNG · WEBP · HEIC";
  }
}

async function handleImage(file: File) {
  const heic = isHeicFile(file);
  const isImage = file.type.startsWith("image/");

  if (!isImage && !heic) {
    alert("Please upload a JPG, PNG, WEBP or HEIC image.");
    return;
  }

  let displaySource: Blob = file;

  if (heic) {
    setProcessingState(true);

    try {
      const converted = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });

      displaySource = Array.isArray(converted) ? converted[0] : converted;
    } catch (error) {
      console.error(error);
      setProcessingState(false);
      alert("Couldn't process this HEIC photo. Please try a JPG or PNG instead.");
      return;
    }

    setProcessingState(false);
  }

  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
  }

  objectUrl = URL.createObjectURL(displaySource);

  previewImage.src = objectUrl;
  cardPhoto.src = objectUrl;
  cardPhoto.style.objectPosition = selectedPosition;

  previewImage.classList.remove("hidden");
  cardPhoto.classList.remove("hidden");
  uploadContent.classList.add("hidden");
  photoPlaceholder.classList.add("hidden");
  changePhoto.classList.remove("hidden");

  setPhotoState(true);
}

uploadBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  fileInput.click();
});

dropZone.addEventListener("click", () => {
  if (previewImage.classList.contains("hidden")) {
    fileInput.click();
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (file) void handleImage(file);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragging");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragging");

  const file = event.dataTransfer?.files?.[0];
  if (file) void handleImage(file);
});

changePhoto.addEventListener("click", (event) => {
  event.stopPropagation();
  fileInput.value = "";
  fileInput.click();
});

document.querySelectorAll<HTMLButtonElement>("[data-position]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedPosition = button.dataset.position || "50% 42%";

    document
      .querySelectorAll("[data-position]")
      .forEach((el) => el.classList.remove("active"));

    button.classList.add("active");

    cardPhoto.style.objectPosition = selectedPosition;
  });
});

downloadBtn.addEventListener("click", async () => {
  if (!hasPhoto) {
    alert("Upload your photo first!");
    return;
  }

  const originalText = downloadBtn.textContent;
  downloadBtn.textContent = "GENERATING...";
  downloadBtn.disabled = true;

  try {
    const blob = await renderCardBlob(idCard);
    triggerBlobDownload(blob, getCardFilename(nameInput.value));
  } catch (error) {
    console.error(error);
    alert("Could not generate the builder ID card.");
  } finally {
    downloadBtn.textContent = originalText;
    downloadBtn.disabled = !hasPhoto;
  }
});

initShareButtons({
  cardElement: idCard,
  button: shareXBtn,
  getBuilderName: () => nameInput.value,
  isPhotoUploaded: () => hasPhoto,
});

refreshCard();