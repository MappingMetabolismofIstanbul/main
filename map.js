
jQuery.fn.load = function(callback){ $(window).on("load", callback) };

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9nYXRtbiIsImEiOiJjbHlyMTJmcXgwMjQ3MmtzbTRsdm1pejdsIn0.vcEjL7lt8OoOPMP5o1PM6g';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dogatmn/cm4v9fem6000p01sf12f769y5',
    center: [28.978001, 41.014254],
    zoom: 11.15
});

let features = [];
map.on('load', () => {
    locations.forEach((location, i) => {
        
        map.loadImage(
            location.icon,
            (error, image) => {
                if (error) 
                    throw error;
                if(!map.hasImage(location.icon)) {
                    createImageBitmap(image, 0, 0, image.width, image.height, {resizeWidth: 40, resizeHeight: 40}).then(resizedImage => {
                        map.addImage(location.icon, resizedImage);
                    });
                }
            }
        );

        var feature = {
            type: 'feature',
            properties: {
                description:                    
                    '<div class="container">' +
                    '<div class="popupHeader">' + location.title + '</div>' +  
                    '<div class="containerInner">' +
                    (location.image19 ?
                        ('<div class="image-container img-container-19" onclick="bigImage(this, 19,' + i + ')" ><img class="thumbImage image19" src="' + location.image19 + '" alt="Image-19" ><div class="caption">19. Yüzyıl</div></div>') : '') +
                    (location.image20 ?
                        ('<div class="image-container img-container-20" onclick="bigImage(this, 20,' + i + ')" ><img class="thumbImage image20" src="' + location.image20 + '" alt="Image-20" ><div class="caption">20. Yüzyıl</div></div>') : '') +
                    (location.image21 ?
                        ('<div class="image-container img-container-21" onclick="bigImage(this, 21,' + i + ')" ><img class="thumbImage image21" src="' + location.image21 + '" alt="Image-21" ><div class="caption">21. Yüzyıl</div></div>') : '') +
                    (!isEmpty(location.infoBoxVideo) ? '<iframe class="infoVideo" width="222" height="125" src="' + location.infoBoxVideo + '"></iframe>' : '') + 
                    (!isEmpty(location.infoBoxImage) ? '<img class="infoImage" src="' + location.infoBoxImage + '" >' : '') +
                    '<p class="infoText">' + location.infoBoxText + '</p>' +
                    '</div>' +
                    '<button class="icon-zoom in" onclick="zoomAction(this, 1);" type="button" aria-hidden="true">' + 
                    '<svg width="16" height="16" fill="#ff70ac" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_227_"/><path d="M19,14c0,0.552-0.448,1-1,1h-3v3c0,0.552-0.448,1-1,1s-1-0.448-1-1v-3h-3c-0.552,0-1-0.448-1-1s0.448-1,1-1  h3v-3c0-0.552,0.448-1,1-1s1,0.448,1,1v3h3C18.552,13,19,13.448,19,14z" id="XMLID_230_"/></svg>' +
                    '</button>' +
                    '<button class="icon-zoom out" onclick="zoomAction(this, 2);" type="button" aria-hidden="true">' +
                    '<svg width="16" height="16" fill="#ff70ac" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_232_"/><path d="M19,14c0,0.552-0.448,1-1,1h-8c-0.552,0-1-0.448-1-1s0.448-1,1-1h8C18.552,13,19,13.448,19,14z" id="XMLID_235_"/></svg>' +
                    '</button>' +
                    '<button class="icon-zoom fit" onclick="zoomAction(this, 3);" type="button" aria-hidden="true">' +
                    '<svg width="12" height="12" fill="#ff70ac" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M128 32H32C14.31 32 0 46.31 0 64v96c0 17.69 14.31 32 32 32s32-14.31 32-32V96h64c17.69 0 32-14.31 32-32S145.7 32 128 32zM416 32h-96c-17.69 0-32 14.31-32 32s14.31 32 32 32h64v64c0 17.69 14.31 32 32 32s32-14.31 32-32V64C448 46.31 433.7 32 416 32zM128 416H64v-64c0-17.69-14.31-32-32-32s-32 14.31-32 32v96c0 17.69 14.31 32 32 32h96c17.69 0 32-14.31 32-32S145.7 416 128 416zM416 320c-17.69 0-32 14.31-32 32v64h-64c-17.69 0-32 14.31-32 32s14.31 32 32 32h96c17.69 0 32-14.31 32-32v-96C448 334.3 433.7 320 416 320z"/></svg>' +
                    '</button>' +                    
                    '</div>',

                icon: location.icon
            },
            geometry: {
                'type': 'Point',
                'coordinates': location.coordinates
            }
        };

        features.push(feature);
    });



    map.addSource('places', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': features            
        }
    });

    map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'icon-image': ['get', 'icon'],
            'icon-allow-overlap': true,
            'icon-size': 1
        }
    });

    map.on('click', 'places', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        if (['mercator', 'equirectangular'].includes(map.getProjection().name)) {
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('mouseenter', 'places', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'places', () => {
        map.getCanvas().style.cursor = '';
    });
});

