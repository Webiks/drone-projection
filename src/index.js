import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {getCenter} from 'ol/extent.js';
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer.js';
import {transform} from 'ol/proj.js';
import {defaults as defaultControls} from 'ol/control.js';
import Static from 'ol/source/ImageStatic.js';
import myProjection from './map/projection/';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import { transformMat2 } from 'gl-matrix/src/gl-matrix/vec2';
import {log,logSeperator} from './utils/logs';
import { imageHeight, imageWidth, imageExtent } from './map/index';

const projection = myProjection();

document.querySelector('.clear').addEventListener('click',() => {
    document.querySelector('.logs').innerHTML = '';
})

//const imageWidth = 4864;
//const imageHeight = 3648;

//const imageExtent = [0,0,imageWidth,imageHeight];

//const [,,imageWidth,imageHeight] = imageExtent;

const mousePositionControl = new MousePosition({
    coordinateFormat: createStringXY(4),
    projection: 'image:surface',
    //projection: 'EPSG:4326',
    // comment the following two lines to have the mouse position
    // be placed within the map.
    //className: 'custom-mouse-position',
    //target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
  });


var map = new Map({
    // controls: defaultControls().extend([mousePositionControl]),
    layers: [
        new ImageLayer({
            source: new Static({
                url: `./assets/trees.JPG`,
                crossOrigin: '',
                projection,
                imageExtent
            })
        })
    ],
    target: 'map',
    view: new View({
        center: getCenter(imageExtent),
        zoom: 14
    })
});

map.on('click', evt => {
    const coordinates = evt.coordinates;
    log('image pixels from event', evt.coordinate);
    // [lon,lat]
    // [x,y]
    const x = evt.coordinate[0]; 
    const y = evt.coordinate[1];
    log('point send to transform', [parseInt(x),parseInt(y)]);
    const result = transform([x,y],'image:surface', 'EPSG:3857' );

    const result2 = transform(result,'EPSG:3857', 'image:surface');
   
    log('working',result2 );
    logSeperator();

})