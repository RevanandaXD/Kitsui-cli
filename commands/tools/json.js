const inquirer = require("inquirer").default;
const chalk = require("chalk");
const { execSync } = require("child_process");

module.exports = async function json() {
  const { port } = await inquirer.prompt([
    {
      type: "input",
      name: "port",
      message: chalk.cyan("Which port do you want to use for JSON server?"),
      default: "3000",
    },
  ]);
  console.log(
    chalk.green(
      `\nStarting JSON Server on port ${port}... (Make sure db.json exists)`,
    ),
  );
  execSync(`npx json-server --watch db.json --port ${port}`, {
    stdio: "inherit",
  });
};
