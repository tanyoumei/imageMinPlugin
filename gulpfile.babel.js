import gulp from 'gulp'
import {
  resolve
} from 'path'
import run from 'gulp-run-command'

const SOURCEFILE = resolve('.', 'index.js')
const OUTFILE = resolve('.', 'index.es5.js')

gulp.task('clean', run(`rimraf ${OUTFILE}`))
gulp.task('build', ['clean'], run(`babel ${SOURCEFILE} --out-file ${OUTFILE}`))