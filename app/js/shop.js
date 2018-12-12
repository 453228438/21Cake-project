$(function() {
    var $classification = $('.classification li');

    var $ulList = $('.shopMainInner ul');
    //console.log($ulList);

    $classification.children('a').click(function() {
        // console.log(1);
        // console.log($(this));
        var index = $(this).parent().index();
        //console.log(index);
        $(this).addClass('thisClass').parent().siblings().children('a').removeClass('thisClass');
        $ulList.eq(index - 1).show().siblings().hide();

    })
})