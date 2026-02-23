const inquirer = require("inquirer").default;
const { execSync } = require("child_process");

module.exports = async function tools() {
  const { selectedTool } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedTool",
      message: "Which tool do you want to run?",
      choices: [
        {
          name: "LocalTunnel (Expose localhost to the internet)",
          value: "localtunnel",
        },
        {
          name: "Live Server (Development static server with live reload)",
          value: "live-server",
        },
        { name: "Serve (Simple static file server)", value: "serve" },
        {
          name: "JSON Server (Mock a complete REST API from a JSON file)",
          value: "json-server",
        },
      ],
    },
  ]);

  let port = "3000";

  if (["localtunnel", "serve", "json-server"].includes(selectedTool)) {
    const answer = await inquirer.prompt([
      {
        type: "input",
        name: "port",
        message: "Which port do you want to use/target?",
        default: "3000",
      },
    ]);
    port = answer.port;
  }

  try {
    switch (selectedTool) {
      case "localtunnel":
        console.log(`Starting LocalTunnel on port ${port}...`);
        execSync(`npx localtunnel --port ${port}`, { stdio: "inherit" });
        break;
      case "live-server":
        console.log("Starting Live Server...");
        execSync("npx live-server", { stdio: "inherit" });
        break;
      case "serve":
        console.log(`Starting Serve on port ${port}...`);
        execSync(`npx serve -l ${port}`, { stdio: "inherit" });
        break;
      case "json-server":
        console.log(
          `Starting JSON Server on port ${port}... (Make sure db.json exists)`,
        );
        execSync(`npx json-server --watch db.json --port ${port}`, {
          stdio: "inherit",
        });
        break;
    }
  } catch (error) {
    console.error(`\\nError running ${selectedTool}.`);
  }
};
