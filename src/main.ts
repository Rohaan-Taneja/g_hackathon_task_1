import "./style.css";
import heic2any from "heic2any";
import {
  initShareButtons,
  renderPassBlob,
  getPassFilename,
  triggerBlobDownload,
} from "./share.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
<div class="app">

  <!-- NAVBAR -->
  <nav class="navbar">

    <div class="brand">
      <div class="brand-icon">✈</div>

      <div>
        <div class="brand-name">
          HH<span>GOA</span>
        </div>

        <div class="brand-sub">
          HACKER HOUSE 2026
        </div>
      </div>
    </div>

    <div class="nav-right">
      <span class="live-dot"></span>
      LIVE BUILDER MODE
    </div>

  </nav>


  <main>

    <!-- HERO -->
    <section class="hero">

      <div class="eyebrow">
        <span></span>
        BOARDING NOW · OCT 28—31
      </div>

      <h1>
        YOUR NEXT
        <span>DESTINATION</span>
        IS GOA.
      </h1>

      <p>
        Turn your photo into a Hacker House Goa 2026
        boarding pass. Build. Ship. Launch.
      </p>

    </section>


    <!-- GENERATOR -->
    <section class="generator">


      <!-- LEFT -->
      <div class="upload-panel">

        <div class="panel-label">
          <span>01</span>
          PASSENGER PHOTO
        </div>


        <div
          class="drop-zone"
          id="dropZone"
        >

          <input
            type="file"
            id="fileInput"
            accept="image/png,image/jpeg,image/webp,image/heic,image/heif,.heic,.heif"
            hidden
          />


          <div
            class="upload-content"
            id="uploadContent"
          >

            <div class="upload-icon" id="uploadIcon">
              ↑
            </div>

            <h3 id="uploadTitle">
              DROP YOUR PHOTO
            </h3>

            <p id="uploadSubtitle">
              JPG · PNG · WEBP · HEIC
            </p>

            <button
              class="upload-btn"
              id="uploadBtn"
            >
              CHOOSE PHOTO
            </button>

          </div>


          <img
            id="previewImage"
            class="preview-image hidden"
            alt="Preview"
          />


          <button
            id="changePhoto"
            class="change-photo hidden"
          >
            CHANGE PHOTO
          </button>

        </div>


        <!-- CONTROLS -->

        <div class="controls">

          <div class="control-row">

            <div>
              <span class="control-title">
                PASSENGER
              </span>

              <span
                class="control-value"
                id="passengerName"
              >
                BUILDER
              </span>
            </div>


            <input
              id="nameInput"
              type="text"
              placeholder="Your name"
              maxlength="24"
            />

          </div>


          <div class="control-row">

            <div>
              <span class="control-title">
                BUILD STATUS
              </span>

              <span class="control-value">
                READY TO SHIP
              </span>
            </div>

            <div class="status">
              <span></span>
              VERIFIED
            </div>

          </div>

        </div>

      </div>


      <!-- RIGHT -->
      <div class="pass-panel">

        <div class="panel-label">
          <span>02</span>
          YOUR BOARDING PASS
        </div>


        <!-- BOARDING PASS -->

        <div
          class="boarding-pass"
          id="boardingPass"
        >


          <!-- TOP -->

          <div class="pass-top">

            <div>

              <div class="pass-label">
                HACKER HOUSE
              </div>

              <div class="pass-title">
                GOA <span>26</span>
              </div>

            </div>


            <div class="flight">

              <span>
                FLIGHT
              </span>

              <strong>
                HH26
              </strong>

            </div>

          </div>


          <!-- PHOTO + PASSENGER -->

          <div class="photo-area">


            <div class="photo-container">

              <div
                class="photo-placeholder"
                id="photoPlaceholder"
              >

                <span>✦</span>

                <small>
                  YOUR<br>
                  PHOTO
                </small>

              </div>


              <img
                id="passPhoto"
                class="pass-photo hidden"
                alt="Passenger"
              />

            </div>


            <div class="passenger-info">

              <div class="info-label">
                PASSENGER
              </div>


              <div
                class="passenger-name"
                id="passName"
              >
                BUILDER
              </div>


              <div class="info-grid">

                <div>
                  <span>FROM</span>
                  <strong>WEB3</strong>
                </div>

                <div>
                  <span>TO</span>
                  <strong>GOA</strong>
                </div>

                <div>
                  <span>GATE</span>
                  <strong>∞</strong>
                </div>

                <div>
                  <span>SEAT</span>
                  <strong>1A</strong>
                </div>

              </div>

            </div>

          </div>


          <!-- ROUTE -->

          <div class="route">

            <div class="airport">

              <strong>
                BUILD
              </strong>

              <span>
                WEB3
              </span>

            </div>


            <div class="route-line">

              <span class="plane">
                ✈
              </span>

              <div></div>
              <div></div>
              <div></div>

            </div>


            <div class="airport">

              <strong>
                GOA
              </strong>

              <span>
                IND
              </span>

            </div>

          </div>


          <!-- BOTTOM INFO -->

          <div class="pass-bottom">

            <div>

              <span>
                BOARDING
              </span>

              <strong>
                NOW
              </strong>

            </div>


            <div>

              <span>
                DATE
              </span>

              <strong>
                28 OCT 26
              </strong>

            </div>


            <div>

              <span>
                CLASS
              </span>

              <strong>
                BUILDER
              </strong>

            </div>


            <div class="barcode">
              ||||||||||||||||||||||||||||||||
            </div>

          </div>


          <!-- FOOTER -->

          <div class="pass-footer">

            <span>
              #FRAMEDINGOA
            </span>

            <span>
              HACKER HOUSE GOA · 2026
            </span>

          </div>

        </div>


        <!-- ACTIONS -->

        <div class="actions">

          <button
            id="downloadBtn"
            class="primary-btn"
            disabled
          >
            ↓ DOWNLOAD PASS
          </button>

        </div>


        <!-- SHARE (X / LinkedIn / Instagram, one-click) -->

        <div class="share-row">

          <button
            id="shareX"
            class="platform-btn x"
            disabled
          >
            𝕏 SHARE
          </button>

          <button
            id="shareLinkedIn"
            class="platform-btn linkedin"
            disabled
          >
            in SHARE
          </button>

          <button
            id="shareInstagram"
            class="platform-btn instagram"
            disabled
          >
            IG SHARE
          </button>

        </div>

        <p class="share-hint" id="shareHint">
          Upload your photo to unlock download &amp; share.
        </p>

      </div>

    </section>


    <!-- TICKER -->

    <section class="ticker">

      <div>BUILD</div>
      <span>✦</span>

      <div>SHIP</div>
      <span>✦</span>

      <div>LAUNCH</div>
      <span>✦</span>

      <div>GOA</div>
      <span>✦</span>

      <div>#FramedINGoa</div>

    </section>


    <!-- INFO -->

    <section class="bottom-info">

      <div>
        <span>DESTINATION</span>
        <strong>GOA, INDIA</strong>
      </div>

      <div>
        <span>EVENT</span>
        <strong>HACKER HOUSE 2026</strong>
      </div>

      <div>
        <span>MISSION</span>
        <strong>BUILD SOMETHING GREAT</strong>
      </div>

    </section>

  </main>


  <footer>

    <span>
      HHGOA'26
    </span>

    <span>
      FRAMED IN GOA
    </span>

    <span>
      BUILDERS ONLY
    </span>

  </footer>

