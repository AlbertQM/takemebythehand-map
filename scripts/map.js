let central;

function setup() {
  noCanvas();
}

function draw() {
    let map = createMap(51.509865, -0.118092);//Creates a map centered in London center
    //central = setupMarkers(map, 'central'); //Creates markers array
  all = setupMarkersByMood(map, 'hungry');
    noLoop();
}

function createMap(lat, long) {
  mapboxgl.accessToken = API_KEY;
  let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [long, lat],
      zoom: 12,
  });
  return map;
}

function createMarker(lat, long, map){
  return new mapboxgl.Marker()
  .setLngLat([long, lat])
  .addTo(map)
}

function setupMarkers(map, zone) {
  let curMap = map;
  let curMarkers = []
  json[zone].forEach( places => {
    const keys = Object.keys(places)
    for (let place of keys) {
      let coords = [places[place].long, places[place].lat];


      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      //el.style.backgroundImage = ;//`url(.${data.Central[0].HydePark.picture})`; ///res/img/places/Hyde_Park.jpg
      el.style.background = 'RED';
      el.style.width = '50px'; //marker.properties.iconSize[0] + 'px';
      el.style.height = '50px'; //marker.properties.iconSize[1] + 'px';

      el.addEventListener('click', function() {
          //show place pop up
      });

      // add marker to map
      let curMarker = new mapboxgl.Marker({
          element: el,
          anchor: 'bottom'
      })

          .setLngLat(coords)
          .addTo(curMap);

          curMarkers.push(curMarker)
        }
  });
  return curMarkers;
}


function setupMarkersByMood(map, mood) {
  let curMap = map;
  let curMarkers = []
  for (let zone in json) {
    json[zone].forEach(placesObj => {
    const placesNames = Object.keys(placesObj)
    for (let place of placesNames) {
      let coords = [placesObj[place].long, placesObj[place].lat];
      let moods = placesObj[place].mood;

      if (moods.hasOwnProperty(mood)) {

      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      //el.style.backgroundImage = ;//`url(.${data.Central[0].HydePark.picture})`; ///res/img/places/Hyde_Park.jpg
      el.style.background = 'RED';
      el.style.width = '50px'; //marker.properties.iconSize[0] + 'px';
      el.style.height = '50px'; //marker.properties.iconSize[1] + 'px';

      el.addEventListener('click', function() {
          //show place pop up
      });

      // add marker to map
      let curMarker = new mapboxgl.Marker({
          element: el,
          anchor: 'bottom'
      })

          .setLngLat(coords)
          .addTo(curMap);

          curMarkers.push(curMarker)
        }
      }
  });
}
  return curMarkers;
}


function removeMarkers(markersArray) {
  for (let marker of markersArray) {
    marker.remove()
  }
}

function keyPressed() {
  if (keyCode === DELETE) {
    removeMarkers(central);
  }
}
