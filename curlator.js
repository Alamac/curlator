var a = process.argv[2];
makeCurl(getHeaders(a));

function getHeaders(d) {
    var c = JSON.parse(d);
    var headers = c.data ? c.data[0]['headers.header'] : c['headers.header'],
        values = c.data ? c.data[0]['headers.value'] : c['headers.value'],
        headerObject = {};
    headerObject['request_uri'] = c.data ? c.data[0]['request_uri'] : c['request_uri'];
    for (var i = 0; i < headers.length; i++) {
        headerObject[headers[i]] = values[i];
    }
    return headerObject;
}

function makeCurl(hObj) {
    var hString = '',
        curlString = '';
    for (var key in hObj) {
        if (key != 'request_uri') {
            hString += "-H '" + key + ": " + hObj[key] + "' ";
        }
    }
    curlString = "curl -i 'https://ads.adfox.ru" +
        hObj.request_uri +
        "' " +
        hString;
    return console.log(curlString);
}