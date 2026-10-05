// Fails when placeholder content would ship. Run: npm run predeploy
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const warnings = [];

const cv = readFileSync("public/Muhammad_Usman_CV.pdf", "latin1");
if (cv.includes("PLACEHOLDER CV")) errors.push("public/Muhammad_Usman_CV.pdf is still the placeholder.");

const profile = readFileSync("src/data/profile.ts", "utf8");
for (const key of ["email", "linkedin", "github"]) {
  if (new RegExp(`${key}:\\s*""`).test(profile)) warnings.push(`profile.${key} is empty — its buttons are hidden.`);
}
if (!process.env.NEXT_PUBLIC_SITE_URL && !process.env.VERCEL_PROJECT_PRODUCTION_URL)
  warnings.push("NEXT_PUBLIC_SITE_URL is not set — canonical/OG URLs fall back to localhost.");

for (const f of readdirSync("src/data")) {
  const lines = readFileSync(join("src/data", f), "utf8").split("\n");
  lines.forEach((l, i) => {
    const m = l.match(/TODO\((\w+)\):\s*(.*)/);
    if (m) warnings.push(`src/data/${f}:${i + 1} ${m[2]}`);
  });
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
if (errors.length) process.exit(1);
console.log("predeploy: ok");
