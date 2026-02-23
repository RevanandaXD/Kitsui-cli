const inquirer = require("inquirer").default;
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const spawn = require("cross-spawn");

module.exports = async function backend() {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      pageSize: 8,
      message: "What is the name of your project?",
      default: "backend",
    },
  ]);

  const { buildTools } = await inquirer.prompt([
    {
      type: "list",
      name: "buildTools",
      pageSize: 8,
      message: "What build tools do you want to use?",
      choices: [
        { name: chalk.hex("#fcd12a")("Node.js"), value: "Node.js" },
        { name: chalk.hex("#fbc72b")("Express.js"), value: "Express.js" },
        { name: chalk.hex("#fabd2c")("Nest.js"), value: "Nest.js" },
        { name: chalk.hex("#f9b32c")("Fastify"), value: "Fastify" },
        { name: chalk.hex("#f8a92d")("Golang"), value: "Golang" },
        { name: chalk.hex("#f79f2e")("Django"), value: "Django" },
        { name: chalk.hex("#f6952e")("Flask"), value: "Flask" },
        { name: chalk.hex("#f58b2f")("FastAPI"), value: "FastAPI" },
        { name: chalk.hex("#f48130")("Laravel"), value: "Laravel" },
        { name: chalk.hex("#f37731")("Nuxt.js"), value: "Nuxt.js" },
      ],
    },
  ]);

  const projectPath = path.join(process.cwd(), projectName);

  switch (buildTools) {
    case "Node.js":
      if (!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath, { recursive: true });
      spawn("npm", ["init", "-y"], {
        stdio: "inherit",
        cwd: projectPath,
        shell: true,
      });
      break;
    case "Express.js":
      spawn("npx", ["express-generator", projectName], {
        stdio: "inherit",
        shell: true,
      });
      break;
    case "Nest.js":
      spawn("npx", ["@nestjs/cli", "new", projectName], {
        stdio: "inherit",
        shell: true,
      });
      break;
    case "Nuxt.js":
      spawn("npx", ["nuxi@latest", "init", projectName], {
        stdio: "inherit",
        shell: true,
      });
      break;
    case "Fastify":
      spawn("npx", ["fastify-cli", "generate", projectName], {
        stdio: "inherit",
        shell: true,
      });
      break;
    case "Golang":
      if (!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath, { recursive: true });
      spawn("go", ["mod", "init", projectName], {
        stdio: "inherit",
        cwd: projectPath,
        shell: true,
      });
      break;
    case "Django":
      spawn("django-admin", ["startproject", projectName], {
        stdio: "inherit",
        shell: true,
      });
      break;
    case "Flask":
      if (!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath, { recursive: true });
      fs.writeFileSync(
        path.join(projectPath, "app.py"),
        "from flask import Flask\\n\\napp = Flask(__name__)\\n\\n@app.route('/')\\ndef hello_world():\\n    return 'Hello, World!'\\n",
      );
      console.log(`Created Flask project in ${projectName}`);
      break;
    case "FastAPI":
      if (!fs.existsSync(projectPath))
        fs.mkdirSync(projectPath, { recursive: true });
      fs.writeFileSync(
        path.join(projectPath, "main.py"),
        "from fastapi import FastAPI\\n\\napp = FastAPI()\\n\\n@app.get('/')\\ndef read_root():\\n    return {'Hello': 'World'}\\n",
      );
      console.log(`Created FastAPI project in ${projectName}`);
      break;
    case "Laravel":
      spawn(
        "composer",
        ["create-project", "laravel/laravel", projectName],
        {
          stdio: "inherit",
          shell: true,
        },
      );
      break;
  }

  console.log("Selected:", buildTools);
};