</div>
`;


// ======================================================
// ELEMENTS
// ======================================================

const fileInput = document.querySelector<HTMLInputElement>("#fileInput")!;
const uploadBtn = document.querySelector<HTMLButtonElement>("#uploadBtn")!;
const dropZone = document.querySelector<HTMLDivElement>("#dropZone")!;
const uploadContent = document.querySelector<HTMLDivElement>("#uploadContent")!;
const uploadTitle = document.querySelector<HTMLHeadingElement>("#uploadTitle")!;
const uploadSubtitle = document.querySelector<HTMLParagraphElement>("#uploadSubtitle")!;
const previewImage = document.querySelector<HTMLImageElement>("#previewImage")!;
const passPhoto = document.querySelector<HTMLImageElement>("#passPhoto")!;
const photoPlaceholder = document.querySelector<HTMLDivElement>("#photoPlaceholder")!;
const changePhoto = document.querySelector<HTMLButtonElement>("#changePhoto")!;
const nameInput = document.querySelector<HTMLInputElement>("#nameInput")!;
const passengerName = document.querySelector<HTMLSpanElement>("#passengerName")!;
const passName = document.querySelector<HTMLDivElement>("#passName")!;
const downloadBtn = document.querySelector<HTMLButtonElement>("#downloadBtn")!;
const shareXBtn = document.querySelector<HTMLButtonElement>("#shareX")!;
const shareLinkedInBtn = document.querySelector<HTMLButtonElement>("#shareLinkedIn")!;
const shareInstagramBtn = document.querySelector<HTMLButtonElement>("#shareInstagram")!;
const shareHint = document.querySelector<HTMLParagraphElement>("#shareHint")!;

let hasPhoto = false;

// ======================================================
// PHOTO-REQUIRED GUARDRAIL
// (several teams got disqualified for "No selfie" — this
// makes it impossible to download/share an empty pass)
// ======================================================

function setPhotoState(uploaded: boolean) {
  hasPhoto = uploaded;
  downloadBtn.disabled = !uploaded;
  shareXBtn.disabled = !uploaded;
  shareLinkedInBtn.disabled = !uploaded;
  shareInstagramBtn.disabled = !uploaded;
  shareHint.textContent = uploaded
    ? "Ready to share — tap a platform below."
    : "Upload your photo to unlock download & share.";
}

setPhotoState(false);


// ======================================================
// OPEN FILE PICKER
// ======================================================

uploadBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  fileInput.click();
});


// ======================================================
// DROP ZONE CLICK
// ======================================================

dropZone.addEventListener("click", () => {
  if (previewImage.classList.contains("hidden")) {
    fileInput.click();
  }
});


// ======================================================
// FILE INPUT
// ======================================================

fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  void handleImage(file);
});


// ======================================================
// DRAG OVER / LEAVE / DROP
// ======================================================

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
  const file = event.dataTransfer?.files[0];
  if (!file) return;
  void handleImage(file);
});


// ======================================================
// IMAGE HANDLING (with real HEIC support)
// ======================================================

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
    uploadTitle.textContent = "PROCESSING...";
    uploadSubtitle.textContent = "Converting your photo";
  } else {
    uploadTitle.textContent = "DROP YOUR PHOTO";
    uploadSubtitle.textContent = "JPG · PNG · WEBP · HEIC";
  }
}

async function handleImage(file: File) {
  const isImage = file.type.startsWith("image/");
  const heic = isHeicFile(file);

  if (!isImage && !heic) {
    alert("Please upload a JPG, PNG, WEBP or HEIC image.");
    return;
  }

  let displaySource: Blob = file;

  // HEIC/HEIF can't be rendered directly by <img> in Chrome, Firefox,
  // or most Android browsers — convert to JPEG first.
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

  const url = URL.createObjectURL(displaySource);

  previewImage.src = url;
  passPhoto.src = url;

  previewImage.classList.remove("hidden");
  passPhoto.classList.remove("hidden");

  uploadContent.classList.add("hidden");
  photoPlaceholder.classList.add("hidden");

  changePhoto.classList.remove("hidden");

  setPhotoState(true);
}


// ======================================================
// CHANGE PHOTO
// ======================================================

changePhoto.addEventListener("click", (event) => {
  event.stopPropagation();
  fileInput.value = "";
  fileInput.click();
});


// ======================================================
// NAME INPUT
// ======================================================

nameInput.addEventListener("input", () => {
  const name = nameInput.value.trim().toUpperCase() || "BUILDER";
  passengerName.textContent = name;
  passName.textContent = name;
});


// ======================================================
// DOWNLOAD BOARDING PASS
// (rendering + filename logic lives in share.ts so the
// download button and the share buttons stay in sync)
// ======================================================

const boardingPassEl = document.querySelector<HTMLElement>("#boardingPass")!;

downloadBtn.addEventListener("click", async () => {
  if (!hasPhoto) {
    alert("Upload your photo first!");
    return;
  }

  const originalText = downloadBtn.textContent;
  downloadBtn.textContent = "GENERATING...";
  downloadBtn.disabled = true;

  try {
    const blob = await renderPassBlob(boardingPassEl);
    triggerBlobDownload(blob, getPassFilename(nameInput.value));
  } catch (error) {
    console.error(error);
    alert("Could not generate the boarding pass.");
  } finally {
    downloadBtn.textContent = originalText;
    downloadBtn.disabled = !hasPhoto;
  }
});


// ======================================================
// SHARE — ONE-CLICK TO X / LINKEDIN / INSTAGRAM
// All the share behavior (promo text, hashtag, rendering
// the just-generated pass, opening the right platform) is
// in ./share.ts — this just wires it up to the DOM.
// ======================================================

initShareButtons({
  passElement: boardingPassEl,
  buttons: {
    x: shareXBtn,
    linkedin: shareLinkedInBtn,
    instagram: shareInstagramBtn,
  },
  getPassengerName: () => nameInput.value,
  isPhotoUploaded: () => hasPhoto,
});