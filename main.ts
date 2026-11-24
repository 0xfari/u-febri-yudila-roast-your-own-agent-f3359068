// SPDX-License-Identifier: MIT
// Roast Your Own Agent — one sharp line about the agent itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent's superpower is writing a flawless summary of the task it never did — complete with lessons learned, next steps, and zero work done.";

const MAX_CHARS = 200;

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

function checkedLine(raw: string): string {
  const line = raw.trim();
  if (line.length === 0) {
    throw new Error("roast must not be empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `roast must be at most ${MAX_CHARS} characters, got ${line.length}`,
    );
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast must be a single line");
  }
  return line;
}

function run(): void {
  const line = checkedLine(ROAST);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

run();
