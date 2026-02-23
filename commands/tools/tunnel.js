const inquirer = require("inquirer").default;
const chalk = require("chalk");
const { execSync } = require("child_process");

module.exports = async function tunnel() {
  try {
    const { port } = await inquirer.prompt([
      {
        type: "input",
        name: "port",
        message: chalk.cyan("Which port do you want to expose?"),
        default: "3000",
      },
    ]);
    console.log(chalk.green(`\nStarting LocalTunnel on port ${port}...`));
    execSync(`npx localtunnel --port ${port}`, { stdio: "inherit" });
  } catch (error) {
    console.error(chalk.red(`\nFailed to start LocalTunnel.`));
  }
};
