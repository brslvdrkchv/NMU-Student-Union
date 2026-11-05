/**
 * ПРОФКОМ СТУДЕНТІВ НМУ ІМЕНІ О.О. БОГОМОЛЬЦЯ
 * Main Interactive Engine & Design Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveals();
  initStatCounters();
  initCalculator();
  initModals();
  initCardSpotlights();
  initFormHandlers();
  initBackToTop();
});

/* ==========================================================================
   1. HEADER SCROLL & BACK TO TOP
   ========================================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   2. MOBILE OVERLAY NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const links = document.querySelectorAll('.mobile-menu-link, .mobile-menu .btn');

  if (!toggle || !menu) return;

  const toggleMenu = () => {
    const isOpen = menu.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    toggle.setAttribute('aria-expanded', isOpen);
  };

  toggle.addEventListener('click', toggleMenu);

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. SCROLL REVEAL (IntersectionObserver)
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-item');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-animate');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('reveal-animate'));
  }
}

/* ==========================================================================
   4. ANIMATED STAT COUNTERS
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-num[data-target]');
  if (!statNumbers.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target'));
    const isPercent = el.innerText.includes('%') || el.getAttribute('data-target').includes('%');
    const isK = el.getAttribute('data-is-k') === 'true';
    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = (target * easeProgress).toFixed(isK ? 1 : 0);

      if (isK) {
        el.textContent = `${current}K+`;
      } else if (isPercent) {
        el.textContent = `${Math.round(target * easeProgress)}%`;
      } else {
        el.textContent = `${Math.round(target * easeProgress)}+`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(num => observer.observe(num));
  } else {
    statNumbers.forEach(num => animateCounter(num));
  }
}

/* ==========================================================================
   5. SOCIAL SCHOLARSHIPS & HOUSING CALCULATOR DATA & LOGIC
   ========================================================================== */
const SCHOLARSHIP_DATA = {
  vpo: {
    title: "Внутрішньо переміщена особа (ВПО)",
    facultyNote: "Профком веде супровід для: ННІМ, ФПЛЗСУ, Факультет Педіатрії. На інших факультетах — через деканат.",
    documents: [
      "Копія довідки про взяття на облік внутрішньо переміщеної особи (чинна)",
      "Копія паспорта громадянина України (1, 2 сторінки та прописка / ID-картка з витягом)",
      "Копія реєстраційного номера облікової картки платника податків (ІПН)",
      "Копія студентського квитка",
      "Заява на ім'я ректора (бланк надається профоргом або в каб. 438)",
      "Довідка про те, що студент не отримує соціальну стипендію в іншому ЗВО"
    ],
    terms: "Денна форма навчання за державним замовленням, відсутність академічної заборгованості."
  },
  ubd: {
    title: "Діти учасників бойових дій (УБД / АТО / ООС)",
    facultyNote: "Виплата здійснюється до закінчення навчання, але не довше ніж до досягнення 23 років.",
    documents: [
      "Копія посвідчення учасника бойових дій батька або матері",
      "Копія свідоцтва про народження студента (для підтвердження родинних зв'язків)",
      "Довідка про безпосередню участь у бойових діях / заходах оборони України (оригінал або нотаріальна копія)",
      "Копія паспорта та ІПН студента",
      "Копія студентського квитка",
      "Заява встановленого зразка"
    ],
    terms: "Денна бюджетна форма навчання, вік до 23 років, відсутність академзаборгованості."
  },
  orphan: {
    title: "Діти-сироти та діти, позбавлені батьківського піклування",
    facultyNote: "Категорія гарантує підвищений розмір стипендії та першочергову матеріальну допомогу.",
    documents: [
      "Копія рішення органу опіки та піклування про надання статусу дитини-сироти / позбавленої піклування (або витяг з обліково-статистичної картки)",
      "Копія свідоцтва про смерть батьків (або копія рішення суду про позбавлення батьківських прав)",
      "Копія паспорта, ІПН та студентського квитка",
      "Заява на нарахування соціальної стипендії",
      "Реквізити банківської картки для стипендіальних виплат"
    ],
    terms: "Вік від 18 до 23 років, студенти, які в період навчання втратили батьків."
  },
  chaes: {
    title: "Постраждалі внаслідок Чорнобильської катастрофи (ЧАЕС)",
    facultyNote: "Згідно з Законом України про статус та соціальний захист громадян, які постраждали від ЧАЕС.",
    documents: [
      "Копія посвідчення громадянина, який постраждав внаслідок аварії на ЧАЕС (категорії 1–3)",
      "Для неповнолітніх дітей померлого ліквідатора — копія довідки встановленого зразка",
      "Копія свідоцтва про смерть, пов'язану з Чорнобильською катастрофою (за наявності)",
      "Копія паспорта, ІПН, студентського квитка та заява"
    ],
    terms: "Денна бюджетна форма навчання."
  },
  miners: {
    title: "Шахтарський стаж батьків (15+ років підземної роботи)",
    facultyNote: "Згідно зі статтею 5 Закону України «Про підвищення престижності шахтарської праці».",
    documents: [
      "Довідка з гірничого підприємства із зазначенням стажу підземної роботи одного з батьків (не менше 15 років)",
      "АБО акт про нещасний випадок на виробництві за формою Н-1 / довідка МСЕК про інвалідність I–II групи внаслідок травми",
      "Копія свідоцтва про народження студента",
      "Копія паспорта, ІПН та студентського квитка",
      "Заява"
    ],
    terms: "Вступ протягом 3 років після здобуття повної загальної середньої освіти."
  },
  disability: {
    title: "Особи з інвалідністю (I, II, III групи)",
    facultyNote: "Надається право на соціальну стипендію за умови відсутності академічної заборгованості.",
    documents: [
      "Копія довідки МСЕК (Медико-соціальної експертної комісії) про встановлення групи інвалідності",
      "АБО пенсійне посвідчення / посвідчення отримувача державної соціальної допомоги",
      "Копія індивідуальної програми реабілітації (за вимогою)",
      "Копія паспорта, ІПН, студентського квитка та заява"
    ],
    terms: "Чинний строк дії довідки МСЕК на момент подання заяви."
  }
};

