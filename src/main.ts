import * as PIXI from "pixi.js";
import { gsap } from "gsap";

(async () => {
  const container = document.getElementById("canvas-container");

  const app = new PIXI.Application();
  await app.init({
    resizeTo: container,
    backgroundAlpha: 0,
    antialias: true,
  });

  container.appendChild(app.canvas);

  // 🎨 Ball
  const circle = new PIXI.Graphics();
  circle.beginFill(0x00b4d8);
  circle.drawCircle(0, 0, 50);
  circle.endFill();
  circle.x = app.screen.width / 2;
  circle.y = app.screen.height / 2;
  app.stage.addChild(circle);

  // 🌑 Shadow
  const shadow = new PIXI.Graphics();
  shadow.beginFill(0x000000, 0.3);
  shadow.drawEllipse(0, 0, 60, 20);
  shadow.endFill();
  shadow.x = circle.x;
  shadow.y = circle.y + 55;
  app.stage.addChild(shadow);

  // 🖱️ Mouse tracking (full-screen)
  let targetX = circle.x;
  let targetY = circle.y;

  window.addEventListener("mousemove", (e) => {
    const rect = app.canvas.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
  });

  // 🌀 Smooth full movement
  app.ticker.add(() => {
    circle.x += (targetX - circle.x) * 0.08;
    circle.y += (targetY - circle.y) * 0.08;

    shadow.x = circle.x;
    shadow.y = circle.y + 55;
  });

  // 💥 Click pulse
  window.addEventListener("click", () => {
    gsap.killTweensOf(circle.scale);
    gsap.to(circle.scale, {
      x: 1.3,
      y: 1.3,
      duration: 0.25,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });
  });
})();
