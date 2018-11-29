import Projection from 'ol/proj/Projection';
import { addProjection } from 'ol/proj';
import { addCoordinateTransforms } from 'ol/proj';
import { convertPixels, convertCoordinates} from './transform';

export default () => {
    
    const imageBoundingRect = {
        topLeft: {lat:3089632.7263065395, lon: 4411440.72966983},
        topRight: {lat:3089632.7263065395, lon: 4411553.177149218},
        bottomRight: {lat:3089590.761406669, lon: 4411553.177149218},
        bottomLeft: {lat: 3089590.761406669, lon: 4411440.72966983}
    };

    const mapCoordinates = [
        imageBoundingRect.topLeft,
        imageBoundingRect.topRight,
        imageBoundingRect.bottomLeft,
        imageBoundingRect.bottomRight 
    ];

    const imageWidth = 4864;
    const imageHeight = 3648;

    const imageRect = {
        bottomLeft: {x:0,y: 3648},
        bottomRight: {x:4864, y: 3648},
        topLeft: {x:0,y:0},
        topRight: {x:4864, y:0}
    };
    
    const projection = new Projection({
        code: 'image:surface',
        extent: [0,0,imageWidth,imageHeight],
        units: 'm'
    });

    addProjection(projection);

    addCoordinateTransforms('EPSG:4326', projection,
        // forward
        coordinates => wgsToPixels(coordinates[1], coordinates[0])
        ,
        // inverse
        coordinates => pixelsToWgs(coordinates[1], coordinates[0]),

    );

    function wgsToPixels(lat,lon){
        const result = convertCoordinates(mapCoordinates, lon, lat);
        const resultX = result[0] * imageWidth;
        const resultY = result[1] * imageHeight;
        return [resultX, resultY];
    }

    function pixelsToWgs(x,y){
        const valX = x / imageWidth;
        const valY = y / imageHeight
        const result = convertPixels(mapCoordinates,valX,valY);
        return result;
    }

    return projection;
}