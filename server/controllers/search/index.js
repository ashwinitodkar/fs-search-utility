/* jshint node: true */
/* jshint esnext: true */
"use strict";
const express = require("express"),
    router = express.Router(),
    path = require("path"),
    docFile = require("../../BL/file"),
    lookup = require("../../BL/lookup"),
    schema = require("../schema");

/**
 *  @swagger
 * /api/search:
 *   get:
 *     tags:
 *       - search
 *     description: search
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         description: lookup api key
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully processed the request
 *       400:
 *         description: bad request
 */
router.get(
    "/",
    global.expressJoi.joiValidate(schema.validateSearch),
    (req, res) => {
        let key = req.query.key;
        docFile.readTextFile('http://norvig.com/big.txt', (err, data)=>{
            if(err){
                logger.error(err);
                res.status(500).json(err);
            }else{
                lookup.lookupForTop10Words(data, key).then(result => {
                    var responseJson = lookup.formatResponse(result, data);
                    res.status(200).json(responseJson);
                }).catch(err => {
                    logger.error(err);
                    res.status(500).json(err);
                })
            }
        })
    }
);

module.exports = router;
