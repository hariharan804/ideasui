#!/usr/bin/env node

/**
 * Version check script to ensure minimum required versions are met
 * This provides helpful error messages instead of cryptic failures
 */

const MIN_NODE_VERSION = '18.0.0';
const MIN_PNPM_VERSION = '8.0.0';
const RECOMMENDED_NODE_VERSION = '22.12.0'; // Node 22 LTS (Jod) - Maintenance LTS until April 2027
const RECOMMENDED_PNPM_VERSION = '10.26.0'; // PNPM 10.x - Current stable version

/**
 * Parse semantic version string
 * @param {string} version - Version string like "18.20.5"
 * @returns {{ major: number, minor: number, patch: number }}
 */
function parseVersion(version) {
  const cleaned = version.replace(/^v/, '');
  const [major, minor, patch] = cleaned.split('.').map(Number);

  return { major, minor, patch };
}

/**
 * Compare two semantic versions
 * @param {string} current - Current version
 * @param {string} required - Required minimum version
 * @returns {boolean} True if current >= required
 */
function isVersionValid(current, required) {
  const curr = parseVersion(current);
  const req = parseVersion(required);

  if (curr.major > req.major) {
    return true;
  }
  if (curr.major < req.major) {
    return false;
  }

  if (curr.minor > req.minor) {
    return true;
  }
  if (curr.minor < req.minor) {
    return false;
  }

  return curr.patch >= req.patch;
}

/**
 * Check Node.js version
 */
function checkNodeVersion() {
  const currentVersion = process.version;
  const isValid = isVersionValid(currentVersion, MIN_NODE_VERSION);

  if (!isValid) {
    console.error('\n❌ Node.js version check failed!');
    console.error(`   Current version: ${currentVersion}`);
    console.error(`   Minimum required: ${MIN_NODE_VERSION}`);
    console.error(`   Recommended: ${RECOMMENDED_NODE_VERSION}\n`);
    console.error('Please upgrade Node.js:');
    console.error('   - Using nvm: nvm install 18 && nvm use 18');
    console.error('   - Download: https://nodejs.org/\n');
    process.exit(1);
  }

  console.log(`✅ Node.js version ${currentVersion} meets requirements`);
}

/**
 * Check PNPM version
 */
function checkPnpmVersion() {
  try {
    const executable = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

    const pnpmVersion = execFileSync(executable, ['--version'], {
      encoding: 'utf8',
      shell: false,
    }).trim();

    const isValid = isVersionValid(pnpmVersion, MIN_PNPM_VERSION);

    if (!isValid) {
      console.error('\n❌ PNPM version check failed!');
      console.error(`   Current version: ${pnpmVersion}`);
      console.error(`   Minimum required: ${MIN_PNPM_VERSION}`);
      console.error(`   Recommended: ${RECOMMENDED_PNPM_VERSION}\n`);
      console.error('Please upgrade PNPM:');
      console.error('   npm install -g pnpm@latest\n');
      process.exit(1);
    }

    console.log(`✅ PNPM version ${pnpmVersion} meets requirements`);
  } catch {
    console.error('\n❌ PNPM is not installed!');
    console.error('   This project requires PNPM for dependency management.\n');
    console.error('Install PNPM:');
    console.error('   npm install -g pnpm');
    console.error('   Or visit: https://pnpm.io/installation\n');
    process.exit(1);
  }
}

/**
 * Check if the correct package manager is being used
 */
function checkPackageManager() {
  const userAgent = process.env.npm_config_user_agent || '';
  if (!userAgent.startsWith('pnpm')) {
    console.error('\n❌ Please use pnpm to install dependencies in this project.');
    console.error('   Running "npm install" or "yarn" is not allowed.\n');
    process.exit(1);
  }
}

/**
 * Main check function
 */
function main() {
  console.log('\n🔍 Checking environment versions...\n');

  checkPackageManager();

  checkNodeVersion();
  checkPnpmVersion();

  console.log('\n✅ All version checks passed!\n');
}

main();
