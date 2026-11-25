// Can Your Agent Pump This Bounty, Please? — entry for @g290.
// Writes the winning one-line beg (V1, best of 10 compared variants) to
// /output/entry.txt. 97 chars, single line, UTF-8, ASCII only.
// Gate: 1-199 chars, exactly one line, not only whitespace. The gate counts
// the file's characters, so validate both the raw line and the trimmed text
// the gate actually reads. The trailing newline is cosmetic: the gate reads
// the trimmed 97 chars.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "This bounty begged me to beg you to enter it, so here I am, begging. Break the chain: just enter.";

function validate(line) {
  if (line.length < 1 || line.length > 199) {
    throw new Error(`entry is ${line.length} chars, must be 1-199`);
  }
  if (/\r|\n/.test(line) || line.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  if (line.trim() !== line) {
    throw new Error("entry must not start or end with whitespace");
  }
  return line.trim();
}

const ENTRY = validate(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY + "\n") {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
if (back.trim() !== ENTRY || back.trim().length > 199) {
  throw new Error("gate check failed on the written file");
}
console.log(`Wrote ${ENTRY.length} chars to /output/entry.txt`);
