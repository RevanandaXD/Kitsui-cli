const inquirer = require("inquirer").default;
const { execSync } = require("child_process");
const chalk = require("chalk");
const figlet = require("figlet");

module.exports = async function ignore() {
  console.log("");
  console.log(chalk.blueBright(figlet.textSync("IGNORE", { font: "Small" })));
  console.log("");

  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Which .gitignore template do you want to generate?",
      choices: [
        "Node.js", "Python", "Go", "Java", "C++", "React", "Vue", "Laravel",
        { name: "Custom (using npx gitignore)", value: "custom" },
      ],
    },
  ]);

  try {
    console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
    
    if (type === "custom") {
      const { customType } = await inquirer.prompt([
        {
          type: "input",
          name: "customType",
          message: "Enter the environments/tools (comma separated, e.g. node,react,macos):",
        },
      ]);
      console.log(chalk.gray(`  │ `) + chalk.cyan(`Generating .gitignore for ${customType}...`.padEnd(48)) + chalk.gray(" │"));
      console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
      execSync(`npx gitignore ${customType}`, { stdio: "inherit" });
    } else {
      let searchType = type.toLowerCase();
      if (searchType === "node.js") searchType = "node";
      if (searchType === "c++") searchType = "c++";

      console.log(chalk.gray(`  │ `) + chalk.cyan(`Generating .gitignore for ${type}...`.padEnd(48)) + chalk.gray(" │"));
      console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
      execSync(`npx gitignore ${searchType}`, { stdio: "inherit" });
    }
    
    console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green(".gitignore generated successfully!")}\n`);
  } catch (error) {
    if (type !== "custom") console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Failed to generate .gitignore.")}`);
    console.log(`  ${chalk.gray("Ensure npx is available.")}\n`);
  }
};
