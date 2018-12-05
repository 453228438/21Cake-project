var login = (function() {
    var nn;
    var returnPsw;
    return {
        init: function(ele) {
            this.$box = document.querySelector(ele);
            this.$nameBox = this.$box.querySelector('.name_login'); //获取用户名登陆的框
            this.$phoneBox = this.$box.querySelector('.phone_login'); //获取手机登录的框
            this.$tabUl = this.$box.querySelector('.tabLi'); //获取切换li的盒子
            this.$tabLi = this.$tabUl.querySelectorAll('li'); //获取两个切换的li
            this.$loginBox = this.$box.querySelectorAll('.loginBox'); //获取两个切换的登陆框
            this.$username = this.$nameBox.querySelector('.username_login'); //获取用户名输入框
            this.$psw = this.$nameBox.querySelector('.psw_login'); //获取密码输入框
            this.$phone = this.$phoneBox.querySelector('.phone_user'); //获取手机号输入框
            // console.log(this.$phone);
            this.$im = this.$phoneBox.querySelector('.imgTxt'); //获取图片字符输入框
            this.$imim = this.$phoneBox.querySelector('.imgimg'); //获取生成图片字符的框
            this.$inf = this.$phoneBox.querySelector('.informationTxt'); //短息验证码输入框
            this.$imim2 = this.$phoneBox.querySelector('.imgimg2'); //生产短信验证码
            this.$txt1 = this.$nameBox.querySelector('.loginTxt'); //获取验证提示框
            this.$txt2 = this.$phoneBox.querySelector('.phone_Txt'); //验证码提示框2
            this.$btn1 = this.$nameBox.querySelector('.loginBtn'); //获取用户名登陆框的登陆按钮
            this.$btn2 = this.$phoneBox.querySelector('.phone_Btn'); //获取手机登陆的登陆按钮
            this.setRanNum();
            this.event();
        },
        event() {
            var that = this;
            var username = this.$username;
            var psw = this.$psw;
            var phone = this.$phone;
            for (let i = 0; i < this.$tabLi.length; i++) { //点击哪个li，哪个li所对应的索引值的盒子就显示
                this.$tabLi[i].index = i;
                that.$tabLi[i].onclick = function() {
                    for (let j = 0; j < that.$tabLi.length; j++) {
                        that.$tabLi[j].className = '';
                        that.$loginBox[j].style.display = 'none';
                    }
                    this.className = 'li_btnColor';
                    that.$loginBox[this.index].style.display = 'block';
                }

            }
            username.onblur = function() {
                var obj = {
                    data: {
                        username: this.value
                    }
                    // success: function(data) {
                    //     data = JSON.parse(data);
                    //     //console.log(data.code);
                    //     //console.log(data.data);
                    //     if (data.code == '10000') {
                    //         that.$txt1.style.color = 'green';
                    //         that.$txt1.innerHTML = '用户名正确';
                    //         returnPsw = data.data;

                    //     } else if (data.code == '0') {
                    //         that.$txt1.style.color = '#ff714d';
                    //         that.$txt1.innerHTML = '用户名不存在';
                    //         username.classList.add('suc');
                    //     }
                    // }
                }
                sendAjax2('../server/php/login_name.php', obj).then(data => {
                    data = JSON.parse(data);
                    if (data.code == '10000') {
                        that.$txt1.style.color = 'green';
                        that.$txt1.innerHTML = '用户名正确';
                        username.classList.add('suc');
                        returnPsw = data.data;
                        console.log(returnPsw);
                    };
                }).catch(date => {
                    data = JSON.parse(data);
                    if (data.code == '0') {
                        that.$txt1.style.color = '#ff714d';
                        that.$txt1.innerHTML = '用户名不存在';
                    }
                })
            }

            //console.log(returnPsw);
            psw.onblur = function() {
                //console.log(returnPsw);
                if (this.value == returnPsw) {
                    that.$txt1.style.color = 'green';
                    that.$txt1.innerHTML = '密码正确';
                    this.classList.add('suc');
                } else if (this.value == '') {
                    that.$txt1.style.color = '#ff714d';
                    that.$txt1.innerHTML = '输入不能为空';
                } else {
                    that.$txt1.style.color = '#ff714d';
                    that.$txt1.innerHTML = '您的输入有误';
                }
                //sendAjax('../server/php/login_psw.php', obj);
            }
            phone.onblur = function() {
                var obj = {
                    data: {
                        phone: this.value
                    },
                    success: function(data) {
                        data = JSON.parse(data);
                        console.log(data.code);
                        if (data.code == '10000') {
                            that.$txt2.style.color = 'green';
                            that.$txt2.innerHTML = '手机号正确';
                        } else if (data.code == '0') {
                            that.$txt2.style.color = '#ff714d';
                            that.$txt2.innerHTML = '手机号不存在';
                            username.classList.add('suc');
                        }
                    }
                }
                sendAjax('../server/php/login_phone.php', obj);
            }
            this.$imim.onclick = function() { //点击图片字符，就刷新字符
                that.setRanNum();
            }
            this.$im.onblur = function() { //判断输入的字符是否与图片中的符合
                if (this.value == '') {
                    that.$txt2.style.color = '#ff714d';
                    that.$txt2.innerHTML = '输入不能为空';
                } else {
                    var bool = that.checkInput(this.value);
                    if (bool) {
                        that.$txt2.style.color = 'green';
                        that.$txt2.innerHTML = '验证成功';
                        this.classList.add('suc');
                    } else {
                        that.$txt2.style.color = '#ff714d';
                        that.$txt2.innerHTML = '密码不正确';
                        this.onfocus = function() { //如果输入有误，重新获取焦点后刷新字符图片
                            that.setRanNum();
                        }
                    }
                }
            }
            this.$imim2.onclick = function() { //点击按钮后发送四位数的验证码，请在控制台查看
                that.setRaninformation();
                var times = 30; //限时30秒
                var sec = setInterval(function() {
                    that.$imim2.innerHTML = "短信已发送（" + --times + "）"; //倒计时
                    that.$imim2.disabled = true; //开启禁用模式
                    that.$imim2.style.color = '#ccc';
                    that.$imim2.style.cursor = 'default';
                    if (times < 0) { //当时间数完后
                        clearInterval(sec); //清除定时器
                        that.$imim2.disabled = false; //取消禁用模式
                        that.$imim2.innerHTML = "点击获取短信验证码";
                        that.$imim2.style.color = '#000';
                    }
                }, 1000)
            }
            this.$inf.onblur = function() { //当输入框失去焦点时，验证输入内容是否跟发送的一致
                if (this.value == '') {
                    that.$txt2.style.color = '#ff714d';
                    that.$txt2.innerHTML = '输入不能为空';
                } else {
                    var bool = that.checkInput2(this.value);
                    if (bool) {
                        that.$txt2.style.color = 'green';
                        that.$txt2.innerHTML = '验证成功';
                        this.classList.add('suc');
                    } else {
                        that.$txt2.style.color = '#ff714d';
                        that.$txt2.innerHTML = '您的输入有误';
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
            console.log(tt);
            this.$imim.innerHTML = tt;
            // console.log(that.$im.innerHTML);
        },
        checkInput(str) {
            var that = this;
            var reg = this.$imim.innerHTML;
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
        checkInput2(str) {
            // console.log(nn);
            var reg2 = nn;
            return str == reg2;
        }
    }
})()

login.init('.loginPage');