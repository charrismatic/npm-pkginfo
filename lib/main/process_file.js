import { encoding } from "../var/encoding";

const process_file = async (filename) => {
  const { fs } = require("fs");
  var fildata;
  if (!filename) { return false; }

  let base_dir = process.env.INIT_CWD || ".";
  var filepath = [base_dir, filename].join("/");

  await fs.readFile(filepath, ((err, data) => {
    if (err) {console.log("Error reading from file", err, data);
      return false;
    }
    fildata = Buffer.from(data).toString(encoding);
  }));
  return JSON.parse(fildata);
};

export { process_file };
