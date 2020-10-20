'use strict';


var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin');

    gulp.task('sass', function () {
        return gulp.src('./css/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('./css'));
      });
      
      gulp.task('sass:watch', function () {
        gulp.watch('./css/*.scss', ['sass']);
      });
      
      gulp.task('browser-sync', function () {
         var files = [
            './*.html',
            './css/*.css',
            './images/*.{png,jpg,gif}',
            './js/*.js'
         ];
      
         browserSync.init(files, {
            server: {
               baseDir: "./"
            }
         });
      
      });
      
      // Default task
      gulp.task('default', ['browser-sync'], function() {
          gulp.start('sass:watch');
      });

      // Clean
       gulp.task('clean', function() {
            return del(['dist']);
        });

        gulp.task('copyfonts', function() {
        gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
        .pipe(gulp.dest('./dist/fonts'));
        });
        

        // Images
        gulp.task('imagemin', function() {
            return gulp.src('images/*.{png,jpg,gif}')
            .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
            .pipe(gulp.dest('dist/images'));
        });

        gulp.task('usemin', function() {
            return gulp.src('./*.html')
                  .pipe(usemin({
                      css: [ rev() ],
                      html: [htmlmin({ collapseWhitespace: true })],
                      js: [ uglify(), rev() ],
                      inlinejs: [ uglify() ],
                      inlinecss: [ cleanCss(), 'concat' ]
                  }))
              
              .pipe(gulp.dest('dist/'));
          });
          
          gulp.task('build',['clean'], function() {
              gulp.start('copyfonts','imagemin','usemin');
          });