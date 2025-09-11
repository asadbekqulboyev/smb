window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const mobileMenu = document.getElementById("mobileMenu");

  if (window.scrollY >= 10) {
    header.classList.add("header-top_active");
    mobileMenu.classList.add("header-top_active");
  } else {
    header.classList.remove("header-top_active");
    mobileMenu.classList.remove("header-top_active");
  }
});

// Initialize Swiper
let heroSwiper;

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeSwiper();
  initCookiePopup();
});

const opening = document.querySelector(".opening");
const closing = document.querySelector(".closing");

opening.addEventListener("click", function () {
  opening.classList.remove("active");
  closing.classList.add("active");
});

closing.addEventListener("click", function () {
  closing.classList.remove("active");
  opening.classList.add("active");
});

// Mobile Menu Functions
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const header = document.querySelector(".header");
  mobileMenu.classList.toggle("active");
  header.classList.toggle("active");

  // Prevent body scroll when menu is open
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

// Toggle dropdown in mobile menu
function toggleDropdown(targetId) {
  const dropdown = document.getElementById(targetId);
  const button = document.querySelector(
    `[onclick="toggleDropdown('${targetId}')"]`
  );

  dropdown.classList.toggle("active");
  button.classList.toggle("active");
}
// Initialize Hero Swiper
function initializeSwiper() {
  heroSwiper = new Swiper(".heroSwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    speed: 800,
    effect: "slide",
  });
}

// -------------------- COOKIE -------------------- //
function initCookiePopup() {
  const cookiePopup = document.getElementById("cookiePopup");
  const acceptBtn = document.querySelector(".btn-accept");
  const declineBtn = document.querySelector(".btn-decline");

  // Agar qabul qilingan bo‘lsa – umuman chiqmasin
  if (localStorage.getItem("cookieAccepted") === "true") {
    if (cookiePopup) cookiePopup.remove();
    return;
  }

  // 2 soniyadan keyin popup chiqadi
  setTimeout(() => {
    if (cookiePopup) {
      cookiePopup.classList.add("show");
    }
  }, 2000);

  // Accept bosilganda
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      localStorage.setItem("cookieAccepted", "true"); // saqlab qo‘yish
      closeCookie();
    });
  }

  // Decline bosilganda (shunchaki yopiladi)
  if (declineBtn) {
    declineBtn.addEventListener("click", function () {
      closeCookie();
    });
  }
}

function closeCookie() {
  const cookiePopup = document.getElementById("cookiePopup");
  if (cookiePopup) {
    cookiePopup.classList.remove("show");
  }
}
// ==================================================header end==============
// Kontentni ikki marta takrorlash uchun
// Kontentni ikki marta takrorlash uchun (seamless loop uchun)
const marqueeContent = document.getElementById("marquee-content");
const originalHTML = marqueeContent.innerHTML;
// Ikki marta takrorlash - birinchi set tugaganda ikkinchi set boshlanadi
marqueeContent.innerHTML = originalHTML + originalHTML;

// Agar kerak bo'lsa, heart toggle funksiyasi
function toggleHeart(heartElement) {
  heartElement.classList.toggle("active");
}
// ================================== marquee-content end
document.addEventListener("DOMContentLoaded", function () {
  const handbagGallerySwiper = new Swiper(".handbag-gallery__slider", {
    slidesPerView: 3.5,
    spaceBetween: 15,
    loop: true,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 3.5,
        spaceBetween: 15,
        loop: true,
      },
      320: {
        slidesPerView: 1.3,
        spaceBetween: 15,
        loop: true,
      },
    },
  });

  function updateSpacing() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      handbagGallerySwiper.params.spaceBetween = 8;
    } else {
      handbagGallerySwiper.params.spaceBetween = 4;
    }

    handbagGallerySwiper.update();
  }

  // birinchi yuklanganda chaqiriladi
  updateSpacing();

  // oyna o‘zgarsa ham chaqiriladi
  window.addEventListener("resize", updateSpacing);
});

const children = document.querySelectorAll(".handbag-gallery__card");

// 1-chi, 2-chi, 3-chi ga style-0, style-1, style-2
children.forEach((child, index) => {
  const styleIndex = index % 3; // 0,1,2,0,1,2...
  child.classList.add(`style-${styleIndex}`);
});

