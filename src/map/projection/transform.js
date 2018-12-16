import {mat3, vec3} from 'gl-matrix';
import {log} from '../../utils/logs';


export function convertPixels (mapCoordinates, x,y){
    
    const m = createMatrix(mapCoordinates);
    
    const lon = (m[0] * x) + (m[1] * y) + m[2]; 

    const lat = (m[3] * x) + (m[4] * y) + m[5];

    const result = [lon,lat];
    
    return result;

}

export function convertCoordinates(mapCoordinates, lon, lat){
    const matrix = createMatrix(mapCoordinates);
    
    const m = mat3.invert(mat3.create(), matrix);
    
    const x = (m[0] * lon) + (m[1] * lat) + m[2]; 
    const y = (m[3] * lon) + (m[4] * lat) + m[5];

    const result = [x, y];
    
    return result;
}

function createMatrix(mapMatrix){
    return mat3.fromValues(...mapMatrix);
}