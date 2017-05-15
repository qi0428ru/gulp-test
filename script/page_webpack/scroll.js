var $ = require('../library/jquery.js');
var Swiper = require('../library/swiper.js')
new Swiper('.swiper-container',{
    pagination: '.pagination',
    autoplay:5000,
    loop:true,
    paginationClickable: true
})