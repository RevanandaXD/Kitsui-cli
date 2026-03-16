const inquirer = require("inquirer").default;
const chalk = require("chalk");
const spawn = require("cross-spawn");
const figlet = require("figlet");
const fs = require("fs");
const path = require("path");

module.exports = async function frontend() {
  console.log("");
  console.log(chalk.cyanBright(figlet.textSync("FRONTEND", { font: "Small" })));
  console.log("");

  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      default: "frontend",
    },
  ]);

  const { buildTools } = await inquirer.prompt([
    {
      type: "list",
      name: "buildTools",
      pageSize: 8,
      message: "What build tools do you want to use?",
      choices: [
        { name: chalk.hex("#fcd12a")("Vite"), value: "Vite" },
        { name: chalk.hex("#fbc22b")("Next.js"), value: "Next.js" },
        { name: chalk.hex("#fab32c")("Astro"), value: "Astro" },
        { name: chalk.hex("#f9a42d")("Remix"), value: "Remix" },
        { name: chalk.hex("#f8952e")("SvelteKit"), value: "SvelteKit" },
        { name: chalk.hex("#f7862f")("Nuxt.js"), value: "Nuxt.js" },
        { name: chalk.hex("#f67730")("Gatsby"), value: "Gatsby" },
        { name: chalk.hex("#f56831")("Angular"), value: "Angular" },
      ],
    },
  ]);

  console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
  console.log(chalk.gray(`  │ `) + chalk.cyan(`Scaffolding ${buildTools} project...`.padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));

  switch (buildTools) {
    case "Vite":
      spawn("npm", ["create", "vite@latest", projectName], { stdio: "inherit", shell: true });
      break;
    case "Next.js":
      spawn("npx", ["create-next-app@latest", projectName], { stdio: "inherit", shell: true });
      break;
    case "Astro":
      spawn("npm", ["create", "astro@latest", projectName], { stdio: "inherit", shell: true });
      break;
    case "Remix":
      spawn("npx", ["create-remix@latest", projectName], { stdio: "inherit", shell: true });
      break;
    case "SvelteKit":
      spawn("npm", ["create", "svelte@latest", projectName], { stdio: "inherit", shell: true });
      break;
    case "Nuxt.js":
      spawn("npx", ["nuxi@latest", "init", projectName], { stdio: "inherit", shell: true });
      break;
    case "Gatsby":
      spawn("npx", ["gatsby", "new", projectName], { stdio: "inherit", shell: true });
      break;
    case "Angular":
      spawn("npx", ["@angular/cli", "new", projectName], { stdio: "inherit", shell: true });
      break;
  }

  console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green(`Successfully initiated ${buildTools} project in ${projectName}!`)}\n`);
};
