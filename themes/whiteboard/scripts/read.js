'use strict';

var fs = require('fs');
var pathFn = require('path');

hexo.extend.helper.register('read', function(path){
  var src = pathFn.join(hexo.source_dir, 'includes', pathFn.join(pathFn.dirname(path), '_' + pathFn.basename(path) + '.md'));
  if( fs.existsSync(src) ) {
    return fs.readFileSync(src, {
      encoding: 'utf-8'
    });
  }
  return '';
});
