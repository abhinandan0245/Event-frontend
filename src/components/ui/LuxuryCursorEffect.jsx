import { useEffect, useRef } from "react";
import gsap from "gsap";

const LuxuryCursorEffect = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const lastMouse = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const trailPoints = useRef([]);
  const maxPoints = 32; // Expanded point pool for hyper-smooth math paths
  const hue = useRef(40); // Base color wheel index tracking
  const waveCycle = useRef(0); // For controlling the ripple frequency on shake

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Populate standard array coordinate slots
    for (let i = 0; i < maxPoints; i++) {
      trailPoints.current.push({ x: mouse.current.x, y: mouse.current.y });
    }

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Advanced Bezier Spline Render Loop Driven by GSAP
    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Smooth color cycling logic
      if (velocity > 12) {
        hue.current = (hue.current + 6) % 360;
        waveCycle.current += 0.4; // Speed up internal ripple wave on shake
      } else {
        hue.current = (hue.current + 0.3) % 360;
        waveCycle.current += 0.05;
      }

      // Update the main node head matrix position
      const easeFactor = velocity > 25 ? 0.4 : 0.22;
      let head = trailPoints.current[0];
      head.x += (mouse.current.x - head.x) * easeFactor;
      head.y += (mouse.current.y - head.y) * easeFactor;

      // Update tail tracking vectors with smooth inertia physics
      for (let i = 1; i < maxPoints; i++) {
        const point = trailPoints.current[i];
        const prevPoint = trailPoints.current[i - 1];

        // Introduce a subtle micro-vibration coordinate matrix shift when user shakes mouse
        const waveOffset =
          velocity > 30
            ? Math.sin(waveCycle.current + i * 0.5) *
              (velocity * 0.15) *
              (1 - i / maxPoints)
            : 0;

        point.x += (prevPoint.x - point.x) * 0.55;
        point.y += (prevPoint.y - point.y) * 0.55 + waveOffset * 0.1;
      }

      // ─── BEZIER RIBBON RENDERING PASS ───
      if (trailPoints.current.length > 2) {
        for (let i = 0; i < trailPoints.current.length - 2; i++) {
          const p1 = trailPoints.current[i];
          const p2 = trailPoints.current[i + 1];
          const p3 = trailPoints.current[i + 2];

          // Calculate middle control coordinates for the curve interpolation
          const xc1 = (p1.x + p2.x) / 2;
          const yc1 = (p1.y + p2.y) / 2;
          const xc2 = (p2.x + p3.x) / 2;
          const yc2 = (p2.y + p3.y) / 2;

          const progress = 1 - i / maxPoints;
          const thickness = (velocity > 25 ? 14 : 6) * progress; // Tapering line width setup
          const alpha = progress * 0.85;

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(xc1, yc1);

          // Draw smooth quadratic curved ribbon vector
          ctx.quadraticCurveTo(p2.x, p2.y, xc2, yc2);

          // Configure luxurious glowing stroke visuals
          ctx.strokeStyle = `hsla(${hue.current + i * 2.5}, 90%, 60%, ${alpha})`;
          ctx.lineWidth = thickness;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Specular glowing maps configuration
          ctx.shadowColor = `hsl(${hue.current + i * 2.5}, 90%, 60%)`;
          ctx.shadowBlur = velocity > 20 ? 18 : 6;

          ctx.stroke();
          ctx.restore();
        }
      }

      // Cache coordinate matrices
      lastMouse.current.x = mouse.current.x;
      lastMouse.current.y = mouse.current.y;
    };

    window.addEventListener("mousemove", handleMouseMove);
    gsap.ticker.add(renderLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(renderLoop);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999] hidden md:block"
    />
  );
};

export default LuxuryCursorEffect;
