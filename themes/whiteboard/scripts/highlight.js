"use strict";
const cheerio = require("cheerio");

hexo.extend.filter.register("after_render:html", function(str) {
    const $ = cheerio.load(str, {
        decodeEntities: false
    });

    $("figure.highlight").each(function() {
        const code = $(this).find(".code > pre").html(),
              html = "<pre><code class=\"" + $(this).attr("class") + "\">" +
                     code + "</code></pre>";
        $(this).replaceWith(html);
    });

    $("pre > code").each(function() {
        if (!$(this).hasClass("highlight")) {
            $(this).addClass("highlight");
        }
    });

    return $.html();
});
