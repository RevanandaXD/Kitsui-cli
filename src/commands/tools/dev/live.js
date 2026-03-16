const chalk = require("chalk");
const { execSync } = require("child_process");
const figlet = require("figlet");

module.exports = function live() {
  console.log("");
  console.log(chalk.greenBright(figlet.textSync("LIVE SERVER", { font: "Small" })));
  console.log("");

  try {
    console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));
    console.log(chalk.gray(`  │ `) + chalk.cyan("Starting Live Server...".padEnd(48)) + chalk.gray(" │"));
    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
    execSync("npx live-server", { stdio: "inherit" });
  } catch (error) {
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Failed to start Live Server.")}\n`);
  }
};
