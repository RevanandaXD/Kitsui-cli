const inquirer = require("inquirer").default;
const chalk = require("chalk");
const { execSync } = require("child_process");
const figlet = require("figlet");

module.exports = async function tunnel() {
  console.log("");
  console.log(chalk.magenta(figlet.textSync("TUNNEL", { font: "Small" })));
  console.log("");

  try {
    const { port } = await inquirer.prompt([
      {
        type: "input",
        name: "port",
        message: chalk.cyan("Which port do you want to expose?"),
        default: "3000",
      },
    ]);
    
    console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
    console.log(chalk.gray(`  │ `) + chalk.green(`Starting LocalTunnel on port ${port}...`.padEnd(48)) + chalk.gray(" │"));
    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
    
    execSync(`npx localtunnel --port ${port}`, { stdio: "inherit" });
  } catch (error) {
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Failed to start LocalTunnel.")}\n`);
  }
};
