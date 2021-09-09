import del from "del";
import { series, src, dest, parallel } from "gulp";
import pug from "gulp-pug";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "dist",
  },
};

const clean = async () => await del(["dist"]);

const pugTask = () =>
  src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.dest));

const prepare = series(clean);

const assets = parallel(pugTask);

export const dev = series(prepare, assets);
