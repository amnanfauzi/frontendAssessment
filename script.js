var app = angular.module('eventListingApp', []);

app.controller('eventListingController', function($scope, $http) {
  
    $scope.city = 'Rim';
    $scope.month = '11';
    $scope.favorites = [];
  
    $scope.getListings = function(){
      $http.get("eventListing.json")
        .then(function(response) {
          $scope.eventListings = response.data;
        });
    }

    $scope.bootstrapApp = function(){
      $scope.getListings();
      $scope.setSessionStorage();
    }

    $scope.setSessionStorage = function()
    {
      if(sessionStorage.getItem("favorites") == null)
      {
        sessionStorage.setItem("favorites", $scope.favorites);
      }
      else
      {
        $scope.favorites = sessionStorage.getItem("favorites").split(",");
      }     
    }
  
    $scope.editFavorites = function(eventId){
      let isFavorite = $scope.favorites.includes(eventId);
      if(!isFavorite)
      {
        $scope.favorites.push(eventId);
      }
      else
      {       
        $scope.favorites.splice($scope.favorites.indexOf(eventId), 1);
      } 
      sessionStorage.setItem("favorites", $scope.favorites); 
    }
    
    $scope.filterListing = function(event)
    {
      var month = Number(event.date.split('.')[1]);
      if($scope.filterFavorite)
      {
        return event.city == $scope.city && month == $scope.month && $scope.favorites.includes(event.id);
      }
      return event.city == $scope.city && month == $scope.month;
    }
});