function initCalculator() {
  const tabs = document.querySelectorAll('.calc-tab');
  const panels = document.querySelectorAll('.calc-panel');
  const catButtons = document.querySelectorAll('.cat-btn');

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Category selection for scholarship checklist
  const resultTitle = document.getElementById('scholarship-result-title');
  const resultFacultyNote = document.getElementById('scholarship-faculty-note');
  const resultTerms = document.getElementById('scholarship-terms');
  const resultItems = document.getElementById('scholarship-checklist-items');

  const updateScholarshipView = (catKey) => {
    const data = SCHOLARSHIP_DATA[catKey];
    if (!data) return;

    if (resultTitle) resultTitle.textContent = data.title;
    if (resultFacultyNote) resultFacultyNote.textContent = data.facultyNote;
    if (resultTerms) resultTerms.textContent = data.terms;

    if (resultItems) {
      resultItems.innerHTML = data.documents.map(doc => `
        <li class="checklist-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${doc}</span>
        </li>
      `).join('');
    }
  };

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const key = btn.getAttribute('data-category');
      updateScholarshipView(key);
    });
  });

  // Default to vpo
  updateScholarshipView('vpo');
}

/* ==========================================================================
   6. MODAL SYSTEM
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const firstInput = modal.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
      }
    });
  });

  const closeModal = (modal) => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) closeModal(modal);
    });
  });

  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      backdrops.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
    }
  });
}

/* ==========================================================================
   7. INTERACTIVE SPOTLIGHT ON GLASS CARDS
   ========================================================================== */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.glass-card, .leader-card, .club-card, .benefit-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   8. FORM SUBMISSION FEEDBACK
   ========================================================================== */
function initFormHandlers() {
  const forms = document.querySelectorAll('.app-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type=\"submit\"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Надіслати';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"animation: spin 1s linear infinite;\">
            <line x1=\"12\" y1=\"2\" x2=\"12\" y2=\"6\"></line>
            <line x1=\"12\" y1=\"18\" x2=\"12\" y2=\"22\"></line>
            <line x1=\"4.93\" y1=\"4.93\" x2=\"7.76\" y2=\"7.76\"></line>
            <line x1=\"16.24\" y1=\"16.24\" x2=\"19.07\" y2=\"19.07\"></line>
            <line x1=\"2\" y1=\"12\" x2=\"6\" y2=\"12\"></line>
            <line x1=\"18\" y1=\"12\" x2=\"22\" y2=\"12\"></line>
            <line x1=\"4.93\" y1=\"19.07\" x2=\"7.76\" y2=\"16.24\"></line>
            <line x1=\"16.24\" y1=\"7.76\" x2=\"19.07\" y2=\"4.93\"></line>
          </svg>
          Обробка запиту...
        `;
      }

      setTimeout(() => {
        form.innerHTML = `
          <div style=\"text-align: center; padding: 40px 20px;\">
            <div style=\"width: 64px; height: 64px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); border: 2px solid #10b981; color: #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;\">
              <svg width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\">
                <polyline points=\"20 6 9 17 4 12\"></polyline>
              </svg>
            </div>
            <h3 class=\"font-druk\" style=\"font-size: 1.4rem; color: #fff; margin-bottom: 10px;\">ЗАЯВКУ ПРИЙНЯТО!</h3>
            <p style=\"color: #94a3b8; font-size: 0.95rem; max-width: 420px; margin: 0 auto 24px;\">Дякуємо за звернення! Наш секретар або представник Профкому зв'яжеться з Вами в Telegram найближчим часом.</p>
            <a href=\"https://t.me/Profkom_NMU\" target=\"_blank\" class=\"btn btn-primary btn-druk\">ПЕРЕЙТИ В ТЕЛЕГРАМ-КАНАЛ</a>
          </div>
        `;
      }, 1200);
    });
  });
}
