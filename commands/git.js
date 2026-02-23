const inquirer = require("inquirer").default;
const { execSync } = require("child_process");

module.exports = async function git() {
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
    switch (action) {
      case "push":
        const { commitMessage } = await inquirer.prompt([
          {
            type: "input",
            name: "commitMessage",
            message: "Enter commit message:",
            validate: (input) =>
              input.trim() !== "" || "Commit message cannot be empty!",
          },
        ]);

        console.log("Adding files...");
        execSync("git add .", { stdio: "inherit" });

        console.log("Committing changes...");
        execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });

        console.log("Pushing to remote...");
        execSync("git push", { stdio: "inherit" });
        break;
      case "init":
        console.log("Initializing git repository...");
        execSync("git init", { stdio: "inherit" });
        break;
      case "status":
        execSync("git status", { stdio: "inherit" });
        break;
    }
  } catch (error) {
    console.error(
      "\nGit command failed. Make sure you are in a git repository or have git installed.",
    );
  }
};
