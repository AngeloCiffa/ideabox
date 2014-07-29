angular.module("ideaBox")

.controller("ideasCtrl", function ($scope, $location, ideaService) {

	
	// //TODO use the promise
	// $scope.data = {
	// 	ideas: ideaService.getIdeas()
	// };

	$scope.getIdeas = function (){
		ideaService.getIdeas().success(function (data){
			$scope.data = {ideas: data}
		});
	};

	$scope.saveIdea = function (ideaDetails){
		var idea = angular.copy(ideaDetails);
		
		// $http.post(orderUrl, idea)
		// 	.success(function (data) {
		// 		$scope.data.ideaId = data.id;
				
		// 	})
		// 	.error(function(error){
		// 		$scope.data.ideaError = error;
		// 	});
			ideaDetails.votes = 0;
			$scope.data.ideas.push(ideaDetails);
			$location.path("/ideas");
			
		};

	$scope.removeIdea = function (){
	
		if($scope.selectedIdea !== undefined && $scope.selectedIdea !== null)
		{
			$scope.data.ideas.remove($scope.selectedIdea);
			$location.path("/ideas");			
		}
	};

	$scope.getIdeaDetails = function(ideaDetails){

		$scope.data.selectedIdea = ideaService.getIdea(ideaDetails.id);

		$location.path("/ideaDetails");
	};

	$scope.upVote = function (idea){
			idea.votes++;			
		};

	$scope.getIdeas();
});