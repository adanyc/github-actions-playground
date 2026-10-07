const isDocker = require('is-docker')();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-mocha-reporter'),
      require('karma-junit-reporter')
    ],
    client: {
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    junitReporter: {
      outputDir: './coverage/ng-demo',
      outputFile: 'tests.xml',
      useBrowserName: false
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ng-demo'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcovonly' },
        { type: 'cobertura' }
      ],
      thresholds: {
        emitWarning: true,
        skipFilesWithNoCoverage: true,
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80
        },
        each: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
          overrides: {}
        }
      }
    },
    exclude: [
      './node_modules/'
    ],
    reporters: ['coverage', 'dots', 'mocha', 'kjhtml', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadless'],
    customLaunchers: {
      HeadlessChrome: {
        base: 'ChromeHeadless',
        flags: isDocker ? ['--no-sandbox'] : []
      }
    },
    concurrency: Infinity,
    singleRun: false,
    restartOnFileChange: true
  });
};
