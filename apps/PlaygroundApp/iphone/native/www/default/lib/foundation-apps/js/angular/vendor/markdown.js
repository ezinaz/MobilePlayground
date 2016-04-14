
/* JavaScript content from lib/foundation-apps/js/angular/vendor/markdown.js in folder common */
angular.module('markdown', [])
  .directive('markdown', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        element.html(marked(element.html()));
      }
    };

});
