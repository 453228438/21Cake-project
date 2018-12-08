var Data = (function () {
    return {
        init() {
            this.getData();
        },
        event() {

        },
        getData() {
            var _this = this;
            $.ajax('http://localhost:8887/21Cake-project/server/json/detallPages.json', {
                type: 'post',
                contentType: 'application/json',
                success(res) {
                    _this.insertData(res);
                }
            })
        },
        insertData(data) {
            data = data.data;
            console.log(data)
            $('.big-banner').css({
                'backgroundImage': 'url(' + data[3].banner1 + ')'
            })
            $('.min-banner').children('div').eq(0).css({
                'backgroundImage': 'url(' + data[3].banner1 + ')'
            })
            $('.min-banner').children('div').eq(1).css({
                'backgroundImage': 'url(' + data[3].banner2 + ')'
            })
            $('.min-banner').children('div').eq(2).css({
                'backgroundImage': 'url(' + data[3].banner3 + ')'
            })
            // $('.min-banner').children('div').eq(2).remove()
            $('.main-left h1').html(data[3].title);
            $('p.left').html(data[3].title);
            $('p.right').html(data[3].picle);
            $('.details-img-box').children('span').eq(0).children('span').html(data[3].spec)
            $('.details-img-box').children('span').eq(1).children('span').html(data[3].share)
            $('.details-img-box').children('span').eq(2).children('span').html(data[3].tableware)
            $('.details-img-box').children('span').eq(3).children('span').html(data[3].time)
            $('.main-right .details-img-box').children('span').eq(0).children('span').html(data[3].spec)
            $('.main-right .details-img-box').children('span').eq(1).children('span').html(data[3].share)
            $('.main-right .details-img-box').children('span').eq(2).children('span').html(data[3].tableware)
            $('.main-right .details-img-box').children('span').eq(3).children('span').html(data[3].time)
            console.log($('div.number'))
            $('div.number').css({
                cursor: 'pointer'
            })
            $('i.canju').css({
                'backgroundImage': 'url(http://localhost:8887/21Cake-project/app/font/canju.png)'
            })
            $('.money').remove()
            $('div.number').eq(0).html(data[3].kg1)
            $('div.number').eq(1).html(data[3].kg2)
            $('div.number').eq(2).html(data[3].kg3)
            $('div.number').eq(3).html(data[3].kg4)
            $('div.number').eq(4).html(data[3].kg1)
            $('div.number').eq(5).html(data[3].kg2)
            $('div.number').eq(6).html(data[3].kg3)
            $('div.number').eq(7).html(data[3].kg4)
            $('div.number').eq(0).append('<i class="iconfont icon-chenggong"></i>')
            $('div.number').eq(4).append('<i class="iconfont icon-chenggong"></i>')
            $('div.number').on('click', function () {
                $(this).append('<i class="iconfont icon-chenggong"></i>');
            })
            $('.options div.number').click(function () {
                $(this).siblings().children('i').remove();
                if ($(this).index() == 1) {
                    $('p.right').html(data[3].picle);
                }
                if ($(this).index() == 2) {
                    $('p.right').html(data[3].picle2);
                }
                if ($(this).index() == 3) {
                    $('p.right').html(data[3].picle3);
                }
                if ($(this).index() == 4) {
                    $('p.right').html(data[3].picle4);
                }
                $('.main-right div.number').eq($(this).index() - 1).append('<i class="iconfont icon-chenggong"></i>').siblings().children('i').remove();
            })
            $('.main-right div.number').click(function () {
                $(this).siblings().children('i').remove()
                if ($(this).index() == 1) {
                    $('p.right').html(data[3].picle);
                }
                if ($(this).index() == 2) {
                    $('p.right').html(data[3].picle2);
                }
                if ($(this).index() == 3) {
                    $('p.right').html(data[3].picle3);
                }
                if ($(this).index() == 4) {
                    $('p.right').html(data[3].picle4);
                }
                $('.options div.number').eq($(this).index() - 1).append('<i class="iconfont icon-chenggong"></i>').siblings().children('i').remove();
            })
            $('.main-left p a').eq(0).html(data[3].tag1)
            $('.main-left p a').eq(1).html(data[3].tag2)
            $('.main-left p a').eq(2).html(data[3].tag3)
            $('.main-left p').append('<a href=""></a>')
            $('.main-left p').append('<a href=""></a>')
            $('.main-left p').append('<a href=""></a>')
            $('.main-left p').append('<a href=""></a>')
            $('.main-left p a').eq(3).html(data[3].tag4)
            $('.main-left p a').eq(4).html(data[3].tag5)
            $('.main-left p a').eq(5).html(data[3].tag6)
            $('.main-left p a').eq(6).html(data[3].tag7)

            $('.main-left p a').eq(3).html(data[3].tag4)
            $('.main-left h3').eq(0).html(data[3].suggest1)
            $('.main-left h3').eq(1).html(data[3].suggest2)
            $('.main-left h3').eq(2).html(data[3].suggest3)
            $('.main-left h3').eq(3).html(data[3].suggest4)
            $('.main-left h3').eq(4).html(data[3].suggest5)
            $('.main-left h3').last().css({
                'color': 'red'
            })
            $('.showimage img').eq(0).attr({
                'src': data[3].pic1
            })
            $('.showimage img').eq(1).attr({
                'src': data[3].pic2
            })
            $('.showimage img').eq(2).attr({
                'src': data[3].pic3
            })
            $('.showimage img').eq(3).attr({
                'src': data[3].pic4
            })
            $('.showimage img').eq(4).attr({
                'src': data[3].pic5
            })
            $('.showimage img').eq(5).attr({
                'src': data[3].pic6
            })
            $('.showimage img').eq(6).attr({
                'src': data[3].pic7
            })

        }
    }
}());

Data.init();