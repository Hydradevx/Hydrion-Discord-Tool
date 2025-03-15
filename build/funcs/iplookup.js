"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../utils/logger");
async function ipLookup(ip) {
  try {
    const res = await axios_1.default.get(`http://ip-api.com/json/${ip}`);
    if (res.data.status !== "success") {
      throw new Error("Error Fetching IP Info");
    }
    return `🌍 ${ansi_colors_1.default.bold("IP Lookup:")} ${ip}
      ${ansi_colors_1.default.green("Country:")} ${res.data.country} (${res.data.countryCode})
      ${ansi_colors_1.default.blue("Region:")} ${res.data.regionName}
      ${ansi_colors_1.default.magenta("City:")} ${res.data.city}
      ${ansi_colors_1.default.yellow("ISP:")} ${res.data.isp}
      ${ansi_colors_1.default.cyan("Org:")} ${res.data.org}
      ${ansi_colors_1.default.red("Timezone:")} ${res.data.timezone}`;
  } catch (err) {
    return ansi_colors_1.default.red("❌ Error Fetching IP Info");
  }
}
async function main() {
  const answers = await inquirer_1.default.prompt([
    {
      name: "ip",
      message: "Enter an IP address:",
      type: "input",
    },
  ]);
  const info = await ipLookup(answers.ip);
  console.log(info);
  const next = await inquirer_1.default.prompt([
    {
      name: "next",
      message: "What to do Next?",
      type: "list",
      choices: ["Exit", "Restart"],
    },
  ]);
  if (next.next === "Exit") {
    process.exit();
  } else if (next.next === "Restart") {
    (0, logger_1.start)();
  }
}
main();