var bigImage = function (e, imgIndex, locationIndex) {
    if($(e).parents('.container').hasClass('detailView'))
        return;

    var fromTopPopup = $('.mapboxgl-popup.mapboxgl-popup-anchor-top').length > 0 || $('.mapboxgl-popup.mapboxgl-popup-anchor-top-right').length > 0 || $('.mapboxgl-popup.mapboxgl-popup-anchor-top-left').length > 0;

    $(e).parents('.container').addClass('detailView detail' + imgIndex);

    var viewportHeight = map.getCanvas().height;

    var topLat = map.getBounds()._ne.lat;
    var bottomLat = map.getBounds()._sw.lat;
    var latDiff = topLat - bottomLat;

    var blankHeight =  viewportHeight - $(map._popups[0].getElement()).height();
    var centerLat = map._popups[0].getLngLat().lat - (latDiff / 2) + ((latDiff / viewportHeight) * (blankHeight / 4));
    if(!fromTopPopup)
        centerLat = map._popups[0].getLngLat().lat + (latDiff / 2) - ((latDiff / viewportHeight) * (blankHeight / 4));

    var centerLng = map._popups[0].getLngLat().lng;

    map.flyTo({
        center: { lat: centerLat, lng: centerLng }
    });
       
    mapElement = document.createElement("map");
    var areaIndex = 1;
    while (locations[locationIndex]["image" + imgIndex + "_coords_" + areaIndex]) {
        
        mapElement.name = "image-map-" + imgIndex + "-" + areaIndex; 
        mapElement.innerHTML += '<area title="" href="' + locations[locationIndex]["image" + imgIndex + "_link_" + areaIndex] +
            '" coords="' + locations[locationIndex]["image" + imgIndex + "_coords_" + areaIndex] + '" shape="poly">';
        areaIndex++;
    }

    $(e).children('img').attr("usemap", "#" + mapElement.name);
    $(e).parents('.container').append($(mapElement));

    setTimeout(function() { 
        $('img[usemap]').mapster({
            fillColor: 'ff70ac',
            fillOpacity: 0.5,
            enableAutoResizeSupport: true,
            autoResize: true,
            onClick: function(e) {
                if (e.selected) {
                    iframe = document.createElement("iframe");
                    $(iframe).attr('src', $(this).attr('href'));
                    $(iframe).attr('allowfullscreen', 1);                   
                    $(this).parents('.mapboxgl-popup').addClass('fullPage');
                    $(this).parents('.container').addClass('externalPage');                    
                    $(this).parents('.container').append($(iframe));
                }           
            }
        });
        $('area').mapster('set', true);        
        setTimeout(function(){ $('area').mapster('set', false); }, 500);

        var defaultWidth = $('img[usemap]').width();
        var defaultHeight = $('img[usemap]').height();
        $('img[usemap]').parents('.containerInner').css({'max-height': defaultHeight, 'overflow': 'hidden' });

        //$('img[usemap]').dragZoom();
        $('img[usemap]').parents('.image-container').dragZoom();
        
       
     }, 300);
}

var zoomAction = function (e, type) {
    if(type == 1)
        $('img[usemap]').dragZoomChangeZoom(0.2);
    else if(type == 2)
        $('img[usemap]').dragZoomChangeZoom(-0.2);
    else if(type == 3)
        $('img[usemap]').dragZoomClear();
}

var isEmpty = function (str) {
    return (!str || str.length === 0 );
}

window.onresize = function(event) {
    $('.mapboxgl-popup').remove();
};

