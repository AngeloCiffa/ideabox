angular.module("ideaBox")
.constant("dataUrl", "http://localhost:5000/api/ideas")
.factory("ideaService", function ($http, dataUrl){

	var ideaData = {};
	var error = {};


	return {
				createIdea: function (newIdeaName, newIdeaCategory, newIdeaAuthor, newIdeaDescription) {
				//TODO replace the id by what the http service call will return to us						
					ideaData.push({id: 1, category: newIdeaCategory, author: newIdeaAuthor, name: newIdeaName});								
				},
				removeIdea: function (id){
					//TODO call the http service to remove the data 

						for (var i = 0; i < ideaData.length; i++) 
						{
							if(ideaData[i].id == id)
							{
								ideaData.splice(i, 1);
								break;
							}
						}
				},
				getIdeas: function(){					
					return $http.get(dataUrl)
						.success(function (data){
							ideaData = data;
						})
						.error(function(err){
							error = err;
						});
				},
				getIdea: function (ideaID){
					
					for (var i = 0; i < ideaData.length; i++) {
						if(ideaData[i].id === ideaID)
							return ideaData[i];
					};
				}
			};
});