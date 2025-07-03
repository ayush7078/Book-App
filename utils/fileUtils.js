const fs = require('fs').promises;

const readJSON = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

const writeJSON = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
