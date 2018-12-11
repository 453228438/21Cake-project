 var detall = (function () {
     var $banner = $('#wrapper-banner');
     var $min = $('#warpper-main');
     var $jiesuan = $('.jiesuan');
     var $options = $('.options');
     return {
         init(i) {
             console.log()
             console.log()
             this.event();
             this.getData(i)

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
         },
         upData(res, List) {
             if (localStorage.shopList) {
                 var arr = localStorage.shopList;
                 arr = JSON.parse(arr)
             } else {
                 var arr = [];
             }
             console.log(arr)
             console.log(arr instanceof Object)
             $('.btn-right').click(function () {
                 $('div.number').each(function (i) {
                     if ($('.icon-chenggong').parent().index() == i && arr instanceof Array) {
                         if (i == 1) {
                             List[i].picle = res.picle;
                             List[i].kg = res.kg1;
                             List[i].count += 1;
                             if (List[i].count == 1) {
                                 arr.push(JSON.stringify(List[i]))
                             } else if (List[i].count >= 2) {
                                 console.log(List[i].count)
                                 for (var j = 0; j < arr.length; j++) {
                                     arr[j] = JSON.parse(arr[j])
                                     if (arr[j].kg = List[i].kg) {
                                         arr[j].count = List[i].count
                                         arr[j] = JSON.stringify(arr[j])
                                     }
                                 }

                             }
                             localStorage.shopList = arr
                         }
                         if (i == 2) {
                             List[i].picle = res.picle2;
                             List[i].kg = res.kg2;
                             List[i].count += 1;
                             if (List[i].count == 1) {
                                 arr.push(JSON.stringify(List[i]))
                             } else if (List[i].count >= 2) {
                                 console.log(List[i].count)
                                 for (var j = 0; j < arr.length; j++) {
                                     arr[j] = JSON.parse(arr[j])
                                     if (arr[j].kg = List[i].kg) {
                                         arr[j].count = List[i].count
                                         arr[j] = JSON.stringify(arr[j])
                                     }
                                 }

                             }
                             localStorage.shopList = arr
                         }
                         if (i == 3) {
                             List[i].picle = res.picle3;
                             List[i].kg = res.kg3;
                             List[i].count += 1;
                             if (List[i].count == 1) {
                                 arr.push(JSON.stringify(List[i]))
                             } else if (List[i].count >= 2) {
                                 console.log(List[i].count)
                                 for (var j = 0; j < arr.length; j++) {
                                     arr[j] = JSON.parse(arr[j])
                                     if (arr[j].kg = List[i].kg) {
                                         arr[j].count = List[i].count
                                         arr[j] = JSON.stringify(arr[j])
                                     }
                                 }

                             }
                             localStorage.shopList = arr
                         }
                         if (i == 4) {
                             console.log(List[i])
                             List[3].picle = res.picle4;
                             List[i].kg = res.kg4;
                             List[i].count += 1;
                             if (List[i].count == 1) {
                                 arr.push(JSON.stringify(List[i]))
                             } else if (List[i].count >= 2) {
                                 for (var j = 0; j < arr.length; j++) {
                                     arr[j] = JSON.parse(arr[j])
                                     if (arr[j].kg = List[i].kg) {
                                         arr[j].count = List[i].count
                                         arr[j] = JSON.stringify(arr[j])
                                     }
                                 }
                             }
                             localStorage.shopList = arr
                         }
                     } else if (arr instanceof Object) {
                         if (i == 1) {
                             arr.count += 1;
                             console.log(arr)
                             localStorage.shopList = JSON.stringify(arr)
                         }
                     }
                 })

             })
         },
         getData(i) {
             var _this = this;
             $.ajax('http://localhost:8887/21Cake-project/server/json/detallPages.json', {
                 type: 'post',
                 //  contentType: 'application/json',
                 success(res) {
                     _this.setItem(res, i)
                 }
             })
         },
         setItem(res, i) {
             res = res.data[i];
             var List = [];
             for (var i = 0; i < 4; i++) {
                 var shopList = {}
                 shopList.id = res.id;
                 shopList.title = res.title
                 shopList.banner1 = res.banner1
                 shopList.count = 0;
                 shopList.picle = null;
                 shopList.kg = null;
                 //  console.log(shopList)
                 List.push(shopList)
             }
             this.upData(res, List)
         }

     }
 }())
 detall.init(1);