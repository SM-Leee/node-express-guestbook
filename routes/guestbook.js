const express = require('express');
const GuestMessage = require('../models/GuestMessage');
const moment = require('moment');

const router = express.Router();


router.route('/delete/:id').get(function(req, res, next){
    res.render('delete', {
        id: req.params.id
    });
});
router.route('/delete').post(function(req, res, next){
    GuestMessage.deleteOne(req.body, function(err){
        if(err){
            next(err);
            return;
        }
        res.redirect('/');
    });
});
router.route('/add').post(function(req, res, next){
    console.log(req.body);
    GuestMessage.create(req.body);
    res.redirect('/');
});

//나머지를 모두 여기로 넘겨라
router.route(/.*/).get(function(req, res, next){
    console.log("!!!!!");
    GuestMessage.find({}, [
        '_id','name','message','regDate'
    ],{
        sort:{
            regDate:-1
        }
        }, function(err, guestMessages){
        if(err){
            next(err);
            return;
        }
       // 비동기 처리를 위해서 render를 안에 넣어줘야된다.
        res.render('list', {
            guestMessages : guestMessages,
            moment: moment
        });

    });
});

module.exports = router;