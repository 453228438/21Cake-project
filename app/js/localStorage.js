var car = (function () {
    return {
        init(i) {
            getData(i)
        },
        getData(i) {
            var _this = this;
            $.ajax('http://localhost:8887/21Cake-project/server/json/detallPages.json', {
                type: 'post',
                contentType: 'application/json',
                success(res) {
                    _this.setItem(res, i)
                }
            })
        },
        setItem(res, i) {
            res = res.data[i];
            console.log(res)
            var obj = {};
            var shopList = localStorage.shopList || '{}';
            shopList.id = res.id //id
            shopList.title = res.title //名称
            shopList.banner = res.banner1 //图片
            shopList.picle = res.picle //单价
            shopList.count = 0; //数量
            console.log(shopList)
            //  localStorage.shopList = shopList
        }
    }
}())