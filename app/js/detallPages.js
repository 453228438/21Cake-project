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
         getData(i) {
             var _this = this;
             $.ajax('http://localhost:8887/21Cake-project/server/json/detallPages.json', {
                 type: 'post',
                 //  contentType: 'application/json',
                 success(res) {
                     console.log(res)
                     _this.setItem(res, i)
                 }
             })
         },
         setItem(res, i) {
             res = res.data[i];
             console.log(res)
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
                 console.log(List)
             }
             this.upData(res, List)
         },
         upData(res, List) {
             console.log(List)
             var arr = '[]';
             arr = JSON.parse(arr)

             $('.btn-right').click(function () {
                 $('div.number').each(function (i) {
                     if ($('.icon-chenggong').parent().index() == i) {
                         if (i == 1) {
                             List[i - 1].picle = res.picle;
                             List[i - 1].kg = res.kg1;
                             List[i - 1].count += 1;
                             if (List[i - 1].count == 1) {
                                 arr.push(JSON.stringify(List[i - 1]))
                             } else if (List[i - 1].count >= 2) {
                                 for (let j = 0; j < arr.length; j++) {
                                     if (typeof (arr[j]) == 'string') {
                                         arr[j] = JSON.parse(arr[j])
                                     }
                                     if (arr[j].kg == List[i - 1].kg) {
                                         arr[j].count = List[i - 1].count
                                     }
                                     arr[j] = JSON.stringify(arr[j])
                                 }
                             }
                             localStorage.shopList = arr
                         }
                         if (i == 2) {
                             List[i - 1].picle = res.picle2;
                             List[i - 1].kg = res.kg2;
                             List[i - 1].count += 1;
                             if (List[i - 1].count == 1) {
                                 flag2 = true
                                 arr.push(JSON.stringify(List[i - 1]))
                             } else if (List[i - 1].count >= 2) {
                                 for (let j = 0; j < arr.length; j++) {
                                     if (typeof (arr[j]) == 'string') {
                                         arr[j] = JSON.parse(arr[j])
                                     }
                                     if (arr[j].kg == List[i - 1].kg) {
                                         arr[j].count = List[i - 1].count
                                     }
                                     arr[j] = JSON.stringify(arr[j])
                                 }
                             }
                             console.log(arr)
                             localStorage.shopList = arr
                         }
                         if (i == 3) {
                             List[i - 1].picle = res.picle3;
                             List[i - 1].kg = res.kg3;
                             List[i - 1].count += 1;
                             if (List[i - 1].count == 1) {
                                 flag3 = true
                                 arr.push(JSON.stringify(List[i - 1]))
                             } else if (List[i - 1].count >= 2) {
                                 for (let j = 0; j < arr.length; j++) {
                                     if (typeof (arr[j]) == 'string') {
                                         arr[j] = JSON.parse(arr[j])
                                     }
                                     if (arr[j].kg == List[i - 1].kg) {
                                         arr[j].count = List[i - 1].count
                                     }
                                     arr[j] = JSON.stringify(arr[j])
                                 }
                             }
                             console.log(arr)
                             localStorage.shopList = arr
                         }
                         if (i == 4) {
                             List[i - 1].picle = res.picle4;
                             List[i - 1].kg = res.kg4;
                             List[i - 1].count += 1;
                             console.log(List[i - 1])
                             if (List[i - 1].count == 1) {
                                 flag4 = true
                                 arr.push(JSON.stringify(List[i - 1]))
                             } else if (List[i - 1].count >= 2) {
                                 for (let j = 0; j < arr.length; j++) {
                                     if (typeof (arr[j]) == 'string') {
                                         arr[j] = JSON.parse(arr[j])
                                     }
                                     if (arr[j].kg == List[i - 1].kg) {
                                         arr[j].count = List[i - 1].count
                                     }
                                     arr[j] = JSON.stringify(arr[j])
                                 }
                                 console.log(arr)
                                 localStorage.shopList = arr;
                             }

                         }
                     }
                 })

             })
             //  else {
             //      console.log(JSON.parse(localStorage.shopList))
             //      $('.btn-right').click(function () {
             //          var i = $('.icon-chenggong').parent().index();
             //          if (i == 1) {
             //              console.log(arr2.length)
             //              for (let i = 0; i < arr2.length; i++) {
             //                  if (arr2[i].kg == res.kg1) {
             //                      arr2[i].count += 1;
             //                  }
             //              }
             //              localStorage.shopList = JSON.stringify(arr2)
             //          }
             //          if (i == 2) {
             //              for (let i = 0; i < arr2.length; i++) {
             //                  if (arr2[i].kg == res.kg2) {
             //                      arr2[i].count += 1;
             //                  }
             //              }
             //              localStorage.shopList = JSON.stringify(arr2)
             //          }
             //          if (i == 3) {
             //              for (let i = 0; i < arr2.length; i++) {
             //                  if (arr2[i].kg == res.kg3) {
             //                      arr2[i].count += 1;
             //                  }
             //              }
             //              localStorage.shopList = JSON.stringify(arr2)
             //          }
             //          if (i == 4) {
             //              for (let i = 0; i < arr2.length; i++) {
             //                  if (arr2[i].kg == res.kg4) {
             //                      arr2[i].count += 1;
             //                  }
             //              }
             //              localStorage.shopList = JSON.stringify(arr2)
             //          }
             //      })
             //  }
         }

     }
 }());
 detall.init(1);