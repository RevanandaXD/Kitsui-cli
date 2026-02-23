const inquirer = require("inquirer").default;
const chalk = require("chalk");
const { execSync } = require("child_process");

module.exports = async function serve() {
  const { port } = await inquirer.prompt([
    {
      type: "input",
      name: "port",
      message: chalk.cyan("Which port do you want to use?"),
      default: "3000",
    },
  ]);
  console.log(chalk.green(`\nStarting Serve on port ${port}...`));
  execSync(`npx serve -l ${port}`, { stdio: "inherit" });
};
