const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

const isWin32 = process.platform === 'win32';

const rmdirSync = (path) => {
  if (isWin32) {
    childProcess.execSync(`rmdir ${path} /s /q`);
  } else {
    childProcess.execSync(`rm -rf ${path}`);
  }
};

const mkdirpSync = (path) => {
  if (isWin32) {
    childProcess.execSync(`mkdir ${path}`);
  } else {
    childProcess.execSync(`mkdir -p ${path}`);
  }
};

const rmSync = (path) => {
  try {
    fs.unlinkSync(path);
  } catch(e) {
    // NO-OP
  }
};

const requireSafe = (file, defaultValue = {}) => {
  if (!fs.existsSync(file) && !fs.existsSync(file + '.js')) {
    return null;
  }

  try {
    return require(file);
  } catch (err) {
    return defaultValue;
  }
};

const prettyJson = (obj) => JSON.stringify(obj, null, 2);

const main = () => {
  const projectPath = __dirname.includes('node_modules')
    ? path.resolve(__dirname, '../../../')
    : path.resolve(__dirname, '../');

  const nodeModulesPath = path.resolve(projectPath, 'node_modules');
  const packageJsonPath = path.resolve(projectPath, 'package.json');

  // Remove all node modules
  rmdirSync(nodeModulesPath);
  // Remove any lockfiles
  rmSync(path.join(projectPath, 'yarn.lock'));
  rmSync(path.join(projectPath, 'package-lock.json'));
  // NOTE(nick): Keep our directory to prevent yarn error
  mkdirpSync(path.join(nodeModulesPath, 'nomodules'));

  // Optionally, create the `nomodules` directory so users can put nothing in it
  //mkdirpSync(`${projectPath}/nomodules`);
  //fs.writeFileSync(`${projectPath}/nomodules/.gitkeep`);

  if (fs.existsSync(packageJsonPath)) {
    const json = requireSafe(packageJsonPath, null);

    if (json) {
      if ('dependencies' in json) {
        delete json['dependencies'];
      }

      if ('devDependencies' in json) {
        delete json['devDependencies'];
      }

      fs.writeFileSync(packageJsonPath, prettyJson(json));
    }
  }

  console.log('Success!');
};

main();
