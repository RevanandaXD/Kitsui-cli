const chalk = require("chalk");
const cityTimezones = require("city-timezones");
const figlet = require("figlet");

module.exports = function time(cityArgs) {
  let city = "";
  if (Array.isArray(cityArgs) && cityArgs.length > 0) city = cityArgs.join(" ");
  else if (typeof cityArgs === "string") city = cityArgs;

  console.log("");
  console.log(chalk.greenBright(figlet.textSync("TIME", { font: "Small" })));
  console.log("");

  const options = { weekday: "long", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };

  console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));

  if (city) {
    const cityData = cityTimezones.lookupViaCity(city);
    if (cityData && cityData.length > 0) {
      const tz = cityData[0].timezone;
      options.timeZone = tz;
      try {
        let outputTime = new Intl.DateTimeFormat("en-US", options).format(new Date()).replace(/pukul/gi, "").trim();
        console.log(chalk.gray(`  │ `) + chalk.cyan(`Time in ${cityData[0].city}`.padEnd(48)) + chalk.gray(" │"));
        console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));
        console.log(chalk.gray(`  │ `) + chalk.yellow(outputTime.padEnd(48)) + chalk.gray(" │"));
        console.log(chalk.gray(`  │ `) + chalk.gray(`(${tz})`.padEnd(48)) + chalk.gray(" │"));
      } catch (err) {
        console.log(chalk.gray(`  │ `) + chalk.red(`Error formatting time for zone: ${tz}`.padEnd(48)) + chalk.gray(" │"));
      }
    } else {
      console.log(chalk.gray(`  │ `) + chalk.red(`City "${city}" not found.`.padEnd(48)) + chalk.gray(" │"));
      console.log(chalk.gray(`  │ `) + chalk.yellow(`Make sure city name is in English.`.padEnd(48)) + chalk.gray(" │"));
    }
  } else {
    try {
      let outputTime = new Intl.DateTimeFormat("en-US", options).format(new Date()).replace(/pukul/gi, "").trim();
      console.log(chalk.gray(`  │ `) + chalk.cyan("Current Local Time".padEnd(48)) + chalk.gray(" │"));
      console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));
      console.log(chalk.gray(`  │ `) + chalk.yellow(outputTime.padEnd(48)) + chalk.gray(" │"));
    } catch (err) {
      console.log(chalk.gray(`  │ `) + chalk.cyan("Current Local Time".padEnd(48)) + chalk.gray(" │"));
      console.log(chalk.gray(`  ├${"─".repeat(50)}┤`));
      console.log(chalk.gray(`  │ `) + chalk.yellow(new Date().toLocaleString().padEnd(48)) + chalk.gray(" │"));
    }
  }
  
  console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
};
