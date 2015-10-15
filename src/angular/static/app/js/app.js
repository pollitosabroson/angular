'use strict';

var demo = angular.module('demo', [
    'ngResource', 'ui.router', 'ngCookies', 'vo.api', 'vo.content', 'ui.bootstrap', 'ngStorage', 'base64', 'ngAnimate'
]);


demo.config([
    '$apiProvider', '$contentProvider', '$locationProvider', '$httpProvider' , '$sceDelegateProvider', '$resourceProvider',
    function($apiProvider, $contentProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $resourceProvider) {
        /* Configure api endpoint */
        $apiProvider.apiEndpoint = '/api';
        $apiProvider.apiUsesTrailingSlash = true;

        /* Configure content base url */
        $contentProvider.urlPrefix = '/assets/app/partials/';

        /* Enable HTML5 mode */
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');        
        
        // Token interceptor for django requests.
        $httpProvider.interceptors.push('TokenInterceptor');

        // CSRF interceptor for django requests.
        $httpProvider.interceptors.push('CSRFInterceptor');

        $resourceProvider.defaults.stripTrailingSlashes = false;


    }
]);


demo.run([
    '$rootScope', '$content',
    function($rootScope, $content) {
        // Check route permissions and start the progress bar if required.
        $rootScope.$content = $content;

    }
]);