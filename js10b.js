"use strict";
/* JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House Directions
    Author: Atsede Degife
    Date:   April 3, 2026

    Filename: js10b.js
*/

// Function to set up and display the Oak Top House Map
function initMap() {
   // Page objects
   let displayMap = document.getElementById("displayMap");
   let routeBox = document.getElementById("routeBox");
   
   // Oak Top House Coordinates (Columbus, Ohio)
   let oakTopHouse = {lat: 39.9612, lng: -82.9988};
   
   // Initialize the map centered on Oak Top House
   let myMap = new google.maps.Map(displayMap, {
      zoom: 13,
      center: oakTopHouse
   });
   
   // Place a marker at the destination
   new google.maps.Marker({
      position: oakTopHouse,
      map: myMap,
      title: "Oak Top House"
   });
   
   // Setup Directions Service and Renderer
   let directionsService = new google.maps.DirectionsService();
   let directionsRenderer = new google.maps.DirectionsRenderer();
   directionsRenderer.setMap(myMap);
   directionsRenderer.setPanel(routeBox);
   
   // Calculate route when the starting address changes
   document.getElementById("startingPoint").onchange = function() {
      let start = this.value;
      directionsService.route({
         origin: start,
         destination: oakTopHouse,
         travelMode: 'DRIVING'
      }, function(response, status) {
         if (status === 'OK') {
            directionsRenderer.setDirections(response);
         } else {
            window.alert("Directions failed: " + status);
         }
      });
   };
}