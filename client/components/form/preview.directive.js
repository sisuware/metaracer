(function(){
  'use strict';

  angular
    .module('metaracerApp')
    .directive('formPreview', formPreview);

  function formPreview() {
    var directive = { 
      templateUrl: 'components/form/preview.html',
      link: formPreviewLink 
    };

    return directive;

    function formPreviewLink(scope, element, attrs) {
      scope.form.$promise.then(_setDefaults);

      scope.isActive = isSectionActive;
      scope.selectSection = selectSection;

      function isSectionActive(section) {
        return section === scope.activeSection;
      }

      function selectSection(section) {
        console.log(section);
        scope.activeSection = section;
      }

      function _setDefaults(form) {
        scope.activeSection = form.fields[0];
      } 
    }
  }
})();