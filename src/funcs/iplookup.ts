import inquirer from "inquirer";
import colors from "ansi-colors";
import axios from "axios";
import { start } from "../utils/logger";

async function ipLookup(ip: string) {
  try {
    const res = await axios.get(`http://ip-api.com/json/${ip}`);
    if (res.data.status !== "success") {
      throw new Error("Error Fetching IP Info");
    }

    return `🌍 ${colors.bold("IP Lookup:")} ${ip}
      ${colors.green("Country:")} ${res.data.country} (${res.data.countryCode})
      ${colors.blue("Region:")} ${res.data.regionName}
      ${colors.magenta("City:")} ${res.data.city}
      ${colors.yellow("ISP:")} ${res.data.isp}
      ${colors.cyan("Org:")} ${res.data.org}
      ${colors.red("Timezone:")} ${res.data.timezone}`;
  } catch (err) {
    return colors.red("❌ Error Fetching IP Info");
  }
}

async function main() {
  const answers = await inquirer.prompt([
    {
      name: "ip",
      message: "Enter an IP address:",
      type: "input",
    },
  ]);

  const info = await ipLookup(answers.ip);
  console.log(info);

  const next = await inquirer.prompt([
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
    start();
  }
}

main();
