'use strict';

var Hexo = require('hexo');
var hexo = new Hexo();

module.exports = {

    'generate': function () {
        return new Promise(function (resolve, reject) {
            hexo.init().then(function () {
                hexo.call('generate', {force: true}).then(resolve, reject);
            });
        });
    }

};
