var car = (function() {
    return {
        init() {
            this.event();
            this.getData()
        },
        event() {

        },
        getData() {
            var shopList = localStorage.shopList;
            shopList = JSON.parse(shopList)
            if (shopList.length == 0) {
                return
            }
            this.data = shopList;
            this.insertData(shopList)
        },
        insertData(data) {
            $('.mainInner').children().remove()
            $('.mainInner').css({
                'padding-top': '100px'
            })
            $('.mainInner').append('<div class="list"><h2>商品</h2><h2>生日牌</h2><h2>单价</h2><h2>数量</h2><h2>金额</h2></div>')
            $('.mainInner .list').css({
                'width': '1195px',
                'height': '46px',
                'border': '1px solid #e1e1e1',
                'backgroundColor': '#fafafa',
                'boxSizing': 'border-Box'
            })
            $('.mainInner .list h2').css({
                'float': 'left',
                'fontSize': '14px'
            })
            $('.mainInner .list h2').eq(0).css({
                'marginLeft': '166px'
            })
            $('.mainInner .list h2').eq(1).css({
                'marginLeft': '260px'
            })
            $('.mainInner .list h2').eq(2).css({
                'marginLeft': '260px'
            })
            $('.mainInner .list h2').eq(3).css({
                'marginLeft': '88px'
            })
            $('.mainInner .list h2').eq(4).css({
                'marginLeft': '124px'
            })
            $('.mainInner').append('<table></table>')
            data.forEach((item, index) => {
                $('.mainInner table').append('<tr><td><a href=""><div></div></a></td><td><section><h2><a href=""></a></h2><span class="kg"></span><span class="tableware"><i></i>赠送5套餐具</span></section></td><td><select><option value ="volvo">选择生日牌</option><option value ="volvo">生日快乐</option><option value ="volvo">Happly Birthday</option><option value ="volvo">节日快乐</option></select></td><td><h2></h2></td><td><main class="num"><input type="button" class="left" value="-" /><input type="text" class="text"/><input type="button" class="right" value="+" /></main></td><td><h2 class="meony"></h2></td><td><button type="button" class="delete">删除商品</button></td></tr>');
                $('.mainInner table tr').find('div').eq(index).css({
                    'backgroundImage': 'url(' + item.banner1 + ')'
                })
                $('.mainInner table tr td:nth-child(2) section h2 a').eq(index).html(item.title)
                $('.mainInner table tr td:nth-child(2) section .kg').eq(index).html('规格 :' + item.kg)
                $('table tr td:nth-child(4) h2').eq(index).html(item.picle)
                $('table tr td:nth-child(5) .num .text').eq(index).val(item.count)
                $('table tr td:nth-child(6) .meony').eq(index).html((item.count * item.num) + '元')
            });
            $('.mainInner').append('<div class="balance"><a href="#" class="empty">全部清空</a><ul class="total"><li>商品金额：¥ <span></span></li><li>配送费：¥ 0.00</li><li>活动优惠：¥ 0.00</li></ul><ul class="heji"><span class="abc">合计：¥<span></span></span></ul><h2><span>订单已满￥100元,享免费配送服务</span></h2><h3 class="btn"><a href="javascript:;" id="aaa">去结算</a></h3></div>');
            $num = 0;
            for (var i = 0; i < data.length; i++) {
                $num += data[i].count * data[i].num
            }
            $('.car_main .mainInner .balance .total li').eq(0).children('span').html($num)
            $('.car_main .mainInner .balance .heji .abc span').html($num)
            $('table tr td:nth-child(5) .num .text').blur(function() {
                $index = $(this).parent().parent().parent().index();
                data[$index].count = $(this).val() - 0;
                $(this).parent().parent().next().children('.meony').html((data[$index].count * data[$index].num) + '元')
                $num = 0;
                for (var i = 0; i < data.length; i++) {
                    $num += data[i].count * data[i].num
                }
                $('.car_main .mainInner .balance .total li').eq(0).children('span').html($num)
                $('.car_main .mainInner .balance .heji .abc span').html($num)
                localStorage.shopList = JSON.stringify(data)
            })
            $('table tr td:nth-child(5) .num .left').click(function() {
                $index = $(this).parent().parent().parent().index()
                if ($(this).next().val() >= 2) {
                    $(this).next().val($(this).next().val() - 1)
                    data[$index].count -= 1;
                    $(this).parent().parent().next().children('.meony').html((data[$index].count * data[$index].num) + '元')
                    $num = 0;
                    for (var i = 0; i < data.length; i++) {
                        $num += data[i].count * data[i].num
                    }
                    $('.car_main .mainInner .balance .total li').eq(0).children('span').html($num)
                    $('.car_main .mainInner .balance .heji .abc span').html($num)
                    localStorage.shopList = JSON.stringify(data)
                }
            })
            $('table tr td:nth-child(5) .num .right').click(function() {
                $index = $(this).parent().parent().parent().index()
                $(this).prev().val($(this).prev().val() - 0 + 1)
                data[$index].count += 1;
                $(this).parent().parent().next().children('.meony').html((data[$index].count * data[$index].num) + '元')
                $num = 0;
                for (var i = 0; i < data.length; i++) {
                    $num += data[i].count * data[i].num
                }
                $('.car_main .mainInner .balance .total li').eq(0).children('span').html($num)
                $('.car_main .mainInner .balance .heji .abc span').html($num)
                localStorage.shopList = JSON.stringify(data)

            })
            $('table tr td:nth-child(7) .delete').click(function() {
                $index = $(this).parent().parent().index();
                data.splice($index, 1)
                $(this).parent().parent().remove();
                $num = 0;
                for (var i = 0; i < data.length; i++) {
                    $num += data[i].count * data[i].num
                }
                $('.car_main .mainInner .balance .total li').eq(0).children('span').html($num)
                $('.car_main .mainInner .balance .heji .abc span').html($num)
                localStorage.shopList = JSON.stringify(data)
            })
            $('.car_main .mainInner .balance .btn #aaa').click(function() {
                $cook = cookieUser.getCookId()
                if ($cook != undefined) {
                    alert('可以进行结算！');
                } else {
                    alert('请先登录！');
                    if (alert) {
                        window.location.href = "login.html";
                    }
                }
                console.log(cookieUser.getCookId())
                console.log($num);
            })
            console.log($('.car_main .mainInner .balance .total li').eq(0).children('span'))
        }
    }
}())
car.init();