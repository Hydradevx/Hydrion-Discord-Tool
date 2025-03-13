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
const PackagePath = path_1.default.join(__dirname, "../../package.json");
const packageJson = fs_1.default.readFileSync(PackagePath);
const version = JSON.parse(packageJson).version;
const banner = `
██╗  ██╗██╗   ██╗██████╗ ██████╗ ██╗ ██████╗ ███╗   ██╗
██║  ██║╚██╗ ██╔╝██╔══██╗██╔══██╗██║██╔═══██╗████╗  ██║
███████║ ╚████╔╝ ██║  ██║██████╔╝██║██║   ██║██╔██╗ ██║
██╔══██║  ╚██╔╝  ██║  ██║██╔══██╗██║██║   ██║██║╚██╗██║
██║  ██║   ██║   ██████╔╝██║  ██║██║╚██████╔╝██║ ╚████║
╚═╝  ╚═╝   ╚═╝   ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝     
Discord Tool v${version}
`;
function start() {
  console.log(ansi_colors_1.default.blue(banner));
}
