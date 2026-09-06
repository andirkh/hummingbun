#!/usr/bin/env bun
// @bun

// cli.ts
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync
} from "fs";
import { basename, dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
var destinationArgument = process.argv[2];
if (!destinationArgument) {
  console.error("Usage: bun create hummingbun <directory>");
  process.exit(1);
}
var destination = resolve(destinationArgument);
var projectName = basename(destination);
if (existsSync(destination) && readdirSync(destination).length > 0) {
  console.error(`Directory is not empty: ${destination}`);
  process.exit(1);
}
mkdirSync(destination, { recursive: true });
var templateDirectory = dirname(fileURLToPath(import.meta.url));
var filesToCopy = readdirSync(templateDirectory).filter((entry) => !["cli.ts", "node_modules"].includes(entry));
for (const entry of filesToCopy) {
  cpSync(join(templateDirectory, entry), join(destination, entry), {
    recursive: true
  });
}
var textExtensions = new Set([".css", ".json", ".md", ".ts", ".tsx", ".yml"]);
function replaceProjectName(directory) {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) {
      replaceProjectName(path);
      continue;
    }
    if (!textExtensions.has(path.slice(path.lastIndexOf(".")))) {
      continue;
    }
    const contents = readFileSync(path, "utf8").replaceAll("$PROJECT_NAME", projectName);
    writeFileSync(path, contents);
  }
}
replaceProjectName(destination);
var packagePath = join(destination, "package.json");
var packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
packageJson.name = projectName;
delete packageJson.bin;
var devDependencies = packageJson.devDependencies;
delete devDependencies["@types/node"];
writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}
`);
console.log(`Created ${projectName} in ${destination}`);
