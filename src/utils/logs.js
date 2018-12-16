export function log (...args) {
    console.log([...args]);
    args.reverse().forEach(item => {
        const text = document.createTextNode(JSON.stringify(item) + " " + ",");
        document.querySelector('.logs').prepend(text);
    })    
    
    document.querySelector('.logs').prepend(document.createElement('br'));
}

export function logSeperator(){
    document.querySelector('.logs').prepend(document.createElement('br'));
    document.querySelector('.logs').prepend(document.createElement('br'));
}

