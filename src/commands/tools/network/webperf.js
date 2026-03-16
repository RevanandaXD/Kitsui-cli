const { performance } = require("perf_hooks");
const chalk = require("chalk");
const figlet = require("figlet");

module.exports = async function webperf(targetUrlArg) {
  let targetUrl = Array.isArray(targetUrlArg) ? targetUrlArg[0] : targetUrlArg;

  console.log("");
  console.log(chalk.blueBright(figlet.textSync("WEBPERF", { font: "Small" })));
  console.log("");

  if (!targetUrl || typeof targetUrl !== "string") {
    console.log(`  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Please provide a URL (example: kitsui webperf google.com)")}\n`);
    return;
  }

  let urlStr = targetUrl;
  if (!/^https?:\/\//i.test(urlStr)) urlStr = "https://" + urlStr;

  console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));
  let truncatedUrl = urlStr.length > 40 ? urlStr.substring(0, 37) + "..." : urlStr;
  console.log(chalk.gray(`  │ `) + chalk.cyan.bold(`Scale: ${truncatedUrl}`.padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));

  try {
    const start = performance.now();
    const response = await fetch(urlStr, { method: "GET" });
    const ttfbTime = performance.now();
    await response.text();
    const endTime = performance.now();

    const ttfb = Math.round(ttfbTime - start);
    const totalTime = Math.round(endTime - start);
    const downloadTime = Math.round(endTime - ttfbTime);

    const statusCode = response.status >= 200 && response.status < 300 ? chalk.green(response.status) : chalk.red(response.status);

    console.log(chalk.gray(`  │ `) + chalk.white("Status Code:".padEnd(16)) + statusCode + chalk.gray(` ${response.statusText}`.padEnd(32 - response.statusText.length)) + chalk.gray(" │"));
    console.log(chalk.gray(`  │ `) + chalk.white("TTFB:".padEnd(16)) + chalk.yellow(`${ttfb} ms`.padEnd(32)) + chalk.gray(" │"));
    console.log(chalk.gray(`  │ `) + chalk.white("Download Body:".padEnd(16)) + chalk.yellow(`${downloadTime} ms`.padEnd(32)) + chalk.gray(" │"));
    console.log(chalk.gray(`  │ `) + chalk.white("Total Time:".padEnd(16)) + chalk.cyan.bold(`${totalTime} ms`.padEnd(32)) + chalk.gray(" │"));

    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯`));
    console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green("Done Scale")}\n`);
  } catch (error) {
    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯`));
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Failed to scale.")} ${chalk.gray(error.message)}\n`);
  }
};
