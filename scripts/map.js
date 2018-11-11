let moodColour; //Obj containing mood:colour
let data;       //Used to store a copy of json - so we modify the copy, not the original

function setup() {
  data = json;
  setIsLiked('central','hydepark', 'yes')
  noCanvas();
  moodColour = {adventurous: "BLUE", hungry: "PURPLE", creative: "ORANGE", tired: "GREEN", romantic: "RED", sad: "YELLOW"}
}

function draw() {
  let map = createMap(51.509865, -0.118092);//Creates a map centered in London center
  all = setupMarkersByMood(map, 'adventurous');
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

function setupMarkersByZone(map, zone) {//Creates and places markers based on zone (central, east, south)
  let curMap = map;
  let curMarkers = []
  data[zone].forEach(placesObj => {//Places = hydepark obj, soho obj etc.
    const placesNames = Object.keys(placesObj) //hydepark, soho, etc
    for (let place of placesNames) {
      let coords = [placesObj[place].long, placesObj[place].lat];


      //Create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.background = 'RED';

      el.addEventListener('click', function() {
        //Show React modal
      });

      //Add marker to map
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


function setupMarkersByMood(map, mood) {//Creates and places markers based on mood (adventurous, tired, sad, romantic, hungry, creative)
  let curMap = map;
  let curMarkers = [];
  for (let zone in data) {
    data[zone].forEach(placesObj => {
      const placesNames = Object.keys(placesObj)
      for (let place of placesNames) {
        let coords = [placesObj[place].long, placesObj[place].lat];
        let moods = placesObj[place].mood;

        if (moods.hasOwnProperty(mood)) {

          //Create a DOM element for the marker
          let el = document.createElement('div');
          el.className = 'marker';
          el.style.background = moodColour[mood];

          //Create a DOM element for place name
          let name = document.createElement('p');
          name.className = 'placeName';
          name.innerHTML = place; //placesObj[place].name
          el.appendChild(name);//TODO: Have the 'name' appear on top of everything

          el.addEventListener('mouseenter', () => {
            $(name).toggleClass('hovered');
          })

          el.addEventListener('mouseleave', () => {
            $(name).toggleClass('hovered');
          })

          el.addEventListener('click', function() {
            //Show React modal
          });

          //Add marker to map
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


function removeMarkers(markersArray) {//Removes all markers
  for (let marker of markersArray) {
    marker.remove()
  }
}

function keyPressed() {//Test interaction
  if (keyCode === DELETE) {
    removeMarkers(central);
  }
}
