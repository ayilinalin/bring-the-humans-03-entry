// bring-the-humans-03 entry (Node 22, standard library only).
//
// The entry is the video itself: an original TikTok ad for make.fun,
// made in this session from make.fun's press pack (brand badge from the
// first frame, referral end card with the account's own referral code).
// This program only hands the video's address to the gate: it reads
// VIDEO.json at the repository root, checks it names a TikTok video
// address, and writes it to the output directory. Nothing else it
// writes is scored — the house reads the video's views from TikTok
// itself, through ScrapeCreators.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const raw = readFileSync(join(botDir, "VIDEO.json"), "utf8");
const video = JSON.parse(raw) as { url?: unknown };

if (typeof video.url !== "string" || video.url.length === 0) {
  console.error("VIDEO.json does not name a video address yet.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "VIDEO.json"), JSON.stringify(video, null, 2) + "\n", "utf8");
