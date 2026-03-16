const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");
const figlet = require("figlet");

module.exports = function docker(options = {}) {
  console.log("");
  console.log(chalk.blueBright(figlet.textSync("DOCKER", { font: "Small" })));
  console.log("");

  console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));
  console.log(chalk.gray(`  │ `) + chalk.cyan("Checking Docker installation...".padEnd(48)) + chalk.gray(" │"));

  try {
    execSync("docker --version", { stdio: "ignore" });
    console.log(chalk.gray(`  │ `) + chalk.green("✔ Docker is installed.".padEnd(48)) + chalk.gray(" │"));
  } catch (error) {
    console.log(chalk.gray(`  │ `) + chalk.red("✖ Docker not installed or running.".padEnd(48)) + chalk.gray(" │"));
    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
    return;
  }

  const dockerfile = `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "run", "dev"]\n`;
  const dockerCompose = `services:\n  web:\n    build:\n      context: .\n      dockerfile: Dockerfile\n    ports:\n      - "3000:3000"\n    volumes:\n      - .:/app\n      - /app/node_modules\n`;
  const dockerIgnore = `node_modules\n.git\n.env\n.vscode\nDockerfile\ndocker-compose.yml\n`;

  const filesToCreate = {
    Dockerfile: dockerfile,
    "docker-compose.yml": dockerCompose,
    ".dockerignore": dockerIgnore,
  };

  let allExist = true;

  console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));
  console.log(chalk.gray(`  │ `) + chalk.cyan("Setting up files...".padEnd(48)) + chalk.gray(" │"));

  Object.entries(filesToCreate).forEach(([filename, content]) => {
    const filePath = path.join(process.cwd(), filename);
    if (fs.existsSync(filePath)) {
      console.log(chalk.gray(`  │ `) + chalk.yellow(`⚠ ${filename} already exists.`.padEnd(48)) + chalk.gray(" │"));
    } else {
      fs.writeFileSync(filePath, content);
      console.log(chalk.gray(`  │ `) + chalk.green(`✔ ${filename} created.`.padEnd(48)) + chalk.gray(" │"));
      allExist = false;
    }
  });

  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯`));

  if (allExist) {
    console.log(`\n  ${chalk.bgCyan.black.bold(" INFO ")} ${chalk.cyan("All Docker files already exist.")}\n`);
  } else {
    console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green("Docker setup completed successfully!")}\n`);
  }

  const shouldAutoRun = options.run || process.argv.includes("--run") || process.argv.includes("-r");

  if (shouldAutoRun) {
    console.log(chalk.blue("\n  🚀 Starting Docker containers (auto run)...\n"));
    try {
      execSync("docker compose up -d --build", { stdio: "inherit" });
      console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green("Containers are up and running!")}\n`);
    } catch (error) {
      console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Failed to start containers.")}\n`);
    }
  }
};
