#!/usr/bin/env node

const { Command } = require("commander");
const chalk = require("chalk");
const commands = require("../commands/index.js");

const program = new Command();
const asciiArt = `
  ${chalk.hex("#BB1900").bold("██╗  ██╗██╗████████╗███████╗██╗   ██╗██╗")}
  ${chalk.hex("#BB1900").bold("██║ ██╔╝██║╚══██╔══╝██╔════╝██║   ██║██║")}
  ${chalk.hex("#FD6F01").bold("█████╔╝ ██║   ██║   ███████╗██║   ██║██║")}
  ${chalk.hex("#FD6F01").bold("██╔═██╗ ██║   ██║   ╚════██║██║   ██║██║")}
  ${chalk.hex("#FFB000").bold("██║  ██╗██║   ██║   ███████║╚██████╔╝██║")}
  ${chalk.hex("#fcd12a").bold("╚═╝  ╚═╝╚═╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝ 2.0.0")}
`;

program.name("kitsui").description(asciiArt).version("2.0.0");

// Core Commands
program
  .command("hello")
  .description("Display hello")
  .action((...args) => commands.hello(...args));
program
  .command("ignore")
  .description("Generate .gitignore files")
  .action((...args) => commands.ignore(...args));

// Generator Commands
program
  .command("backend")
  .description("Generate a new backend project")
  .action((...args) => commands.backend(...args));
program
  .command("frontend")
  .description("Generate a new frontend project")
  .action((...args) => commands.frontend(...args));

// Tool Commands
program
  .command("time [...city]")
  .description("Display specific time in a specific city")
  .action((...args) => commands.time(...args));
program
  .command("test")
  .description("Testing")
  .action((...args) => commands.test(...args));
program
  .command("speed")
  .description("Speedtest")
  .action((...args) => commands.speedTest(...args));
program
  .command("webperf [...url]")
  .description("Web Performance")
  .action((...args) => commands.webperf(...args));
program
  .command("tunnel")
  .description("Expose localhost to the internet")
  .action((...args) => commands.tunnel(...args));
program
  .command("live")
  .description("Starts live-server for development")
  .action((...args) => commands.live(...args));
program
  .command("serve")
  .description("Starts a static file server")
  .action((...args) => commands.serve(...args));
program
  .command("json")
  .description("Mock a REST API from db.json")
  .action((...args) => commands.json(...args));
program
  .command("deploy")
  .description("Deploy project to hosting provider")
  .action((...args) => commands.deploy(...args));
program
  .command("git")
  .description("Git automation tools")
  .action((...args) => commands.git(...args));
program
  .command("doctor")
  .description("Check system health")
  .action((...args) => commands.doctor(...args));
program
  .command("clean")
  .description("Clean cache")
  .action((...args) => commands.clean(...args));
program
  .command("traffic [...url] [...requests]")
  .description("Test traffic Website")
  .action((...args) => commands.traffic(...args));
program
  .command("todo [...args]")
  .description("Manage todo list")
  .action((...args) => commands.todo(...args));
program
  .command("docker [...args]")
  .description("Manage docker")
  .action((...args) => commands.docker(...args));
program
  .command("help")
  .description("Display help and available commands")
  .action(() => {
    program.outputHelp();
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

setTimeout(() => {
  try {
    const updateNotifier = require("update-notifier").default;
    updateNotifier({
      pkg: require("../../package.json"),
      updateCheckInterval: 1000 * 60 * 60 * 24 * 3,
    }).notify();
  } catch (err) {}
}, 0);
