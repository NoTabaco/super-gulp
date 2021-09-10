import browserify from "browserify";
import del from "del";
import { series, src, dest, parallel, watch } from "gulp";
import autoprefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import image from "gulp-image";
import pug from "gulp-pug";
import uglify from "gulp-uglify";
// @ts-ignore
import ws from "gulp-webserver";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import tsify from "tsify";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";

const sass = gulpSass(dartSass);

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "dist",
    watch: "src/**/*.pug",
  },
  img: {
    src: "src/img/*",
    dest: "dist/img",
  },
  scss: {
    src: "src/scss/style.scss",
    dest: "dist/css",
    watch: "src/scss/**/*.scss",
  },
  ts: {
    src: "src/ts/main.ts",
    dest: "dist/js",
    watch: "src/ts/**/*.ts",
  },
};

const clean = async () => await del(["dist"]);

const imgTask = () =>
  src(routes.img.src).pipe(image()).pipe(dest(routes.img.dest));

const prepare = series(clean, imgTask);

const pugTask = () =>
  src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.dest));

const styles = () =>
  src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(miniCSS())
    .pipe(dest(routes.scss.dest));

const ts = () =>
  browserify({ basedir: ".", entries: [routes.ts.src] })
    .plugin(tsify)
    .transform("babelify", { extensions: [".ts"] })
    .bundle()
    .pipe(source("main.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(dest(routes.ts.dest));

const assets = series(pugTask, styles, ts);

const webserver = () => src("dist").pipe(ws({ livereload: true, open: true }));

const watchTask = () => {
  watch([routes.pug.watch], pugTask);
  watch([routes.img.src], imgTask);
  watch([routes.scss.watch], styles);
  watch([routes.ts.watch], ts);
};

const postDev = parallel(webserver, watchTask);

export const dev = series(prepare, assets, postDev);