// =================================================
function initSMBNewsletter() {
  // Elementlarni tekshirish
  const subscribeBtn = document.getElementById("smbSubscribeBtn");
  const modalOverlay = document.getElementById("smbModalOverlay");
  const modalClose = document.getElementById("smbModalClose");
  const subscribeForm = document.getElementById("smbSubscribeForm");
  const successModal = document.getElementById("smbSuccessModal");
  const successModalClose = document.getElementById("smbSuccessModalClose");
  const okBtn = document.getElementById("smbOkBtn");

  // Agar elementlar mavjud bo'lmasa, funksiyani to'xtatish
  if (!subscribeBtn || !modalOverlay || !successModal) {
    return;
  }

  // Modal ochish
  subscribeBtn.addEventListener("click", function () {
    console.log("Subscribe button clicked"); // Debug uchun
    modalOverlay.classList.add("smb-modal-active");
  });

  // Modal yopish - X tugmasi
  if (modalClose) {
    modalClose.addEventListener("click", function () {
      modalOverlay.classList.remove("smb-modal-active");
    });
  }

  // Modal yopish - overlay click
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("smb-modal-active");
    }
  });

  // Form yuborish
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Privacy checkbox tekshirish
      const privacyCheckbox = document.getElementById("smbPrivacy");
      if (!privacyCheckbox.checked) {
        alert("Политика конфиденциальности билан рози бўлишингiz керак!");
        return;
      }

      modalOverlay.classList.remove("smb-modal-active");
      successModal.classList.add("smb-modal-active");
    });
  }

  // Success modal yopish - X tugmasi
  if (successModalClose) {
    successModalClose.addEventListener("click", function () {
      successModal.classList.remove("smb-modal-active");
    });
  }

  // Success modal yopish - OK tugmasi
  if (okBtn) {
    okBtn.addEventListener("click", function () {
      successModal.classList.remove("smb-modal-active");
    });
  }

  // Success modal yopish - overlay click
  successModal.addEventListener("click", function (e) {
    if (e.target === successModal) {
      successModal.classList.remove("smb-modal-active");
    }
  });
}

// DOM yuklangandan keyin ishga tushirish
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSMBNewsletter);
} else {
  initSMBNewsletter();
}

// Agar sahifa dinamik ravishda yuklanayotgan bo'lsa
window.initSMBNewsletter = initSMBNewsletter;

// ===========================================footer=start====
function initSMBFooter() {
  const mobileHeaders = document.querySelectorAll(".smb-mobile-header");

  mobileHeaders.forEach((header) => {
    const section = header.closest(".smb-mobile-section");

    if (!section.classList.contains("no-dropdown")) {
      header.addEventListener("click", function () {
        const content = section.querySelector(".smb-mobile-content");
        const isActive = header.classList.contains("active");

        // Close all other sections
        mobileHeaders.forEach((otherHeader) => {
          const otherSection = otherHeader.closest(".smb-mobile-section");
          const otherContent = otherSection.querySelector(
            ".smb-mobile-content"
          );

          if (
            otherHeader !== header &&
            !otherSection.classList.contains("no-dropdown")
          ) {
            otherHeader.classList.remove("active");
            otherContent.classList.remove("active");
          }
        });

        // Toggle current section
        if (!isActive) {
          header.classList.add("active");
          content.classList.add("active");
        } else {
          header.classList.remove("active");
          content.classList.remove("active");
        }
      });
    }
  });
}

// Initialize on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSMBFooter);
} else {
  initSMBFooter();
}

window.initSMBFooter = initSMBFooter;
// bu kodlarni Men yozyapman Asadbek Qulboyev
$(function(){

  // Telefon → SMS
  $(".btn_phone_next").on("click", function(e){
    e.preventDefault();
    $(".step_phone").fadeOut(200, function(){
      $(".step_sms").fadeIn(200);
    });
  });

  // SMS → Назад (telefon)
  $(".btn_back_phone").on("click", function(e){
    e.preventDefault();
    $(".step_sms").fadeOut(200, function(){
      $(".step_phone").fadeIn(200);
    });
  });

  // Telefon → Email
  $(".btn_email_next").on("click", function(e){
    e.preventDefault();
    $(".step_phone").fadeOut(200, function(){
      $(".step_email").fadeIn(200);
    });
  });

  // Email → Назад (telefon)
  $(".btn_back_email").on("click", function(e){
    e.preventDefault();
    $(".step_email").fadeOut(200, function(){
      $(".step_phone").fadeIn(200);
    });
  });

  // SMS xato → Error
  $(".btn_sms_wrong").on("click", function(e){
    e.preventDefault();
    $(".step_sms").fadeOut(200, function(){
      $(".step_error").fadeIn(200);
    });
  });

  // Error → Назад (telefon)
  $(".btn_back_error").on("click", function(e){
    e.preventDefault();
    $(".step_error").fadeOut(200, function(){
      $(".step_phone").fadeIn(200);
    });
  });

  // ✅ SMS input nav
  $(".sms_inputs input").on("input", function() {
    if (this.value.length === 1) {
      $(this).next("input").focus();
    }
  });
  $(".sms_inputs input").on("keydown", function(e) {
    if (e.key === "Backspace" && this.value === "") {
      $(this).prev("input").focus();
    }
  });

  // ✅ Telefon + checkbox validatsiya
  function validatePhoneForm() {
    let phoneFilled = $("#phone").val().trim().length > 0;
    let checkboxChecked = $(".custom_checkbox_input").is(":checked");

    if (phoneFilled && checkboxChecked) {
      $(".btn_phone_next").prop("disabled", false);
    } else {
      $(".btn_phone_next").prop("disabled", true);
    }
  }

  // Telefon input o‘zgarganda
  $("#phone").on("input", function() {
    validatePhoneForm();
  });

  // Checkbox o‘zgarganda
  $(".custom_checkbox_input").on("change", function() {
    validatePhoneForm();
  });

  $("input[type='tel']").inputmask("+7 (999) 999-99-99");
  $('.profile-btn').click(function(){
    $('.modal').fadeIn();
  })
  $('.exit').on('click', function(){
    $('.modal').fadeOut();
  });
});
