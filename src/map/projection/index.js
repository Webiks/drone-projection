import Projection from 'ol/proj/projection';
import proj from 'ol/proj';
import { convertPixels, convertCoordinates} from './transform';
import proj4 from 'proj4';
import {log} from '../../utils/logs';

export const imageWidth = 4864;
export const imageHeight = 3648;
export const imageExtent = [0,0,imageWidth,imageHeight];

export default () => {
    //const point1 [lon,lat]
    //Cesium.Cartesian3.fromDegrees(point[1],point[0])

    const latXlonY =  [
        [
          34.869831222017616,
          32.334958595614125
        ],
        [
          34.89377467294863,
          32.61494808229724
        ],
        [
          35.14092799335722,
          32.62107962837347
        ],
        [
          35.14161323477937,
          32.31447024119465
        ]
    ]

    const topLeft = proj4('EPSG:4326','EPSG:3857', latXlonY[0]);
    const bottomLeft = proj4('EPSG:4326','EPSG:3857', latXlonY[1]);
    const bottomRight = proj4('EPSG:4326','EPSG:3857', latXlonY[2]);
    const topRight = proj4('EPSG:4326','EPSG:3857', latXlonY[3]);

    const cartesian3 = [
        [4425755.966746896, 3083986.9511870947, 3391873.171570137], // topLeft 
        [4410792.684663266, 3076299.1790357362, 3418067.299486154], // bottomLeft
        [4397181.918210697, 3095086.0961734233, 3418640.030208593], //bottomRight
        [4412070.811800526, 3105644.993833534, 3389953.256325589] //topRight
    ]
    
 /*   const x1 = latXlonY[0][0];
    const x2 =  latXlonY[3][0];
    const x3 =  latXlonY[1][0];

    const y1 = latXlonY[0][1];
    const y2 =  latXlonY[3][1];
    const y3 =  latXlonY[1][1];
*/

    const x1 = topLeft[0];
    const x2 =  topRight[0];
    const x3 =  bottomLeft[0];

    const y1 = topLeft[1];
    const y2 =  topRight[1];
    const y3 =  bottomLeft[1];

    
    /* 
    const x1 = cartesian3[0][0];
    const x2 =  cartesian3[3][0];
    const x3 = cartesian3[2][0];

    const y1 = cartesian3[0][1];
    const y2 =  cartesian3[3][1];
    const y3 =  cartesian3[2][1];
    */

    
    const mapMatrix = [
        x2 - x1, x3 - x1, x1,
        y2 - y1, y3 - y1, y1,
        0, 0, 1
    ];
    
    const projection = new Projection({
        code: 'image:surface',
        extent: imageExtent,
        units: 'pixels'
    });

    proj.addProjection(projection);
    
    proj.addCoordinateTransforms(
      'image:surface',
      'EPSG:3857',
      // forward
    coordinates => {
        console.log('from coordinates', coordinates);
        return fromPixels(...coordinates);
      },

      coordinates => {
        console.log('to coordinates', coordinates);
        return toPixels(...coordinates);
      }
        // inverse
    );
    
    function toPixels(x, y){
        const result = convertCoordinates(mapMatrix, x, y);
        console.log(result, "blblblbl");
        const resultX = result[0] * imageWidth;
        const resultY = result[1] * imageHeight;

        console.log('to pixel', x, y, resultX, resultY);
        return [resultX, resultY];
        // return [0, 0]
    }
    
    function fromPixels(x,y){
        const valX = x / imageWidth;
        const valY = y / imageHeight;
        const result = convertPixels(mapMatrix,valX,valY);
        console.log('from pixel', x,y, result[0], result[1]);
        return result;
        // return [x, y]
    }
    
    return projection;
}