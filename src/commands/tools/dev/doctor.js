const chalk = require("chalk");
const { execSync } = require("child_process");
const fs = require("fs");
const figlet = require("figlet");

function checkCommand(command, name) {
  try {
    const version = execSync(`${command} --version`, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }).trim();
    console.log(chalk.gray(`  │ `) + chalk.white(`${name}:`.padEnd(12)) + chalk.green("✔ " + version.substring(0, 20).padEnd(33)) + chalk.gray(" │"));
  } catch (e) {
    try {
      const version = execSync(`${command} -v`, { encoding: "utf8", stdio: ["pipe", "pipe", "ignore"] }).trim();
      console.log(chalk.gray(`  │ `) + chalk.white(`${name}:`.padEnd(12)) + chalk.green("✔ " + version.substring(0, 20).padEnd(33)) + chalk.gray(" │"));
    } catch (err) {
      console.log(chalk.gray(`  │ `) + chalk.white(`${name}:`.padEnd(12)) + chalk.red("✖ Not found".padEnd(35)) + chalk.gray(" │"));
    }
  }
}

module.exports = function doctor() {
  console.log("");
  console.log(chalk.cyanBright(figlet.textSync("DOCTOR", { font: "Small" })));
  console.log("");

  console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));
  console.log(chalk.gray(`  │ `) + chalk.cyan.bold("System Environment".padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));
  
  checkCommand("node", "Node.js");
  checkCommand("npm", "NPM");
  checkCommand("yarn", "Yarn");
  checkCommand("pnpm", "pnpm");
  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));
  checkCommand("php", "PHP");
  checkCommand("composer", "Composer");

  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));
  console.log(chalk.gray(`  │ `) + chalk.cyan.bold("Project Environment".padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));

  let isJs = false;
  let isLaravel = false;

  if (fs.existsSync("package.json")) {
    console.log(chalk.gray(`  │ `) + chalk.green("✔ JavaScript/Node.js Project detected".padEnd(48)) + chalk.gray(" │"));
    isJs = true;
  }

  if (fs.existsSync("artisan") || fs.existsSync("composer.json")) {
    console.log(chalk.gray(`  │ `) + chalk.green("✔ Laravel/PHP Project detected".padEnd(48)) + chalk.gray(" │"));
    isLaravel = true;
  }

  if (!isJs && !isLaravel) {
    console.log(chalk.gray(`  │ `) + chalk.yellow("⚠ No specific project type detected".padEnd(48)) + chalk.gray(" │"));
  }

  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯`));
  console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green("System check complete!")}\n`);
};
