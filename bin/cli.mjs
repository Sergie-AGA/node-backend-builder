import inquirer from "inquirer";
import chalk from "chalk";
const fs = require("fs");
const path = require("path");
import { existsSync } from "fs";

console.log(chalk.green("Welcome to KL Backend Builder"));

// Check directories exist
function checkDirectoriesExist(paths) {
  for (let index = 0; index < paths.length; index++) {
    if (existsSync(paths[index])) {
      return true;
    }
  }
  return false;
}

function verifyDirectories() {
  const existingDirectories = checkDirectoriesExist([
    "src",
    "prisma",
    "docker-compose.yml",
    "tsconfig.build.json",
    "tsconfig.json",
    "vitest-e2e.config.ts",
    "vitest.config.ts",
    ".env.example",
    ".env.test.example",
  ]);

  if (existingDirectories) {
    console.log(
      "This directory contains one or more files or directories that KL Backend Builder uses. It is recommended to run this cli on a clean directory"
    );
    console.log(
      chalk.red(
        "Continuing with the installation may delete some files and cause unwanted behaviour."
      )
    );

    inquirer
      .prompt({
        type: "confirm",
        name: "continue",
        message: "Would you like to continue with the installation anyway?",
        default: false,
      })
      .then((answer) => {
        if (answer.continue) {
          installModules();
        }
        console.log("Process cancelled.");
        return;
      });
  } else {
    installModules();
  }
}

// Ask for modules
function installModules() {
  inquirer
    .prompt({
      type: "checkbox",
      name: "modules",
      message: "Select modules to install:",
      choices: ["auth", "mail", "module3"],
    })
    .then((answers) => {
      console.log(777);
      console.log(answers);

      const selectedModules = answers.modules;
      console.log(
        chalk.blue("Installing selected modules:", selectedModules.join(", "))
      );

      // selectedModules.forEach((module) => {
      //   shell.cp("-R", `./modules/${module}`, `./${module}`);
      // });

      console.log(chalk.green("Modules installed successfully. Happy coding!"));
    });
}

// Init
verifyDirectories();
