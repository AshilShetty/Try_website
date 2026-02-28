"use client";

import { useEffect } from "react";

const SECTION_IDS = [
  "about-wrapper",
  "solutions-wrapper",
  "team-wrapper",
  "research-wrapper",
  "contact-wrapper",
];

export function useGsapSections(rootRef) {
  useEffect(() => {
    let cancelled = false;
    let cleanup = () => {};
    let idleHandle = null;
    let timeoutHandle = null;

    const init = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled) {
          return;
        }

        gsap.registerPlugin(ScrollTrigger);

        const root = rootRef.current;
        if (!root) {
          return;
        }

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const isMobile = window.matchMedia("(max-width: 900px)").matches;
        const isCoarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

        const q = (selector) => root.querySelector(selector);
        const navLinks = Array.from(root.querySelectorAll(".nav-links a[data-target]"));
        const navUnbind = [];
        const effectsUnbind = [];
        const triggers = [];
        const observers = [];
        const loopTweens = [];

        const setActiveNav = (targetId) => {
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("data-target") === targetId;
            link.classList.toggle("active", isActive);
            if (isActive) {
              link.setAttribute("aria-current", "page");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        };

        const toAbsoluteTop = (element) => element.getBoundingClientRect().top + window.scrollY;

        navLinks.forEach((link) => {
          const handleClick = (event) => {
            const targetId = link.getAttribute("data-target");
            if (!targetId) {
              return;
            }
            const target = document.getElementById(targetId);
            if (!target) {
              return;
            }
            event.preventDefault();
            const top = toAbsoluteTop(target);
            window.scrollTo({
              top,
              behavior: prefersReduced ? "auto" : "smooth",
            });
          };

          link.addEventListener("click", handleClick);
          navUnbind.push(() => link.removeEventListener("click", handleClick));
        });

        const attachNavSectionSync = () => {
          SECTION_IDS.forEach((sectionId) => {
            const section = q(`#${sectionId}`);
            if (!section) {
              return;
            }
            triggers.push(
              ScrollTrigger.create({
                trigger: section,
                start: "top 45%",
                end: "bottom 55%",
                onEnter: () => setActiveNav(sectionId),
                onEnterBack: () => setActiveNav(sectionId),
              }),
            );
          });
        };

        const attachAmbientMotion = () => {
          const dotLayers = Array.from(root.querySelectorAll(".bg-dots"));
          dotLayers.forEach((dots, index) => {
            const tween = gsap.to(dots, {
              backgroundPosition: `${44 + index * 8}px ${44 + index * 8}px`,
              duration: 20 + index * 2.6,
              repeat: -1,
              ease: "none",
            });
            loopTweens.push(tween);
          });

          const atmoLayers = Array.from(root.querySelectorAll(".section-atmo"));
          atmoLayers.forEach((atmo) => {
            const parentSection = atmo.closest("section, #contact");
            if (!parentSection) {
              return;
            }
            triggers.push(
              ScrollTrigger.create({
                trigger: parentSection,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                onUpdate(self) {
                  const shift = (self.progress - 0.5) * 20;
                  gsap.set(atmo, { yPercent: shift, xPercent: shift * 0.35 });
                },
              }),
            );
          });
        };

        const splitWords = (element) => {
          if (!element) {
            return [];
          }
          if (element.dataset.wordSplit === "1") {
            return Array.from(element.querySelectorAll(".word"));
          }

          const appendWord = (target, token, accent) => {
            const mask = document.createElement("span");
            mask.className = "word-mask";
            const inner = document.createElement("span");
            inner.className = `word${accent ? " accent-word" : ""}`;
            inner.textContent = token;
            mask.appendChild(inner);
            target.appendChild(mask);
            return inner;
          };

          const originalNodes = Array.from(element.childNodes);
          element.textContent = "";
          const words = [];

          originalNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const tokens = (node.textContent || "").split(/(\s+)/);
              tokens.forEach((token) => {
                if (!token) {
                  return;
                }
                if (/^\s+$/.test(token)) {
                  element.appendChild(document.createTextNode(token));
                  return;
                }
                words.push(appendWord(element, token, false));
              });
              return;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
              const accent = node.tagName.toLowerCase() === "em";
              const tokens = (node.textContent || "").split(/(\s+)/);
              tokens.forEach((token) => {
                if (!token) {
                  return;
                }
                if (/^\s+$/.test(token)) {
                  element.appendChild(document.createTextNode(token));
                  return;
                }
                words.push(appendWord(element, token, accent));
              });
            }
          });

          element.dataset.wordSplit = "1";
          return words;
        };

        const splitChars = (line) => {
          if (!line) {
            return [];
          }
          if (line.dataset.charSplit === "1") {
            return Array.from(line.querySelectorAll(".char"));
          }

          const text = line.textContent || "";
          line.textContent = "";
          const chars = [];

          text.split("").forEach((character) => {
            if (character === " ") {
              line.appendChild(document.createTextNode(" "));
              return;
            }
            const mask = document.createElement("span");
            mask.className = "char-mask";
            const inner = document.createElement("span");
            inner.className = "char";
            inner.textContent = character;
            mask.appendChild(inner);
            line.appendChild(mask);
            chars.push(inner);
          });

          line.dataset.charSplit = "1";
          return chars;
        };

        const attachSectionWipes = () => {
          const wipes = Array.from(root.querySelectorAll(".section-wipe"));
          wipes.forEach((wipe) => {
            const section = wipe.closest("section, #contact");
            if (!section) {
              return;
            }
            gsap.set(wipe, { yPercent: 115, opacity: 0 });
            triggers.push(
              ScrollTrigger.create({
                trigger: section,
                start: "top 86%",
                onEnter: () =>
                  gsap.fromTo(
                    wipe,
                    { yPercent: 0, opacity: 0.9 },
                    {
                      yPercent: -122,
                      opacity: 0,
                      duration: isMobile ? 0.82 : 1.05,
                      ease: "power4.out",
                      overwrite: "auto",
                    },
                  ),
                onEnterBack: () =>
                  gsap.fromTo(
                    wipe,
                    { yPercent: -12, opacity: 0.82 },
                    {
                      yPercent: -122,
                      opacity: 0,
                      duration: isMobile ? 0.72 : 0.95,
                      ease: "power3.out",
                      overwrite: "auto",
                    },
                  ),
                onLeaveBack: () => gsap.set(wipe, { yPercent: 115, opacity: 0 }),
              }),
            );
          });
        };

        const attachTypographyMotion = () => {
          const heroLines = Array.from(root.querySelectorAll(".hl-line"));
          const heroChars = heroLines.flatMap((line) => splitChars(line));
          if (heroChars.length) {
            gsap.set(heroChars, {
              opacity: 0,
              yPercent: 128,
              rotateX: -82,
              transformOrigin: "50% 100%",
            });
            gsap.set([".hl-eyebrow", ".hl-sub"], { opacity: 0, y: 14 });

            playHeroType = () => {
              const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
              tl.to(".hl-eyebrow", {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
              })
                .to(
                  heroChars,
                  {
                    opacity: 1,
                    yPercent: 0,
                    rotateX: 0,
                    duration: 0.66,
                    stagger: {
                      each: 0.012,
                      from: "center",
                    },
                    ease: "power4.out",
                  },
                  0.06,
                )
                .to(
                  ".hl-sub",
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.46,
                    ease: "power3.out",
                  },
                  0.35,
                );
            };

            resetHeroType = () => {
              gsap.set(heroChars, {
                opacity: 0,
                yPercent: 128,
                rotateX: -82,
              });
              gsap.set([".hl-eyebrow", ".hl-sub"], { opacity: 0, y: 14 });
            };
          }

          const titleTargets = Array.from(root.querySelectorAll(".s-title, .sol-t, .t-name, .rc-title"));
          titleTargets.forEach((title) => {
            const words = splitWords(title);
            if (words.length === 0) {
              return;
            }
            gsap.set(words, {
              opacity: 0,
              yPercent: 112,
              rotateX: -64,
              transformOrigin: "0% 100%",
            });
            triggers.push(
              ScrollTrigger.create({
                trigger: title,
                start: "top 88%",
                onEnter: () =>
                  gsap.to(words, {
                    opacity: 1,
                    yPercent: 0,
                    rotateX: 0,
                    duration: 0.66,
                    stagger: 0.024,
                    ease: "power4.out",
                    overwrite: "auto",
                  }),
                onEnterBack: () =>
                  gsap.to(words, {
                    opacity: 1,
                    yPercent: 0,
                    rotateX: 0,
                    duration: 0.48,
                    stagger: 0.015,
                    ease: "power2.out",
                    overwrite: "auto",
                  }),
                onLeaveBack: () =>
                  gsap.to(words, {
                    opacity: 0,
                    yPercent: 96,
                    rotateX: -58,
                    duration: 0.22,
                    stagger: 0.012,
                    overwrite: "auto",
                  }),
              }),
            );
          });
        };

        const attachSectionReveals = () => {
          const blocks = Array.from(root.querySelectorAll(".section-reveal"));
          blocks.forEach((block) => {
            const pieces = Array.from(block.querySelectorAll(".s-label, .div-line, .about-desc, .res-copy, .contact-copy"));
            if (pieces.length === 0) {
              return;
            }
            gsap.set(pieces, { opacity: 0, y: 18 });
            triggers.push(
              ScrollTrigger.create({
                trigger: block,
                start: "top 78%",
                onEnter: () =>
                  gsap.to(pieces, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.72,
                    ease: "power3.out",
                    overwrite: "auto",
                  }),
                onEnterBack: () =>
                  gsap.to(pieces, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.06,
                    duration: 0.55,
                    ease: "power2.out",
                    overwrite: "auto",
                  }),
                onLeaveBack: () =>
                  gsap.to(pieces, {
                    opacity: 0,
                    y: 14,
                    duration: 0.22,
                    stagger: 0.03,
                    overwrite: "auto",
                  }),
              }),
            );
          });
        };

        const attachCardTilt = () => {
          if (isCoarsePointer || prefersReduced) {
            return;
          }

          const cards = Array.from(root.querySelectorAll(".sol-card, .team-card"));
          const maxTilt = isMobile ? 4 : 6.5;
          cards.forEach((card) => {
            const move = (event) => {
              const rect = card.getBoundingClientRect();
              const px = (event.clientX - rect.left) / rect.width - 0.5;
              const py = (event.clientY - rect.top) / rect.height - 0.5;
              gsap.to(card, {
                rotationY: px * maxTilt,
                rotationX: -py * maxTilt,
                x: px * 5,
                y: py * 5,
                transformPerspective: 900,
                transformOrigin: "center center",
                duration: 0.28,
                ease: "power2.out",
                overwrite: "auto",
              });
            };

            const leave = () => {
              gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                x: 0,
                y: 0,
                duration: 0.45,
                ease: "power3.out",
                overwrite: "auto",
              });
            };

            card.addEventListener("mousemove", move);
            card.addEventListener("mouseleave", leave);
            effectsUnbind.push(() => {
              card.removeEventListener("mousemove", move);
              card.removeEventListener("mouseleave", leave);
            });
          });
        };

        const attachMagneticButton = () => {
          if (isCoarsePointer || prefersReduced) {
            return;
          }
          const button = q(".c-btn");
          if (!button) {
            return;
          }

          const setX = gsap.quickTo(button, "x", { duration: 0.24, ease: "power3.out" });
          const setY = gsap.quickTo(button, "y", { duration: 0.24, ease: "power3.out" });
          const setScale = gsap.quickTo(button, "scale", { duration: 0.24, ease: "power2.out" });

          const move = (event) => {
            const rect = button.getBoundingClientRect();
            const dx = event.clientX - (rect.left + rect.width / 2);
            const dy = event.clientY - (rect.top + rect.height / 2);
            const influence = Math.max(rect.width, rect.height) * 0.85;
            const distance = Math.hypot(dx, dy);
            const pull = Math.max(0, 1 - distance / influence);
            setX(dx * 0.22 * pull);
            setY(dy * 0.22 * pull);
            setScale(1 + pull * 0.04);
          };

          const leave = () => {
            setX(0);
            setY(0);
            setScale(1);
          };

          button.addEventListener("mousemove", move);
          button.addEventListener("mouseleave", leave);
          effectsUnbind.push(() => {
            button.removeEventListener("mousemove", move);
            button.removeEventListener("mouseleave", leave);
          });
        };

        const cur = q("#cur");
        const curR = q("#cur-r");
        const hero = q("#hero-wrapper");
        const canvas = q("#grid-canvas");

        let cursorFrame = 0;
        let sceneFrame = 0;
        let mx = window.innerWidth * 0.5;
        let my = window.innerHeight * 0.5;
        let rx = mx;
        let ry = my;
        let scrollP = 0;
        let playHeroType = () => {};
        let resetHeroType = () => {};
        let heroTypePlayed = false;

        const enableCursor = Boolean(cur && curR && !isCoarsePointer && !prefersReduced);
        const handleMouseMove = (event) => {
          mx = event.clientX;
          my = event.clientY;
        };

        if (enableCursor) {
          document.addEventListener("mousemove", handleMouseMove, { passive: true });
          const tickCursor = () => {
            cur.style.left = `${mx}px`;
            cur.style.top = `${my}px`;
            rx += (mx - rx) * 0.14;
            ry += (my - ry) * 0.14;
            curR.style.left = `${rx}px`;
            curR.style.top = `${ry}px`;
            cursorFrame = requestAnimationFrame(tickCursor);
          };
          tickCursor();
        }

        const canAnimateCanvas = Boolean(canvas && hero);
        let stopSceneObserver = () => {};
        let resizeDebounce = null;
        let W = 0;
        let H = 0;

        if (canAnimateCanvas) {
          const ctx = canvas.getContext("2d");

          if (ctx) {
            const mobileLite = isMobile;

            const resizeCanvas = () => {
              W = canvas.width = canvas.offsetWidth;
              H = canvas.height = canvas.offsetHeight;
            };

            const handleResize = () => {
              if (resizeDebounce !== null) {
                window.clearTimeout(resizeDebounce);
              }
              resizeDebounce = window.setTimeout(() => {
                resizeCanvas();
                ScrollTrigger.refresh();
              }, 120);
            };

            resizeCanvas();
            window.addEventListener("resize", handleResize, { passive: true });

            const drawTower = (cx, baseY, th, alpha, lw) => {
              const bw = th * 0.4;
              const mw = th * 0.09;
              const midY = baseY - th * 0.5;
              const topY = baseY - th;

              ctx.save();
              ctx.strokeStyle = `rgba(210,225,232,${alpha})`;
              ctx.lineWidth = lw;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";

              ctx.beginPath();
              ctx.moveTo(cx - bw, baseY);
              ctx.lineTo(cx - mw, midY);
              ctx.moveTo(cx + bw, baseY);
              ctx.lineTo(cx + mw, midY);
              ctx.moveTo(cx - mw, midY);
              ctx.lineTo(cx - mw * 0.4, topY);
              ctx.moveTo(cx + mw, midY);
              ctx.lineTo(cx + mw * 0.4, topY);
              ctx.stroke();

              const bSteps = 5;
              for (let i = 0; i < bSteps; i += 1) {
                const t0 = i / bSteps;
                const t1 = (i + 1) / bSteps;
                const y0 = baseY + (midY - baseY) * t0;
                const y1 = baseY + (midY - baseY) * t1;
                const lx0 = cx - (bw * (1 - t0) + mw * t0);
                const lx1 = cx - (bw * (1 - t1) + mw * t1);
                const rx0i = cx + (bw * (1 - t0) + mw * t0);
                const rx1i = cx + (bw * (1 - t1) + mw * t1);
                ctx.beginPath();
                ctx.globalAlpha = alpha * 0.6;
                ctx.moveTo(lx0, y0);
                ctx.lineTo(rx1i, y1);
                ctx.moveTo(rx0i, y0);
                ctx.lineTo(lx1, y1);
                ctx.stroke();
              }
              ctx.globalAlpha = 1;

              for (let i = 0; i < 3; i += 1) {
                const t0 = i / 3;
                const t1 = (i + 1) / 3;
                const y0 = midY + (topY - midY) * t0;
                const y1 = midY + (topY - midY) * t1;
                const lx0 = cx - mw * (1 - t0 * 0.7);
                const lx1 = cx - mw * (1 - t1 * 0.7);
                const rx0i = cx + mw * (1 - t0 * 0.7);
                const rx1i = cx + mw * (1 - t1 * 0.7);
                ctx.beginPath();
                ctx.globalAlpha = alpha * 0.5;
                ctx.moveTo(lx0, y0);
                ctx.lineTo(rx1i, y1);
                ctx.moveTo(rx0i, y0);
                ctx.lineTo(lx1, y1);
                ctx.stroke();
              }
              ctx.globalAlpha = 1;

              const armDefs = [
                { yFrac: 0.0, half: th * 0.38 },
                { yFrac: 0.11, half: th * 0.28 },
                { yFrac: 0.21, half: th * 0.18 },
              ];

              const armPts = [];
              armDefs.forEach((arm) => {
                const ay = topY + th * arm.yFrac;
                ctx.beginPath();
                ctx.globalAlpha = alpha;
                ctx.lineWidth = lw;
                ctx.moveTo(cx - arm.half, ay);
                ctx.lineTo(cx + arm.half, ay);
                ctx.stroke();
                const iDrop = th * 0.028;
                ctx.beginPath();
                ctx.moveTo(cx - arm.half, ay);
                ctx.lineTo(cx - arm.half, ay + iDrop);
                ctx.moveTo(cx + arm.half, ay);
                ctx.lineTo(cx + arm.half, ay + iDrop);
                ctx.stroke();
                armPts.push({ L: { x: cx - arm.half, y: ay + iDrop }, R: { x: cx + arm.half, y: ay + iDrop } });
              });

              armPts.apex = { x: cx, y: topY };
              ctx.restore();
              return armPts;
            };

            const drawCatenary = (x1, y1, x2, y2, sag, alpha, lw) => {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(210,225,232,${alpha})`;
              ctx.lineWidth = lw;
              const n = 48;
              for (let i = 0; i <= n; i += 1) {
                const t = i / n;
                const x = x1 + (x2 - x1) * t;
                const y = y1 + (y2 - y1) * t + sag * 4 * t * (1 - t);
                if (i === 0) {
                  ctx.moveTo(x, y);
                } else {
                  ctx.lineTo(x, y);
                }
              }
              ctx.stroke();
            };

            const drawScene = (p) => {
              ctx.clearRect(0, 0, W, H);

              const sky = ctx.createLinearGradient(0, 0, 0, H);
              sky.addColorStop(0, "#080a0c");
              sky.addColorStop(0.65, "#0d1014");
              sky.addColorStop(1, "#0a0a0a");
              ctx.fillStyle = sky;
              ctx.fillRect(0, 0, W, H);

              const hg = ctx.createLinearGradient(0, H * 0.62, 0, H * 0.85);
              hg.addColorStop(0, "rgba(74,158,255,0.03)");
              hg.addColorStop(1, "transparent");
              ctx.fillStyle = hg;
              ctx.fillRect(0, H * 0.62, W, H * 0.25);

              const zoom = 1 + p * (mobileLite ? 14 : 20);
              const focusX = W / 2;
              const focusY = H * 0.42 + p * H * 0.18;

              ctx.save();
              ctx.translate(focusX, focusY);
              ctx.scale(zoom, zoom);
              ctx.translate(-focusX, -focusY);

              const towerDefs = mobileLite
                ? [
                    { xf: 0.5, bf: 0.8, hf: 0.5, d: 1.0 },
                    { xf: 0.2, bf: 0.77, hf: 0.3, d: 0.55 },
                    { xf: 0.8, bf: 0.77, hf: 0.3, d: 0.55 },
                    { xf: 0.06, bf: 0.73, hf: 0.18, d: 0.28 },
                    { xf: 0.94, bf: 0.73, hf: 0.18, d: 0.28 },
                  ]
                : [
                    { xf: 0.5, bf: 0.8, hf: 0.52, d: 1.0 },
                    { xf: 0.18, bf: 0.76, hf: 0.33, d: 0.55 },
                    { xf: 0.82, bf: 0.76, hf: 0.33, d: 0.55 },
                    { xf: 0.06, bf: 0.72, hf: 0.2, d: 0.28 },
                    { xf: 0.94, bf: 0.72, hf: 0.2, d: 0.28 },
                    { xf: 0.32, bf: 0.73, hf: 0.16, d: 0.22 },
                    { xf: 0.68, bf: 0.73, hf: 0.16, d: 0.22 },
                  ];

              const towers = towerDefs.map((tower) => {
                const cx = W * tower.xf;
                const baseY = H * tower.bf;
                const th = H * tower.hf;
                const alpha = 0.15 + tower.d * 0.45;
                const lw = Math.max(0.3, tower.d * 1.4);
                return { pts: drawTower(cx, baseY, th, alpha, lw) };
              });

              const main = towers[0];
              const lMid = towers[1];
              const rMid = towers[2];
              const farL = towers[3];
              const farR = towers[4];
              const bgL = towers[5];
              const bgR = towers[6];

              const wAlpha = Math.max(0, 1 - p * 0.6);
              const wLW = Math.max(0.35, 1 - p * 0.4);

              for (let lvl = 0; lvl < 3; lvl += 1) {
                if (!main?.pts[lvl] || !lMid?.pts[lvl] || !rMid?.pts[lvl]) {
                  continue;
                }

                const sag = H * 0.065 * (1 - lvl * 0.12);
                drawCatenary(lMid.pts[lvl].R.x, lMid.pts[lvl].R.y, main.pts[lvl].L.x, main.pts[lvl].L.y, sag, wAlpha * 0.7, wLW);
                drawCatenary(main.pts[lvl].R.x, main.pts[lvl].R.y, rMid.pts[lvl].L.x, rMid.pts[lvl].L.y, sag, wAlpha * 0.7, wLW);

                if (farL?.pts?.[lvl]) {
                  drawCatenary(farL.pts[lvl].R.x, farL.pts[lvl].R.y, lMid.pts[lvl].L.x, lMid.pts[lvl].L.y, sag * 0.7, wAlpha * 0.3, wLW * 0.5);
                }
                if (farR?.pts?.[lvl]) {
                  drawCatenary(rMid.pts[lvl].R.x, rMid.pts[lvl].R.y, farR.pts[lvl].L.x, farR.pts[lvl].L.y, sag * 0.7, wAlpha * 0.3, wLW * 0.5);
                }
              }

              if (main?.pts.apex && lMid?.pts.apex && rMid?.pts.apex) {
                drawCatenary(lMid.pts.apex.x, lMid.pts.apex.y, main.pts.apex.x, main.pts.apex.y, H * 0.015, wAlpha * 0.3, wLW * 0.5);
                drawCatenary(main.pts.apex.x, main.pts.apex.y, rMid.pts.apex.x, rMid.pts.apex.y, H * 0.015, wAlpha * 0.3, wLW * 0.5);
              }

              if (bgL?.pts && bgR?.pts) {
                for (let lvl = 0; lvl < 2; lvl += 1) {
                  if (bgL.pts[lvl] && bgR.pts[lvl]) {
                    drawCatenary(bgL.pts[lvl].R.x, bgL.pts[lvl].R.y, bgR.pts[lvl].L.x, bgR.pts[lvl].L.y, H * 0.04, wAlpha * 0.18, wLW * 0.35);
                  }
                }
              }

              ctx.restore();

              if (p > 0.48) {
                const t = Math.min(1, (p - 0.48) / 0.38);
                const cx2 = W / 2;
                const cy2 = H / 2;
                const rays = mobileLite ? 10 : 20;
                for (let i = 0; i < rays; i += 1) {
                  const ang = (i / rays) * Math.PI * 2;
                  const g = ctx.createLinearGradient(cx2, cy2, cx2 + Math.cos(ang) * W * 1.2, cy2 + Math.sin(ang) * H * 1.2);
                  g.addColorStop(0.1, "rgba(74,158,255,0)");
                  g.addColorStop(0.35, `rgba(74,158,255,${0.035 * t})`);
                  g.addColorStop(1, "rgba(74,158,255,0)");
                  ctx.beginPath();
                  ctx.strokeStyle = g;
                  ctx.lineWidth = mobileLite ? 0.55 : 0.8;
                  ctx.moveTo(cx2, cy2);
                  ctx.lineTo(cx2 + Math.cos(ang) * W * 1.2, cy2 + Math.sin(ang) * H * 1.2);
                  ctx.stroke();
                }

                const rg = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, H * 0.5 * t);
                rg.addColorStop(0, `rgba(74,158,255,${0.18 * t})`);
                rg.addColorStop(0.4, `rgba(74,158,255,${0.05 * t})`);
                rg.addColorStop(1, "transparent");
                ctx.fillStyle = rg;
                ctx.fillRect(0, 0, W, H);
              }

              const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.9);
              vig.addColorStop(0, "transparent");
              vig.addColorStop(1, "rgba(8,10,12,0.8)");
              ctx.fillStyle = vig;
              ctx.fillRect(0, 0, W, H);
            };

            if (prefersReduced) {
              drawScene(0.15);
            }

            let heroVisible = false;

            const renderLoop = () => {
              drawScene(scrollP);
              sceneFrame = requestAnimationFrame(renderLoop);
            };

            const startLoop = () => {
              if (sceneFrame !== 0 || prefersReduced) {
                return;
              }
              renderLoop();
            };

            const stopLoop = () => {
              if (sceneFrame !== 0) {
                cancelAnimationFrame(sceneFrame);
                sceneFrame = 0;
              }
            };

            const heroObserver = new IntersectionObserver(
              (entries) => {
                heroVisible = entries.some((entry) => entry.isIntersecting);
                if (heroVisible) {
                  startLoop();
                } else {
                  stopLoop();
                }
              },
              { threshold: 0.01, rootMargin: "200px" },
            );

            heroObserver.observe(hero);
            observers.push(heroObserver);

            stopSceneObserver = () => {
              stopLoop();
              window.removeEventListener("resize", handleResize);
              if (resizeDebounce !== null) {
                window.clearTimeout(resizeDebounce);
              }
            };
          }
        }

        if (prefersReduced) {
          gsap.set("#about-inner", { opacity: 1, y: 0 });
          gsap.set("#sol-top", { opacity: 1 });
          gsap.set(["#tc-1", "#tc-2", "#tc-3"], { opacity: 1, y: 0 });
          attachNavSectionSync();
          setActiveNav("about-wrapper");
        } else {
          attachAmbientMotion();
          attachSectionWipes();
          attachTypographyMotion();
          attachSectionReveals();
          attachCardTilt();
          attachMagneticButton();

          loopTweens.push(
            gsap.to(".hero-aura", {
              rotation: 3,
              scale: 1.04,
              transformOrigin: "50% 50%",
              duration: 9,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
            }),
          );

          gsap.fromTo(
            ".nav-logo",
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.12 },
          );

          let statsAnimated = false;

          const pinDurations = {
            hero: isMobile ? "+=320%" : "+=450%",
            about: isMobile ? "+=55%" : "+=80%",
            solutions: isMobile ? "+=190%" : "+=260%",
            team: isMobile ? "+=90%" : "+=120%",
            research: isMobile ? "+=170%" : "+=220%",
          };

          const createHeroTrigger = () =>
            ScrollTrigger.create({
              trigger: "#hero-wrapper",
              start: "top top",
              end: pinDurations.hero,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate(self) {
                const p = self.progress;
                scrollP = p;
                const logoOpacity = p > 0.73 ? Math.min(1, (p - 0.73) / 0.22) : 0;
                gsap.set("#hero-logo", { opacity: logoOpacity });
                gsap.set("#scroll-hint", { opacity: Math.max(0, 1 - p * 12) });
                if (logoOpacity > 0.04 && !heroTypePlayed) {
                  playHeroType();
                  heroTypePlayed = true;
                }
                if (logoOpacity <= 0.01 && heroTypePlayed) {
                  resetHeroType();
                  heroTypePlayed = false;
                }
              },
            });

          const createAboutTrigger = () =>
            ScrollTrigger.create({
              trigger: "#about-wrapper",
              start: "top top",
              end: pinDurations.about,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onEnter: () => {
                gsap.to("#about-inner", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
                if (!statsAnimated) {
                  const stats = Array.from(root.querySelectorAll(".stat-num[data-value]"));
                  stats.forEach((el) => {
                    const raw = el.getAttribute("data-value") || "";
                    const hasPlus = raw.endsWith("+");
                    const hasPercent = raw.endsWith("%");
                    const hasGW = raw.toUpperCase().endsWith("GW");
                    const numeric = parseFloat(raw.replace(/[^0-9.]/g, "")) || 0;
                    const state = { value: 0 };

                    gsap.to(state, {
                      value: numeric,
                      duration: 1.3,
                      ease: "power2.out",
                      onUpdate: () => {
                        const value = state.value;
                        if (hasGW) {
                          el.textContent = `${value.toFixed(1)}GW`;
                        } else if (hasPercent) {
                          el.textContent = `${value.toFixed(1)}%`;
                        } else {
                          el.textContent = `${Math.round(value)}${hasPlus ? "+" : ""}`;
                        }
                      },
                      onComplete: () => {
                        el.textContent = raw;
                      },
                    });
                  });
                  statsAnimated = true;
                }
              },
              onLeaveBack: () => gsap.to("#about-inner", { opacity: 0, y: 30, duration: 0.35 }),
            });

          const createSolutionsTrigger = () => {
            const cards = ["#sol-1", "#sol-2", "#sol-3"].map((id) => q(id));
            return ScrollTrigger.create({
              trigger: "#solutions-wrapper",
              start: "top top",
              end: pinDurations.solutions,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              onEnter: () => gsap.to("#sol-top", { opacity: 1, duration: 0.6 }),
              onLeaveBack: () => gsap.to("#sol-top", { opacity: 0, duration: 0.3 }),
              onUpdate(self) {
                const p = self.progress;
                cards.forEach((card, index) => {
                  if (!card) {
                    return;
                  }
                  const isActive = p >= index * 0.33 - 0.03 && p < (index + 1) * 0.33 + 0.03;
                  card.classList.toggle("active", isActive);
                });
              },
            });
          };

          const createTeamTrigger = () =>
            ScrollTrigger.create({
              trigger: "#team-wrapper",
              start: "top top",
              end: pinDurations.team,
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              onEnter: () => {
                gsap.to("#team-top", { opacity: 1, y: 0, duration: 0.6 });
                gsap.to(["#tc-1", "#tc-2", "#tc-3"], {
                  opacity: 1,
                  y: 0,
                  stagger: 0.12,
                  duration: 0.7,
                  ease: "power2.out",
                });
              },
              onLeaveBack: () => {
                gsap.to("#team-top", { opacity: 0, y: 22, duration: 0.3 });
                gsap.to(["#tc-1", "#tc-2", "#tc-3"], { opacity: 0, y: 26, duration: 0.3 });
              },
            });

          const createResearchTrigger = () => {
            const rc1 = q("#rc-1");
            const rc2 = q("#rc-2");
            const rc3 = q("#rc-3");
            const resCounter = q("#res-counter-num");
            const resDots = [q("#rd-0"), q("#rd-1"), q("#rd-2")];

            if (!rc1 || !rc2 || !rc3 || !resCounter || resDots.some((dot) => !dot)) {
              return null;
            }

            const SLOT = {
              TOP: { scale: 0.93, y: -132, zi: 14, opacity: 0.78, blur: 1.8 },
              CENTER: { scale: 1.0, y: 0, zi: 34, opacity: 1.0, blur: 0 },
              BOTTOM: { scale: 0.975, y: 138, zi: 24, opacity: 0.9, blur: 1.2 },
            };

            const STEP = [
              { rc1: "CENTER", rc2: "BOTTOM", rc3: "TOP", idx: 0 },
              { rc1: "TOP", rc2: "CENTER", rc3: "BOTTOM", idx: 1 },
              { rc1: "BOTTOM", rc2: "TOP", rc3: "CENTER", idx: 2 },
            ];

            const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2);
            const lerp = (a, b, t) => {
              const e = eio(t);
              return {
                scale: a.scale + (b.scale - a.scale) * e,
                y: a.y + (b.y - a.y) * e,
                zi: t > 0.52 ? b.zi : a.zi,
                opacity: a.opacity + (b.opacity - a.opacity) * e,
                blur: a.blur + (b.blur - a.blur) * e,
              };
            };

            const cards = { rc1, rc2, rc3 };

            const applyCard = (element, state) => {
              gsap.set(element, {
                scale: state.scale,
                y: state.y,
                zIndex: state.zi,
                opacity: state.opacity,
                filter: `blur(${state.blur}px)`,
              });
            };

            const applyStep = (step) => {
              Object.entries(cards).forEach(([cardKey, element]) => {
                applyCard(element, SLOT[step[cardKey]]);
              });
            };

            const blendSteps = (fromStep, toStep, t) => {
              Object.entries(cards).forEach(([cardKey, element]) => {
                applyCard(element, lerp(SLOT[fromStep[cardKey]], SLOT[toStep[cardKey]], t));
              });
            };

            const setDot = (idx) => {
              resDots.forEach((dot, dotIdx) => dot.classList.toggle("active", dotIdx === idx));
              resCounter.textContent = String(idx + 1).padStart(2, "0");
            };

            applyStep(STEP[0]);
            setDot(0);
            rc1.classList.add("is-front");

            return ScrollTrigger.create({
              trigger: "#research-wrapper",
              start: "top top",
              end: pinDurations.research,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              snap: {
                snapTo: [0, 0.5, 1],
                duration: { min: 0.12, max: 0.32 },
                ease: "power1.inOut",
                delay: 0.03,
              },
              onUpdate(self) {
                const p = self.progress;
                if (p <= 0.5) {
                  const t = p / 0.5;
                  blendSteps(STEP[0], STEP[1], t);
                  rc1.classList.toggle("is-front", t < 0.56);
                  rc2.classList.toggle("is-front", t >= 0.56);
                  rc3.classList.remove("is-front");
                  setDot(t < 0.56 ? 0 : 1);
                } else {
                  const t = (p - 0.5) / 0.5;
                  blendSteps(STEP[1], STEP[2], t);
                  rc1.classList.remove("is-front");
                  rc2.classList.toggle("is-front", t < 0.56);
                  rc3.classList.toggle("is-front", t >= 0.56);
                  setDot(t < 0.56 ? 1 : 2);
                }
              },
            });
          };

          [
            createHeroTrigger(),
            createAboutTrigger(),
            createSolutionsTrigger(),
            createTeamTrigger(),
            createResearchTrigger(),
          ]
            .filter(Boolean)
            .forEach((trigger) => triggers.push(trigger));

          attachNavSectionSync();
          setActiveNav("about-wrapper");
        }

        ScrollTrigger.refresh();

        cleanup = () => {
          navUnbind.forEach((unbind) => unbind());
          effectsUnbind.forEach((unbind) => unbind());
          triggers.forEach((trigger) => trigger.kill());
          observers.forEach((observer) => observer.disconnect());
          loopTweens.forEach((tween) => tween.kill());
          if (enableCursor) {
            document.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(cursorFrame);
          }
          stopSceneObserver();
          cancelAnimationFrame(sceneFrame);
        };
      } catch (error) {
        console.error("Animation lazy init failed", error);
      }
    };

    if ("requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(() => {
        void init();
      }, { timeout: 1200 });
    } else {
      timeoutHandle = window.setTimeout(() => {
        void init();
      }, 0);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== null && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle !== null) {
        window.clearTimeout(timeoutHandle);
      }
      cleanup();
    };
  }, [rootRef]);
}
