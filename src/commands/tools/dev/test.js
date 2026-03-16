const inquirer = require("inquirer").default;
const chalk = require("chalk");
const spawn = require("cross-spawn");
const figlet = require("figlet");

module.exports = async function test() {
  console.log("");
  console.log(chalk.hex("#fcd12a")(figlet.textSync("TEST", { font: "Small" })));
  console.log("");

  const { testTool } = await inquirer.prompt([
    {
      type: "list",
      name: "testTool",
      pageSize: 8,
      message: "Which testing tool do you want to setup or run?",
      choices: [
        { name: chalk.hex("#fcd12a")("Jest (Unit Testing)"), value: "Jest" },
        { name: chalk.hex("#fbc22b")("Mocha (Unit Testing)"), value: "Mocha" },
        { name: chalk.hex("#fab32c")("Chai (Assertion Library)"), value: "Chai" },
        { name: chalk.hex("#f9a42d")("Cypress (E2E Testing)"), value: "Cypress" },
        { name: chalk.hex("#f8952e")("Vitest (Unit Testing)"), value: "Vitest" },
      ],
    },
  ]);

  try {
    console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
    console.log(chalk.gray(`  │ `) + chalk.cyan(`Setting up ${testTool}...`.padEnd(48)) + chalk.gray(" │"));
    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));

    switch (testTool) {
      case "Jest":
        spawn("npm", ["install", "--save-dev", "jest"], { stdio: "inherit", shell: true });
        spawn("npx", ["jest", "--init"], { stdio: "inherit", shell: true });
        break;
      case "Vitest":
        spawn("npm", ["install", "--save-dev", "vitest"], { stdio: "inherit", shell: true });
        spawn("npx", ["vitest"], { stdio: "inherit", shell: true });
        break;
      case "Cypress":
        spawn("npm", ["install", "--save-dev", "cypress"], { stdio: "inherit", shell: true });
        spawn("npx", ["cypress", "open"], { stdio: "inherit", shell: true });
        break;
      case "Playwright":
        spawn("npm", ["init", "playwright@latest"], { stdio: "inherit", shell: true });
        break;
      case "Mocha":
        spawn("npm", ["install", "--save-dev", "mocha", "chai"], { stdio: "inherit", shell: true });
        break;
    }
    console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green(`Successfully initialized ${testTool}!`)}\n`);
  } catch (error) {
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red(`Failed to setup or run ${testTool}.`)}\n`);
  }
};
