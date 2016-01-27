'use strict';

var cheerio;

hexo.extend.filter.register('after_post_render', function(data){
  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, {decodeEntities: false});

  $('figure.highlight').each(function(){
    var code = $(this).find('.code > pre').html();
    var html = '<pre><code class="'+$(this).attr('class')+'">' + code + '</code></pre>';
    $(this).replaceWith(html)
  });

  data.content = $.html();
});
