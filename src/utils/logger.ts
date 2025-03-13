import fs from "fs";
import colors from "ansi-colors";
import path from "path";

const PackagePath = path.join(__dirname, "../../package.json");
const packageJson: any = fs.readFileSync(PackagePath);
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

export function start() {
  console.log(colors.blue(banner));
}
