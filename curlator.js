var a = process.argv[2]; //забираем json из stdin
makeCurl(getHeaders(a)); //вызываем для него функцию

function getHeaders(d) {  //на вход забираем json as string (в кавычках)
    var c = JSON.parse(d); //парсим json в объект
    var headers = c.data ? c.data[0]['headers.header'] : c['headers.header'], // в первом случае парсим поле из format JSON, во втором из JSONEachRow
        values = c.data ? c.data[0]['headers.value'] : c['headers.value'],
        headerObject = {};
    headerObject['request_uri'] = c.data ? c.data[0]['request_uri'] : c['request_uri']; //вытаскиваем урл запроса из JSON
    for (var i = 0; i < headers.length; i++) {
        headerObject[headers[i]] = values[i]; //прописываем поля header и value в объект
    }
    return headerObject;
}

function makeCurl(hObj) { //на вход забираем объект из getHeaders
    var hString = '', 
        curlString = '';
    for (var key in hObj) {
        if (key != 'request_uri') { //проверка на урл, он нам в хедерах не нужен
            hString += "-H '" + key + ": " + hObj[key] + "' "; //собираем строку вида -H 'имя хедера: содержимое' из каждой пары ключ:значение исходного объекта
        }
    }
    curlString = "curl -i 'https://ads.adfox.ru" +  //стандартное начало строки
        hObj.request_uri +                          //добавляем урл
        "' " +                                      //разделитель                                      
        hString;                                    //строка хедеров    
    return console.log(curlString);                 //выводим в консоль
}