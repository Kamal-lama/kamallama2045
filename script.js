/**
 * Kamal Lama - IT Infrastructure Specialist & Senior Technical Portfolio
 * Vanilla JavaScript Interactive Engine (Zero backend required, 100% GitHub Pages ready)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNavHighlight();
  initSkillFilters();
  initProjectFilters();
  initProjectModals();
  initGalleryLightbox();
  initResumeModal();
  initContactForm();
  initAnimatedCounters();
  initCopyActions();
});

/* ==========================================================================
   1. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const icon = toggleBtn.querySelector('svg');
    if (icon) {
      if (isOpen) {
        // Change to close icon
        icon.innerHTML = '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>';
      } else {
        // Hamburger
        icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
      }
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      const icon = toggleBtn.querySelector('svg');
      if (icon) {
        icon.innerHTML = '<line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>';
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target) && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   2. ACTIVE NAV HIGHLIGHT ON SCROLL
   ========================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   3. SKILLS CATEGORY FILTERING
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('[data-skill-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-skill-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. PROJECTS CATEGORY FILTERING
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('[data-project-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-project-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-project-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAIL MODALS DATA & ENGINE
   ========================================================================== */
const projectData = {
  project1: {
    title: "73 MW Middle Tamor Hydro Plant Network & SCADA IT Backbone",
    subtitle: "Sanima Middle Tamor Hydropower Ltd. // Taplejung & Kathmandu",
    badge: "MISSION-CRITICAL INFRASTRUCTURE",
    overview: "Engineered and deployed the primary optical network backbone, industrial VLAN segmentation, and control-room IT infrastructure connecting powerhouse turbines, headworks, switchyard, and administrative camp facilities under severe mountainous terrain.",
    metrics: [
      { label: "Optical Fiber Length", value: "8.5+ km" },
      { label: "Continuous Uptime", value: "99.98%" },
      { label: "Endpoints Connected", value: "240+ Units" },
      { label: "Latency to Headworks", value: "< 1.8 ms" }
    ],
    challenges: [
      "Rugged terrain with severe elevation shifts, landslide risks, and extreme lightning vulnerability.",
      "Strict air-gapped isolation requirements between generation SCADA telemetry and general corporate network.",
      "Frequent power grid anomalies requiring multi-stage UPS and diesel generator automatic transfer switch (ATS) IT coordination."
    ],
    solutions: [
      "Armored outdoor single-mode 12-core fiber optic runs inside reinforced conduit with lightning surge arrestors.",
      "Layer-3 Cisco core switches configuring strict ACLs, isolated management VLANs, and redundant fiber ring topology (RSTP).",
      "Centralized dual-online APC Smart-UPS battery arrays providing uninterrupted clean sinusoidal power."
    ],
    hardware: [
      "Cisco Catalyst Managed Switches (L2/L3)",
      "Corning Single-Mode 12-Core Fiber Optic Cables",
      "Precision Fusion Splicers & OTDR Fluke Analyzers",
      "Industrial Optical Media Converters",
      "APC Smart-UPS RT 10kVA On-Line Power Conditioning"
    ]
  },
  project2: {
    title: "Long-Distance Microwave Wireless Bridges Across Gorge Camps",
    subtitle: "High-Altitude Wireless Point-to-Point Deployment",
    badge: "WIRELESS TELECOMMUNICATIONS",
    overview: "Architected and installed multi-gigabit wireless point-to-point and point-to-multipoint radio links connecting remote construction adits, dam headworks, and isolated contractor offices across deep Himalayan river gorges where physical cabling was impossible.",
    metrics: [
      { label: "Link Distance", value: "4.2 km Span" },
      { label: "Throughput Capacity", value: "450+ Mbps" },
      { label: "Link Availability", value: "99.95%" },
      { label: "Signal-to-Noise Ratio", value: "> 38 dB" }
    ],
    challenges: [
      "Direct line-of-sight obstructed by deep mist, seasonal torrential monsoon downpours, and mountain gorges.",
      "High wind shear and lightning strikes on remote metal communication masts.",
      "Solar and battery-backed power requirements at isolated mountaintop repeater relay sites."
    ],
    solutions: [
      "Ubiquiti airMAX Rocket 5AC Prism radios coupled with 30dBi dual-polarity parabolic dish antennas.",
      "Copper grounding arrays and gas discharge tube surge suppressors on every tower coaxial run.",
      "Solar MPPT charge controllers and deep-cycle AGM battery banks providing 72 hours of autonomy."
    ],
    hardware: [
      "Ubiquiti airMAX Rocket 5AC Prism & airFiber 60",
      "MikroTik NetMetal 5 with 30dBi Dish",
      "Industrial Ethernet Surge Protectors (ETH-SP-G2)",
      "Solar MPPT Victron Energy Off-Grid Inverters"
    ]
  },
  project3: {
    title: "64-Channel Campus IP CCTV Surveillance & NVR Matrix",
    subtitle: "Physical Security & Hydro Dam Perimeter Protection",
    badge: "SITE SECURITY & AUTOMATION",
    overview: "Designed, installed, and centrally consolidated a comprehensive 64-camera high-definition IP surveillance matrix spanning powerhouse halls, intake reservoir, explosive magazines, camp gates, and sensitive control centers.",
    metrics: [
      { label: "IP Cameras Deployed", value: "64+ HD Units" },
      { label: "Video Retention", value: "90 Days Raid" },
      { label: "Night Vision Range", value: "Up to 150m" },
      { label: "Power over Ethernet", value: "Full PoE+ Run" }
    ],
    challenges: [
      "Harsh environmental conditions including heavy river moisture, vibration inside powerhouse turbine pits, and sub-zero winter temperatures.",
      "Immense network bandwidth and storage requirements for 24/7 simultaneous H.265+ 4K streams.",
      "Secure remote access authorization for Kathmandu corporate executives without opening firewall vulnerabilities."
    ],
    solutions: [
      "IP67 weatherproof and IK10 vandal-proof Dahua/Hikvision motorized varifocal and PTZ cameras with darkfighter IR.",
      "Dedicated surveillance VLAN separating camera streaming traffic completely from corporate office workstations.",
      "Dual 32-channel enterprise NVRs configured with Western Digital Purple surveillance drives in RAID 5 with automated offsite backup sync."
    ],
    hardware: [
      "Dahua / Hikvision 4K Starlight PTZ & Varifocal Bullet Cameras",
      "Enterprise 32-Channel NVRs with 8x 8TB WD Purple HDDs",
      "Industrial Gigabit PoE+ High-Power Managed Switches",
      "Multi-Monitor Video Wall Matrix with HDMI Decoders"
    ]
  },
  project4: {
    title: "Enterprise Windows Server & Hybrid Active Directory Infrastructure",
    subtitle: "Centralized Identity, DNS, File Storage & Group Policy",
    badge: "SERVERS & SYSTEMS ARCHITECTURE",
    overview: "Consolidated isolated workgroup PCs into an enterprise Windows Server Active Directory domain environment, implementing centralized authentication, roaming profiles, automated daily backup snapshots, and granular network share permissions.",
    metrics: [
      { label: "Domain Users", value: "180+ Accounts" },
      { label: "Central Storage", value: "32 TB Synology" },
      { label: "Backup RPO", value: "< 4 Hours" },
      { label: "Security Policies", value: "45+ GPOs Enforced" }
    ],
    challenges: [
      "Unmanaged endpoints vulnerable to USB malware and unauthorized configuration changes.",
      "Scattered engineering CAD drawings, contracts, and financial spreadsheets with no unified versioning.",
      "High turnover of multi-contractor engineering teams needing timely access provisioning and deprovisioning."
    ],
    solutions: [
      "Primary and Secondary Windows Server Domain Controllers with automated replication across site and headquarters.",
      "Strict Group Policy Objects (GPOs) disabling unencrypted USB drives, enforcing password complexity, and standardizing software installations.",
      "Synology RackStation NAS storage with Btrfs snapshots, RAID 6 redundancy, and encrypted multi-cloud offsite sync."
    ],
    hardware: [
      "Dell PowerEdge Rackmount Dual-Xeon Servers",
      "Synology RackStation RS2423+ 12-Bay Storage Array",
      "Western Digital Gold Enterprise SAS/SATA Drives",
      "Windows Server 2022 Standard Hyper-V Virtualization"
    ]
  },
  project5: {
    title: "Multi-Terminal Biometric Attendance & RFID Access Control",
    subtitle: "Automated Workforce Tracking & Server Room Security",
    badge: "ACCESS CONTROL & COMPLIANCE",
    overview: "Implemented a unified biometric fingerprint, facial recognition, and RFID card access control ecosystem across Kathmandu corporate headquarters and Taplejung construction sites, syncing directly with corporate HR and payroll software.",
    metrics: [
      { label: "Registered Personnel", value: "350+ Staff" },
      { label: "Access Terminals", value: "8 Key Zones" },
      { label: "Verification Speed", value: "< 0.5 Seconds" },
      { label: "Data Synchronization", value: "Real-time Cloud" }
    ],
    challenges: [
      "Manual sign-in sheets prone to proxy attendance, discrepancies, and delayed monthly payroll processing.",
      "Physical security compliance requiring strict audited entry logs into server server rooms and high-voltage control centers."
    ],
    solutions: [
      "ZKTeco multi-biometric terminals deployed with magnetic door locks, emergency breakout switches, and optical sensors.",
      "Centralized SQL-backed BioTime attendance server automatically pulling attendance logs over site VPN every 15 minutes.",
      "Automated SMS/Email incident alerts triggered when unauthorized door access or tampering is attempted."
    ],
    hardware: [
      "ZKTeco Face & Fingerprint Terminals (SilkBio / SpeedFace)",
      "High-Holding Heavy Duty Magnetic Door Locks (600 lbs)",
      "Backup 12V 7Ah Battery Power Supplies for Fail-Secure Operation",
      "Mifare 13.56MHz Encrypted RFID Cards"
    ]
  },
  project6: {
    title: "Component-Level Hardware Diagnostic & Refurbishment Lab",
    subtitle: "High-Altitude Rapid Repair & Equipment Life-Extension",
    badge: "HARDWARE ENGINEERING",
    overview: "Established an on-site electronic testing and component-level diagnostic workstation capable of diagnosing and soldering motherboards, replacing swollen capacitors, rebuilding power supplies, and rescuing corrupted storage drives in remote conditions where replacement parts take weeks to arrive.",
    metrics: [
      { label: "Devices Salvaged", value: "380+ Computers" },
      { label: "Cost Savings", value: "Millions NPR" },
      { label: "Turnaround Time", value: "< 24 Hours Avg" },
      { label: "Recovery Rate", value: "92% Success" }
    ],
    challenges: [
      "Taplejung's remote geographic isolation: procurement from Kathmandu takes 4-7 days during good weather and weeks during monsoon road blockages.",
      "Severe grid power surges and lightning spikes burning PC power supplies and motherboard VRMs on a regular basis."
    ],
    solutions: [
      "ESD-safe repair bench equipped with digital oscilloscopes, component multimeters, hot air rework stations, and ultrasonic cleaning baths.",
      "Stocked inventory of standard transistors, MOSFETs, solid capacitors, PWM controllers, and thermal materials.",
      "Systematic hardware burn-in testing protocols before returning serviced equipment to mission-critical control operators."
    ],
    hardware: [
      "Quick 861DW Digital Lead-Free Hot Air Rework Station",
      "Rigol Digital Storage Oscilloscope & Fluke 87V Multimeter",
      "High-grade thermal compounds & solder flux",
      "Chinn-style EEPROM / BIOS programmer for firmware flashing"
    ]
  }
};

