import React, { useEffect, useRef } from 'react';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes configuration with electric neon cybersecurity palette
    const particleCount = Math.min(Math.floor(width / 28), 60);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      pulseAngle: number;
    }> = [];

    const colors = ['#00f5ff', '#38bdf8', '#818cf8', '#6366f1', '#10b981'];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius,
        baseRadius: radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.25,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulseAngle: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      // Render connected lines and particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move
        p1.x += p1.vx;
        p1.y += p1.vy;

        p1.pulseAngle += p1.pulseSpeed;
        p1.radius = p1.baseRadius + Math.sin(p1.pulseAngle) * 0.6;

        if (p1.x < -20) p1.x = width + 20;
        if (p1.x > width + 20) p1.x = -20;
        if (p1.y < -20) p1.y = height + 20;
        if (p1.y > height + 20) p1.y = -20;

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Dynamic gradient line between the two particle colors
            const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            grad.addColorStop(0, p1.color);
            grad.addColorStop(1, p2.color);
            ctx.strokeStyle = grad;
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }

        // Draw particle node with soft neon glow
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, Math.max(0.5, p1.radius), 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.shadowColor = p1.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Mouse interaction: draw electric laser link to cursor
        if (mouseActive) {
          const mdx = p1.x - mouseX;
          const mdy = p1.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 170) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = '#00f5ff';
            ctx.globalAlpha = (1 - mdist / 170) * 0.45;
            ctx.lineWidth = 1.2;
            ctx.shadowColor = '#00f5ff';
            ctx.shadowBlur = 6;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030712]">
      {/* Dynamic Cyber Particle Mesh Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-75" />

      {/* Multi-Spectrum Floating Animated Glowing Nebulae */}
      <div className="absolute -top-48 -left-48 w-[38rem] h-[38rem] bg-gradient-to-br from-cyan-400/18 via-sky-500/10 to-transparent rounded-full blur-[140px] animate-pulse-subtle pointer-events-none" />
      <div className="absolute top-1/4 -right-40 w-[42rem] h-[42rem] bg-gradient-to-bl from-indigo-500/18 via-violet-600/12 to-transparent rounded-full blur-[160px] animate-float-slow pointer-events-none" />
      <div className="absolute -bottom-48 left-1/4 w-[34rem] h-[34rem] bg-gradient-to-tr from-emerald-500/14 via-teal-600/10 to-transparent rounded-full blur-[150px] animate-float-reverse pointer-events-none" />

      {/* Subtle CRT Matrix Scanline Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_51%)] bg-[length:100%_4px] pointer-events-none opacity-25" />

      {/* High-tech Reticle Grid Coordinates */}
      <div className="absolute top-6 left-8 font-mono text-[9px] text-cyan-400/30 tracking-widest pointer-events-none select-none hidden sm:block">
        SEC://HYGIENE.SYSTEMS.V3 [ACTIVE]
      </div>
      <div className="absolute bottom-6 right-8 font-mono text-[9px] text-indigo-400/30 tracking-widest pointer-events-none select-none hidden sm:block">
        45.109.82.01 [ENCRYPTED]
      </div>
    </div>
  );
};
