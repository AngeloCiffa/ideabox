angular.module("ideaBox")
.constant("dataUrl", "http://localhost/package.json")
.controller("ideasCtrl", function ($scope, $http, $location, dataUrl) {

	
	$scope.data = {};

	$http.get(dataUrl)
		.success(function (data){
			
			$scope.data = {
							selectedIdea: {},
							ideas: [
							{ name: "Idea #1", description: "A product",
							category: "Category #1", author: "random author", votes: 0 },
							{ name: "Idea #2", description: "A product",
							category: "Category #1", author: "random author2", votes: 10 },
							{ name: "Idea #3", description: "A product",
							category: "Category #1", author: "random author", votes: 0 },
							{ name: "Idea #4", description: "A product",
							category: "Category #2", author: "random author2", votes: 0 },
							{ name: "Idea #5", description: "A product",
							category: "Category #2", author: "random author2", votes: 0 }
							]}
		})
		.error(function (error){
			
			$scope.data = {

							//error: error,
							selectedIdea: {},
							ideas: [							
							{ name: "Idea #1", description: "A product",
							category: "Category #1", author: "random author", votes: 0 },
							{ name: "Idea #2", description: "A product",
							category: "Category #1", author: "random author2", votes: 10 },
							{ name: "Idea #3", description: "A product",
							category: "Category #1", author: "random author", votes: 0 },
							{ name: "Idea #4", description: "A product",
							category: "Category #2", author: "random author2", votes: 0 },
							{ name: "Idea #5", description: "A product",
							category: "Category #2", author: "random author2", votes: 0 }
							]
						}
		});	

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
			
		}

		$scope.removeIdea = function (){
		
			if($scope.selectedIdea !== undefined && $scope.selectedIdea !== null)
			{
				$scope.data.ideas.remove($scope.selectedIdea);
				$location.path("/ideas");			
			}
		}

	$scope.getIdeaDetails = function(ideaDetails){

		var idea = angular.copy(ideaDetails);
		$scope.data.selectedIdea = idea;

		$location.path("/ideaDetails");
	}

	$scope.upVote = function (idea){
			idea.votes++;			
		}
	});