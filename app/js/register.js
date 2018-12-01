var checkInput = {
    // username(str) {
    //     var reg = /^\w{6,20}$/;
    //     return reg.test(str);
    // },
    phone(str) {
        var reg = /^1[35789]\d{9}$/;
        return reg.test(str);
    },
    password(str) {
        var reg = /^\w{6,20}$/;
        return reg.test(str);
    }
    // im(str) {
    //     var reg = document.querySelector('.ran_im').innerHTML;
    //     console.log(reg);
    //     return str == reg;

    // }

}

var register = (function() {
    return {
        init: function(ele) {
            this.$box = document.querySelector(ele);
            this.$phone = this.$box.querySelector('.phone'); //获取手机号输入框
            this.$psw = this.$box.querySelector('.psw'); //获取密码输入框
            this.$psw2 = this.$box.querySelector('.psw2'); //获取确认密码输入框
            this.$ranImg = this.$box.querySelector('.im'); //获取随机图片字符输入框
            this.$information = this.$box.querySelector('.information2'); //获取短信验证输入框
            this.$txt = this.$box.querySelector('.showTxt'); //获取验证错误提示语框
            this.$regBtn = this.$box.querySelector('.regBtn'); //获取注册按钮
            this.inpArr = this.$box.querySelectorAll('input');
            this.$im = this.$box.querySelector('.ran_im');
            // this.inpArr.push(this.$psw);
            // this.inpArr.push(this.$phone);
            console.log(this.inpArr);
            this.event();
            this.setRanNum();
            // this.checkInput2(str);
        },
        event() {
            var that = this;
            var phone = this.inpArr[0];
            // debugger;
            for (let i = 0; i < this.inpArr.length; i++) {
                this.inpArr[i].onblur = function() {
                    if (this.value == '') {
                        that.$txt.style.color = '#ff714d';
                        that.$txt.innerHTML = '输入不能为空';
                    } else {
                        var bool = checkInput[this.name](this.value);
                        if (bool) {
                            // this.$txt.className = 'showTxt2';
                            // that.$txt.style.color = 'green';
                            // that.$txt.innerHTML = '验证成功';
                        } else {
                            that.$txt.style.color = '#ff714d';
                            that.$txt.innerHTML = '您的输入有误';
                        }
                    }
                }
            }
            phone.onchange = function() {
                console.log(this.value);
                var obj = {
                    // method: 'POST',
                    data: {
                        phone: this.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        console.log(data.code);
                        if (data.code == '10000') {
                            that.$txt.style.color = '#ff714d';
                            that.$txt.innerHTML = '手机号已存在';
                        } else if (data.code == '0') {
                            that.$txt.style.color = 'green';
                            that.$txt.innerHTML = '手机号可以使用';
                        }
                    }
                }
                sendAjax('../server/php/register.php', obj);
            }
            this.$im.onclick = function() { //点击图片字符，就刷新字符
                that.setRanNum();
            }
            this.$ranImg.onblur = function() { //判断输入的字符是否与图片中的符合
                if (this.value == '') {
                    that.$txt.style.color = '#ff714d';
                    that.$txt.innerHTML = '输入不能为空';
                } else {
                    var bool = that.checkInput2(this.value);
                    if (bool) {
                        that.$txt.style.color = 'green';
                        that.$txt.innerHTML = '验证成功';
                    } else {
                        that.$txt.style.color = '#ff714d';
                        that.$txt.innerHTML = '您的输入有误';
                        this.onfocus = function() { //如果输入有误，重新获取焦点后刷新字符图片
                            that.setRanNum();
                        }
                    }
                }
            }
        },
        setRanNum() {
            var that = this;
            var ranArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
            var tt = '';
            for (let i = 0; i < 4; i++) {
                var ran = getRandom(ranArr.length - 1, 0);
                tt += ranArr[ran];
            }
            that.$im.innerHTML = tt;
            // console.log(that.$im.innerHTML);
        },
        checkInput2(str) {
            var that = this;
            var reg = this.$im.innerHTML;
            return str == reg;

        },
    }
})()

register.init('.page');