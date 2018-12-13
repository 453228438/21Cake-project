console.log(111);
var cookieUser = (function() {
    return {
        init(ele) {
            this.$cooker = document.querySelector(ele);
            //this.$cookChild = this.$cooker.children;
            // console.log(this.$cookChild);
            this.event();
            //this.getCookId();
        },
        event() {
            var that = this;
            if (this.getCookId() != undefined) {
                that.$cooker.innerHTML = '';
                that.$cooker.innerHTML = "<a href='javascript:;'>" + `${this.getCookId()}` + "</a>";
                that.$cooker.style.padding = 0;
                that.$cooker.style.position = 'relative';
                that.create();
                $(that.$cooker).mouseenter(function() {
                    $(this).children('.esc').show();
                })
                $(that.$cooker).mouseleave(function() {
                    $(this).children('.esc').hide();
                })
                $(that.$cooker).children('.esc').children().click(function() {
                    that.removeCookie();
                    // console.log(111);
                })
            }

        },
        getCookId() {
            var cookObj = cookie.getItem('username');
            return cookObj;
        },
        create() {
            var that = this;
            var $div = document.createElement('div');
            $div.classList.add('esc');
            $div.innerHTML = "<a href = '#'>退出</a>";
            // console.log($div);
            // console.log(that.$cooker);
            that.$cooker.appendChild($div);
        },
        removeCookie() {
            // var that = this;
            cookie.clear();
            console.log(222);
            this.$cooker.innerHTML = '';
            this.$cooker.innerHTML = " <a href='login.html'>登录</a>/<a href='register.html'>注册</a>";
        }
    }
})()
cookieUser.init('.cook');