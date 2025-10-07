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

  const circle = new PIXI.Graphics();
  circle.beginFill(0x00b4d8);
  circle.drawCircle(0, 0, 50);
  circle.endFill();
  circle.x = app.screen.width / 2;
  circle.y = app.screen.height / 2;
  app.stage.addChild(circle);

  const shadow = new PIXI.Graphics();
  shadow.beginFill(0x000000, 0.3);
  shadow.drawEllipse(0, 0, 60, 20);
  shadow.endFill();
  shadow.x = circle.x;
  shadow.y = circle.y + 55;
  app.stage.addChild(shadow);

  gsap.to(circle, {
    y: circle.y - 20,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  gsap.to(shadow.scale, {
    x: 1.2,
    y: 0.7,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  let targetX = circle.x;
  let targetY = circle.y;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  app.ticker.add(() => {
    circle.x += (targetX - circle.x) * 0.1;
    circle.y += (targetY - circle.y) * 0.1;
    shadow.x = circle.x;
    shadow.y = circle.y + 55;
  });

  window.addEventListener("click", () => {
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
