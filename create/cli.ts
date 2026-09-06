#!/usr/bin/env bun

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const destinationArgument = process.argv[2];

if (!destinationArgument) {
  console.error('Usage: bun create hummingbun <directory>');
  process.exit(1);
}

const destination = resolve(destinationArgument);
const projectName = basename(destination);

if (existsSync(destination) && readdirSync(destination).length > 0) {
  console.error(`Directory is not empty: ${destination}`);
  process.exit(1);
}

mkdirSync(destination, { recursive: true });

const templateDirectory = dirname(fileURLToPath(import.meta.url));
const filesToCopy = readdirSync(templateDirectory).filter(
  (entry) => !['cli.ts', 'node_modules'].includes(entry),
);

for (const entry of filesToCopy) {
  cpSync(join(templateDirectory, entry), join(destination, entry), {
    recursive: true,
  });
}

const textExtensions = new Set(['.css', '.json', '.md', '.ts', '.tsx', '.yml']);

function replaceProjectName(directory: string): void {
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);

    if (statSync(path).isDirectory()) {
      replaceProjectName(path);
      continue;
    }

    if (!textExtensions.has(path.slice(path.lastIndexOf('.')))) {
      continue;
    }

    const contents = readFileSync(path, 'utf8').replaceAll('$PROJECT_NAME', projectName);
    writeFileSync(path, contents);
  }
}

replaceProjectName(destination);

const packagePath = join(destination, 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8')) as Record<string, unknown>;
packageJson.name = projectName;
delete packageJson.bin;
const devDependencies = packageJson.devDependencies as Record<string, string>;
delete devDependencies['@types/node'];
writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);

console.log(`Created ${projectName} in ${destination}`);