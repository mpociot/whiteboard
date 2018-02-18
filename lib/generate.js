'use strict';
let Whiteboard = require('./whiteboard');
let mv = require('mv');
let fs = require('fs');
let path = require('path');
let rmdir = require('rimraf');
let Promise = require("bluebird");

Whiteboard.generate()
  .then(() => moveAllItemsInPublicDirectory())
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

function moveAllItemsInPublicDirectory() {
  let source = path.join(__dirname, '../public');
  let sources = fs.readdirSync(source);
  return handleNext(sources);
}

function handleNext(list) {
  return new Promise((ok, fail) => {
    if (list.length === 0) {
      return ok();
    }
    let item = list.shift();
    move(item)
      .then(() => handleNext(list))
      .catch(fail);
  });
}

function removeRecursively(dest) {
  return new Promise((ok, fail) => {
    console.log(`Deleting destination ${dest}...`);
    rmdir(dest, (err) => {
      if (err) {
        return fail(err);
      }
      ok()
    });
  });
}

function move(itemName) {
  let dest = path.join(__dirname, '..', itemName);
  let source = path.join(__dirname, '../public', itemName);
  return removeRecursively(dest)
    .then(() => {
      return new Promise((ok, fail) => {
        console.log(`Moving ${source} to destination...`);
        mv(source, dest, { mkdirp: true, clobber: true }, (err) => {
          if (err) {
            return fail(err);
          }
          ok();
        });
      });
    });
}
