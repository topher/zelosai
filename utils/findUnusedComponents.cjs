const fs = require('fs');
const path = require('path');

// Accept command-line arguments for componentsDir and srcDir
const args = process.argv.slice(2);

const componentsDir = args[0] || path.join(__dirname, '..', 'app', 'components');
const srcDir = args[1] || path.join(__dirname, '..', 'app');

// Recursively get all .tsx component files in the components directory
function getAllComponents(dir) {
  let components = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      components = components.concat(getAllComponents(fullPath));
    } else if (fullPath.endsWith('.tsx')) {
      components.push(fullPath);
    }
  }
  return components;
}

// Recursively check if a component is used in the src directory
function isComponentUsed(componentName, dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (isComponentUsed(componentName, fullPath)) {
        return true;
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (
        content.includes(`import ${componentName}`) ||
        content.includes(`import { ${componentName} }`) ||
        content.includes(`<${componentName}`) ||
        content.includes(`${componentName}(`)
      ) {
        return true;
      }
    }
  }
  return false;
}

// Get all component files recursively
const components = getAllComponents(componentsDir);

components.forEach((component) => {
  const componentName = path.basename(component).replace('.tsx', '');
  // console.log(`Checking usage for component: ${componentName}`);
  const used = isComponentUsed(componentName, srcDir);

  if (!used) {
    console.log(`Component "${componentName}" is not used.`);
  }
});
