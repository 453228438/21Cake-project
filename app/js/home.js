$(function() { //入口函数
    var _index = 0;

    var timer = null;
    fn(_index);

    function fn(_index) {
        timer = setInterval(function() {
            _index++;
            if (_index >= 5) {
                _index = 0;
            }
            $('.smallBtn li').eq(_index).addClass('thisBtn').siblings().removeClass('thisBtn');
            $('.bannerBox li').eq(_index).fadeIn(2000).siblings('li').fadeOut();
        }, 3000)
    }


    $('.smallBtn li').click(function() {

        var index = $(this).index();
        _index = index;
        $('.smallBtn li').eq(_index).addClass('thisBtn').siblings().removeClass('thisBtn');
        $('.bannerBox li').eq(_index).fadeIn(2000).siblings('li').fadeOut();
        clearInterval(timer);
        fn(_index);
        // $('.bannerBox li').eq(index).zIndex = 9;
    })
})