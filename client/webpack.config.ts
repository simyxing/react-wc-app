import { Configuration } from "webpack";

// refer https://stackoverflow.com/a/67199678
const config: Configuration = {
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};

export default config;
