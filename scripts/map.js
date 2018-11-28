let moodColour; //Obj containing mood:colour
let data;       //Used to store a copy of json - so we modify the copy, not the original
let adventurous, hungry, creative, tired, romantic, sad;

function setup() {
  data = json;
  setIsLiked('central','hydepark', 'yes')
  noCanvas();
  moodColour = {adventurous: "rgba(66, 173, 244, 0.65)", hungry: "rgba(118, 69, 209, 0.65)", creative: "rgba(229, 150, 22, 0.65)", tired: "rgba(56, 181, 97, 0.65)", romantic: "rgba(218, 118, 104, 0.65)", sad: "rgba(244, 205, 65, 0.65)"}
  let map = createMap(51.509865, -0.118092);//Creates a map centered in London center
  setupMoodFilter(map);
}

function draw() {
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

          //Marker
          let el = document.createElement('div');
          el.className = 'marker';
          el.style.background = moodColour[mood];

          //Name
          let name = document.createElement('p');
          name.className = 'marker-name';
          name.innerHTML = placesObj[place].name;
          el.appendChild(name);

          //Icons
          let icons = document.createElement('div');
          icons.className = 'marker-icon-wrapper'

          let settings = document.createElement('img')
          settings.className = 'marker-icon'
          settings.src = '/res/img/icons/settings.svg'
          $(settings).attr('data-toggle', 'modal');
          $(settings).attr('data-target', '#changeSettings');
          icons.appendChild(settings);

          let showPlaceInfo = document.createElement('img')
          showPlaceInfo.className = 'marker-icon'
          showPlaceInfo.src = '/res/img/icons/placeholder.svg'
          icons.appendChild(showPlaceInfo);

          el.appendChild(icons);

          el.addEventListener('mouseenter', () => {
            $(name).toggleClass('hovered');
            icons.style.display = 'inline-grid'
          })

          el.addEventListener('mouseleave', () => {
            $(name).toggleClass('hovered');
            icons.style.display = 'none'
          })

          el.addEventListener('click', () => {
            //Show React modal
          });

          settings.addEventListener('click', () => {
            //Opens settings modal
          })

          showPlaceInfo.addEventListener('click', () => {
            //Opens single place page
          })

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

function setIsLiked(zone, place, isLiked){
  data[zone][0][place].isLiked = isLiked;
}

function setIsVisited(zone, place, isVisited) {
  data[zone][0][place].isLiked = isVisited;
}

function removeMarkers(markersArray) {//Removes all markers of a mood
  if(markersArray != null) {
    for (let marker of markersArray) {
      marker.remove()
    }
  }
}


function setupMoodFilter(map) {
  $('#adventMood').click(e => {
    if (!$(e.target).closest('.moodsConts').hasClass('selected')) {
      adventurous = setupMarkersByMood(map, 'adventurous');
    }
    $(e.target).closest('.moodsConts').toggleClass('selected')
    $('.moodsConts').not('#adventMood').each((idx, mood) => {
      $(mood).removeClass('selected')
    })
    removeMarkers(hungry);
    removeMarkers(sad);
    removeMarkers(romantic);
    removeMarkers(creative);
    removeMarkers(tired);
  })

  $('#sadMood').click(e => {
    if (!$(e.target).closest('.moodsConts').hasClass('selected')) {
      sad = setupMarkersByMood(map, 'sad');
    }
    $(e.target).closest('.moodsConts').toggleClass('selected')
    $('.moodsConts').not('#romanticMood').each((idx, mood) => {
      $(mood).removeClass('selected')
    })
    removeMarkers(adventurous);
    removeMarkers(romantic);
    removeMarkers(hungry);
    removeMarkers(creative);
    removeMarkers(tired);
  })

  $('#romanticMood').click(e => {
    if (!$(e.target).closest('.moodsConts').hasClass('selected')) {
      romantic = setupMarkersByMood(map, 'romantic');
    }
    $(e.target).closest('.moodsConts').toggleClass('selected')
    $('.moodsConts').not('#romanticMood').each((idx, mood) => {
      $(mood).removeClass('selected')
    })
    removeMarkers(sad);
    removeMarkers(adventurous);
    removeMarkers(hungry);
    removeMarkers(creative);
    removeMarkers(tired);
  })

  $('#tiredMood').click(e => {
    if (!$(e.target).closest('.moodsConts').hasClass('selected')) {
      tired = setupMarkersByMood(map, 'tired');
    }
    $(e.target).closest('.moodsConts').toggleClass('selected')
    $('.moodsConts').not('#tiredMood').each(mood => {
      $(mood).removeClass('selected')
    })
    removeMarkers(sad);
    removeMarkers(romantic);
    removeMarkers(hungry);
    removeMarkers(creative);
    removeMarkers(adventurous);
  })

  $('#hungryMood').click(e => {
    if (!$(e.target).closest('.moodsConts').hasClass('selected')) {
      hungry = setupMarkersByMood(map, 'hungry');
    }
    $(e.target).closest('.moodsConts').toggleClass('selected')
    $('.moodsConts').not('#romanticMood').each((idx, mood) => {
      $(mood).removeClass('selected')
    })
    removeMarkers(adventurous);
    removeMarkers(sad);
    removeMarkers(romantic);
    removeMarkers(creative);
    removeMarkers(tired);
  })

  $('#creativeMood').click(e => {
    if (!$(e.target).closest('.moodsConts').hasClass('selected')) {
      creative = setupMarkersByMood(map, 'creative');
    }
    $(e.target).closest('.moodsConts').toggleClass('selected')
    $('.moodsConts').not('#romanticMood').each((idx, mood) => {
      $(mood).removeClass('selected')
    })
    removeMarkers(sad);
    removeMarkers(romantic);
    removeMarkers(hungry);
    removeMarkers(adventurous);
    removeMarkers(tired);
  })

}
