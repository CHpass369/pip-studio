const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const gulp = require('gulp');
const terser = require('gulp-terser');
const obfuscator = require('gulp-javascript-obfuscator');

const root = __dirname;
const dist = path.join(root, 'dist');

const obfuscator_options = {
  compact: true,
  target: 'node',
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  identifierNamesGenerator: 'hexadecimal',
  selfDefending: true,
  stringArray: true,
  stringArrayEncoding: ['rc4'],
  stringArrayThreshold: 0.75,
  splitStrings: true,
  splitStringsChunkLength: 10,
  // debugProtection stays off: it would fight a legitimate `node --inspect`
  // attached to production for incident debugging.
  debugProtection: false,
  // disableConsoleOutput stays off: log4js relies on console.* appenders.
  disableConsoleOutput: false,
  // renameGlobals MUST stay false: apps-generic keys request objects and
  // Mongo collection fallbacks off the literal class name (`Model.name`,
  // see node_modules/apps-generic/src/generic.service.ts and generic.ts).
  // Renaming exported class/function declarations would silently break
  // routing and model lookups.
  renameGlobals: false,
};

function clean(done) {
  fs.rmSync(dist, { recursive: true, force: true });
  done();
}

function compile(done) {
  const tsc = require.resolve('typescript/bin/tsc');
  execFileSync(process.execPath, [tsc, '-p', 'tsconfig.build.json'], {
    stdio: 'inherit',
    cwd: root,
  });
  done();
}

function minify_and_obfuscate() {
  return gulp.src(`${dist}/**/*.js`, { base: dist })
    .pipe(terser())
    .pipe(obfuscator(obfuscator_options))
    .pipe(gulp.dest(dist));
}

exports.build = gulp.series(clean, compile, minify_and_obfuscate);
exports.default = exports.build;
