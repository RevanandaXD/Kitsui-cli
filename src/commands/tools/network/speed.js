const https = require("https");
const http = require("http");
const chalk = require("chalk");
const figlet = require("figlet");

function timedRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const start = Date.now();
    const req = mod.request(url, options, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        resolve({ data: Buffer.concat(chunks), timeMs: Date.now() - start, statusCode: res.statusCode });
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

function calculateMbps(bytes, ms) {
  if (ms <= 0) return "0.00";
  return ((bytes * 8) / (ms / 1000) / (1000 * 1000)).toFixed(2);
}

async function testPing(iterations = 5) {
  const results = [];
  for (let i = 0; i < iterations; i++) {
    const { timeMs } = await timedRequest("https://1.1.1.1/cdn-cgi/trace");
    results.push(timeMs);
  }
  results.sort((a, b) => a - b);
  return results[Math.floor(results.length / 2)];
}

async function testDownload() {
  await timedRequest("https://speed.cloudflare.com/cdn-cgi/trace");
  let totalBytes = 0, totalMs = 0;
  for (const size of [1_000_000, 5_000_000, 10_000_000, 25_000_000]) {
    const { data, timeMs } = await timedRequest(`https://speed.cloudflare.com/__down?measId=0&bytes=${size}`);
    if (data.length > 0) { totalBytes += data.length; totalMs += timeMs; }
  }
  return calculateMbps(totalBytes, totalMs);
}

async function testUpload() {
  await timedRequest("https://speed.cloudflare.com/cdn-cgi/trace");
  let totalBytes = 0, totalMs = 0;
  for (const size of [100_000, 1_000_000, 5_000_000, 10_000_000]) {
    const payload = Buffer.alloc(size, 0x41);
    const { timeMs, statusCode } = await timedRequest("https://speed.cloudflare.com/__up", {
      method: "POST", headers: { "Content-Type": "application/octet-stream", "Content-Length": payload.length }, body: payload,
    });
    if (statusCode >= 200 && statusCode < 400) { totalBytes += size; totalMs += timeMs; }
  }
  return calculateMbps(totalBytes, totalMs);
}

function colorPing(val) { return val < 50 ? chalk.green(`${val} ms`) : val < 100 ? chalk.yellow(`${val} ms`) : chalk.red(`${val} ms`); }
function colorSpeed(val) { return val >= 50 ? chalk.green(`${val} Mbps`) : val >= 20 ? chalk.yellow(`${val} Mbps`) : chalk.red(`${val} Mbps`); }

module.exports = async function runSpeedtest() {
  console.log("");
  console.log(chalk.hex("#fcd12a")(figlet.textSync("SPEEDTEST", { font: "Small" })));
  console.log("");

  console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));
  console.log(chalk.gray(`  │ `) + chalk.cyan.bold("Testing Network Speed...".padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));

  try {
    process.stdout.write(chalk.gray(`  │ `) + chalk.white("Mengukur Ping...".padEnd(18)));
    const ping = await testPing();
    console.log(colorPing(ping).padStart(29, " ") + chalk.gray(" │"));

    process.stdout.write(chalk.gray(`  │ `) + chalk.white("Mengukur Download...".padEnd(18)));
    const download = await testDownload();
    console.log(colorSpeed(download).padStart(29, " ") + chalk.gray(" │"));

    process.stdout.write(chalk.gray(`  │ `) + chalk.white("Mengukur Upload...".padEnd(18)));
    const upload = await testUpload();
    console.log(colorSpeed(upload).padStart(29, " ") + chalk.gray(" │"));

    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯`));
    console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green("Speedtest Selesai!")}\n`);

    return { ping: Number(ping), download: Number(download), upload: Number(upload) };
  } catch (error) {
    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯`));
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Gagal melakukan speedtest. Pastikan koneksi internet aktif.")}\n`);
  }
};
