var map;

var south = {lat: 42.352271, lng:-71.05524200000001};
var andrew = {lat: 42.330154, lng: -71.057655};
var porter_square  = {lat: 42.3884, lng: -71.11914899999999};
var harvard_square = {lat: 42.373362, lng: -71.118956};
var jfk_umass = {lat: 42.320685, lng: -71.052391};
var savin_hill = {lat: 42.31129, lng: -71.053331};

var park_street = {lat: 42.35639457, lng: -71.0624242};
var broadway  = {lat: 42.342622, lng: -71.056967};
var north_quincy = {lat: 42.275275, lng: -71.029583};
var shawmut = {lat: 42.29312583, lng: -71.06573796000001};
var davis = {lat: 42.39674, lng: -71.121815};
var alewife = {lat: 42.395428, lng: -71.142483};
var  kendall_mit = {lat: 42.36249079, lng: -71.08617653};
var  charles_mgh = {lat: 42.361166, lng: -71.070628};
var downtown_crossing = {lat: 42.355518, lng: -71.060225};
var quincy_center = {lat:  42.251809, lng: -71.005409 };
var quincy_adams = {lat: 42.233391, lng: -71.007153};
var ashmont = {lat: 42.284652, lng: -71.06448899999999};
var wollaston = {lat: 42.2665139, lng: -71.0203369};
var fields_corner = {lat: 42.300093, lng: -71.061667};
var central_square = {lat: 42.365486, lng: -71.103802};
var braintree = {lat: 42.2078543, lng: -71.0011385};

var stations = [
{position: alewife, stop_name: "Alewife", stop_id: "place-alcfcl", marker: null},
{position: davis, stop_name: "Davis", stop_id: "place-davis", marker: null},
{position: porter_square, stop_name: "Porter Square", stop_id: "place-pptr", marker: null}, 
{position: harvard_square, stop_name: "Harvard Square", stop_id: "place-hrsq", marker: null}, 
{position: central_square, stop_name: "Central Square", stop_id: "place-cntsq", marker: null},
{position: kendall_mit, stop_name: "Kenall/MIT", stop_id: "place-knncl", marker: null},
{position: charles_mgh, stop_name: "Charles/MGH", stop_id: "place-chnml", marker: null},
{position: park_street, stop_name: "Park Street", stop_id: "place-pktrm", marker: null},
{position: downtown_crossing, stop_name: "Downtown Crossing", stop_id: "place-dwnxg", marker: null},
{position: south, stop_name: "South Station", stop_id: "place-sstat", marker: null},
{position: broadway, stop_name: "Broadway", stop_id: "place-brdwy", marker: null},
 {position: andrew, stop_name: "Andrew", stop_id: "place-andrw", marker: null}, 
 {position: jfk_umass, stop_name: "JFK/UMASS", stop_id: "place-jfk", marker: null},
 {position: savin_hill, stop_name: "Savin Hill", stop_id: "place-shmnl", marker: null},
 {position: fields_corner, stop_name: "Fields Corner", stop_id: "place-fldcr", marker: null},
{position: shawmut, stop_name: "Shawmut", stop_id: "place-smmnl", marker: null},
{position: ashmont, stop_name: "Ashmont", stop_id: "place-asmnl", marker: null},
 {position: north_quincy, stop_name: "North Quincy", stop_id: "place-nqncy"},
{position: wollaston, stop_name: "Wollaston", stop_id: "place-wlsta"},
 {position: quincy_center, stop_name: "Quincy Center", stop_id: "place-qnctr"},
{position: quincy_adams, stop_name: "Quincy Adams", stop_id: "place-qamnl"},
{position: braintree, stop_name: "Braintree", stop_id: "place-brntn"}
];
var icon = "subway.png";
var infoWindow;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
         center: south,
          zoom: 12
        });
    make_polyline();
    make_markers();
    user_loc();
    display_schedule()


    // console.log("past geolocation");






}

function make_polyline() {
      var pos_list1 = [];
      var pos_list2 = [jfk_umass, north_quincy, wollaston, quincy_center, 
      					quincy_adams, braintree];
      
      for (i = 0; i < stations.length - 5; i++) {
      	pos_list1[i] = stations[i].position;
    	}

      var line1 = new google.maps.Polyline({
      	path: pos_list1, 
      	map: map,
        strokeColor: "red",
      	strokeWeight: 6,
      	storkeOpacity: 1.0});

     var line2 = new google.maps.Polyline({
      	path: pos_list2, 
      	map: map, 
      	strokeColor: "red",
      	strokeWeight: 6,
      	storkeOpacity: 1.0});
}


