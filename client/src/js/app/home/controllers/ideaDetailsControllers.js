(function () {
  angular.module('ideaBox')
    .controller('ideaDetailsCtrl', function ($scope, $stateParams, $filter, ideaService) {

      var ideaId = $stateParams.Id;
      var refreshIdeaFunction = function () {
        ideaService.getIdea(ideaId).success(function (data) {
          $scope.data = {
            selectedIdea: data
          };
        })
          .error(function (err) {
            //Show error message
          });
      };

      if (ideaId !== undefined && ideaId !== null) {
        $scope.$watch(function () {
          return ideaService.status.lastVotedId;
        }, function (lastVotedId) {
          if ($scope.data.selectedIdea !== undefined && lastVotedId === $scope.data.selectedIdea._id) {
            refreshIdeaFunction();
            ideaService.status.lastVotedId = 0;
          }
        }, true);
        refreshIdeaFunction();
      }

    });
}());
