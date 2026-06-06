/* ===== Netflix Portfolio - Main JS with Three.js ===== */
document.addEventListener('DOMContentLoaded', () => {

  // ==============================
  // THREE.JS 3D ANIMATED BACKGROUND
  // ==============================
  const canvas = document.getElementById('heroCanvas');
  if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 30;

    // --- Floating particle field ---
    const particleCount = 600;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      // Netflix red to white gradient
      const t = Math.random();
      colors[i * 3] = 0.9 + t * 0.1;
      colors[i * 3 + 1] = 0.03 * (1 - t) + t * 0.6;
      colors[i * 3 + 2] = 0.08 * (1 - t) + t * 0.6;
      sizes[i] = Math.random() * 2 + 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Wireframe torus knot ---
    const torusGeo = new THREE.TorusKnotGeometry(8, 2.5, 120, 16, 2, 3);
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xe50914, wireframe: true, transparent: true, opacity: 0.06 });
    const torusKnot = new THREE.Mesh(torusGeo, torusMat);
    torusKnot.position.set(15, 0, -10);
    scene.add(torusKnot);

    // --- Wireframe icosahedron ---
    const icoGeo = new THREE.IcosahedronGeometry(5, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xff4444, wireframe: true, transparent: true, opacity: 0.05 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-12, 5, -5);
    scene.add(ico);

    // --- Connecting lines between nearby particles ---
    const linePositions = [];
    const lineGeo = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({ color: 0xe50914, transparent: true, opacity: 0.04 });

    // Mouse tracking for parallax
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Rotate particles slowly
      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.02;

      // Animate individual particles (wave motion)
      const pos = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3 + 1] += Math.sin(elapsed + i * 0.1) * 0.005;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Rotate geometries
      torusKnot.rotation.x = elapsed * 0.15;
      torusKnot.rotation.y = elapsed * 0.1;
      ico.rotation.x = elapsed * 0.12;
      ico.rotation.y = elapsed * 0.18;

      // Mouse parallax on camera
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();
  }

  // ==============================
  // CURSOR GLOW EFFECT
  // ==============================
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  let glowX = 0, glowY = 0, currentX = 0, currentY = 0;
  document.addEventListener('mousemove', (e) => {
    glowX = e.clientX;
    glowY = e.clientY;
    cursorGlow.classList.add('active');
  });
  document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));

  function animateGlow() {
    currentX += (glowX - currentX) * 0.08;
    currentY += (glowY - currentY) * 0.08;
    cursorGlow.style.left = currentX + 'px';
    cursorGlow.style.top = currentY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ==============================
  // NAVBAR SCROLL EFFECT
  // ==============================
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  });

  // ==============================
  // ACTIVE NAV LINK ON SCROLL
  // ==============================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // ==============================
  // MOBILE HAMBURGER
  // ==============================
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // ==============================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ==============================
  const observerOptions = { threshold: 0.08, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Fade-in cards with staggered delays
  const fadeElements = document.querySelectorAll(
    '.about__card, .project-card, .skill-group, .learning-card, .goal-card, .contact__card'
  );
  fadeElements.forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 0.12}s`;
    observer.observe(el);
  });

  // Row titles animate in
  document.querySelectorAll('.row__title').forEach(title => {
    observer.observe(title);
    title.classList.add('fade-in');
  });

  // ==============================
  // HERO TITLE LETTER ANIMATION
  // ==============================
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.display = 'flex';
    heroTitle.style.flexWrap = 'wrap';

    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.cssText = `
        display:inline-block;
        opacity:0;
        transform:translateY(60px) rotateX(90deg);
        animation:letterIn .6s cubic-bezier(.4,0,.2,1) forwards;
        animation-delay:${0.5 + i * 0.045}s;
      `;
      heroTitle.appendChild(span);
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes letterIn {
        to { opacity:1; transform:translateY(0) rotateX(0deg); }
      }
    `;
    document.head.appendChild(style);
  }

  // ==============================
  // TILT EFFECT ON PROJECT CARDS
  // ==============================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -4;
      const rotateY = (x - centerX) / centerX * 4;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
  });

  // ==============================
  // SMOOTH SCROLL
  // ==============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==============================
  // GOAL BAR ANIMATION ON SCROLL
  // ==============================
  const goalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.goal-card__bar span');
        if (bar) {
          const width = bar.style.width;
          bar.style.width = '0%';
          setTimeout(() => { bar.style.width = width; }, 200);
        }
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.goal-card').forEach(card => goalObserver.observe(card));

  // ==============================
  // SKILL TAG RANDOM GLOW
  // ==============================
  const skillTags = document.querySelectorAll('.skill-tag');
  if (skillTags.length > 0) {
    setInterval(() => {
      const randomTag = skillTags[Math.floor(Math.random() * skillTags.length)];
      randomTag.style.boxShadow = '0 0 15px rgba(229,9,20,.25)';
      randomTag.style.borderColor = 'rgba(229,9,20,.3)';
      setTimeout(() => {
        randomTag.style.boxShadow = 'none';
        randomTag.style.borderColor = 'rgba(255,255,255,.04)';
      }, 1500);
    }, 2000);
  }

});
