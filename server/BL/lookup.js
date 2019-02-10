const request = require("request-promise");

var lookup = (word, key) => {
    let options = {
        method: 'GET',
        uri: 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
        qs: addQS(word, key),
        rejectUnauthorized: false
    };
    return request(options);
}

module.exports.lookupForTop10Words = (dict, key) => {
    let promises = [];
    Object.keys(dict).forEach(element => {
        promises.push(lookup(element, key));
    });
    return Promise.all(promises)
}

function formatResponse(data, dict) {
    var result = [];
    logger.info('dict::', dict);
    try {
        data.forEach((element, index) => {
            var obj = JSON.parse(element);
            var i = {};
            i['word'] = Object.keys(dict)[index];
            i['count'] = Object.values(dict)[index];

            obj.def.forEach(item => {
                if(item.pos){
                    i[item.pos] = {
                        syn: []
                    };
                    item.tr.forEach(syn => {
                        i[item.pos].syn.push(syn.text);
                    })
                }
            })
            result.push(i);
        });
    } catch (e) {
        logger.error(e);
    }
    return result;
}

function addQS(param, key) {
    var qs = {};
    qs.key = key; //appending clientid and client secret to request url
    qs.lang = 'en-ru';
    qs.text = param;
    return qs;
}

module.exports.formatResponse = formatResponse;
module.exports.lookup = lookup;
