const inquirer = require("inquirer").default;
const { execSync } = require("child_process");

module.exports = async function ignore() {
  const { type } = await inquirer.prompt([
    {
      type: "list",
      name: "type",
      message: "Which .gitignore template do you want to generate?",
      choices: [
        "Node.js",
        "Python",
        "Go",
        "Java",
        "C++",
        "React",
        "Vue",
        "Laravel",
        { name: "Custom (using npx gitignore)", value: "custom" },
      ],
    },
  ]);

  try {
    if (type === "custom") {
      const { customType } = await inquirer.prompt([
        {
          type: "input",
          name: "customType",
          message:
            "Enter the environments/tools (comma separated, e.g. node,react,macos):",
        },
      ]);
      console.log(`Generating .gitignore for ${customType}...`);
      execSync(`npx gitignore ${customType}`, { stdio: "inherit" });
    } else {
      let searchType = type.toLowerCase();
      if (searchType === "node.js") searchType = "node";
      if (searchType === "c++") searchType = "c++";

      console.log(`Generating .gitignore for ${type}...`);
      execSync(`npx gitignore ${searchType}`, { stdio: "inherit" });
    }
    console.log(".gitignore generated successfully!");
  } catch (error) {
    console.error("\\nFailed to generate .gitignore. Ensure npx is available.");
  }
};
