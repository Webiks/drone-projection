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

const projection = myProjection();
/*      proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
'+x_0=400000 +y_0=-100000 +ellps=airy ' +
'+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
'+units=m +no_defs');
register(proj4);

const position =  [32.47839, 35.00659, 32.47842, 35.00581];


*/

const imageExtent = [0,0,4864,3648];

const [,,imageWidth,imageHeight] = imageExtent;

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
    
    layers: [
        new ImageLayer({
            source: new Static({
                url: `./assets/surface.jpg`,
                crossOrigin: '',
                projection,
                imageExtent
            })
        })
    ],
    target: 'map',
    view: new View({
        center: getCenter(imageExtent),
        zoom: 12
    })
});

map.on('click', evt => {
    const coordinates = evt.coordinates;
    console.log('image pixels from event', evt.coordinate);
    // [lon,lat]
    // [x,y]
    const x = evt.coordinate[0]; // imageWidth;
    const y = evt.coordinate[1]; // imageHeight;
    console.log('point send to transform', [x,y]);
    const result = transform([x,y],'image:surface', 'EPSG:4326' );

    const result2 = transform(result,'EPSG:4326', 'image:surface');
   
    console.log('working???',result2 );

})