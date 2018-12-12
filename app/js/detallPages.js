function getUrl() {
    var str = window.location.href;
    //console.log(str);
    var urlObj = {};
    var index = str.indexOf("?");
    var newStr = str.substr(index + 1);
    var newStr2 = newStr.split("=");
    return newStr2[1];
}
var detall = (function() {
    var $banner = $('#wrapper-banner');
    var $min = $('#warpper-main');
    var $jiesuan = $('.jiesuan');
    var $options = $('.options');
    return {
        init(i) {
            this.event();
            this.getData(i)
        },
        event() {
            var _this = this;
            $(document).scroll(function() {
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
            $('.min-banner').children('div').hover(function() {
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
            $jiesuan.hover(function() {
                $options.slideDown()
            })
            $options.mouseleave(function() {
                $options.slideUp()
            })
        },
        getData(i) {
            var _this = this;
            $.ajax('http://localhost:3333/21Cake-project/server/json/detallPages.json', {
                type: 'post',
                contentType: 'application/json',
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
                console.log(List)
            }
            this.upData(res, List)
        },
        upData(res, List) {
            var arr = localStorage.shopList || '[]';
            arr = JSON.parse(arr);
            console.log(arr)
            $('.btn-right').click(function() {
                var i = $('.icon-chenggong').parent().index();
                if (i == 1) {
                    List[0].picle = res.picle;
                    List[0].kg = res.kg1;
                    List[0].num = res.num1;
                    for (var k = 0; k < arr.length; k++) {
                        if (arr[k].kg == res.kg1) {
                            arr[k].count += 1;
                            break;
                        }
                    }
                    if (k == arr.length) {
                        List[0].count += 1;
                        arr.push(List[0]);
                    }
                }
                if (i == 2) {
                    List[1].picle = res.picle2;
                    List[1].kg = res.kg2;
                    List[1].num = res.num2;
                    for (var k = 0; k < arr.length; k++) {
                        if (arr[k].kg == res.kg2) {
                            arr[k].count += 1;
                            break;
                        }
                    }
                    if (k == arr.length) {
                        List[1].count += 1;
                        arr.push(List[1]);
                    }
                }
                if (i == 3) {
                    List[2].picle = res.picle3;
                    List[2].kg = res.kg3;
                    List[2].num = res.num3;
                    for (var k = 0; k < arr.length; k++) {
                        if (arr[k].kg == res.kg3) {
                            arr[k].count += 1;
                            break;
                        }
                    }
                    if (k == arr.length) {
                        List[2].count += 1;
                        arr.push(List[2]);
                    }
                }
                if (i == 4) {
                    List[3].picle = res.picle4;
                    List[3].kg = res.kg4;
                    List[3].num = res.num4;
                    for (var k = 0; k < arr.length; k++) {
                        if (arr[k].kg == res.kg4) {
                            arr[k].count += 1;
                            break;
                        }
                    }
                    if (k == arr.length) {
                        List[3].count += 1;
                        arr.push(List[3]);
                    }
                }
                localStorage.shopList = JSON.stringify(arr)
            })
        }

    }
}());
detall.init(getUrl());