angular.module("ideaBox")
	.controller("ideaDetailsCtrl", function($scope, $stateParams, $filter, ideaService){

		var ideaId = $stateParams.Id;
		if(ideaId !== undefined && ideaId !== null)
		{
			ideaService.getIdea(ideaId).success(function(data){
				$scope.data = {selectedIdea : data};
			})
			.error(function (err){
				//Show error message
			});
		}

	});