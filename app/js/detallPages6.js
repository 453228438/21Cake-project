function getUrl() {
    var str = window.location.href;
    //console.log(str);
    var urlObj = {};
    var index = str.indexOf("?");
    var newStr = str.substr(index + 1);
    // console.log(newStr);
    // if (((newStr - 0) / 10) >= 1) {
    //     return newStr.slice(2);
    // }
    // return newStr.slice(-1);
    var newStr2 = newStr.split("=");
    return newStr2[1];
}

var Data = (function() {
    return {
        init(i) {
            console.log(i);
            this.getData(i);
        },
        event() {

        },
        // getUrl() {
        //     var str = window.location.href;
        //     console.log(str);
        //     var urlObj = {};
        //     var index = str.indexOf("?");
        //     var newStr = str.substr(index + 1);
        //     console.log(newStr);
        //     return Number(newStr.slice(-1));
        // },
        getData(i) {
            var _this = this;
            $.ajax('../server/json/detallPages.json', {
                type: 'post',
                contentType: 'application/json',
                success(res) {
                    _this.insertData(res, i);
                }
            })
        },
        insertData(data, i) {
            data = data.data;
            console.log(data)
            $('.big-banner').css({
                'backgroundImage': 'url(' + data[i].banner1 + ')'
            })
            $('.min-banner').children('div').eq(0).css({
                'backgroundImage': 'url(' + data[i].banner1 + ')'
            })
            $('.min-banner').children('div').eq(1).css({
                'backgroundImage': 'url(' + data[i].banner2 + ')'
            })
            $('.min-banner').children('div').eq(2).css({
                    'backgroundImage': 'url(' + data[i].banner3 + ')'
                })
                // $('.min-banner').append('<div class="img4"></div>')
                // $('.min-banner').children('div').eq(3).css({
                //     'backgroundImage': 'url(' + data[5].banner4 + ')'
                // })
                // $('.min-banner').children('div').eq(2).remove()
            $('.main-left h1').html(data[i].title);
            $('p.left').html(data[i].title);
            $('p.right').html(data[i].picle);
            $('.details-img-box').children('span').eq(0).children('span').html(data[i].spec)
            $('.details-img-box').children('span').eq(1).children('span').html(data[i].share)
            $('.details-img-box').children('span').eq(2).children('span').html(data[i].tableware)
            $('.details-img-box').children('span').eq(3).children('span').html(data[i].time)
            $('.main-right .details-img-box').children('span').eq(0).children('span').html(data[i].spec)
            $('.main-right .details-img-box').children('span').eq(1).children('span').html(data[i].share)
            $('.main-right .details-img-box').children('span').eq(2).children('span').html(data[i].tableware)
            $('.main-right .details-img-box').children('span').eq(3).children('span').html(data[i].time)
            console.log($('div.number'))
            $('div.number').css({
                cursor: 'pointer'
            })
            $('i.canju').css({
                'backgroundImage': 'url(../app/font/canju.png)'
            })
            $('.money').remove()
            $('div.number').eq(0).html(data[i].kg1)
            $('div.number').eq(1).html(data[i].kg2)
            $('div.number').eq(2).html(data[i].kg3)
            $('div.number').eq(3).html(data[i].kg4)
            $('div.number').eq(4).html(data[i].kg1)
            $('div.number').eq(5).html(data[i].kg2)
            $('div.number').eq(6).html(data[i].kg3)
            $('div.number').eq(7).html(data[i].kg4)
            $('div.number').eq(0).append('<i class="iconfont icon-chenggong"></i>')
            $('div.number').eq(4).append('<i class="iconfont icon-chenggong"></i>')
            $('div.number').on('click', function() {
                $(this).append('<i class="iconfont icon-chenggong"></i>');
            })
            $('.options div.number').click(function() {
                $(this).siblings().children('i').remove();
                if ($(this).index() == 1) {
                    $('p.right').html(data[i].picle);
                }
                if ($(this).index() == 2) {
                    $('p.right').html(data[i].picle2);
                }
                if ($(this).index() == 3) {
                    $('p.right').html(data[i].picle3);
                }
                if ($(this).index() == 4) {
                    $('p.right').html(data[i].picle4);
                }
                $('.main-right div.number').eq($(this).index() - 1).append('<i class="iconfont icon-chenggong"></i>').siblings().children('i').remove();
            })
            $('.main-right div.number').click(function() {
                $(this).siblings().children('i').remove()
                if ($(this).index() == 1) {
                    $('p.right').html(data[i].picle);
                }
                if ($(this).index() == 2) {
                    $('p.right').html(data[i].picle2);
                }
                if ($(this).index() == 3) {
                    $('p.right').html(data[i].picle3);
                }
                if ($(this).index() == 4) {
                    $('p.right').html(data[i].picle4);
                }
                $('.options div.number').eq($(this).index() - 1).append('<i class="iconfont icon-chenggong"></i>').siblings().children('i').remove();
            })
            $('.main-left p a').eq(0).html(data[i].tag1)
            $('.main-left p a').eq(1).html(data[i].tag2)
            $('.main-left p a').eq(2).html(data[i].tag3)
            $('.main-left p a').eq(2).remove()
                // $('.main-left p').append('<a href=""></a>')
                // $('.main-left p').append('<a href=""></a>')
                // $('.main-left p').append('<a href=""></a>')
                // $('.main-left p').append('<a href=""></a>')
            $('.main-left p a').eq(3).html(data[i].tag4)
            $('.main-left p a').eq(4).html(data[i].tag5)
            $('.main-left p a').eq(5).html(data[i].tag6)
            $('.main-left p a').eq(6).html(data[i].tag7)

            $('.main-left p a').eq(3).html(data[i].tag4)
            $('.main-left h3').eq(0).html(data[i].suggest1)
            $('.main-left h3').eq(1).html(data[i].suggest2)
            $('.main-left h3').eq(2).html(data[i].suggest3)
            $('.main-left h3').eq(3).html(data[i].suggest4)
            $('.main-left h3').eq(4).html(data[i].suggest5)
            $('.main-left h3').last().css({
                'color': 'red'
            })
            $('.showimage img').eq(0).attr({
                'src': data[i].pic1
            })
            $('.showimage img').eq(1).attr({
                'src': data[i].pic2
            })
            $('.showimage img').eq(2).attr({
                'src': data[i].pic3
            })
            $('.showima5ge img').eq(3).attr({
                'src': data[i].pic4
            })
            $('.showimage img').eq(4).attr({
                'src': data[i].pic5
            })
            $('.showimage img').eq(5).attr({
                'src': data[i].pic6
            })
            $('.showimage img').eq(6).attr({
                'src': data[i].pic7
            })
        }
    }
}());

Data.init(getUrl());