const inquirer = require("inquirer").default;
const { execSync } = require("child_process");

module.exports = async function deploy() {
  const { provider } = await inquirer.prompt([
    {
      type: "list",
      name: "provider",
      message: "Where do you want to deploy?",
      choices: ["Vercel", "Netlify", "Surge", "Firebase Hosting"],
    },
  ]);

  try {
    switch (provider) {
      case "Vercel":
        console.log("Deploying to Vercel...");
        execSync("npx vercel", { stdio: "inherit" });
        break;
      case "Netlify":
        console.log("Deploying to Netlify...");
        execSync("npx netlify-cli deploy", { stdio: "inherit" });
        break;
      case "Surge":
        console.log("Deploying to Surge...");
        execSync("npx surge", { stdio: "inherit" });
        break;
      case "Firebase Hosting":
        console.log("Deploying to Firebase...");
        execSync("npx firebase-tools deploy --only hosting", {
          stdio: "inherit",
        });
        break;
    }
  } catch (error) {
    console.error(
      `\\nFailed to deploy to ${provider}. Make sure you are logged in and the project is configured correctly.`,
    );
  }
};
