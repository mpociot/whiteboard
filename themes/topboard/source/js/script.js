/*
Copyright 2016 Marcel Pociot
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
(function (global) {
  'use strict';

  var languages = [];

  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function activateLanguage(language) {
    if (!language) return;
    if (language === "") return;

    let t = languages.sort().join("|");

    $(".before-code[data-languages='" + t + "']").each(function() {
      var parent = $(this);
      var beforeCode = $(this);
      if (parent.attr("data-languages") !== t) {
        return;
      }
      var els = [];
      while (parent.next().prop("tagName") === "PRE") {
        els.push(parent.next());
        parent = parent.next();
      }

      tabLanguage(language, beforeCode, els);
    });

    if (global.toc && typeof global.toc.calculateHeights === "function") {
      global.toc.calculateHeights();
    }

    // scroll to the new location of the position
    if ($(window.location.hash).get(0)) {
      $(window.location.hash).get(0).scrollIntoView(true);
    }
  }

  function tabLanguage(language, parent, els) {
    parent.find(".language-button").removeClass("active");
    parent.find(".language-button[data-language-name='" + language + "']").addClass("active");

    for (var i = 0, l = els.length; i < l; ++i) {
      if (els[i].find("code").hasClass(language)) {
        els[i].show();
      } else {
        els[i].hide();
      }
    }
  }

  // parseURL and stringifyURL are from https://github.com/sindresorhus/query-string
  // MIT licensed
  // https://github.com/sindresorhus/query-string/blob/7bee64c16f2da1a326579e96977b9227bf6da9e6/license
  function parseURL(str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];

      key = decodeURIComponent(key);
      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };

  function stringifyURL(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
      var val = obj[key];

      if (Array.isArray(val)) {
        return val.sort().map(function (val2) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
        }).join('&');
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  };

  // gets the language set in the query string
  function getLanguageFromQueryString() {
    if (location.search.length >= 1) {
      var language = parseURL(location.search).language
      if (language) {
        return language;
      } else if (jQuery.inArray(location.search.substr(1), languages) != -1) {
        return location.search.substr(1);
      }
    }

    return false;
  }

  // returns a new query string with the new language in it
  function generateNewQueryString(language) {
    var url = parseURL(location.search);
    if (url.language) {
      url.language = language;
      return stringifyURL(url);
    }
    return language;
  }

  // if a button is clicked, add the state to the history
  function pushURL(language) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + generateNewQueryString(language) + '#' + hash);

    // save language as next default
    localStorage.setItem("language", language);
  }

  function setupLanguages(l) {
    var defaultLanguage = localStorage.getItem("language");

    languages = l;

    // Activating other languages that are not part of the
    // main language list
    $(".before-code").each(function() {
      var parent = $(this);
      if (parent.attr("data-languages") === l.sort().join("|")) {
        return;
      }

      var language = parent.find(".language-button").first().attr("data-language-name");
      var beforeCode = $(this);
      var els = [];
      while (parent.next().prop("tagName") === "PRE") {
        els.push(parent.next());
        parent = parent.next();
      }

      tabLanguage(language, beforeCode, els);
    });

    var presetLanguage = getLanguageFromQueryString();
    if (presetLanguage) {
      // the language is in the URL, so use that language!
      activateLanguage(presetLanguage);

      localStorage.setItem("language", presetLanguage);
    } else if ((defaultLanguage !== null) && (jQuery.inArray(defaultLanguage, languages) != -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      activateLanguage(defaultLanguage);
    } else {
      // no language selected, so use the default
      activateLanguage(languages[0]);
    }
  }

  // if we click on a language tab, activate that language
  $(function() {
    $(".before-code .language-button").on("click", function() {
      var that = $(this);
      if (that.hasClass("active")) {
        return;
      }

      var beforeCode = that.closest(".before-code");
      var parent = that.closest(".before-code");
      var parentLanguages = parent.attr("data-languages");
      var language = $(this).data("language-name");

      if (parentLanguages === languages.sort().join("|")) {
        pushURL(language);
        activateLanguage(language);
      } else {
        var els = [];
        while (parent.next().prop("tagName") === "PRE") {
          els.push(parent.next());
          parent = parent.next();
        }
        tabLanguage(language, beforeCode, els);
      }
      return false;
    });
    window.onpopstate = function() {
      activateLanguage(getLanguageFromQueryString());
    };
  });
})(window);


/**
 * TOC
 */
