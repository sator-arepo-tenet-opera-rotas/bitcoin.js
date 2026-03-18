export class window {
  window.vector = window.vector || {};

window.vector.add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
window.vector.subtract = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
window.vector.magnitude = (v) =>
  Math.sqrt(v.x * v.x + v.y * v.y);
}
