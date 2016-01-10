var express = require('express');
var router = express.Router();

function stringTest(str) {
    if(Number.isNaN(Date.parse(str)) && new Date(+str) == 'Invalid Date'){
        return false;
    }else{
        return true;
    }
}

function dateObj(str) {
    str = decodeURI(str);
    var obj = {};
    if(stringTest(str)){
        var re = /[A-z]/;
        if(re.test(str)){
            obj.unix = Date.parse(str);
            obj.natutral = str;
        }else{
            obj.unix = +str;
            obj.natutral = new Date(+str).toDateString();
        }
    }else{
        obj.unix = null;
        obj.natutral = null;
    }
    return obj;
}

router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/:string', function(req, res, next) {
  var string = req.params.string;
  var obj = dateObj(string);
  res.json(obj);

});


router.post('/:string', function(req, res, next) {

  res.json(dateObj(req.params.string));

});

module.exports = router;
