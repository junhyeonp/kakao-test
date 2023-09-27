const locationMap = document.getElementById("location-map");
let map;
let markers = [];
let isMapDrawn = false;
let userLatitude;
let userLongitude;

console.log(locationMap)

const drawMap = (latitude, longtitude) => {
    const options = {
        center: new kakao.maps.LatLng(latitude, longtitude),
        level: 2
    };
    map = new kakao.maps.Map(locationMap, options)
    map.setZoomable(false);
}

const deleteMarkers = () => {
    for (let i= 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
}

const addUserMarker = () => {
    let markerImage = "/file/map_not_done.png";
    let markerSize = new kakao.maps.Size(24, 35);
    const image = new kakao.maps.MarkerImage(markerImage, markerSize)

    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(userLatitude, userLongitude),
        image: image,
    })
    // marker.setMap(map);
    markers.push(marker)
}

const addCourseMarker = () => {
    let markerImage = "/file/map_not_done.png";
    let markerSize = new kakao.maps.Size(24, 35);

    const image = new kakao.maps.MarkerImage(markerImage, markerSize)
    const position = new kakao.maps.LatLng(35.875528, 128.681573)
    new kakao.maps.Marker({
        map: map,
        position: position,
        title: "영진",
        image: image
    })
}

const configurationLocationWatch = () => {
    if(navigator.geolocation) {
        navigator.geolocation.watchPosition((position)=>{
            
            deleteMarkers();

            console.log(position)
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            if(!isMapDrawn) {
                drawMap(userLatitude, userLongitude)
                isMapDrawn = true
            }
            addUserMarker();
        })
    }
}

// drawMap(35.875528, 128.681573);
// addCourseMarker();
configurationLocationWatch();
