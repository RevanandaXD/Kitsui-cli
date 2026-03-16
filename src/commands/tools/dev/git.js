const inquirer = require("inquirer").default;
const { execSync } = require("child_process");
const chalk = require("chalk");
const figlet = require("figlet");

module.exports = async function git() {
  console.log("");
  console.log(chalk.redBright(figlet.textSync("GIT", { font: "Small" })));
  console.log("");

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What git action do you want to perform?",
      choices: [
        { name: "Add All & Commit & Push", value: "push" },
        { name: "Initialize Repository", value: "init" },
        { name: "Check Status", value: "status" },
      ],
    },
  ]);

  try {
    console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
    
    switch (action) {
      case "push":
        const { commitMessage } = await inquirer.prompt([
          {
            type: "input",
            name: "commitMessage",
            message: "Enter commit message:",
            validate: (input) => input.trim() !== "" || "Commit message cannot be empty!",
          },
        ]);
        console.log(chalk.gray(`  │ `) + chalk.cyan("Adding, Committing, Pushing...".padEnd(48)) + chalk.gray(" │"));
        console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));

        execSync("git add .", { stdio: "inherit" });
        execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
        execSync("git push", { stdio: "inherit" });
        break;
      case "init":
        console.log(chalk.gray(`  │ `) + chalk.cyan("Initializing git repository...".padEnd(48)) + chalk.gray(" │"));
        console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
        execSync("git init", { stdio: "inherit" });
        break;
      case "status":
        console.log(chalk.gray(`  │ `) + chalk.cyan("Checking git status...".padEnd(48)) + chalk.gray(" │"));
        console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
        execSync("git status", { stdio: "inherit" });
        break;
    }
    
    console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green("Git command completed.")}\n`);
  } catch (error) {
    if (action !== "push") console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Git command failed.")}`);
    console.log(`  ${chalk.gray("Make sure you are in a git repository or have git installed.")}\n`);
  }
};
