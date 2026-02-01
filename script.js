// Changing the style of scroll bar
// window.onscroll = function() {myFunction()};

// function myFunction() {
// 	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
// 	var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
// 	var scrolled = (winScroll / height) * 100;
// 	document.getElementById("myBar").style.width = scrolled + "%"; 
// }

function scrollAppear() {
  var introText = document.querySelector('.side-text');
  var sideImage = document.querySelector('.sideImage');
  var introPosition = introText.getBoundingClientRect().top;
  var imagePosition = sideImage.getBoundingClientRect().top;

  var screenPosition = window.innerHeight / 1.2;

  if (introPosition < screenPosition) {
    introText.classList.add('side-text-appear');
  }
  if (imagePosition < screenPosition) {
    sideImage.classList.add('sideImage-appear');
  }
}

window.addEventListener('scroll', scrollAppear);

// For switching between navigation menus in mobile mode
var i = 2;
function switchTAB() {
  var x = document.getElementById("list-switch");
  if (i % 2 == 0) {
    document.getElementById("list-switch").style = "display: grid; height: 50vh; margin-left: 5%;";
    document.getElementById("search-switch").style = "display: block; margin-left: 5%;";
  } else {
    document.getElementById("list-switch").style = "display: none;";
    document.getElementById("search-switch").style = "display: none;";
  }
  i++;
}

// For LOGIN
var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var a = document.getElementById("log");
var b = document.getElementById("reg");
var w = document.getElementById("other");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
  w.style.visibility = "hidden";
  b.style.color = "#fff";
  a.style.color = "#000";
}

function login() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0px";
  w.style.visibility = "visible";
  a.style.color = "#fff";
  b.style.color = "#000";
}

// CheckBox Function
function goFurther() {
  if (document.getElementById("chkAgree").checked == true) {
    document.getElementById('btnSubmit').style = 'background: linear-gradient(to right, #FA4B37, #DF2771);';
  }
  else {
    document.getElementById('btnSubmit').style = 'background: lightgray;';
  }
}

function google() {
  window.location.assign("https://accounts.google.com/signin/v2/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue&csig=AF-SEnbZHbi77CbAiuHE%3A1585466693&flowName=GlifWebSignIn&flowEntry=AddSession", "_blank");
}

// QUIZ Page
function quizt(frame) {
  document.getElementById('f1').style = 'display: none;';
  document.getElementById('f2').style = 'display: none;';
  document.getElementById('f3').style = 'display: none;';
  document.getElementById('f4').style = 'display: none;';
  document.getElementById('f5').style = 'display: none;';
  document.getElementById('f6').style = 'display: none;';
  document.getElementById('f7').style = 'display: none;';
  document.getElementById('f8').style = 'display: none;';
  document.getElementById('f9').style = 'display: none;';
  document.getElementById('f10').style = 'display: none;';
  document.getElementById('f11').style = 'display: none;';
  if (frame == 1) document.getElementById('f1').style = 'display: block';
  else if (frame == 2) document.getElementById('f2').style = 'display: block';
  else if (frame == 3) document.getElementById('f3').style = 'display: block';
  else if (frame == 4) document.getElementById('f4').style = 'display: block';
  else if (frame == 5) document.getElementById('f5').style = 'display: block';
  else if (frame == 6) document.getElementById('f6').style = 'display: block';
  else if (frame == 7) document.getElementById('f7').style = 'display: block';
  else if (frame == 8) document.getElementById('f8').style = 'display: block';
  else if (frame == 9) document.getElementById('f9').style = 'display: block';
  else if (frame == 10) document.getElementById('f10').style = 'display: block';
  else if (frame == 11) document.getElementById('f11').style = 'display: block';
  else alert('error');
}

function startquiz() {
  document.getElementById('title').style = 'display: none;';

  document.getElementById('panel').style = 'display: inline-flex;';
  document.getElementById('left').style = 'display: block;';
  document.getElementById('right').style = 'display: block;';
}
function searchdisplay() {
  document.getElementById('searchpanel').style.display = "block";
}

