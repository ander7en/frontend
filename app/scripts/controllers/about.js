'use strict';

/**
 * @ngdoc function
 * @name frontendTaxiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the frontendTaxiApp
 */
angular.module('frontendTaxiApp')
  .controller('AboutCtrl', function (githubFactory) {
    var vm = this;



    var teamMembers = [
      'demonno',
      'gorant94',
      'Gtopuria',
      'ander7en'
    ];



    vm.teamData = [];
    for (var username in teamMembers) {
      githubFactory.getUser({
        user: teamMembers[username]
      }).then(function(_data){
        console.log(_data);
        var data = _data.data;
        vm.teamData.push({'name': data['name'], 'email': data['email'], 'username': data['login'], 'avatar_url': data['avatar_url']})
      }).catch(function (_data) {
        //on error
      });
    }

  });
