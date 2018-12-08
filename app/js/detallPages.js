 var detall = (function () {
     var $banner = $('#wrapper-banner');
     var $min = $('#warpper-main');
     var $jiesuan = $('.jiesuan');
     var $options = $('.options');
     return {
         init() {
             console.log()
             console.log()

             this.event();
         },
         event() {
             var _this = this;
             $(document).scroll(function () {
                 if ($(document).scrollTop() >= $banner.innerHeight() + $min.innerHeight()) {
                     $('.header').css({
                         'display': 'none'
                     })
                     $('.details-nav').css({
                         'display': 'block'
                     })
                 } else {
                     $('.header').css({
                         'display': 'block'
                     })
                     $('.details-nav').css({
                         'display': 'none'
                     })
                 }
             })
             $('.min-banner').children('div').eq(0).siblings().css({
                 'border': 'none'
             })
             console.log()
             $('.min-banner').children('div').hover(function () {
                 $(this).css({
                     'border': '1px solid #C69C6D',
                 })
                 $('#wrapper-banner .big-banner').css({
                     'backgroundImage': $(this).css("backgroundImage")
                 })
                 $(this).siblings().css({
                     'border': 'none'
                 })
             })
             $jiesuan.hover(function () {
                 $options.slideDown()
             })
             $options.mouseleave(function () {
                 $options.slideUp()
             })
         }
     }
 }())
 detall.init();