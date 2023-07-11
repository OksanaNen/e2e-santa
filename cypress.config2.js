const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;
const addCucumberPreprocessorPlugin = require("@badeball/cypress-cucumber-preprocessor").addCucumberPreprocessorPlugin;


module.exports = defineConfig({
  e2e: {
    projectId: 'as4p1t',
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: "https://santa-secret.ru/",
    testIsolation: false,
    specPattern: "**/*.feature",
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
        
        on("file:preprocessor", bundler);
        addCucumberPreprocessorPlugin(on, config);
        
        return config;
    },

  },
});
