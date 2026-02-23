const chalk = require("chalk");
const { execSync } = require("child_process");

module.exports = function live() {
  try {
    console.log(chalk.green("\nStarting Live Server..."));
    execSync("npx live-server", { stdio: "inherit" });
  } catch (error) {
    console.error(chalk.red(`\nFailed to start Live Server.`));
  }
};
