if (Meteor.isClient) {

  Meteor.startup(function() {
    GoogleMaps.load()
  })

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.helpers({
    exampleMapOptions: function() {
      // Make sure the maps API has loaded
      if (GoogleMaps.loaded()) {
        // Map initialization options
        return {
         center: new google.maps.LatLng(29.762778, -95.383056),
         zoom: 10
        };
      }
  }
  })

  Template.body.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
      // Add a marker to the map once it's ready
      var marker = new google.maps.Marker({
        position: map.options.center,
        map: map.instance
      });
      
      //should loop through javascript object collection
testAddress(geocoder,'1218 Apache 77022',map);

    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

//validation
function testAddress(geocoder,sourceAddress,resultsMap){
   geocoder.geocode({'address': sourceAddress}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      alert('found you bastard');
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });  
}