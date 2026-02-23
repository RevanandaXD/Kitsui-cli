const inquirer = require("inquirer").default;
const chalk = require("chalk");
const spawn = require("cross-spawn");

module.exports = async function test() {
  const { testTool } = await inquirer.prompt([
    {
      type: "list",
      name: "testTool",
      pageSize: 8,
      message: "Which testing tool do you want to setup or run?",
      choices: [
        { name: chalk.hex("#fcd12a")("Jest (Unit Testing)"), value: "Jest" },
        { name: chalk.hex("#fbc22b")("Mocha (Unit Testing)"), value: "Mocha" },
        {
          name: chalk.hex("#fab32c")("Chai (Assertion Library)"),
          value: "Chai",
        },
        {
          name: chalk.hex("#f9a42d")("Cypress (E2E Testing)"),
          value: "Cypress",
        },
        {
          name: chalk.hex("#f8952e")("Vitest (Unit Testing)"),
          value: "Vitest",
        },
      ],
    },
  ]);

  try {
    switch (testTool) {
      case "Jest":
        console.log("Setting up & running Jest...");
        spawn("npm", ["install", "--save-dev", "jest"], {
          stdio: "inherit",
          shell: true,
        });
        spawn("npx", ["jest", "--init"], {
          stdio: "inherit",
          shell: true,
        });
        break;
      case "Vitest":
        console.log("Setting up Vitest...");
        spawn("npm", ["install", "--save-dev", "vitest"], {
          stdio: "inherit",
          shell: true,
        });
        spawn("npx", ["vitest"], {
          stdio: "inherit",
          shell: true,
        });
        break;
      case "Cypress":
        console.log("Opening Cypress...");
        spawn("npm", ["install", "--save-dev", "cypress"], {
          stdio: "inherit",
          shell: true,
        });
        spawn("npx", ["cypress", "open"], {
          stdio: "inherit",
          shell: true,
        });
        break;
      case "Playwright":
        console.log("Initializing Playwright...");
        spawn("npm", ["init", "playwright@latest"], {
          stdio: "inherit",
          shell: true,
        });
        break;
      case "Mocha":
        console.log("Installing Mocha & Chai...");
        spawn("npm", ["install", "--save-dev", "mocha", "chai"], {
          stdio: "inherit",
          shell: true,
        });
        break;
    }
    console.log(chalk.green(`\nSuccessfully initialized ${testTool}!`));
  } catch (error) {
    console.error(chalk.red(`\nFailed to setup or run ${testTool}.`));
  }
};
