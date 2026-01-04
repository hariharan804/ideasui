import {Command} from "commander";
import chalk from "chalk";
import ora from "ora";
import {execSync} from "child_process";
import {existsSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";
import {getAvailablePackages} from "../utils/registry";

export const addCommand = new Command()
  .name("add")
  .description("Add IdeasUI components to your project")
  .argument("[components...]", "Components to add")
  .option("-a, --all", "Install all components")
  .option("--dev", "Install as dev dependency")
  .action(async (components: string[], options) => {
    const cwd = process.cwd();
    const packageJsonPath = join(cwd, "package.json");

    if (!existsSync(packageJsonPath)) {
      console.error(chalk.red("❌ No package.json found in current directory"));
      process.exit(1);
    }

    // Get available packages dynamically
    const fetchSpinner = ora("Fetching available packages...").start();
    const availablePackages = await getAvailablePackages();
    fetchSpinner.stop();

    let packagesToInstall: string[] = [];

    if (options.all) {
      packagesToInstall = Object.values(availablePackages).map(pkg => pkg.name);
    } else if (components.length === 0) {
      console.log(chalk.yellow("Available components:"));
      Object.keys(availablePackages).forEach(comp => {
        console.log(chalk.cyan(`  • ${comp}`));
      });
      console.log(chalk.gray("\nUsage: ideasui add button ripple"));
      return;
    } else {
      packagesToInstall = components.map(comp => {
        if (!(comp in availablePackages)) {
          console.error(chalk.red(`❌ Unknown component: ${comp}`));
          console.log(chalk.gray("Available:"), Object.keys(availablePackages).join(", "));
          process.exit(1);
        }
        return availablePackages[comp].name;
      });
    }

    const spinner = ora("Installing packages...").start();

    try {
      const packageManager = detectPackageManager();
      const installCmd = buildInstallCommand(packageManager, packagesToInstall, options.dev);
      
      execSync(installCmd, {stdio: "pipe", cwd});
      
      spinner.succeed(chalk.green("✅ Packages installed successfully"));
      
      console.log(chalk.cyan("\\n📦 Installed packages:"));
      packagesToInstall.forEach(pkg => {
        console.log(chalk.gray(`  • ${pkg}`));
      });

      console.log(chalk.yellow("\\n💡 Usage example:"));
      console.log(chalk.gray(`import {Button} from "@ideasui/button";`));
      
    } catch (error) {
      spinner.fail(chalk.red("❌ Installation failed"));
      console.error(error);
      process.exit(1);
    }
  });

function detectPackageManager(): string {
  if (existsSync("pnpm-lock.yaml")) return "pnpm";
  if (existsSync("yarn.lock")) return "yarn";
  if (existsSync("bun.lockb")) return "bun";
  return "npm";
}

function buildInstallCommand(pm: string, packages: string[], isDev: boolean): string {
  const devFlag = isDev ? (pm === "npm" ? "--save-dev" : "-D") : "";
  
  switch (pm) {
    case "pnpm":
      return `pnpm add ${devFlag} ${packages.join(" ")}`;
    case "yarn":
      return `yarn add ${devFlag} ${packages.join(" ")}`;
    case "bun":
      return `bun add ${devFlag} ${packages.join(" ")}`;
    default:
      return `npm install ${devFlag} ${packages.join(" ")}`;
  }
}