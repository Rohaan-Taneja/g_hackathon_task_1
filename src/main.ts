import "./style.css";
import html2canvas from "html2canvas";

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
            accept="image/png,image/jpeg,image/webp,image/heic,.heic"
            hidden
          />


          <div
            class="upload-content"
            id="uploadContent"
          >

            <div class="upload-icon">
              ↑
            </div>

            <h3>
              DROP YOUR PHOTO
            </h3>

            <p>
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
          >
            ↓ DOWNLOAD PASS
          </button>


          <button
            id="shareBtn"
            class="secondary-btn"
          >
            ↗ SHARE
          </button>

        </div>

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

      <div>#FRAMEDINGOA</div>

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

const fileInput =
  document.querySelector<HTMLInputElement>(
    "#fileInput"
  )!;

const uploadBtn =
  document.querySelector<HTMLButtonElement>(
    "#uploadBtn"
  )!;

const dropZone =
  document.querySelector<HTMLDivElement>(
    "#dropZone"
  )!;

const uploadContent =
  document.querySelector<HTMLDivElement>(
    "#uploadContent"
  )!;

const previewImage =
  document.querySelector<HTMLImageElement>(
    "#previewImage"
  )!;

const passPhoto =
  document.querySelector<HTMLImageElement>(
    "#passPhoto"
  )!;

const photoPlaceholder =
  document.querySelector<HTMLDivElement>(
    "#photoPlaceholder"
  )!;

const changePhoto =
  document.querySelector<HTMLButtonElement>(
    "#changePhoto"
  )!;

const nameInput =
  document.querySelector<HTMLInputElement>(
    "#nameInput"
  )!;

const passengerName =
  document.querySelector<HTMLSpanElement>(
    "#passengerName"
  )!;

const passName =
  document.querySelector<HTMLDivElement>(
    "#passName"
  )!;

const downloadBtn =
  document.querySelector<HTMLButtonElement>(
    "#downloadBtn"
  )!;

const shareBtn =
  document.querySelector<HTMLButtonElement>(
    "#shareBtn"
  )!;


// ======================================================
// OPEN FILE PICKER
// ======================================================

uploadBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    fileInput.click();

  }
);


// ======================================================
// DROP ZONE CLICK
// ======================================================

dropZone.addEventListener(
  "click",
  () => {

    if (
      previewImage.classList.contains(
        "hidden"
      )
    ) {

      fileInput.click();

    }

  }
);


// ======================================================
// FILE INPUT
// ======================================================

fileInput.addEventListener(
  "change",
  () => {

    const file =
      fileInput.files?.[0];

    if (!file) return;

    handleImage(file);

  }
);


// ======================================================
// DRAG OVER
// ======================================================

dropZone.addEventListener(
  "dragover",
  (event) => {

    event.preventDefault();

    dropZone.classList.add(
      "dragging"
    );

  }
);


// ======================================================
// DRAG LEAVE
// ======================================================

dropZone.addEventListener(
  "dragleave",
  () => {

    dropZone.classList.remove(
      "dragging"
    );

  }
);


// ======================================================
// DROP
// ======================================================

dropZone.addEventListener(
  "drop",
  (event) => {

    event.preventDefault();

    dropZone.classList.remove(
      "dragging"
    );

    const file =
      event.dataTransfer?.files[0];

    if (!file) return;

    handleImage(file);

  }
);


// ======================================================
// IMAGE HANDLING
// ======================================================

function handleImage(file: File) {

  const isImage =
    file.type.startsWith("image/");

  const isHeic =
    file.name
      .toLowerCase()
      .endsWith(".heic");


  if (!isImage && !isHeic) {

    alert(
      "Please upload a JPG, PNG, WEBP or HEIC image."
    );

    return;

  }


  const url =
    URL.createObjectURL(file);


  // Preview
  previewImage.src = url;


  // Boarding pass image
  passPhoto.src = url;


  // Show images
  previewImage.classList.remove(
    "hidden"
  );

  passPhoto.classList.remove(
    "hidden"
  );


  // Hide placeholder
  uploadContent.classList.add(
    "hidden"
  );

  photoPlaceholder.classList.add(
    "hidden"
  );


  // Show change button
  changePhoto.classList.remove(
    "hidden"
  );

}


// ======================================================
// CHANGE PHOTO
// ======================================================

changePhoto.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    fileInput.value = "";

    fileInput.click();

  }
);


// ======================================================
// NAME INPUT
// ======================================================

nameInput.addEventListener(
  "input",
  () => {

    const name =
      nameInput.value
        .trim()
        .toUpperCase() ||
      "BUILDER";


    passengerName.textContent =
      name;

    passName.textContent =
      name;

  }
);


// ======================================================
// DOWNLOAD BOARDING PASS
// ======================================================

downloadBtn.addEventListener(
  "click",
  async () => {

    const boardingPass =
      document.querySelector<HTMLElement>(
        "#boardingPass"
      );


    if (!boardingPass) return;


    const originalText =
      downloadBtn.textContent;


    downloadBtn.textContent =
      "GENERATING...";


    downloadBtn.disabled =
      true;


    try {

      const canvas =
        await html2canvas(
          boardingPass,
          {
            scale: 3,

            backgroundColor:
              "#eee8da",

            useCORS: true,

            logging: false
          }
        );


      const link =
        document.createElement("a");


      const name =
        nameInput.value
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase() ||
        "builder";


      link.download =
        `hh-goa-${name}.png`;


      link.href =
        canvas.toDataURL(
          "image/png"
        );


      link.click();

    } catch (error) {

      console.error(error);

      alert(
        "Could not generate the boarding pass."
      );

    } finally {

      downloadBtn.textContent =
        originalText;

      downloadBtn.disabled =
        false;

    }

  }
);


// ======================================================
// SHARE
// ======================================================

shareBtn.addEventListener(
  "click",
  async () => {

    const name =
      nameInput.value
        .trim() ||
      "Builder";


    const text =
`✈️ I'm boarding Hacker House Goa 2026!

I'm ${name} and I'm ready to BUILD → SHIP → LAUNCH.

See you in Goa.

#FramedInGoa`;


    // Native mobile/browser share
    if (
      navigator.share
    ) {

      try {

        await navigator.share({

          title:
            "Hacker House Goa 2026",

          text

        });

      } catch {

        // User cancelled.
      }

      return;

    }


    // Desktop fallback
    try {

      await navigator.clipboard.writeText(
        text
      );

      alert(
        "Share text copied! Paste it on X, LinkedIn or Instagram."
      );

    } catch {

      alert(text);

    }

  }
);