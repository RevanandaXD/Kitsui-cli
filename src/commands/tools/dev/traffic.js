const chalk = require("chalk");
const http = require("http");
const https = require("https");
const inquirer = require("inquirer").default;
const figlet = require("figlet");

module.exports = async function traffic(urlArg, requestsArg) {
  console.log("");
  console.log(chalk.blueBright(figlet.textSync("TRAFFIC", { font: "Small" })));
  console.log("");

  const argsList = process.argv.slice(3);
  let url = typeof urlArg === "string" ? urlArg : argsList[0];
  let requests = typeof requestsArg === "string" || typeof requestsArg === "number" ? requestsArg : argsList[1];

  if (!url) {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "url",
        message: "Enter the target URL (e.g., https://example.com):",
        validate: (input) => input.trim() !== "" || "URL cannot be empty!",
      },
    ]);
    url = response.url.trim();
  }

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }

  if (!requests) {
    const response = await inquirer.prompt([
      {
        type: "input",
        name: "requests",
        message: "Enter the number of requests to send:",
        validate: (input) => (!isNaN(parseInt(input)) && parseInt(input) > 0) || "Please enter a valid positive number!",
      },
    ]);
    requests = response.requests;
  }

  const numRequests = parseInt(requests, 10);
  if (isNaN(numRequests) || numRequests <= 0) {
    console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red("Invalid number of requests.")}\n`);
    return;
  }

  const client = url.startsWith("https") ? https : http;

  console.log(chalk.gray(`\n  ╭${"─".repeat(50)}╮`));
  
  let targetText = `Target: ${url}`;
  if (targetText.length > 48) targetText = targetText.substring(0, 45) + "...";
  
  console.log(chalk.gray(`  │ `) + chalk.cyan(targetText.padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  │ `) + chalk.cyan(`Requests: ${numRequests}`.padEnd(48)) + chalk.gray(" │"));
  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));

  console.log(chalk.cyan(`  Sending ${numRequests} requests... please wait.\n`));

  let successful = 0;
  let failed = 0;
  const promises = [];

  for (let i = 0; i < numRequests; i++) {
    const p = new Promise(resolve => {
      let resolved = false;
      const handleResolve = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      }

      const req = client.get(url, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
            successful++;
        } else {
            failed++;
        }
        res.on('data', () => {});
        res.on('end', () => handleResolve());
      });

      req.on('error', (err) => {
        failed++;
        handleResolve();
      });
      
      req.setTimeout(5000, () => {
          req.destroy();
          failed++;
          handleResolve();
      });
    });
    promises.push(p);
  }
  await Promise.all(promises);

  console.log(`  ${chalk.bgCyan.white.bold(" RESULTS ")}\n`);
  console.log(`  ${chalk.green("✔ Successful:")} ${successful}`);
  console.log(`  ${chalk.red("✖ Failed:")} ${failed}`);
  console.log(`\n  ${chalk.bgGreen.white.bold(" DONE ")} ${chalk.green("Traffic test completed.")}\n`);
};