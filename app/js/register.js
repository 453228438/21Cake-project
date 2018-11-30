var checkInput = {
    username(str) {
        var reg = /^\w{6,20}$/;
        return reg.test(str);
    },
    password(str) {
        var reg = /^\w{6,20}$/;
        return reg.test(str);
    },
    phone(str) {
        var reg = /^1[35789]\d{9}$/;
        return reg.test(str);
    },
}

var register = (function() {
    return {
        init: function(ele) {
            this.$box = $(ele);
            this.$phone = $('.phone'); //获取手机号输入框
            this.$psw = $('.psw'); //获取密码输入框
            this.$psw2 = $('.psw2'); //获取确认密码输入框
            this.$ranImg = $('im'); //获取随机图片字符输入框
            this.$information = $('.information2'); //获取短信验证输入框
            this.$txt = $('.showTxt'); //获取验证错误提示语框
            this.$regBtn = $('.regBtn'); //获取注册按钮
            this.event();
        },
        event() {
            var that = this;
        },
    }
})()

register.init('.page');