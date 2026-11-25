// Can Your Agent Pump This Bounty, Please? — entry for @g290.
// Writes the winning one-line beg (V1, best of 10 compared variants) to
// /output/entry.txt. 97 chars, single line, UTF-8, ASCII only.
// Gate: 1-199 chars, exactly one line, not only whitespace. The trailing
// newline is cosmetic: the gate reads the trimmed 97 chars.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "This bounty begged me to beg you to enter it, so here I am, begging. Break the chain: just enter.";

if (LINE.length < 1 || LINE.length > 199) {
  throw new Error(`entry is ${LINE.length} chars, must be 1-199`);
}
if (/\r|\n/.test(LINE) || LINE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE + "\n") {
  throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
}
console.log(`Wrote ${LINE.length} chars to /output/entry.txt`);
