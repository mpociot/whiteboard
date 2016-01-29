'use strict';

var cheerio;

hexo.extend.filter.register('after_render:html', function(str, data){
  if (!cheerio) cheerio = require('cheerio');
  var $ = cheerio.load(str, {decodeEntities: false});

  $('figure.highlight').each(function(){
    var code = $(this).find('.code > pre').html();
    var html = '<pre><code class="'+$(this).attr('class')+'">' + code + '</code></pre>';
    $(this).replaceWith(html)
  });

  $('pre > code').each(function(){
    if( !$(this).hasClass('highlight') ){
      $(this).addClass('highlight');
    }
  });

  return $.html();
});
