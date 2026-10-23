import { useEffect, useRef } from "react";

const COLORS = ["#c9246c", "#ff5fa2", "#138a7e", "#3ed3c3", "#ffcf3d", "#7b61ff", "#ffffff"];
const rand = (a, b) => a + Math.random() * (b - a);

// Draws confetti on a <canvas>. Change the `run` prop to fire it again.
export default function Confetti({ run }) {
  const canvasRef = useRef(null);

  // This effect re-runs whenever `run` changes (it's in the dependency array).
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduce ? 0.35 : 1;

    let parts = [];
    let raf = null;
    let burstTimer;
    const endAt = performance.now() + 6500;

    function size() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function burst(x, y, n, spread) {
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + rand(-spread, spread);
        const s = rand(7, 18);
        parts.push(piece(x, y, Math.cos(a) * s, Math.sin(a) * s));
      }
    }

    function rain(n) {
      for (let i = 0; i < n; i++) {
        parts.push(piece(rand(0, window.innerWidth), -20, rand(-1.5, 1.5), rand(2, 5)));
      }
    }

    function piece(x, y, vx, vy) {
      return {
        x, y, vx, vy,
        w: rand(7, 13), h: rand(4, 8),
        rot: rand(0, 6.28), vr: rand(-0.3, 0.3),
        c: COLORS[(Math.random() * COLORS.length) | 0],
        life: 0,
      };
    }

    function tick(now) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (now < endAt && Math.random() < 0.5) rain(reduce ? 1 : 3);

      parts = parts.filter((p) => {
        p.vy += 0.22; // gravity
        p.vx *= 0.992; p.vy *= 0.992; // air drag
        p.x += p.vx; p.y += p.vy;
        p.rot += p.vr; p.life++;
        if (p.y > window.innerHeight + 30) return false;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        // Squash the height with cos() so pieces look like they flutter
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.life * 0.08)) + 1);
        ctx.restore();
        return true;
      });

      if (parts.length || now < endAt) raf = requestAnimationFrame(tick);
    }

    size();
    window.addEventListener("resize", size);
    const W = window.innerWidth;
    const H = window.innerHeight;
    burst(W * 0.15, H * 0.85, 90 * k, 0.6);
    burst(W * 0.85, H * 0.85, 90 * k, 0.6);
    burstTimer = setTimeout(() => burst(W * 0.5, H * 0.7, 120 * k, 0.9), 350);
    raf = requestAnimationFrame(tick);

    // Cleanup: stop the animation and remove listeners
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(burstTimer);
      window.removeEventListener("resize", size);
    };
  }, [run]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
