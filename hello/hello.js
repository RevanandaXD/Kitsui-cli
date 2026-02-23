const chalk = require("chalk");
const packageJson = require("../package.json");

module.exports = function hello() {
  // Witty title & separator
  const title = `${chalk.hex("#fcd12a").bold("kitsui")}@${chalk.hex("#FA709A").bold("cli")}`;
  const separator = chalk.gray("-".repeat(9));

  // Cute Fox ASCII Art (Senko-san style coloring)
  const foxArt = [
    `    ⠀⠀⢰⠢⣄⠀⠀⠀⠀⠀    ⣀⣀     `,
    `⠀⠀⠀⠀⠀⠀⠈⡄⢀⠙⢦⣀⠀⠀⠀⢀⢎⢀⠦⢹     `,
    `⠀⠀⠀⠀⠀⠀⠀⢡⠨⣄⠈⠿⣕⣄⢀⡾⠊⠨⣸⡀⢧    `,
    `⠀⠀⠀⠀⠀⠀⠀⠈⢞⠻⡗⢆⢷⢇⠛⢀⡀⢴⣶⡇⣸⣦   `,
    `⠀⠀⠀⠀⠀⠀⠀⠀⠸⠢⠕⠈⠀⠈⠀⠞⢱⠿⠛⢠⢿⡙   `,
    `⠀⠀⠀⠀⠀⠀⠀⠀⢐⠆⠀⠀⠀⠀⠀⠀⠁⣄⣄⡼⢎⡀⢣  `,
    `⠀⠀⠀⠀⠀⠀⠀⠀⠙⢢⠀⠀⢰⣧⣤⠠⣆⡀⠫⡱⡢⡀⢹  `,
    `⠀⠀⠀⠀⠀⠀⠀⠀⠀⡟⠀⡤⡏⠈⠀⠐⠊⠙⠢⡸⣞⡌⠘  `,
    `⠀⠀⠀⠀⠀⠀⠀⢀⠎⠀⠀⣴⡷⡤⢂⠁⠀⠀⢠⠈⠟⡞⢆  `,
    `⠀⠀⠀⠀⠀⠀⠀⢿⣿⠞⠉⢙⣥⠮⠍⠒⠒⠠⠼⡀⠀⠇⡼  `,
    `⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠑⠞⠁⠀⠀⠀⠀⠀⠀⠀  `,
  ];

  const labelColor = chalk.hex("#fcd12a").bold;
  const foxColor = chalk.hex("#f9a42d");
  const valueColor = chalk.white;

  const info = [
    ``,
    title,
    separator,
    `${labelColor("Version")}: ${valueColor(packageJson.version)}`,
    `${labelColor("Author")}: ${valueColor("VanSchwarz")}`,
    `${labelColor("Description")}: ${valueColor("🦊 A magical CLI to boost your workflow")}`,
    `${labelColor("Key Features")}: ${valueColor("Scaffold Frontend/Backend, Automate Git & Deploy")}`,
    `${labelColor("Theme")}: ${valueColor("Senko-san Pastel (Yellow-Orange)")}`,
    `${labelColor("Commands")}: ${valueColor(Object.keys(packageJson.dependencies).length + " internal modules")}`,
  ];

  const maxLines = Math.max(foxArt.length, info.length);

  console.log();
  for (let i = 0; i < maxLines; i++) {
    const leftText = foxArt[i] ? foxArt[i].padEnd(16) : " ".repeat(16);
    const left = foxColor(leftText);
    const right = info[i] || "";
    console.log(`${left}  ${right}`);
  }
  console.log();
};
