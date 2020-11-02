const fs = require("fs");

const initialData = {
  ping: ["ok"]
};

function readJson(dirname) {
  const filenames = fs.readdirSync(dirname);
  let data = [];

  filenames.forEach(function(filename) {
    data[filename.split(".")[0]] = require(dirname + filename);
  });
  return data;
}

module.exports = () => {
  return {
    ...initialData,
    ...readJson("./json/")
  };
};
