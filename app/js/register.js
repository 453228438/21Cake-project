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
    var nn;
    return {
        init: function(ele) {
            this.$box = document.querySelector(ele);
            this.$phone = this.$box.querySelector('.phone'); //获取手机号输入框
            this.$psw = this.$box.querySelector('.psw'); //获取密码输入框
            this.$psw2 = this.$box.querySelector('.psw2'); //获取确认密码输入框
            this.$ranImg = this.$box.querySelector('.im'); //获取随机图片字符输入框
            this.$information = this.$box.querySelector('.information'); //获取短信验证输入框
            this.$txt = this.$box.querySelector('.showTxt'); //获取验证错误提示语框
            this.$regBtn = this.$box.querySelector('.regBtn'); //获取注册按钮
            // this.inpArr = this.$box.querySelectorAll('input');
            this.$im = this.$box.querySelector('.ran_im'); //获取生成随机字符的框
            this.$ifm = this.$box.querySelector('.information2'); //获取生成随机短信验证的框
            this.$birth = this.$box.querySelector('.date');
            this.inpArr = [];
            this.inpArr.push(this.$psw);
            this.inpArr.push(this.$phone);
            console.log(this.inpArr);
            this.event();
            this.setRanNum();
            // this.checkInput2(str);
        },
        event() {
            var that = this;
            var phone = this.inpArr[1];
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
                            that.$txt.style.color = 'green';
                            that.$txt.innerHTML = '验证成功';
                            this.classList.add('suc');
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
                            phone.classList.add('suc');
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
                        this.classList.add('suc');
                    } else {
                        that.$txt.style.color = '#ff714d';
                        that.$txt.innerHTML = '您的输入有误';
                        this.onfocus = function() { //如果输入有误，重新获取焦点后刷新字符图片
                            that.setRanNum();
                        }
                    }
                }
            }
            this.$ifm.onclick = function() { //点击按钮后发送四位数的验证码，请在控制台查看
                that.setRaninformation();
                var times = 30; //限时30秒
                var sec = setInterval(function() {
                    that.$ifm.innerHTML = "短信已发送（" + --times + "）"; //倒计时
                    that.$ifm.disabled = true; //开启禁用模式
                    that.$ifm.style.color = '#ccc';
                    that.$ifm.style.cursor = 'default';
                    if (times < 0) { //当时间数完后
                        clearInterval(sec); //清除定时器
                        that.$ifm.disabled = false; //取消禁用模式
                        that.$ifm.innerHTML = "点击获取短信验证码";
                        that.$ifm.style.color = '#000';
                    }
                }, 1000)
            }
            this.$information.onblur = function() { //当输入框失去焦点时，验证输入内容是否跟发送的一致
                if (this.value == '') {
                    that.$txt.style.color = '#ff714d';
                    that.$txt.innerHTML = '输入不能为空';
                } else {
                    var bool = that.checkInput3(this.value);
                    if (bool) {
                        that.$txt.style.color = 'green';
                        that.$txt.innerHTML = '验证成功';
                        this.classList.add('suc');
                    } else {
                        that.$txt.style.color = '#ff714d';
                        that.$txt.innerHTML = '您的输入有误';
                    }
                }
            }
            this.$psw.addEventListener('blur', function() {
                that.$psw2.onblur();
            })
            this.$psw2.onblur = function() { //当二次密码框失去焦点后，验证是否和一次密码框的密码一致
                if (this.value === that.$psw.value) {
                    that.$txt.style.color = 'green';
                    that.$txt.innerHTML = '验证成功';
                    this.classList.add('suc');
                } else {
                    that.$txt.style.color = '#ff714d';
                    that.$txt.innerHTML = '您两次的密码不一致';
                }
            }
            this.$regBtn.onclick = function() { //点击注册按钮时，
                var $txtAll = that.$box.querySelectorAll('input'); //获取所有的input输入框
                for (let i = 0; i < $txtAll.length; i++) {
                    // console.log(i);
                    if ($txtAll[i].className.indexOf('suc') == -1) { //判断它们是否有suc的class名，此class名表示已验证成功
                        $txtAll[i].focus(); //如果没有就获取该输入框的焦点
                        return false; //不允许跳转
                    }
                }
            }
            this.$birth.onblur = function() { //判断用户是否输入了生日
                if (this.value == '') {
                    that.$txt.style.color = '#ff714d';
                    that.$txt.innerHTML = '输入不能为空';
                } else {
                    that.$txt.style.color = 'green';
                    that.$txt.innerHTML = '验证成功';
                    this.classList.add('suc');
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
        setRaninformation() {
            var ranifm = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            nn = '';
            for (let i = 0; i < 4; i++) {
                var ri = getRandom(ranifm.length - 1, 0);
                nn += ranifm[ri];
            }
            console.log(nn);
        },
        checkInput3(str) {
            // console.log(nn);
            var reg2 = nn;
            return str == reg2;
        }
    }
})()

register.init('.page');