import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractClassColorMapping = (svg) => {
  const regex = new RegExp(/<style\b[^>]*>([\s\S]*?)<\/style>/gi);
  const styleContent = regex.exec(svg)?.[1];

  if (!styleContent) return;
  const regexFill = new RegExp(
    /\.([a-zA-Z0-9_-]+)\s*{[^}]*fill:\s*([^;]+);[^}]*}/g
  );
  const results = [];
  let match;
  while ((match = regexFill.exec(styleContent)) !== null) {
    results.push({
      className: match[1],
      fillValue: match[2].trim(),
    });
  }

  return results;
};

function replaceClassWithFill(text, className, fillColor) {
  // This regex finds elements containing the specified class
  // It captures the content before and after the class attribute for replacement
  const regex = new RegExp(
    `(\\<[^>]*)(class\\s*=\\s*["'](?:[^"']*\\s)?${className}(?:\\s[^"']*)?["'])([^>]*\\>)`,
    "g"
  );

  return text.replace(regex, (match, before, classAttr, after) => {
    // Check if there's already a fill attribute
    const hasFill = /fill\s*=\s*["'][^"']*["']/i.test(before + after);

    if (hasFill) {
      // Replace existing fill
      return match.replace(/fill\s*=\s*["'][^"']*["']/i, `fill="${fillColor}"`);
    } else {
      // Add new fill attribute and remove the class
      return `${before}fill="${fillColor}"${after}`;
    }
  });
}

const convertSVG = async (path) => {
  let fileNames;

  try {
    fileNames = await fs.promises.readdir(path);
  } catch (error) {
    if (error !== null) {
      console.error(error);
    }
  }

  fileNames.forEach((fileName) => {
    console.log("Processing", fileName);
    if (fileName.slice(-4) !== ".svg") return;

    const fullPath = `${path}/${fileName}`;
    const svgFileContents = fs.readFileSync(fullPath, "utf-8");
    const mapping = extractClassColorMapping(svgFileContents);
    if (!mapping) return;
    let newSvgContent = svgFileContents
      .replace(/<defs>[\s\S]*?<\/defs>/g, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/g, "");
    mapping.forEach((entry) => {
      newSvgContent = replaceClassWithFill(
        newSvgContent,
        entry.className,
        entry.fillValue
      );
    });

    console.log("Writing to", fileName);
    fs.writeFileSync(fullPath, newSvgContent, { encoding: "utf-8" });
  });
};

convertSVG(path.resolve(__dirname, process.argv[2]));
