"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== "default") __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
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
async function start() {
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
        return Promise.resolve(`${func.path}`)
          .then((s) => __importStar(require(s)))
          .then((module) => {
            if (module.default) {
              return module.default();
            }
          });
      }
    } else {
      console.log(ansi_colors_1.default.red("❌ Invalid Command"));
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