function display(n) {
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var img3 = document.getElementById('img3');
  var img4 = document.getElementById('img4');
  var s1 = document.getElementById('s1');
  var s2 = document.getElementById('s2');
  var s3 = document.getElementById('s3');
  var s4 = document.getElementById('s4');

  img1.style = 'display: none;';
  img2.style = 'display: none;';
  img3.style = 'display: none;';
  img4.style = 'display: none;';
  s1.style = 'background: #DF2771; color: #FFF;';
  s2.style = 'background: #DF2771; color: #FFF;';
  s3.style = 'background: #DF2771; color: #FFF;';
  s4.style = 'background: #DF2771; color: #FFF;';

  if (n == 1) {
    img1.style = 'display: block;';
    s1.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if (n == 2) {
    img2.style = 'display: block;';
    s2.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if (n == 3) {
    img3.style = 'display: block;';
    s3.style = 'background: #E5E8EF; color: #DF2771;';
  }
  if (n == 4) {
    img4.style = 'display: block;';
    s4.style = 'background: #E5E8EF; color: #DF2771;';
  }
}


function sideMenu(side) {
  var menu = document.getElementById('side-menu');
  if (side == 0) {
    menu.style = 'transform: translateX(0vh); position:fixed;';
  }
  else {
    menu.style = 'transform: translateX(-100%);';
  }
  side++;
}

// Add this JavaScript to handle click events for better UX

// Dropdown toggle on click (for mobile/touch devices)
document.addEventListener('DOMContentLoaded', function () {
  const userAvatar = document.querySelector('.user-avatar');
  const dropdown = document.querySelector('.dropdown-content');

  if (userAvatar && dropdown) {
    // Toggle dropdown on click
    userAvatar.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function (e) {
      if (!userAvatar.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
      }
    });

    // Also keep hover functionality
    userAvatar.addEventListener('mouseenter', function () {
      dropdown.classList.add('show');
    });

    // Add a slight delay on mouse leave to prevent immediate closing
    let hoverTimeout;
    userAvatar.addEventListener('mouseleave', function () {
      hoverTimeout = setTimeout(() => {
        if (!dropdown.matches(':hover')) {
          dropdown.classList.remove('show');
        }
      }, 200); // 200ms delay
    });

    dropdown.addEventListener('mouseenter', function () {
      clearTimeout(hoverTimeout);
    });

    dropdown.addEventListener('mouseleave', function () {
      dropdown.classList.remove('show');
    });
  }
});


// Mobile navigation toggle wired to existing DOM (mobile-toggle, nav-links)
function initMobileNavigation() {
  const mobileToggle = document.getElementById('mobileToggle') || document.querySelector('#mobile-toggle, .mobile-toggle, [data-mobile-toggle]');
  const navLinks = document.getElementById('navLinks') || document.querySelector('#nav-links, .nav-links, [data-nav-links]');
  const navContainer = document.querySelector('nav.nav-container') || document.querySelector('nav');

  if (!mobileToggle || !navLinks) return;

  // Create a real overlay layer once
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const openMenu = () => {
    navLinks.classList.add('active');
    if (navContainer) navContainer.classList.add('mobile-nav-active'); // legacy support
    mobileToggle.classList.add('active');
    overlay.classList.add('active');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-times';
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    navLinks.classList.remove('active');
    if (navContainer) navContainer.classList.remove('mobile-nav-active');
    mobileToggle.classList.remove('active');
    overlay.classList.remove('active');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
    document.body.classList.remove('menu-open');
  };

  // Avoid duplicate listeners and ensure idempotent setup across pages
  // Remove any previous click handler we stored
  if (mobileToggle.__mobileHandler) {
    mobileToggle.removeEventListener('click', mobileToggle.__mobileHandler);
  }
  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = navLinks.classList.contains('active') || (navContainer && navContainer.classList.contains('mobile-nav-active'));
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };
  mobileToggle.addEventListener('click', handler, { passive: false });
  mobileToggle.__mobileHandler = handler;

  // Ensure overlay has a single handler
  if (overlay.__overlayHandler) {
    overlay.removeEventListener('click', overlay.__overlayHandler);
  }
  overlay.__overlayHandler = closeMenu;
  overlay.addEventListener('click', overlay.__overlayHandler);

  // Close when clicking outside (one global listener, debounced by flag)
  if (!document.__navOutsideHandler) {
    document.__navOutsideHandler = function (e) {
      const isOpen = navLinks.classList.contains('active') || (navContainer && navContainer.classList.contains('mobile-nav-active'));
      if (isOpen && !navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('click', document.__navOutsideHandler);
  }

  // Close when clicking a link (rebind safely)
  navLinks.querySelectorAll('a').forEach(link => {
    if (link.__closeHandler) link.removeEventListener('click', link.__closeHandler);
    link.__closeHandler = closeMenu;
    link.addEventListener('click', link.__closeHandler);
  });

  // Close on escape key (single global)
  if (!document.__navEscHandler) {
    document.__navEscHandler = function (e) {
      const isOpen = navLinks.classList.contains('active') || (navContainer && navContainer.classList.contains('mobile-nav-active'));
      if (e.key === 'Escape' && isOpen) closeMenu();
    };
    document.addEventListener('keydown', document.__navEscHandler);
  }

  // Handle window resize (single global)
  if (!window.__navResizeHandler) {
    window.__navResizeHandler = function () {
      const isOpen = navLinks.classList.contains('active') || (navContainer && navContainer.classList.contains('mobile-nav-active'));
      if (window.innerWidth > 768 && isOpen) closeMenu();
    };
    window.addEventListener('resize', window.__navResizeHandler);
  }
}

// Add CSS styles for the mobile menu enhancement
function addMobileMenuStyles() {
  // prevent duplicate injection
  if (document.getElementById('mobile-menu-styles')) return;
  const style = document.createElement('style');
  style.id = 'mobile-menu-styles';
  style.textContent = `
        /* Enhanced mobile menu styles */
        .nav-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
            z-index: 998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
        }
        .nav-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .nav-links, #navLinks, [data-nav-links] {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            transform: translateY(-100%) !important;
            opacity: 0 !important;
            visibility: hidden !important;
            position: fixed !important;
            top: 70px !important;
            left: 0 !important;
            width: 100% !important;
            background: linear-gradient(135deg, rgba(2, 6, 23, 0.98), rgba(2, 6, 23, 0.95)) !important;
            backdrop-filter: blur(20px) !important;
            display: flex !important;
            flex-direction: column !important;
            padding: 20px !important;
            gap: 0 !important;
            z-index: 999 !important;
            border-top: 1px solid rgba(255, 255, 255, 0.15) !important;
            max-height: calc(100vh - 70px) !important;
            overflow-y: auto !important;
        }
        .nav-links.active, #navLinks.active, [data-nav-links].active {
            transform: translateY(0) !important;
            opacity: 1 !important;
            visibility: visible !important;
        }
        .nav-links li, #navLinks li, [data-nav-links] li {
            width: 100% !important;
            opacity: 0 !important;
            transform: translateX(-20px) !important;
            transition: all 0.3s ease !important;
        }
        .nav-links.active li, #navLinks.active li, [data-nav-links].active li {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
        .nav-links.active li:nth-child(1) { transition-delay: 0.1s !important; }
        .nav-links.active li:nth-child(2) { transition-delay: 0.15s !important; }
        .nav-links.active li:nth-child(3) { transition-delay: 0.2s !important; }
        .nav-links.active li:nth-child(4) { transition-delay: 0.25s !important; }
        .nav-links.active li:nth-child(5) { transition-delay: 0.3s !important; }

        .nav-links a, #navLinks a, [data-nav-links] a {
            display: flex !important;
            align-items: center !important;
            padding: 15px 20px !important;
            font-size: 1.1rem !important;
            border-radius: 10px !important;
            transition: all 0.3s ease !important;
            color: white !important;
            background: rgba(255, 255, 255, 0.05) !important;
            margin: 6px 0 !important;
            width: 100% !important;
            border: 1px solid transparent !important;
        }
        .nav-links a:hover, #navLinks a:hover, [data-nav-links] a:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            border-color: rgba(96, 165, 250, 0.3) !important;
            transform: translateX(10px) !important;
            color: var(--accent) !important;
        }
        .nav-links a::after, #navLinks a::after, [data-nav-links] a::after { display: none !important; }

        .mobile-toggle, #mobileToggle, #mobile-toggle, [data-mobile-toggle] {
            display: none !important;
            background: var(--gradient-primary) !important;
            border: none !important;
            color: white !important;
            font-size: 1.5rem !important;
            cursor: pointer !important;
            padding: 10px 15px !important;
            border-radius: 10px !important;
            transition: all 0.3s ease !important;
            z-index: 1000 !important;
            box-shadow: var(--shadow-md) !important;
        }
        .mobile-toggle:hover, #mobileToggle:hover, #mobile-toggle:hover, [data-mobile-toggle]:hover {
            transform: scale(1.05) !important;
            box-shadow: var(--shadow-lg) !important;
        }
        .mobile-toggle.active, #mobileToggle.active, #mobile-toggle.active, [data-mobile-toggle].active {
            background: var(--gradient-accent) !important;
        }

        @media (max-width: 768px) {
            .mobile-toggle, #mobileToggle, #mobile-toggle, [data-mobile-toggle] {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }
            .nav-search { display: none !important; }
            .nav-actions { gap: 10px !important; }
            body.menu-open { overflow: hidden !important; }
        }
        @media (max-width: 480px) {
            .nav-links, #navLinks, [data-nav-links] { padding: 15px !important; }
            .nav-links a, #navLinks a, [data-nav-links] a { padding: 12px 15px !important; font-size: 1rem !important; }
            .mobile-toggle, #mobileToggle, #mobile-toggle, [data-mobile-toggle] { padding: 8px 12px !important; font-size: 1.3rem !important; }
        }
    `;
  document.head.appendChild(style);
}

// Initialize mobile navigation when DOM loads
document.addEventListener('DOMContentLoaded', function () {
  // Add the enhanced styles
  addMobileMenuStyles();

  // Initialize mobile navigation
  initMobileNavigation();

  // Avoid double initialization of functions already present in index.html
  // Keep only cross-page safe initializations if available
  if (typeof generateTechBackground === 'function') generateTechBackground();
  if (typeof animateCounter === 'function') animateCounter();
  if (typeof initNavigation === 'function') initNavigation();
  if (typeof initNewsletter === 'function') initNewsletter();
  if (typeof initCourseCards === 'function') initCourseCards();
  if (typeof initSmoothScroll === 'function') initSmoothScroll();
  if (typeof checkAuth === 'function') checkAuth();
  if (typeof optimizeAnimations === 'function') optimizeAnimations();

  // Set viewport height for mobile
  function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);
});

// Keep your existing functions but add the mobile menu initialization
function initNavigation() {
  const nav = document.querySelector('.nav-container');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}
// Remove duplicate advanced initMobileNavigation to avoid conflicts with existing markup
// The simplified initMobileNavigation above handles the mobile toggle and dropdown behavior.

// Keep a single logout that also closes any open dropdowns/menus
function logout() {
  localStorage.removeItem('clinTechUser');
  localStorage.removeItem('clinTechSessionToken');
  sessionStorage.removeItem('clinTechUser');

  // Close user dropdown if present
  const dropdown = document.querySelector('.dropdown-content');
  if (dropdown) dropdown.classList.remove('show');

  // Close mobile menu if open
  const navLinks = document.getElementById('navLinks');
  const mobileToggle = document.getElementById('mobileToggle');
  if (navLinks && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
  if (mobileToggle) {
    mobileToggle.classList.remove('active');
    const icon = mobileToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
  }
  document.body.classList.remove('menu-open');

  // Redirect to home page
  window.location.href = 'index.html';
}

// Notification function
function showNotification(message, type = 'success') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 90%;
        z-index: 9999;
        transform: translateX(120%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;

  // Close button functionality
  notification.querySelector('.notification-close').addEventListener('click', function () {
    notification.style.transform = 'translateX(120%)';
    setTimeout(() => notification.remove(), 400);
  });

  // Add to DOM
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => notification.remove(), 400);
    }
  }, 5000);
}


// Add this to your existing code where you initialize everything
// Make sure to call initMobileNavigation() in your existing initialization