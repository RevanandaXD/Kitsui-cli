const inquirer = require("inquirer").default;
const chalk = require("chalk");
const { execSync } = require("child_process");
const figlet = require("figlet");

module.exports = async function serve() {
  console.log("");
  console.log(chalk.cyanBright(figlet.textSync("SERVE", { font: "Small" })));
  console.log("");

  const { port } = await inquirer.prompt([
    {
      type: "input",
      name: "port",
      message: chalk.cyan("Which port do you want to use?"),
      default: "3000",
    },
  ]);
  
  console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
  console.log(chalk.gray(`  │ `) + chalk.green(`Starting Serve on port ${port}...`.padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
  
  execSync(`npx serve -l ${port}`, { stdio: "inherit" });
};