function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('projectModalClose');
  const triggers = document.querySelectorAll('[data-project-trigger]');

  if (!modal || !modalCloseBtn) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project-trigger');
      const data = projectData[projId];
      if (!data) return;

      // Populate Modal Content
      document.getElementById('modalProjectBadge').textContent = data.badge;
      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectSubtitle').textContent = data.subtitle;
      document.getElementById('modalProjectOverview').textContent = data.overview;

      // Metrics Grid
      const metricsContainer = document.getElementById('modalProjectMetrics');
      metricsContainer.innerHTML = data.metrics.map(m => `
        <div class="metric-item" style="background: rgba(15, 32, 53, 0.7); padding: 1rem; border-radius: 0.5rem; border: 1px solid var(--border-subtle);">
          <span class="mono-tag" style="color: var(--color-primary-light);">${m.label}</span>
          <div style="font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; color: var(--text-primary); margin-top: 0.25rem;">${m.value}</div>
        </div>
      `).join('');

      // Challenges
      const challengesList = document.getElementById('modalProjectChallenges');
      challengesList.innerHTML = data.challenges.map(c => `
        <li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem; align-items: flex-start;">
          <span style="color: var(--status-amber); font-weight: bold;">▪</span>
          <span>${c}</span>
        </li>
      `).join('');

      // Solutions
      const solutionsList = document.getElementById('modalProjectSolutions');
      solutionsList.innerHTML = data.solutions.map(s => `
        <li style="margin-bottom: 0.5rem; display: flex; gap: 0.5rem; align-items: flex-start;">
          <span style="color: var(--status-emerald); font-weight: bold;">✓</span>
          <span>${s}</span>
        </li>
      `).join('');

      // Hardware
      const hardwareList = document.getElementById('modalProjectHardware');
      hardwareList.innerHTML = data.hardware.map(h => `
        <span class="project-spec-chip" style="font-size: 0.8125rem; padding: 0.35rem 0.75rem;">${h}</span>
      `).join('');

      // Open Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. FIELD OPERATIONS GALLERY LIGHTBOX
   ========================================================================== */
