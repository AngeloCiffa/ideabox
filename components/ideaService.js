angular.module("ideaBox")
.constant("dataUrl", "http://localhost/package.json")
.factory("ideaService", function ($http, dataUrl){
	var ideaData =  [
						{ id: 1, name: "Idea #1", description: "A product",
						category: "Category #1", author: "random author", votes: 0 },
						{ id: 2, name: "Idea #2", description: "A product",
						category: "Category #1", author: "random author2", votes: 10 },
						{ id: 3,name: "Idea #3", description: "A product",
						category: "Category #1", author: "random author", votes: 0 },
						{ id: 4,name: "Idea #4", description: "A product",
						category: "Category #2", author: "random author2", votes: 0 },
						{ id: 5,name: "Idea #5", description: "A product",
						category: "Category #2", author: "random author2", votes: 0 }
					];

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
					//TODO do the actual call to the http service
					return ideaData;
				},
				getIdea: function (ideaID){
					
					for (var i = 0; i < ideaData.length; i++) {
						if(ideaData[i].id === ideaID)
							return ideaData[i];
					};
				}
			}
});