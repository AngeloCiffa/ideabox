(function () {
  angular.module('ideaBox')

  .controller('ideasCtrl', function ($scope, $state, $stateParams, ideaService) {


    // //TODO use the promise
    // $scope.data = {
    //    ideas: ideaService.getIdeas()
    // };

    $scope.getIdeas = function () {
      ideaService.getIdeas().success(function (data) {
        $scope.data = {
          ideas: data
        };
      });
    };

    $scope.saveIdea = function (ideaDetails) {
      var idea = angular.copy(ideaDetails);
      ideaService.createIdea(ideaDetails)
        .success(function (data) {
          $scope.data.ideas.push(data);
        })
        .error(function (error) {
          //do something for error
        });

      $state.go('list', {});
    };

    $scope.removeIdea = function (ideaId) {

      ideaService.removeIdea(ideaId)
        .success(function (data) {
          for (var i = 0; i < $scope.data.ideas.length; i++) {
            if ($scope.data.ideas[i]._id === data._id) {
              $scope.data.ideas.splice(i, 1);
              break;
            }
          }

          $state.go('list', {});
        })
        .error(function (error) {
          //do something for error
        });


    };

    $scope.getIdeaDetails = function (ideaDetails) {

      $state.go('list.ideaDetails', {
        Id: ideaDetails._id
      });

    };

    $scope.upVote = function (idea) {

      ideaService.upVote(idea._id)
        .success(function (data) {
          idea.votes.push(data._id);
        })
        .error(function (error) {
          //do something for error
        });
    };

    $scope.getIdeas();
  });

}());