function make_markers() {
	    for (i = 0; i < stations.length; i++ ) {
          	var marker = new google.maps.Marker({
            position: stations[i].position,
            map: map,
            icon: icon
            // label: stations[i].stop_name
          });
          // console.log(marker);
          stations[i].marker = marker;

      }
}

function get_schedule(station) {
	var request;
    request = new XMLHttpRequest();
    request.open("GET", "https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=" 
    	+ station.stop_id + "&page[limit]=10&page[offset]=0&sort=departure_time&api_key=c5df0bac5455448db1582cc8721e993b", true);
    var returnHTML;
    request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			// Step 5: when we get all the JSON data back, parse it and use it
			theData = request.responseText;
			stop_info = JSON.parse(theData);
			console.log("parsed");
			// console.log(stop_info);

			returnHTML = '<h4>' + station.stop_name + '</h4>';
			console.log(station.stop_name);


			console.log(stop_info["data"]["attributes"]);

			// stop_info.forEach(function(attribute) {
			// 	console.log(attribute);
  	// 		});

			// for (i = 0; i < messages.length; i++) {
			// 	returnHTML += "<li>" + messages[i].content + " by " + messages[i].username + 
			// 	"</li>";
			// }
			// returnHTML += "</p>";
			// document.getElementById("messages").innerHTML =returnHTML;
			
		}
		else if (request.readyState == 4 && request.status != 200) {
			// document.getElementById("messages").innerHTML = "Whoops, something went terribly wrong!";
			// console.log("not 200");

		}
		else if (request.readyState == 3) {
			// console.log("3");
			// document.getElementById("messages").innerHTML = "Come back soon!";
		}





    	// var stop_info = JSON.parse(request.responseText);
    	// console.log(request.responseText);
    }

    request.send();
    return returnHTML;
}

function display_schedule() {
	
	// var infowindow;

	stations.forEach(function(station) {
		


  		station.marker.addListener('click', function() {
  			// get_schedule(station);
  			content_string = '<h4>' + station.stop_name + '</h4>';

  			var request;
    		request = new XMLHttpRequest();
    		request.open("GET", "https://api-v3.mbta.com/predictions?filter[route]=Red&filter[stop]=" 
    				+ station.stop_id + "&page[limit]=10&page[offset]=0&sort=departure_time&api_key=c5df0bac5455448db1582cc8721e993b", true);
    		var returnHTML;
    		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				// Step 5: when we get all the JSON data back, parse it and use it
				theData = request.responseText;
				stop_info = JSON.parse(theData);
				// console.log("parsed");
				// console.log(stop_info);
				var times = [];
				// console.log(station.stop_name);

				stop_info["data"].forEach(function(prediction) {
					var loc_time = prediction["attributes"]["arrival_time"];
					var loc_direction = prediction["attributes"]["direction_id"];
					times.push({time: loc_time, direction: loc_direction});
					// console.log(prediction["attributes"]["arrival_time"]);
				});

				content_string += '<h6>Time\tDirection</h6>';
				times.forEach(function(time) {
					loc_string = '<p>' +  + '</p>';
					// content_string += loc_string;
				});

				console.log(times);

				// for(i = 0; i < ; i++) {
				// 	console.log(stop_info["data"][i]);
				// }


				// console.log(stop_info["data"][0]);

				// stop_info.forEach(function(attribute) {
				// 	console.log(attribute);
  				// 		});

				// for (i = 0; i < messages.length; i++) {
				// 	returnHTML += "<li>" + messages[i].content + " by " + messages[i].username + 
				// 	"</li>";
				// }
				// returnHTML += "</p>";
				// document.getElementById("messages").innerHTML =returnHTML;
			
			}
			else if (request.readyState == 4 && request.status != 200) {
				// document.getElementById("messages").innerHTML = "Whoops, something went terribly wrong!";
				// console.log("not 200");

			}
			else if (request.readyState == 3) {
				// console.log("3");
				// document.getElementById("messages").innerHTML = "Come back soon!";
			}





    		// var stop_info = JSON.parse(request.responseText);
    		// console.log(request.responseText);
   			 }

    		request.send();



			var infowindow = new google.maps.InfoWindow({
    			content: content_string
  			});
    		infowindow.open(map, station.marker);
  		})
  	});
}

function user_loc() {
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position) {
      		var pos = {
        		lat: position.coords.latitude,
        		lng: position.coords.longitude
      		};


      		user_marker = new google.maps.Marker({
           		position: pos,
            	map: map
          	});

      	// infoWindow = new google.maps.InfoWindow;

      	// infoWindow.setPosition(pos);
      	// infoWindow.setContent('Location found.');
      	// infoWindow.open(map);
      	map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}




