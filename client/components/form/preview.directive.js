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
      scope.isNext = isSectionNext;
      scope.isPrevious = isSectionPrevious;
      scope.isFirst = isSectionFirst;
      scope.isLast = isSectionLast;
      scope.nextSection = nextSection;
      scope.previousSection = previousSection;
      scope.submit = submit;

      function submit() {
        console.log('do something');
      }

      function isSectionNext(index) {
        var currentSectionIndex = _currentSectionIndex();
        if (currentSectionIndex >= index) {
          return true;
        }
        return currentSectionIndex + 1 === index;
      }

      function isSectionPrevious(index) {
        var currentSectionIndex = _currentSectionIndex();
        if (currentSectionIndex > index) {
          return true;
        }
      }

      function isSectionActive(section) {
        return section === scope.activeSection;
      }

      function isSectionFirst() {
        return _currentSectionIndex() === 0;
      }

      function isSectionLast(fields) {
        if (!fields) { return false; }
        return (_currentSectionIndex() + 1)  === fields.length;
      }

      function selectSection(section, form, index) {
        if (form.$invalid || !isSectionNext(index)) {
          return false;
        }
        scope.activeSection = section;
      }

      function nextSection() {
        var currentSectionIndex = _currentSectionIndex();
        scope.activeSection = scope.form.fields[currentSectionIndex + 1];
      }

      function previousSection() {
        var currentSectionIndex = _currentSectionIndex();
        if (currentSectionIndex === 0) {
          return false;
        }
        scope.activeSection = scope.form.fields[currentSectionIndex - 1];
      }

      function _setDefaults(form) {
        scope.activeSection = scope.form.fields[0];
        scope.formData = {};
      } 

      function _currentSectionIndex() {
        return _.findIndex(scope.form.fields, scope.activeSection);
      }
    }
  }
})();