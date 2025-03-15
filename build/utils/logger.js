"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
const fs_1 = __importDefault(require("fs"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const PackagePath = path_1.default.join(__dirname, "../../package.json");
const packageJson = fs_1.default.readFileSync(PackagePath);
const version = JSON.parse(packageJson).version;
let pageno = 1;
function getPage(pageno) {
  let page;
  if (pageno === 1) {
    page = `
    ${ansi_colors_1.default.cyan("1")} - ${ansi_colors_1.default.green("IP Lookup")}`;
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
let currentpage = getPage(pageno);
function start() {
  console.clear();
  console.log(ansi_colors_1.default.cyan(banner));
  console.log(ansi_colors_1.default.cyanBright(currentpage));
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
function isNumber(value) {
  return !isNaN(parseInt(value));
}
function prompt() {
  return inquirer_1.default.prompt([
    {
      name: "command",
      message: ansi_colors_1.default.blue("What would you like to do?"),
      type: "input",
    },
  ]);
}
const funcs = {
  1: { name: "iplookup", path: "../funcs/iplookup" },
};
