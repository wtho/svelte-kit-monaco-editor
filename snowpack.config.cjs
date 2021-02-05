// most of this is copied and modified from
// node_modules/@sveltejs/snowpack-config/snowpack.config.cjs
// @sveltejs/snowpack-config@1.0.0-next.2

// Consult https://www.snowpack.dev to learn about these options
module.exports = {
  packageOptions: {
    // always include Svelte in your project
    knownEntrypoints: [
			// is required by every svelte project
			"svelte",
			// required for monaco-editor
			// add the packages depending on your use case
      "monaco-editor",
      "monaco-editor/esm/vs/language/json/json.worker.js",
      "monaco-editor/esm/vs/language/css/css.worker.js",
      "monaco-editor/esm/vs/language/html/html.worker.js",
      "monaco-editor/esm/vs/language/typescript/ts.worker.js",
      "monaco-editor/esm/vs/editor/editor.worker.js",
		],
		// monaco-editor requires native module like 'process'
		// do not exclude them (or monaco-editor itself)
    external: [],
  },
  plugins: [
    [
      "@snowpack/plugin-svelte",
      {
        compilerOptions: {
          hydratable: true,
        },
      },
		],
		"@snowpack/plugin-typescript"
  ],
  devOptions: {
    open: "none",
    output: "stream",
  },
  buildOptions: {
    sourcemap: true,
  },
  mount: {
		".svelte/assets": `/${process.env.SVELTE_KIT_APP_DIR}/assets`,
		// monaco will try to load '/codicon.ttf', let's point at it in node_modules
    "node_modules/monaco-editor/min/vs/base/browser/ui/codicons/codicon/": {
      url: "/",
      static: true,
    },
		"src/components": "/_components",
  },
  alias: {
    $app: "./.svelte/assets/runtime/app",
    $components: "./src/components",
  },
};