(function (global) {
  'use strict';
  var querySelector = "h1, h2 , h3 , h4 , h5 , h6 ";

  var makeToc = function() {
    global.toc = $("#toc").tocify({
      selectors: querySelector,
      extendPage: false,
      theme: 'none',
      smoothScroll: false,
      showEffectSpeed: 0,
      hideEffectSpeed: 180,
      ignoreSelector: '.toc-ignore',
      highlightOffset: 60,
      scrollTo: -1,
      scrollHistory: true,
      hashGenerator: function (text, element) {
        return element.prop('id');
      }
    }).data('toc-tocify');
  };

  var makeMobileToc = function() {
    var els = $(querySelector);
    var root = $("#toc-mobile");

    els.each(function() {
      var el = $(this),
          spaceCount = 0;
      try {
        spaceCount = Math.abs((parseInt(el.prop("tagName").substr(1), 10) - 1) * 4);
      } catch(e) { }
      if (spaceCount > 0) {
        root.append("<option value=\"" + el.attr("id") + "\">" + Array(spaceCount).join("&nbsp;") + el.text() + "</option>");
      } else {
        root.append("<option value=\"" + el.attr("id") + "\">" + el.text() + "</option>");
      }
    });

    root.select2({
      minimumResultsForSearch: -1,
      dropdownAutoWidth: true,
      width: "auto",
      templateSelection: function(e) {
        try {
          return e.text.trim();
        } catch (e) {
          return null;
        }
      }
    });

    // We update but we don't trigger the change
    // as it's for only when selecting...
    var previousHash;
    setInterval(function() {
      if (previousHash != window.location.hash) {
        var hash = window.location.hash.substring(1);
        // Sometimes the things get bad and select an non-toc id...
        try {
          if ($("#" + hash).length > 0) {
            $("#toc-mobile").val(hash).trigger("change");
            previousHash = window.location.hash;
          }
        } catch (e) { }
      }
    }, 150);

    // On change update, scrolling to the right position
    root.on("select2:select", function(e) {
      var data = e.params.data;
      $("html, body").animate({
        "scrollTop": ($("#" + data.id).offset().top - 50) + "px"
      }, {
        "duration": 0
      });
    });

    // Search
    $(".open-search-mobile").on("click", function() {
      $("#mobile-search-wrapper").show();
      $("#mobile-search-wrapper .mobile-search").focus();
    });
    $(".close-search-mobile").on("click", function() {
      $("#mobile-search-wrapper").hide();
    });
  };

  // Hack to make already open sections to start opened,
  // instead of displaying an ugly animation
  function animate() {
    setTimeout(function() {
      try {
        global.toc.setOption('showEffectSpeed', 180);
      } catch (e) { }
    }, 50);
  }

  $(function() {
    try {
      makeToc();
    } catch (e) { }
    try {
      makeMobileToc();
    } catch (e) { }
    try {
      animate();
    } catch (e) { }
    $('.content').imagesLoaded(function() {
      if (global.toc && typeof global.toc.calculateHeights === "function") {
        global.toc.calculateHeights();
      }
    });
  });
})(window);

/**
 * Search
 */
(function () {
  'use strict';

  var content, searchResults;
  var highlightOpts = { element: 'span', className: 'search-highlight' };

  var index = new lunr.Index();

  index.ref('id');
  index.field('title', { boost: 10 });
  index.field('body');
  index.pipeline.add(lunr.trimmer, lunr.stopWordFilter);

  $(populate);
  $(bind);

  function populate() {
    $('h1, h2 , h3 , h4 , h5 , h6 ').each(function() {
      var title = $(this);
      var body = title.nextUntil('h1, h2 , h3 , h4 , h5 , h6');
      index.add({
        id: title.prop('id'),
        title: title.text(),
        body: body.text()
      });
    });
  }

  function bind() {
    content = $('.content');
    searchResults = $('.search-results');   

    $('.input-search').on('keyup', search);
    $("#mobile-search-wrapper .mobile-search").on("keyup", searchMobile);
  }

  function searchMobile(event) {
    unhighlight();
    // ESC clears the field
    if (event.keyCode === 27) {
      this.value = '';
      $(".close-search-mobile").trigger("click");
      unhighlight();
      return;
    }
    // Enter close but keep the search
    if (event.keyCode === 13) {
      $(".close-search-mobile").trigger("click");
    }
    if (this.value) {
      var results = index.search(this.value).filter(function(r) {
        return r.score > 0.0001;
      });

      if (results.length) {
        highlight.call(this);
      }
    } else {
      unhighlight();
    }
  }

  function search(event) {
    unhighlight();
    searchResults.addClass('visible');

    // ESC clears the field
    if (event.keyCode === 27) this.value = '';

    if (this.value) {
      var results = index.search(this.value).filter(function(r) {
        return r.score > 0.0001;
      });

      if (results.length) {
        searchResults.empty();
        $.each(results, function (index, result) {
          var elem = document.getElementById(result.ref);
          searchResults.append("<li><a href='#" + result.ref + "'>" + $(elem).text() + "</a></li>");
        });
        highlight.call(this);
      } else {
        searchResults.html('<li></li>');
        $('.search-results li').text('No Results Found for "' + this.value + '"');
      }
    } else {
      unhighlight();
      searchResults.removeClass('visible');
    }
  }

  function highlight() {
    if (this.value) content.highlight(this.value, highlightOpts);
  }

  function unhighlight() {
    content.unhighlight(highlightOpts);
  }
})();
