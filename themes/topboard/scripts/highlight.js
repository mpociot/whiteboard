"use strict";
const cheerio = require("cheerio");

function appendLanguageSelector($, firstElement, languages) {
    if (firstElement === null) return;
    if (languages.length === 0) return;

    let e = "<div class=\"before-code\" data-languages=\"" + languages.sort().join("|") + "\">";
    for (let i = 0, l = languages.length; i < l; ++i) {
        e += "<a class=\"language-button\" data-language-name=\"" + languages[i] + "\">";
        e += languages[i];
        e += "</a>";
    }
    e += "</div>";

    $(e).insertBefore(firstElement);
}

hexo.extend.filter.register("after_render:html", function(str) {
    let $ = cheerio.load(str, {
        decodeEntities: false
    });

    $("figure.highlight").each(function() {
        const code = $(this).find(".code > pre").html(),
              html = "<pre><code class=\"" + $(this).attr("class") + "\">" +
                     code + "</code></pre>";
        $(this).replaceWith(html);
    });

    if ($(".before-code").length > 0) {
        return $.html();
    }

    // Cheerios doesnt update himself very well with the fix above
    $ = cheerio.load($.html(), {
        decodeEntities: false
    });

    let supportedLanguages = [],
        first = null;
    $("pre > code").each(function() {
        const that = $(this);
        if (!that.hasClass("highlight")) {
            that.addClass("highlight");
        }

        const parent = that.parent(),
              next = parent.next();

        if (first == null) {
            first = parent;
        }

        const classes = that.prop("class").split(/\s+/);
        for (let i = 0, l = classes.length; i < l; ++i) {
            if (classes[i] != "highlight") {
                supportedLanguages.push(classes[i]);
            }
        }

        if (next.prop("tagName") != "PRE") {
            appendLanguageSelector($, first, supportedLanguages);
            first = null;
            supportedLanguages = [];
        }
    });

    return $.html();
});
