/* jshint node: true */
/* jshint esnext: true */
"use strict";
const express = require("express"),
    router = express.Router()

/**
 * @swagger
 * tags:
 * - name: "word lookup"
 *   description: "endpoint for seaching top 10 word occurances in doc. It also returns pos and synonyms fot those words"
 */
router.use("/api/search/", require("./search"));

module.exports = router;
