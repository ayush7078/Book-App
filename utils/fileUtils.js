const fs = require('fs').promises;
const path = require('path');

// Ensure the directory exists before reading/writing
async function ensureDirectoryExistence(filePath) {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
}

exports.readJSON = async (filePath) => {
  try {
    await ensureDirectoryExistence(filePath);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File doesn't exist — create it as an empty array
      await fs.writeFile(filePath, '[]');
      return [];
    }
    throw err;
  }
};

exports.writeJSON = async (filePath, data) => {
  await ensureDirectoryExistence(filePath);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
