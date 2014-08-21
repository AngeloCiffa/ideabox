angular.module("ideaBox")
.constant("dataUrl", "/api/ideas")
.constant("ideaUrl", "/api/idea/")
.factory("ideaService", function ($http, dataUrl, ideaUrl){

	var ideaData = {};
	var error = {};
 	var status = { lastVotedId: 0 };

	return {
				status: status,
				createIdea: function (newIdea) {
					return $http.post("/api/idea", newIdea)
							.success(function (data) {
								return data;
								
							})
							.error(function(error){
								return error;
							});						
				},
				removeIdea: function (ideaId){
					return $http.delete(ideaUrl + ideaId)
						.success(function (data){
							return data;
						})
						.error(function(err){
							error = err;
						});	
				},
				getIdeas: function(){					
					return $http.get(dataUrl)
						.success(function (data){
							return data;
						})
						.error(function(err){
							error = err;
						});
				},
				getIdea: function (ideaId){

					return $http.get(ideaUrl + ideaId)
					.success(function(data){
						return data;
					})
					.error(function(err){
						error = err;
					});
				},
				upVote: function (ideaId){

					return $http.post("api/vote/" + ideaId)
					.success(function(data){
						status.lastVotedId = ideaId;
						return data;
					})
					.error(function(err){
						error = err;
					});
				}
			};
});
