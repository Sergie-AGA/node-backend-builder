#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function copyFiles(files, destinationDir) {
  try {
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }

    files.forEach((file) => {
      const sourcePath = path.resolve(file);
      const destinationPath = path.join(destinationDir, path.basename(file));

      const stats = fs.statSync(sourcePath);
      if (stats.isFile()) {
        fs.copyFileSync(sourcePath, destinationPath);
        console.log(`Copied file ${file} to ${destinationPath}`);
      } else if (stats.isDirectory()) {
        copyDirectory(sourcePath, destinationPath);
        console.log(`Copied directory ${file} to ${destinationPath}`);
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
  }
}

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);
    const stats = fs.statSync(sourcePath);

    if (stats.isFile()) {
      fs.copyFileSync(sourcePath, destinationPath);
    } else if (stats.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    }
  });
}

const sourceFiles = ["origin0.js", "origin1"];
const destinationDirectory = "destinationFolder";

copyFiles(sourceFiles, destinationDirectory);
