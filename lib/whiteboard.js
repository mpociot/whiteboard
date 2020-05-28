"use strict";

const Hexo = require("hexo");
const hexo = new Hexo();

module.exports = {
    "generate": function () {
        return new Promise(function (resolve, reject) {
            hexo.init().then(function () {
                hexo.call("generate", {
                    force: true
                }).then(resolve, reject);
            });
        });
    }
};
