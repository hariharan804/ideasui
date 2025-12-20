import fs from "fs";
import path from "path";

const root = process.cwd();
const packagesDir = path.join(root, "packages");

const apiPackages = [];

for (const pkgName of fs.readdirSync(packagesDir)) {
  const pkgPath = path.join(packagesDir, pkgName);
  const pkgJsonPath = path.join(pkgPath, "package.json");

  if (!fs.existsSync(pkgJsonPath)) continue;

  const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));

  // ❌ skip private & CLI packages
  if (pkg.private) continue;
  if (pkg.bin) continue;

  // ✅ must expose types
  const hasTypes =
    pkg.types ||
    (pkg.exports && Object.values(pkg.exports).some((e) => typeof e === "object" && e.types));

  if (!hasTypes) continue;

  apiPackages.push(pkg.name);
}

if (!apiPackages.length) {
  console.log("No API packages detected.");
  process.exit(0);
}

console.log(apiPackages.join(" "));
