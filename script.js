
/* REVOLUTION SCIENCE ACADEMY
   Mobile menu, automatic photo sliders,
   and WhatsApp admission enquiry.
*/

document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION

  const menuButton = document.getElementById("menu");
  const navigation = document.getElementById("main-nav");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
      });
    });
  }

  // AUTOMATIC PHOTO SLIDERS

  const SLIDE_INTERVAL = 3000;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  document.querySelectorAll("[data-slider]").forEach(slider => {
    const track = slider.querySelector(".slider-track");
    const slides = Array.from(slider.querySelectorAll(".slide"));
    const prev = slider.querySelector("[data-prev]");
    const next = slider.querySelector("[data-next]");
    const dotsContainer = slider.querySelector(".slider-dots");

    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;
    let touchStartX = 0;
    let touchStartY = 0;
    let isHovered = false;
    let isFocused = false;
    let isTouching = false;

    // Create navigation dots

    const dots = slides.map((slide, number) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.setAttribute(
        "aria-label",
        `Show photo ${number + 1}`
      );

      dot.addEventListener("click", () => {
        showSlide(number);
        restartSlider();
      });

      dotsContainer.appendChild(dot);
      return dot;
    });

    function showSlide(number) {
      index = (number + slides.length) % slides.length;

      track.style.transform =
        `translateX(-${index * 100}%)`;

      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;

        dot.classList.toggle("active", active);
        dot.setAttribute("aria-current", String(active));
      });
    }

    function stopSlider() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }

    function startSlider() {
      stopSlider();

      if (
        slides.length < 2 ||
        reduceMotion.matches ||
        document.hidden ||
        isHovered ||
        isFocused ||
        isTouching
      ) {
        return;
      }

      timer = setInterval(() => {
        showSlide(index + 1);
      }, SLIDE_INTERVAL);
    }

    function restartSlider() {
      stopSlider();
      startSlider();
    }

    // Previous and next arrows

    if (prev) {
      prev.addEventListener("click", () => {
        showSlide(index - 1);
        restartSlider();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        showSlide(index + 1);
        restartSlider();
      });
    }

    // Pause while mouse is over slider

    slider.addEventListener("mouseenter", () => {
      isHovered = true;
      stopSlider();
    });

    slider.addEventListener("mouseleave", () => {
      isHovered = false;
      startSlider();
    });

    // Pause while keyboard focus is inside slider

    slider.addEventListener("focusin", () => {
      isFocused = true;
      stopSlider();
    });

    slider.addEventListener("focusout", event => {
      if (!slider.contains(event.relatedTarget)) {
        isFocused = false;
        startSlider();
      }
    });

    // Mobile swipe

    const sliderWindow = slider.querySelector(".slider-window");

    if (sliderWindow) {
      sliderWindow.addEventListener(
        "touchstart",
        event => {
          if (event.touches.length !== 1) return;

          isTouching = true;
          touchStartX = event.touches[0].clientX;
          touchStartY = event.touches[0].clientY;
          stopSlider();
        },
        { passive: true }
      );

      sliderWindow.addEventListener(
        "touchend",
        event => {
          if (!isTouching) return;

          const differenceX =
            event.changedTouches[0].clientX - touchStartX;

          const differenceY =
            event.changedTouches[0].clientY - touchStartY;

          if (
            Math.abs(differenceX) > 45 &&
            Math.abs(differenceX) > Math.abs(differenceY)
          ) {
            showSlide(index + (differenceX < 0 ? 1 : -1));
          }

          isTouching = false;
          startSlider();
        },
        { passive: true }
      );

      sliderWindow.addEventListener("touchcancel", () => {
        isTouching = false;
        startSlider();
      });
    }

    document.addEventListener("visibilitychange", startSlider);

    if (reduceMotion.addEventListener) {
      reduceMotion.addEventListener("change", startSlider);
    }

    showSlide(0);
    startSlider();
  });

  // WHATSAPP ADMISSION ENQUIRY

  const form = document.getElementById("form");
  const messageStatus = document.getElementById("msg");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);

      const name = String(data.get("name") || "").trim();
      const mobile = String(data.get("mobile") || "").trim();
      const course = String(data.get("course") || "").trim();
      const date = String(data.get("date") || "").trim();
      const time = String(data.get("time") || "").trim();

      const message = [
        "Hello Revolution Science Academy,",
        "",
        "I would like to enquire about admission.",
        "",
        `Name: ${name}`,
        `Mobile: ${mobile}`,
        `Interested Course: ${course}`,
        `Preferred Visit Date: ${date || "Not selected"}`,
        `Preferred Visit Time: ${time || "Not selected"}`,
        "",
        "Please share the course and admission details."
      ].join("\n");

      const url =
        "https://wa.me/918975142323?text=" +
        encodeURIComponent(message);

      if (messageStatus) {
        messageStatus.textContent =
          "WhatsApp will open. Please press Send to share your enquiry.";
      }

      window.location.href = url;
    });
  }

});

