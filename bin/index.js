#!/usr/bin/env node

const { Command } = require("commander");
const init = require("../commands/init");
const deploy = require("../commands/deploy");
const git = require("../commands/git");
const ignore = require("../commands/ignore");

const tunnel = require("../commands/tools/tunnel");
const live = require("../commands/tools/live");
const serve = require("../commands/tools/serve");
const json = require("../commands/tools/json");
const hello = require("../hello/hello");
const test = require("../commands/test");

const program = new Command();

program.name("kitsui").description("🦊 Kitsui Beta v1.0.0").version("1.0.0");

program.command("hello").description("Display hello").action(hello);

program.command("init").description("Creating a new project").action(init);

program.command("test").description("Testing").action(test);

program
  .command("tunnel")
  .description("Expose localhost to the internet")
  .action(tunnel);
program
  .command("live")
  .description("Starts live-server for development")
  .action(live);
program
  .command("serve")
  .description("Starts a static file server")
  .action(serve);
program
  .command("json")
  .description("Mock a REST API from db.json")
  .action(json);

program
  .command("deploy")
  .description("Deploy project to hosting provider")
  .action(deploy);

program.command("git").description("Git automation tools").action(git);

program
  .command("ignore")
  .description("Generate .gitignore files")
  .action(ignore);

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
