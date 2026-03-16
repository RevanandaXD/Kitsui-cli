const inquirer = require("inquirer").default;
const { execSync } = require("child_process");
const chalk = require("chalk");
const figlet = require("figlet");

module.exports = async function deploy() {
  console.log("");
  console.log(chalk.magentaBright(figlet.textSync("DEPLOY", { font: "Small" })));
  console.log("");

  const { provider } = await inquirer.prompt([
    {
      type: "list",
      name: "provider",
      message: "Where do you want to deploy?",
      choices: ["Vercel", "Netlify", "Surge", "Firebase Hosting"],
    },
  ]);

  try {
    console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
    console.log(chalk.gray(`  │ `) + chalk.cyan(`Deploying to ${provider}...`.padEnd(48)) + chalk.gray(" │"));
    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));

    switch (provider) {
      case "Vercel":
        execSync("npx vercel", { stdio: "inherit" });
        break;
      case "Netlify":
        execSync("npx netlify-cli deploy", { stdio: "inherit" });
        break;
      case "Surge":
        execSync("npx surge", { stdio: "inherit" });
        break;
      case "Firebase Hosting":
        execSync("npx firebase-tools deploy --only hosting", { stdio: "inherit" });
        break;
    }
    
    console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green(`Successfully deployed to ${provider}`)}\n`);
  } catch (error) {
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red(`Failed to deploy to ${provider}.`)}`);
    console.log(`  ${chalk.gray("Make sure you are logged in and configured correctly.")}\n`);
  }
};
