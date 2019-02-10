var request = require("request-promise");
var http = require('http');
var dict = {};
module.exports.readTextFile = (url, cb) => {
    var callback = function(response) {
        // Continuously update stream with data
        dict = {};
        response.on('data', function(data) {
            addtoDict(data.toString());
        });
        
        response.on('end', function() {
            // Data received completely.
            logger.info('read complete');
            var sortedDict = {};
            var keysSorted = Object.keys(dict).sort(function(a,b){return dict[b]-dict[a]})
            var top10  = keysSorted.slice(0,10)
        
            top10.forEach(key=>{
                sortedDict[key] = dict[key];
            })

            cb(null, sortedDict);
        });
        response.on('error', function(){
            cb(err);
        })
    }
    // Make a request to the server
    var req = http.request(url, callback);
    req.end();
}

module.exports.getTextFile = (url) => {
    let options = {
        method: 'GET',
        uri: url,
        rejectUnauthorized: false
    };
    return request(options);
}

module.exports.createDictionary = (data) => {
    var arr = data.replace(/[\r\n.,]+/g, ' ').replace(/['"*!-=_?\(\)\[\]{}>]+/g,'').split(" ");
    var dict = {}, sortedDict = {};
    arr.forEach(word => {
        var key = word.trim().toLowerCase();
        if(key === '' || key.length <= 1)
            return;
        if(dict[key]){
            dict[key] = dict[key] + 1;
        }else{
            dict[key] = 1
        }
    });
    var keysSorted = Object.keys(dict).sort(function(a,b){return dict[b]-dict[a]})
    var top10  = keysSorted.slice(0,1)

    top10.forEach(key=>{
        sortedDict[key] = dict[key];
    })

    return sortedDict;
}

var addtoDict = (data)=>{
   //console.log('data++++++++', data);
   var arr = data./*replace(/(\r\n|\n|\r)/gm, " ").*/split(" ");
    arr.forEach(word => {
        var key = word.replace(/[`#"'*=\(\)\[\]{}>]+/g,'').trim().toLowerCase();
        if(key === '' || key.length <= 1)
            return;
        if(dict[key]){
            dict[key] = dict[key] + 1;
        }else{
            dict[key] = 1
        }
    });
}

