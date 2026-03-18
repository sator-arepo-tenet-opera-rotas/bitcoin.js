// --- Strong Types (Lambda-inspired encoding) ---
type Vector = Readonly<{ x: number; y: number }>;
type Unary<A, B> = (a: A) => B;
type Binary<A, B, C> = (a: A) => (b: B) => C;

// --- Pure Lambda-style operations ---
const add: Binary<Vector, Vector, Vector> = (a) => (b) => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

const subtract: Binary<Vector, Vector, Vector> = (a) => (b) => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

const magnitude: Unary<Vector, number> = (v) =>
  Math.sqrt(v.x * v.x + v.y * v.y);

// --- Composition helpers (Lambda calculus style) ---
const compose =
  <A, B, C>(f: Unary<B, C>, g: Unary<A, B>): Unary<A, C> =>
  (x) =>
    f(g(x));

const pipe =
  <A, B, C>(g: Unary<A, B>, f: Unary<B, C>): Unary<A, C> =>
  (x) =>
    f(g(x));

// --- Forward + Reverse Execution ---
const runForward = (v1: Vector, v2: Vector): number =>
  magnitude(add(v1)(v2));

const runReverse = (v1: Vector, v2: Vector): number =>
  magnitude(subtract(v2)(v1)); // reversed order

// --- Simple Hash Function ---
const hash = (input: string): string => {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h *= 16777619;
  }
  return (h >>> 0).toString(16);
};

// --- Combined Execution ---
export const vector = {
  computeHash: (v1: Vector, v2: Vector): string => {
    const forward = runForward(v1, v2);
    const reverse = runReverse(v1, v2);

    return hash(`${forward}|${reverse}`);
  },

  add,
  subtract,
  magnitude,
};
