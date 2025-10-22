const fs = require("fs");
const path = require("path");

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (file.endsWith(".js") || file.endsWith(".jsx") || file.endsWith(".tsx")) fixFile(full);
  }
}

function fixFile(file) {
  let data = fs.readFileSync(file, "utf8");
  const regex = /import\s+\{([^}]+)\}\s+from\s+['"]@mui\/material['"]/g;
  let match;
  while ((match = regex.exec(data)) !== null) {
    const comps = match[1].split(",").map(c => c.trim()).filter(Boolean);
    const newImports = comps.map(c => `import ${c} from '@mui/material/${c}';`).join("\n");
    data = data.replace(match[0], newImports);
  }
  fs.writeFileSync(file, data);
  console.log("✅ fixed:", file);
}

walk("./src");
