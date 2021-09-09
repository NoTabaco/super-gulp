import del from "del";
import { series, src, dest, parallel, watch } from "gulp";
import pug from "gulp-pug";
// @ts-ignore
import ws from "gulp-webserver";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "dist",
    watch: "src/**/*.pug",
  },
};

const clean = async () => await del(["dist"]);

const prepare = series(clean);

const pugTask = () =>
  src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.dest));

const assets = parallel(pugTask);

const webserver = () => src("dist").pipe(ws({ livereload: true, open: true }));

const watchTask = () => {
  watch([routes.pug.watch], pugTask);
};

const postDev = parallel(webserver, watchTask);

export const dev = series(prepare, assets, postDev);
