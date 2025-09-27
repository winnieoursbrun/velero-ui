const fs = require('fs');
const path = require('path');

const jsonDir = path.join(__dirname, 'json');
const dbFilePath = path.join(__dirname, 'db.json');

const initialData = {
  ping: [{
    "status": "ok"
  }],
};

function readJson(dirname) {
  const data = {};
  const filenames = fs.readdirSync(dirname);

  filenames.forEach((filename) => {
    if (path.extname(filename) === '.json') {
      const key = path.basename(filename, '.json');
      const filepath = path.join(dirname, filename);
      data[key] = require(filepath);
    }
  });
  return data;
}

const db = {
  ...initialData,
  ...readJson(jsonDir),
};

fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
console.log('Successfully generated json-server/db.json');