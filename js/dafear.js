var musicVenuesUrl = "https://api.foursquare.com/v2/venues/search?client_id=RJOUU0EF0YKAJSRBHPBH4W1ONGHH35QXWIARJSJ515GLLSSM&client_secret=KSTQPMQPSUBBFZA2EJ0WYHTMR2VU4OVMIEJAI1WQHNLCU2ZF&ll=43.2994, 74.2179&near=New York, Ny&query=music&limit=100&radius=200000&categoryid=4bf58dd8d48988d1e5931735,4d4b7104d754a06370d81259,4bf58dd8d48988d1e9931735,4bf58dd8d48988d1e8931735,4bf58dd8d48988d1e7931735,4d4b7104d754a06370d81259,5267e4d9e4b0ec79466e48d1,52e81612bcbc57f1066b79ef,4bf58dd8d48988d1f2931735,4bf58dd8d48988d18e941735,4bf58dd8d48988d137941735,5032792091d4c4b30a586d5c,507c8c4091d498d9fc8c67a9,4bf58dd8d48988d136941735,4d4b7105d754a06376d81259,4bf58dd8d48988d11f941735&v=20170323&m=swarm"
                 
                  
                 
  function getDataFromApi(searchTerm, callback) {
  var query = {
    query: searchTerm,
    r: 'json',
    
  }
  $.getJSON(musicVenuesUrl, query, callback);
}


function filterVenues(musicVenues) {
  var places = []
  var categories = []
  var contegrityID = ["4d4b7104d754a06370d81259","4bf58dd8d48988d1e5931735","4bf58dd8d48988d1e7931735","4bf58dd8d48988d1e8931735","4bf58dd8d48988d1e9931735","5267e4d9e4b0ec79466e48d1","4bf58dd8d48988d18e941735","4bf58dd8d48988d1f2931735","4bf58dd8d48988d137941735","5032792091d4c4b30a586d5c","507c8c4091d498d9fc8c67a9","4bf58dd8d48988d136941735","4bf58dd8d48988d135941735","4bf58dd8d48988d11f941735",]
 var music = musicVenues.response.venues.filter(function(venueItem) {

venueItem.categories.forEach(function(category) {
if (contegrityID.includes(category.id)) {
console.log(venueItem)
places.push(venueItem)
 } 
})
})
console.log(places)
displayMusicSearchData(places)
 
}

function displayMusicSearchData(musicVenues) {
  var resultElement = '';
  console.log(musicVenues)
  $('.js-search-results').empty()
  if (musicVenues.length >= 1) { 
    musicVenues.forEach(function(item) {
    console.log("my link is", item.url); 
   var link;
      if (item.url) {
      link = '<a target="_blank" href="' + item.url +'">'+ item.name +'</a>'; 
      } 
    if(item.name) {
      resultElement += '<p>' + item.name + '</p>';
    }
     if(item.location.address) {
       resultElement += '<p>' + item.location.address + '</p>';
     }
     if(item.location.city) {
      resultElement += '<p>' + item.location.city + '</p>';
     }
      
       if (item.url) {
      resultElement += '<p>' + link + '</p>';
      }
    });
    
    
  }
  else {
    resultElement += "<p>No results</p>";
    
  }
  
 $('.js-search-results').html(resultElement);
};

function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query,filterVenues);
  });
}

$(function(){watchSubmit();});
