import fs from "fs";
import colors from "ansi-colors";
import path from "path";
import inquirer from "inquirer";

const PackagePath = path.join(__dirname, "../../package.json");
const packageJson: any = fs.readFileSync(PackagePath);
const version = JSON.parse(packageJson).version;

let pageno = 1;

function getPage(pageno: number) {
  let page;
  if (pageno === 1) {
    page = `
    ${colors.cyan("1")} - ${colors.green("IP Lookup")}`;
  }

  return page;
}

const banner = `
██╗  ██╗██╗   ██╗██████╗ ██████╗ ██╗ ██████╗ ███╗   ██╗
██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗██║██╔═══██╗████╗  ██║
███████║ ╚████╔╝ ██║  ██║██████╔╝██║██║   ██║██╔██╗ ██║
██╔══██║  ╚██╔╝  ██║  ██║██╔══██╗██║██║   ██║██║╚██╗██║
██║  ██║   ██║   ██████╔╝██║  ██║██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝     
Discord Tool v${version}


Input Commands:
X - Exit the Tool
> - Next Page
< - Previous Page
`;

let currentpage: any = getPage(pageno);

export function start() {
  console.clear();
  console.log(colors.cyan(banner));
  console.log(colors.cyanBright(currentpage));
  prompt().then((answers) => {
    const command = answers.command;
    if (command === "X") {
      process.exit();
    } else if (command === ">") {
      pageno++;
      currentpage = getPage(pageno);
      start();
    } else if (command === "<") {
      pageno--;
      currentpage = getPage(pageno);
      start();
    } else if (isNumber(command)) {
      const func = funcs[command];
      if (func) {
        require(func.path);
      }
    }
  });
}

function isNumber(value: string): boolean {
  return !isNaN(parseInt(value));
}

function prompt() {
  return inquirer.prompt([
    {
      name: "command",
      message: colors.blue("What would you like to do?"),
      type: "input",
    },
  ]);
}

const funcs: any = {
  1: { name: "iplookup", path: "../funcs/iplookup" },
};