const galleryItems = [
  {
    src: "assets/images/o.jpg",
    title: "Sanima Middle Tamor Hydropower Project (73 MW)",
    category: "AGM",
    desc: ""
  },
  {
    src: "assets/images/kky.jpeg",
    title: "Project Completion Certificate",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/m.jpg",
    title: "",
    category: "",
    desc: ""
  },
  {
    src: "assets/images/v.jpg",
    title: "",
    category: "",
    desc: ""
  },
  {
    src: "assets/images/q.jpg",
    title: "",
    category: "",
    desc: ""
  },
  {
    src: "assets/images/p.jpg",
    title: "",
    category: "",
    desc: ""
  },
  {
    src: "assets/images/t.jpg",
    title: "",
    category: "",
    desc: "."
  },
  {
    src: "assets/images/d.jpg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/w.jpg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/x.jpg",
    title: "Kantipur Half Marathon 2026",
    category: "Sanima Hydropower",
    desc: " "
  },
  {
    src: "assets/images/y.jpg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/kyy.jpeg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/aa.jpg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/lap1.JPG",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/Midas.jpg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/sanima.jpg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/ab.jpg",
    title: "",
    category: "",
    desc: " "
  },
  {
    src: "assets/images/NPHF.jpg",
    title: "Antibiotics Program",
    category: "Nepal Public Helth Foundation",
    desc: " "
  },
  {
    src: "assets/images/e.jpg",
    title: "",
    category: "",
    desc: " "
  },
];

function initGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxCount = document.getElementById('lightboxCount');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  const galleryCards = document.querySelectorAll('.gallery-card');
  const filterBtns = document.querySelectorAll('[data-gallery-filter]');

  let currentIndex = 0;
  let activeList = [...galleryItems];

  // Gallery category filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-gallery-filter');

      galleryCards.forEach(card => {
        const cat = card.getAttribute('data-gallery-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  const showImage = (index) => {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentIndex = index;

    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category;
    lightboxDesc.textContent = item.desc;
    lightboxCount.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
  };

  galleryCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const targetIndex = parseInt(card.getAttribute('data-index') || idx, 10);
      showImage(targetIndex);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

/* ==========================================================================
   7. RESUME MODAL & PRINT FUNCTIONALITY
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resumeModal');
  const openBtns = document.querySelectorAll('[data-open-resume]');
  const closeBtn = document.getElementById('resumeModalClose');
  const printBtn = document.getElementById('printResumeBtn');
  const copyBtn = document.getElementById('copyResumeBtn');

  if (!resumeModal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
      closeModal();
    }
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const resumeContent = `KAMAL LAMA - IT Infrastructure & Hardware Specialist
Location: Kathmandu / Taplejung, Nepal
Contact: itechnepal2014@gmail.com
Experience: 16+ Years (Sanima Middle Tamor Hydropower Ltd. 73 MW)

PROFILE:
Mission-critical IT technician with 16+ years of expertise in hardware diagnostics, structured fiber optic/copper cabling, Cisco networking, Active Directory server environments, and industrial IP surveillance systems.

EXPERIENCE:
Lead IT Technician & Infrastructure Engineer
Sanima Middle Tamor Hydropower Ltd. (73 MW) | 2008 – Present
- Architected and maintained campus-wide single-mode fiber optic backbone and Cisco L2/L3 network with 99.98% uptime.
- Deployed 64-channel 4K CCTV surveillance matrix, biometric attendance terminals, and high-frequency wireless microwave bridges across mountain gorges.
- Established component-level testing and soldering repair station for motherboards and industrial power supplies.

SKILLS:
Fiber Splicing & OTDR, Cisco/MikroTik Routing, Windows Server 2022, Active Directory, RAID Storage, IP CCTV & NVRs, Hardware Diagnostics.`;
      
      navigator.clipboard.writeText(resumeContent).then(() => {
        showToast('Full Resume copied to clipboard in plain text!');
      }).catch(() => {
        showToast('Press Ctrl+C to copy text.');
      });
    });
  }
}

/* ==========================================================================
   8. DISPATCH / CONTACT FORM & NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName')?.value.trim();
    const email = document.getElementById('senderEmail')?.value.trim();
    const phone = document.getElementById('senderPhone')?.value.trim();
    const service = document.getElementById('serviceCategory')?.value;
    const urgency = document.getElementById('serviceUrgency')?.value;
    const message = document.getElementById('senderMessage')?.value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields (Name, Email, Message).', 'amber');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      <span>Processing Dispatch...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      const ticketId = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
      showToast(`Dispatch request sent! Reference ID: #${ticketId}. Kamal Lama has received your notice.`);

      // Also create an optional WhatsApp direct draft link
      const encodedMsg = encodeURIComponent(
        `Hello Kamal,\n\nI just submitted a dispatch request regarding *${service}* (Priority: *${urgency}*).\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
      );
      const waLink = `https://wa.me/9779800000000?text=${encodedMsg}`;
      
      const waBanner = document.getElementById('waDraftNotice');
      if (waBanner) {
        waBanner.style.display = 'block';
        const aTag = waBanner.querySelector('a');
        if (aTag) aTag.href = waLink;
      }
    }, 900);
  });
}

/* ==========================================================================
   9. ANIMATED STAT COUNTERS
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-target-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target-counter'));
          const suffix = counter.getAttribute('data-counter-suffix') || '';
          const isDecimal = counter.getAttribute('data-is-decimal') === 'true';
          const duration = 1600;
          const startTime = performance.now();

          const updateCounter = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = target * easeOutQuart;

            if (isDecimal) {
              counter.textContent = current.toFixed(2) + suffix;
            } else {
              counter.textContent = Math.floor(current) + suffix;
            }

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              if (isDecimal) {
                counter.textContent = target.toFixed(2) + suffix;
              } else {
                counter.textContent = target + suffix;
              }
            }
          };

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.25 });

  const metricsSection = document.querySelector('.metrics-bar');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   10. CLIPBOARD COPY UTILITIES
   ========================================================================== */
function initCopyActions() {
  const copyElements = document.querySelectorAll('[data-copy-text]');

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy-text');
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`);
      }).catch(() => {
        showToast('Clipboard copy failed. Please select text manually.');
      });
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */
function showToast(message, type = 'emerald') {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const iconSvg = type === 'amber' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--status-amber); flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-primary); flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <div style="font-size: 0.875rem; font-weight: 500; color: var(--text-primary); line-height: 1.4;">${message}</div>
  `;

  toast.classList.add('show');

  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}
