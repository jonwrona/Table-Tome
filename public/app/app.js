angular.module('tabletome', ['reCAPTCHA', 'ngAnimate', 'app.routes', 'homeCtrl', 'spellCtrl', 'subscriberService', 'spellService'])
    .config(function(reCAPTCHAProvider) {
        reCAPTCHAProvider.setPublicKey('6Ld4_QQTAAAAAN2tqCIJl_PU_sm6r0VSjtwxYAR5');
    });
