var login = (function() {
    return {
        init: function(ele) {
            this.$box = document.querySelector(ele);
            this.$tabUl = this.$box.querySelector('.tabLi'); //获取切换li的盒子
            this.$tabLi = this.$tabUl.querySelectorAll('li'); //获取两个切换的li
            this.$loginBox = this.$box.querySelectorAll('.loginBox'); //获取两个切换的登陆框
            this.event();
        },
        event() {
            var that = this;
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

        },
    }
})()

login.init('.loginPage');