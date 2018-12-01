var checkInput = {
    // username(str) {
    //     var reg = /^\w{6,20}$/;
    //     return reg.test(str);
    // },
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
            this.$box = document.querySelector(ele);
            this.$phone = this.$box.querySelector('.phone'); //获取手机号输入框
            this.$psw = this.$box.querySelector('.psw'); //获取密码输入框
            this.$psw2 = this.$box.querySelector('.psw2'); //获取确认密码输入框
            this.$ranImg = this.$box.querySelector('im'); //获取随机图片字符输入框
            this.$information = this.$box.querySelector('.information2'); //获取短信验证输入框
            this.$txt = this.$box.querySelector('.showTxt'); //获取验证错误提示语框
            this.$regBtn = this.$box.querySelector('.regBtn'); //获取注册按钮
            this.inpArr = [];
            this.inpArr.push(this.$psw);
            this.inpArr.push(this.$phone);
            //console.log(this.inpArr);
            this.event();
        },
        event() {
            var that = this;
            var phone = this.inpArr[1];
            // debugger;
            for (let i = 0; i < this.inpArr.length; i++) {
                this.inpArr[i].onblur = function() {
                    if (this.value == '') {
                        that.$txt.innerHTML = '输入不能为空';
                    } else {
                        var bool = checkInput[this.name](this.value);
                        if (bool) {
                            // this.$txt.className = 'showTxt2';
                            that.$txt.style.color = 'greenyellow';
                            that.$txt.innerHTML = '验证成功';
                        } else {
                            that.$txt.innerHTML = '您的输入有误';
                        }
                    }
                }
            }
        },
    }
})()

register.init('.page');