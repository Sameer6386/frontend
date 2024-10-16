const fs = require("fs");
const path = require("path");

// Utility function to extract information from JavaScript files
const parseFileContent = (fileContent) => {
  const importRegex = /(import\s.*?from\s['"].*?['"]|require\(['"].*?['"]\))/g;
  const methodRegex =
    /function\s+(\w+)\s*\(.*?\)\s*{|(\w+)\s*=\s*\(.*?\)\s*=>\s*{|(\w+)\s*\(.*?\)\s*{/g;

  const imports = fileContent.match(importRegex) || [];
  const methods = [];
  let methodMatch;
  while ((methodMatch = methodRegex.exec(fileContent)) !== null) {
    methods.push(methodMatch[1] || methodMatch[2] || methodMatch[3]);
  }

  return { imports, methods };
};

// Function to generate documentation for each file
const generateDocumentationForFile = (filePath) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { imports, methods } = parseFileContent(fileContent);

  return `
    ### ${path.basename(filePath)}
    
    **Purpose:** [Describe the purpose of this file]

    **Imports:**
    ${imports.length > 0 ? imports.join("\n") : "None"}

    **Methods:**
    ${methods.length > 0 ? methods.join(", ") : "No methods found"}

    **Notes:**
    [Add any additional notes or explanations here]
  `;
};

// Main function to scan and generate documentation for an entire codebase
const generateDocumentationForDirectory = (directoryPath) => {
  console.log("Parsing directory:", directory);
  const docs = [];

  const files = fs.readdirSync(directoryPath);
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      docs.push(...generateDocumentationForDirectory(filePath));
    } else if (filePath.endsWith(".js") || filePath.endsWith(".jsx")) {
      const doc = generateDocumentationForFile(filePath);
      docs.push({ fileName: file, documentation: doc });
    }
  });

  return docs;
};

module.exports = { generateDocumentationForDirectory };
