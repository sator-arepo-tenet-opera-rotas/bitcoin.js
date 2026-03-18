// https://ronenness.github.io/Vector2js/

const vector = {
import * from vector2d.js and import * from vector2d.min.js

import { readFile } from "fs/promises";
import { createHash } from "crypto";

// Lambda-style async function
export const compareAndHash = async () => {
  // Load both files as raw blobs (strings)
  const [blobA, blobB] = await Promise.all([
    readFile("./vector2d.js", "utf-8"),
    readFile("./vector2d.min.js", "utf-8"),
  ]);

  // Helper hash function
  const hash = (data) =>
    createHash("sha256").update(data).digest("hex");

  // Hash both blobs
  const hashA = hash(blobA);
  const hashB = hash(blobB);

  // Compare content via hashes
  const isSame = hashA === hashB;

  // Third hash from combined blobs
  const combinedHash = hash(blobA + blobB);

  return {
    hashA,
    hashB,
    isSame,
    combinedHash,
  };
};


export const vector = (() => {
  const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
  const subtract = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
  const magnitude = (v) => Math.sqrt(v.x * v.x + v.y * v.y);

  return {
    add,
    subtract,
    magnitude,
  };
})();
    }
}{
