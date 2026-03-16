const inquirer = require("inquirer").default;
const chalk = require("chalk");
const { execSync } = require("child_process");
const figlet = require("figlet");

module.exports = async function json() {
  console.log("");
  console.log(chalk.yellowBright(figlet.textSync("JSON SERVER", { font: "Small" })));
  console.log("");

  const { port } = await inquirer.prompt([
    {
      type: "input",
      name: "port",
      message: chalk.cyan("Which port do you want to use for JSON server?"),
      default: "3000",
    },
  ]);
  
  console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
  console.log(chalk.gray(`  │ `) + chalk.green(`Starting JSON Server on port ${port}...`.padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  │ `) + chalk.yellow(`(Make sure db.json exists)`.padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
  
  execSync(`npx json-server --watch db.json --port ${port}`, { stdio: "inherit" });
};
