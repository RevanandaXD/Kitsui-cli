const chalk = require("chalk");
const fs = require("fs-extra");
const { execSync } = require("child_process");
const figlet = require("figlet");

module.exports = async function clean() {
  console.log("");
  console.log(chalk.yellowBright(figlet.textSync("CLEAN", { font: "Small" })));
  console.log("");

  const isJs = fs.existsSync("package.json");
  const isLaravel = fs.existsSync("artisan");

  if (!isJs && !isLaravel) {
    console.log(`  ╭──────────────────────────────────────────────────╮`);
    console.log(`  │                                                  │`);
    console.log(`  │  ${chalk.red("✖ No JS or Laravel project detected here. ")}    │`);
    console.log(`  │                                                  │`);
    console.log(`  ╰──────────────────────────────────────────────────╯\n`);
    return;
  }

  console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));
  console.log(chalk.gray(`  │ `) + chalk.cyan.bold("Clearing Cache & Build Files".padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));

  if (isJs) {
    console.log(chalk.gray(`  │ `) + chalk.yellow("JavaScript Project Detected".padEnd(48)) + chalk.gray(" │"));
    
    const jsFolders = ["node_modules", "dist", "build", ".next", ".nuxt", "coverage", ".cache"];

    for (const folder of jsFolders) {
      if (fs.existsSync(folder)) {
        try {
          fs.removeSync(folder);
          console.log(chalk.gray(`  │ `) + chalk.white(`Removed ${folder}`.padEnd(35)) + chalk.green("✔ DONE      ") + chalk.gray(" │"));
        } catch (e) {
          console.log(chalk.gray(`  │ `) + chalk.red(`Failed to remove ${folder}`.padEnd(35)) + chalk.red("✖ ERROR     ") + chalk.gray(" │"));
        }
      }
    }
  }

  if (isLaravel) {
    console.log(chalk.gray(`  │ `) + chalk.yellow("Laravel Project Detected".padEnd(48)) + chalk.gray(" │"));
    try {
      execSync("php artisan optimize:clear", { stdio: "ignore" });
      console.log(chalk.gray(`  │ `) + chalk.white("Cleared artisan cache".padEnd(35)) + chalk.green("✔ DONE      ") + chalk.gray(" │"));
    } catch (e) {
      console.log(chalk.gray(`  │ `) + chalk.red("Failed opimize:clear".padEnd(35)) + chalk.red("✖ ERROR     ") + chalk.gray(" │"));
    }
  }

  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯`));
  console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green("Clean up complete!")}\n`);
};
