(function () {
  angular.module('ideaBox')
    .constant('ideasListActiveClass', 'btn-primary')
    .constant('ideasListPageCount', 10)
    .controller('ideasListCtrl', function ($scope, $filter, ideasListActiveClass, ideasListPageCount) {

      var selectedCategory = null;

      $scope.selectedPage = 1;
      $scope.pageSize = ideasListPageCount;

      $scope.selectCategory = function (newCategory) {
        selectedCategory = newCategory;
        $scope.selectedPage = 1;
      };

      $scope.selectPage = function (newPage) {
        $scope.selectedPage = newPage;
      };

      $scope.categoryFilterFn = function (idea) {
        return selectedCategory === null || idea.category === selectedCategory;
      };

      $scope.getCategoryClass = function (category) {
        return selectedCategory === category ? ideasListActiveClass : '';
      };

      $scope.getPageClass = function (page) {
        return $scope.selectedPage === page ? ideasListActiveClass : '';
      };

    });
}());
