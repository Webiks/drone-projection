import {mat3, vec3} from 'gl-matrix';


export function convertPixels (mapCoordinates, x,y){
    const m = createMatrix(mapCoordinates);
    
    
    
    const lon = (m[0] * x) + (m[1] * y) + m[2]; 

    const lat = (m[3] * x) + (m[4] * y) + m[5];

    const result = [lon,lat];
    console.log('convert pixels 2', result);
    
    return result;

}

export function convertCoordinates(mapCoordinates, lon, lat){
    const matrix = createMatrix(mapCoordinates);
    
    const m = mat3.invert(mat3.create(), matrix);

    const x = (m[0] * lon) + (m[1] * lat) + m[2]; 
    const y = (m[3] * lon) + (m[4] * lat) + m[5];

    const result = [x, y];
    console.log('convertCoordinates', result);
    return result;
}

function createMatrix(mapCoordinates){
    return mat3.fromValues(
        mapCoordinates[1].lon - mapCoordinates[0].lon,
        mapCoordinates[2].lon - mapCoordinates[0].lon,
        mapCoordinates[0].lon,

        mapCoordinates[1].lat - mapCoordinates[0].lat,
        mapCoordinates[2].lat - mapCoordinates[0].lat,
        mapCoordinates[0].lat,

        0,
        0,
        1
    )
}