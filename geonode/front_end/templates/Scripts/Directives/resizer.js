﻿angular.module("app.helpers").directive('resizable', [
    function () {
        return {
            restrict: 'A',
            link: function postLink(scope, elem, attrs) {
                elem.resizable();
            }
        };
    }
]);