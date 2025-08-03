import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index.ts"],
  outDir: "./dist",
  declaration: true, // 打包到处ts类型代码
  rollup: {
    emitCJS: true, //输出commonjs类型代码
  },
  externals: ["react", "react-dom", "antd", "@ant-design/icons"],
});
