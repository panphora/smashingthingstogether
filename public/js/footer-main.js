var disqus_shortname = 'smashingthings';

if (disqus_shortname && disqus_shortname !== 'example') {
  (function () {
      var s = document.createElement('script'); s.async = true;
      s.type = 'text/javascript';
      s.src = '//' + disqus_shortname + '.disqus.com/count.js';
      (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
  }());
}


// PrismJS handler
// =================
Prism.languages.html = Prism.languages.markup;

var _prismHandler = function() {
  $('code').not('[class*="language-"]').addClass(function() {
    var _lang = $(this).attr('class')  || 'markup';

    _lang = _lang.replace(/(language|lang)+\-/gi, '');
    return 'language-' + (Prism.languages.hasOwnProperty(_lang) ? _lang : 'markup');
  });

  Prism.highlightAll();
};

_prismHandler();