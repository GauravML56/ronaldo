
    /* ── DATA (all English) ── */
    const clubs = [
      {
        name: "Sporting CP", country: "Portugal", years: "2002 – 2003",
        goals: 5, titles: "",
        img: "https://i.pinimg.com/1200x/37/d9/82/37d982c64409c266eeeb9eb0d6dba660.jpg",
        accent: "#006600",
        desc: "Where it all began. A young boy from Madeira gave the world its first glimpse of his extraordinary talent and hunger for greatness."
      },
      {
        name: "Manchester United", country: "England", years: "2003 – 2009",
        goals: 118, titles: "3× Premier League · 1× Champions League · 1× FA Cup",
        img: "https://i.pinimg.com/1200x/f6/32/65/f63265c3d56e4400d8b2f3a3c0376964.jpg",
        accent: "#C8102E",
        desc: "Old Trafford transformed a talented teenager into the greatest player on Earth. Under Sir Alex Ferguson, speed, skill and ambition reached new heights."
      },
      {
        name: "Real Madrid", country: "Spain", years: "2009 – 2018",
        goals: 450, titles: "4× Champions League · 2× La Liga · 2× Copa del Rey",
        img: "https://i.pinimg.com/736x/48/a7/e4/48a7e411eed02dec8ec7893dd92c7d07.jpg",
        accent: "#FFD700",
        desc: "His name was carved into the Bernabéu forever. 450 goals, 4 Champions League trophies — this was the era the world witnessed the true GOAT."
      },
      {
        name: "Juventus", country: "Italy", years: "2018 – 2021",
        goals: 101, titles: "2× Serie A · 1× Coppa Italia",
        img: "https://i.pinimg.com/736x/ce/db/0e/cedb0e7be027700306f6ad1e4245c3ae.jpg",
        accent: "#e0e0e0",
        desc: "Even in Turin, the same hunger. The same fire. Serie A records fell as Ronaldo proved that greatness has no expiry date."
      },
      {
        name: "Manchester United", country: "England", years: "2021 – 2022",
        goals: 27, titles: "",
        img: "https://i.pinimg.com/1200x/06/5d/3a/065d3a52fdc02e243b2187debccb156a.jpg",
        accent: "#C8102E",
        desc: "A homecoming. The same jersey, the same number 7 — times had changed, but CR7 still delivered goals and moments of pure class."
      },
      {
        name: "Al Nassr", country: "Saudi Arabia", years: "2023 – Present",
        goals: 99, titles: "Arab Club Champions Cup",
        img: "https://i.pinimg.com/736x/3d/c9/db/3dc9dbbeeaf60e3746a377f8c8e03586.jpg",
        accent: "#FFD700",
        desc: "A new chapter, a new world. In Saudi Arabia, CR7 proved once again — a true legend never stops performing and never stops winning."
      },
      {
        name: "Portugal 🇵🇹", country: "International", years: "2003 – Present",
        goals: 212, titles: "Euro 2016 · UEFA Nations League 2019",
        img: "https://i.pinimg.com/736x/da/77/7f/da777ff693b3e7c6fb727b76f0f63ebc.jpg",
        accent: "#006600",
        desc: "212 goals for his nation. The world record for international goals. Portugal's lion — there is only one Cristiano Ronaldo."
      },
    ];

    /* ── PARTICLE CANVAS (replaces Three.js ball) ── */
    (function initParticles() {
      const canvas = document.getElementById('particle-canvas');
      const ctx = canvas.getContext('2d');
      let W, H, particles = [];

      function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      for (let i = 0; i < 120; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + .3,
          dx: (Math.random() - .5) * .4,
          dy: (Math.random() - .5) * .4,
          a: Math.random() * .5 + .1,
          c: Math.random() > .5 ? '#C8102E' : '#FFD700'
        });
      }

      function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
          ctx.globalAlpha = p.a;
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          p.x += p.dx; p.y += p.dy;
          if (p.x < 0 || p.x > W) p.dx *= -1;
          if (p.y < 0 || p.y > H) p.dy *= -1;
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
      }
      draw();
    })();

    /* ── LIGHTBOX ── */
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lb-img');
    document.querySelectorAll('.g-item').forEach(item => {
      item.addEventListener('click', () => {
        lbImg.src = item.dataset.src;
        lb.classList.add('open');
      });
    });
    document.getElementById('lb-close').addEventListener('click', () => lb.classList.remove('open'));
    lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });

    /* ── BUILD IMAGE SLOTS ── */
    const imgCol = document.getElementById('img-col');
    clubs.forEach((c, i) => {
      const slot = document.createElement('div');
      slot.className = 'img-slot' + (i === 0 ? ' cur' : '');
      slot.id = 'slot-' + i;
      const img = document.createElement('img');
      img.src = c.img; img.alt = c.name;
      const fb = document.createElement('div');
      fb.className = 'fallback';
      fb.style.background = `radial-gradient(ellipse at center,${c.accent}18 0%,#070709 70%)`;
      fb.innerHTML = `<div class="fallback-ico" style="color:${c.accent}">⚽</div>
        <div class="fallback-name" style="color:${c.accent}88">${c.name}</div>
        <div class="fallback-path">${c.img}</div>`;
      fb.style.display = 'none';
      img.onerror = () => { img.style.display = 'none'; fb.style.display = 'flex'; };
      slot.appendChild(img); slot.appendChild(fb);
      imgCol.insertBefore(slot, document.getElementById('accent-bar'));
    });

    /* ── BUILD SIDE DOTS ── */
    const dotsWrap = document.getElementById('side-dots');
    clubs.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' on' : ''); d.id = 'dot-' + i;
      dotsWrap.appendChild(d);
    });

    /* ── SCROLL ENGINE ── */
    const SCROLL_PER = 1.6;
    const journeyEl = document.getElementById('journey');
    journeyEl.style.height = (clubs.length * SCROLL_PER * 100) + 'vh';
    let currentIdx = -1, rafPending = false;

    function setSlide(idx) {
      if (idx === currentIdx) return;
      currentIdx = idx;
      const c = clubs[idx];
      document.querySelectorAll('.img-slot').forEach((s, i) => s.classList.toggle('cur', i === idx));
      document.getElementById('accent-bar').style.background = `linear-gradient(90deg,transparent,${c.accent},transparent)`;
      document.getElementById('tc-counter').textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(clubs.length).padStart(2, '0');
      document.getElementById('tc-country').style.color = c.accent;
      document.getElementById('tc-country').textContent = c.country;
      document.getElementById('tc-club').textContent = c.name;
      document.getElementById('tc-years').textContent = c.years;
      document.getElementById('tc-div').style.background = `linear-gradient(to right,${c.accent},transparent)`;
      document.getElementById('tc-desc').textContent = c.desc;
      document.getElementById('tc-goals').textContent = c.goals + (idx >= 5 ? '+' : '');
      document.getElementById('tc-goals').style.color = c.accent;
      const titlesEl = document.getElementById('tc-titles');
      if (c.titles) { titlesEl.style.display = 'block'; titlesEl.textContent = c.titles; titlesEl.style.borderColor = c.accent + '50'; }
      else { titlesEl.style.display = 'none'; }
      const nextEl = document.getElementById('tc-next');
      if (idx < clubs.length - 1) { nextEl.style.display = 'flex'; document.getElementById('tc-next-name').textContent = clubs[idx + 1].name; }
      else { nextEl.style.display = 'none'; }
      document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('on', i === idx);
        if (i === idx) d.style.background = c.accent; else d.style.background = '';
      });
      gsap.fromTo('#txt-col', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .55, ease: 'power2.out' });
    }

    function onScroll() {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const scrollY = window.scrollY;
        const sTop = journeyEl.offsetTop;
        const winH = window.innerHeight;
        const rel = scrollY - sTop;
        const slideH = SCROLL_PER * winH;
        const inJourney = scrollY >= sTop && scrollY <= sTop + clubs.length * slideH;
        dotsWrap.classList.toggle('visible', inJourney);
        if (rel < 0) { setSlide(0); return; }
        const idx = Math.min(clubs.length - 1, Math.floor(rel / slideH));
        setSlide(idx);
        const progress = (rel - idx * slideH) / slideH;
        const exitStart = .72;
        if (progress > exitStart) {
          const t = (progress - exitStart) / (1 - exitStart);
          gsap.set('#txt-col', { y: -t * 50, opacity: 1 - t });
        } else {
          gsap.set('#txt-col', { y: 0, opacity: 1 });
        }
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    setSlide(0);

    /* ── HERO ENTRANCE ── */
    gsap.registerPlugin(ScrollTrigger);
    const htl = gsap.timeline({ delay: .2 });
    htl.to('#htag', { opacity: 1, y: 0, duration: .8, ease: 'power2.out' })
      .to('#hname', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=.4')
      .to('#hsub', { opacity: 1, duration: .6 }, '-=.3')
      .to('#hflag', { opacity: 1, duration: .6 }, '-=.2')
      .to('#hscroll', { opacity: 1, duration: .6 }, '-=.1');

    /* ── FINALE COUNTER ── */
    ScrollTrigger.create({
      trigger: '#finale', start: 'top 80%', once: true,
      onEnter: () => {
        document.querySelectorAll('.fin-stat-n').forEach(el => {
          const raw = el.textContent;
          const num = parseInt(raw);
          const plus = raw.includes('+');
          let cur = 0;
          const step = num / 55;
          const t = setInterval(() => {
            cur += step;
            if (cur >= num) { el.textContent = num + (plus ? '+' : ''); clearInterval(t); }
            else el.textContent = Math.floor(cur) + (plus ? '+' : '');
          }, 16);
        });
      }
    });

    /* dot click nav */
    dotsWrap.addEventListener('click', e => {
      const d = e.target.closest('.dot');
      if (!d) return;
      const i = parseInt(d.id.split('-')[1]);
      const sTop = journeyEl.offsetTop;
      window.scrollTo({ top: sTop + i * SCROLL_PER * window.innerHeight + 10, behavior: 'smooth' });
    });
  