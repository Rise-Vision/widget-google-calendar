/* jshint node: true */

(function () {
  "use strict";

  var bower = require("gulp-bower");
  var bump = require("gulp-bump");
  var concat = require("gulp-concat");
  var del = require("del");
  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var file = require("gulp-file");
  var jshint = require("gulp-jshint");
  var minifyCSS = require("gulp-minify-css");
  var path = require("path");
  var rename = require("gulp-rename");
  var runSequence = require("run-sequence");
  var factory = require("widget-tester").gulpTaskFactory;
  var sourcemaps = require("gulp-sourcemaps");
  var uglify = require("gulp-uglify");
  var usemin = require("gulp-usemin");

  var appJSFiles = [
      "src/**/*.js",
      "!./src/components/**/*"
    ],
    htmlFiles = [
      "./src/settings.html",
      "./src/widget.html"
    ];

  gulp.task("clean", function (cb) {
    del(["./dist/**"], cb);
  });

  gulp.task("config", function() {
    var env = process.env.NODE_ENV || "prod";
    gutil.log("Environment is", env);

    return gulp.src(["./src/config/" + env + ".js"])
      .pipe(rename("config.js"))
      .pipe(gulp.dest("./src/config"));
  });

  gulp.task("bump", function(){
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task("lint", function() {
    return gulp.src(appJSFiles)
      .pipe(jshint())
      .pipe(jshint.reporter("jshint-stylish"))
      .pipe(jshint.reporter("fail"));
  });

  gulp.task("version", function () {
    var pkg = require("./package.json"),
      str = '/* exported version */\n' +
        'var version = "' + pkg.version + '";';

    return file("version.js", str, {src: true})
      .pipe(gulp.dest("./src/config/"));
  });

  gulp.task("source", ["lint"], function () {
    return gulp.src(htmlFiles)
      .pipe(usemin({
        css: [sourcemaps.init(), minifyCSS(), sourcemaps.write()],
        js: [sourcemaps.init(), uglify(), sourcemaps.write()]
      }))
      .pipe(gulp.dest("dist/"));
  });

  gulp.task("unminify", function () {
    return gulp.src(htmlFiles)
      .pipe(usemin({
        css: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")],
        js: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")]
      }))
  });

  gulp.task("fonts", function() {
    return gulp.src("src/components/common-style/dist/fonts/**/*")
      .pipe(gulp.dest("dist/fonts"));
  });

  gulp.task("images", function() {
    return gulp.src("src/components/rv-bootstrap-formhelpers/img/bootstrap-formhelpers-googlefonts.png")
      .pipe(gulp.dest("dist/img"));
  });

  gulp.task("i18n", function(cb) {
    return gulp.src(["src/components/rv-common-i18n/dist/locales/**/*"])
      .pipe(gulp.dest("dist/locales"));
  });

  gulp.task("watch",function(){
    gulp.watch("./src/**/*", ["build"]);
  });

  gulp.task("webdriver_update", factory.webdriveUpdate());

  // Integration testing
  // Settings
  gulp.task("html:integration:settings", factory.htmlE2E({
    files: htmlFiles,
    e2eClient: "../test/calendar-api-mock.js",
    e2eMockData: "../test/data/main.js"
  }));

  gulp.task("integration:server:settings", ["config", "html:integration:settings"], factory.testServer());

  gulp.task("test:integration:settings:run", ["webdriver_update"], factory.testE2EAngular({
    testFiles: "test/integration/settings.js"}
  ));

  gulp.task("test:integration:settings", function(cb) {
    runSequence(["html:integration:settings", "integration:server:settings"], "test:integration:settings:run", "integration:server-close", cb);
  });

  // Widget
  gulp.task("html:integration:widget", factory.htmlE2E({
    files: htmlFiles,
    e2eMockData: "../test/data/main.js"
  }));

  gulp.task("integration:server:widget", ["config", "html:integration:widget"], factory.testServer());

  gulp.task("test:integration:widget:run", factory.testE2E({
    testFiles: "test/integration/widget-*.js"
  }));

  gulp.task("test:integration:widget", function(cb) {
    runSequence(["html:integration:widget", "integration:server:widget"], "test:integration:widget:run", "integration:server-close", cb);
  });

  gulp.task("integration:server-close", factory.testServerClose());

  gulp.task("test:integration", function(cb) {
    runSequence("test:integration:settings", /*"test:integration:widget", */cb);
  });

  // Unit testing
  gulp.task("test:unit:settings", factory.testUnitAngular({
    testFiles: [
      "src/components/jquery/dist/jquery.js",
      "src/components/q/q.js",
      "src/components/angular/angular.js",
      "src/components/angular-translate/angular-translate.js",
      "src/components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
      "src/components/angular-route/angular-route.js",
      "src/components/angular-mocks/angular-mocks.js",
      "node_modules/widget-tester/mocks/common-mock.js",
      "src/components/bootstrap-sass-official/assets/javascripts/bootstrap.js",
      "src/components/angular-bootstrap/ui-bootstrap-tpls.js",
      "src/components/component-storage-selector/dist/storage-selector.js",
      "src/components/widget-settings-ui-components/dist/js/**/*.js",
      "src/components/widget-settings-ui-core/dist/*.js",
      "src/components/widget-common/dist/config.js",
      "src/components/widget-common/dist/logger.js",
      "src/components/bootstrap-form-components/dist/js/**/*.js",
      "src/config/test.js",
      "src/settings/settings-app.js",
      "src/settings/**/*.js",
      "test/unit/settings/**/*spec.js"]
    }
  ));

  gulp.task("test:unit:widget", factory.testUnitAngular({
    testFiles: [
      "node_modules/babel-polyfill/dist/polyfill.js",
      "src/components/jquery/dist/jquery.js",
      "test/data/main.js",
      "src/components/auto-scroll/dist/jquery.auto-scroll.js",
      "src/components/moment/moment.js",
      "src/components/moment-range/lib/moment-range.js",
      "src/components/underscore/underscore.js",
      "node_modules/widget-tester/mocks/gadget-mocks.js",
      "src/config/test.js",
      "src/components/widget-common/dist/config.js",
      "src/components/widget-common/dist/logger.js",
      "src/components/widget-common/dist/common.js",
      "src/config/version.js",
      "src/widget/calendar.js",
      "src/widget/main.js",
      "src/widget/day.js",
      "src/widget/event.js",
      "src/widget/provider.js",
      "test/calendar-api-mock.js",
      "test/unit/widget/**/*spec.js"
    ]
  }));

  gulp.task("test:unit", function(cb) {
    runSequence("test:unit:settings", "test:unit:widget", cb);
  });

  gulp.task("test", function(cb) {
    runSequence("version", "test:integration", "test:unit", cb);
  });

  gulp.task("bower-update", function (cb) {
    return bower({ cmd: "update"}).on("error", function(err) {
      console.log(err);
      cb();
    });
  });

  gulp.task("build", function (cb) {
    runSequence(["clean", "config", "bower-update", "version"], ["source", "fonts", "images", "i18n"], ["unminify"], cb);
  });

  gulp.task("default", function(cb) {
    runSequence("test", "build", cb);
  });
})();
