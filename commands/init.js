const inquirer = require("inquirer").default;
const chalk = require("chalk");

module.exports = async function init() {
  const { projectType } = await inquirer.prompt([
    {
      type: "list",
      name: "projectType",
      message: "What type of project do you want to create?",
      choices: [
        { name: chalk.hex("#FEE140")("Frontend"), value: "Frontend" },
        { name: chalk.hex("#FA709A")("Backend"), value: "Backend" },
      ],
    },
  ]);

  if (projectType === "Frontend") {
    require("./frontend")();
  } else {
    require("./backend")();
  }
};
