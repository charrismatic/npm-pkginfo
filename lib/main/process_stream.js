import { encoding } from "../var/encoding";
import { debug } from "../util/debug";
import { debugTime } from "../util/debugTime";
import { render } from "../render";
import { parse_args } from "../main/parse_args";
import { parse_options } from "../main/parse_options";

const process_stream = (data) => {
  const content = Buffer.from(data).toString(encoding);
  var options = parse_options();
  var args = process.argv;
  args.shift();
  if (args[0] === __filename) {
    args.shift();
  }

  var runtime_options = parse_arguments(args);
  options = Object.assign({}, options, runtime_options);

  try {
    var data = JSON.parse(content.trim());
  } catch (e) {
    console.log("Error processing input data", e);
  } finally {
    main(data, options);
  }
};

export { process_stream };
