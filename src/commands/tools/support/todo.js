const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const figlet = require("figlet");

module.exports = function todo() {
  const file = path.join(__dirname, "../../../database/todo.json");
  const dir = path.dirname(file);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
  }

  const todoList = JSON.parse(fs.readFileSync(file)); // read database json

  const argsList = process.argv.slice(3);
  
  const successMsg = (msg) => console.log(`\n  ${chalk.bgGreen.black.bold(" SUCCESS ")} ${chalk.green(msg)}\n`);
  const errorMsg = (msg) => console.log(`\n  ${chalk.bgRed.white.bold(" ERROR ")} ${chalk.red(msg)}\n`);

  if (!argsList || argsList.length === 0) {
    console.log("");
    console.log(chalk.cyan(figlet.textSync("TODO LIST", { font: "Small" })));
    console.log("");

    if (todoList.length === 0) {
      console.log(`  ╭──────────────────────────────────────────────────╮`);
      console.log(`  │                                                  │`);
      console.log(`  │  ${chalk.yellow("✨ No tasks found. You're all caught up! ✨")}     │`);
      console.log(`  │                                                  │`);
      console.log(`  ╰──────────────────────────────────────────────────╯\n`);
      return;
    }

    console.log(chalk.gray(`  ╭${"─".repeat(50)}╮`));
    
    // Header
    console.log(chalk.gray(`  │ `) + chalk.cyan.bold("ID".padEnd(4)) + chalk.gray("│") + chalk.cyan.bold(" Status  ") + chalk.gray("│") + chalk.cyan.bold(" Task".padEnd(33)) + chalk.gray("│"));
    console.log(chalk.gray(`  ├${"─".repeat(4)}┼${"─".repeat(9)}┼${"─".repeat(35)}┤`));

    todoList.forEach((item, index) => {
      const statusIcon = item.done ? chalk.greenBright("  ✔ DONE ") : chalk.redBright("  ✖ PEND ");
      
      let text = item.text;
      if (text.length > 31) {
        text = text.substring(0, 28) + "...";
      }
      
      const textCol = item.done ? chalk.gray.strikethrough(text.padEnd(33)) : chalk.white(text.padEnd(33));
      const indexStr = (index + 1).toString().padStart(2, " ");
      
      console.log(chalk.gray(`  │ `) + chalk.magenta.bold(`${indexStr}  `) + chalk.gray("│") + statusIcon + chalk.gray("│") + ` ${textCol} ` + chalk.gray("│"));
    });

    console.log(chalk.gray(`  ╰${"─".repeat(50)}╯\n`));
    
    const completedCount = todoList.filter(t => t.done).length;
    const pendingCount = todoList.length - completedCount;
    console.log(`  ${chalk.bgCyan.black.bold(" STATS ")}  Total: ${todoList.length} | ${chalk.green(`Completed: ${completedCount}`)} | ${chalk.red(`Pending: ${pendingCount}`)}\n`);

    return;
  }

  const command = argsList[0].toLowerCase();

  if (command === "add") {
    const text = argsList.slice(1).join(" ");
    if (!text) {
      errorMsg("Please enter a task. Example: kitsui todo add Buy milk");
      return;
    }
    todoList.push({ text, done: false });
    fs.writeFileSync(file, JSON.stringify(todoList, null, 2));
    successMsg(`Added Task: "${text}"`);
  } else if (command === "done") {
    const index = parseInt(argsList[1]) - 1;
    if (isNaN(index) || index < 0 || index >= todoList.length) {
      errorMsg("Invalid task index.");
      return;
    }
    todoList[index].done = true;
    fs.writeFileSync(file, JSON.stringify(todoList, null, 2));
    successMsg(`Marked Task #${index + 1} as Done`);
  } else if (command === "undone") {
    const index = parseInt(argsList[1]) - 1;
    if (isNaN(index) || index < 0 || index >= todoList.length) {
      errorMsg("Invalid task index.");
      return;
    }
    todoList[index].done = false;
    fs.writeFileSync(file, JSON.stringify(todoList, null, 2));
    successMsg(`Marked Task #${index + 1} as Undone`);
  } else if (command === "remove" || command === "rm") {
    const index = parseInt(argsList[1]) - 1;
    if (isNaN(index) || index < 0 || index >= todoList.length) {
      errorMsg("Invalid task index.");
      return;
    }
    const removedText = todoList[index].text;
    todoList.splice(index, 1);
    fs.writeFileSync(file, JSON.stringify(todoList, null, 2));
    console.log(`\n  ${chalk.bgYellow.black.bold(" REMOVED ")} ${chalk.yellow(`Removed Task: "${removedText}"`)}\n`);
  } else {
    errorMsg("Command not recognized.");
    console.log(`  Available commands: ${chalk.cyan("add")} | ${chalk.cyan("done")} | ${chalk.cyan("undone")} | ${chalk.cyan("remove")}\n`);
  }
};
