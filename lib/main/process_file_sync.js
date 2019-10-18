import { encoding } from "../var/encoding";

const process_file_sync=(filepath)=>{
  const fs = require("fs");
  return fs.readFile(
    filepath,
    function read(err, data) {
      if (err) { console.log(data ,err); throw err; }
      return  Buffer.from(data, encoding).toString("ascii");
    }
  )
};

export { process_file_sync };
