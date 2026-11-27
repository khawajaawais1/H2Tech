// Checks which Zoho SMTP server accepts the login in .env.local.
// Run from the project folder:  node scripts/check-smtp.mjs
// Nothing is sent; it only tests the login. Your password is never printed.
import fs from "node:fs";
import nodemailer from "nodemailer";

const envFile = [".env.local", ".env"].find((f) => fs.existsSync(f));
if (!envFile) {
  console.error("No .env.local found in this folder. Create it first (see instructions).");
  process.exit(1);
}

const env = Object.fromEntries(
  fs
    .readFileSync(envFile, "utf8")
    .split(/\r?\n/)
    .filter((line) => /^\s*[A-Z_]+\s*=/.test(line))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim().replace(/^["']|["']$/g, "")];
    })
);

const user = env.SMTP_USER;
const pass = env.SMTP_PASS;
console.log(`Using ${envFile}`);
console.log(`SMTP_USER = ${user || "(missing)"}`);
console.log(`SMTP_PASS = ${pass ? `set, ${pass.length} characters` : "(missing)"}`);
console.log(`SMTP_HOST = ${env.SMTP_HOST || "(not set — the site falls back to smtppro.zoho.com)"}\n`);
if (!user || !pass) process.exit(1);

const hosts = ["smtppro.zoho.eu", "smtppro.zoho.com", "smtp.zoho.eu", "smtp.zoho.com"];
let working = null;

for (const host of hosts) {
  const transporter = nodemailer.createTransport({ host, port: 587, secure: false, auth: { user, pass } });
  try {
    await transporter.verify();
    console.log(`✅ ${host.padEnd(18)} login OK`);
    working ??= host;
  } catch (err) {
    console.log(`❌ ${host.padEnd(18)} ${err.responseCode ?? err.code ?? ""} ${String(err.response ?? err.message).split("\n")[0]}`);
  }
}

console.log(
  working
    ? `\nUse this in .env.local and on your hosting provider:\nSMTP_HOST=${working}`
    : "\nNo server accepted the login. See the meaning of the error codes above."
);
