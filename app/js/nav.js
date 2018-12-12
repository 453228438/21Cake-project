// var nav = (function() {
//     return {
//         init(ele) {
//             this.$box = document.querySelector(ele);
//             this.$fatherList = this.$box.querySelectorAll('.nav2 .posFather');
//             this.$sonList = this.$box.querySelectorAll('.nav2 .pos');
//             // this.$app = this.$list[1]; //app
//             // this.$place = this.$list[2]; //地区
//             // this.$news = this.$list[3]; //消息
//             this.event();
//         },
//         event() {
//             var that = this;
//             $(this.$fatherList).on('mouseOver', function() {
//                     console.log($(this).index('.posFather'));
//                 })
//                 // for (let i = 0; i < this.$fatherList.length; i++) {
//                 //     that.$fatherList[i].index = i;
//                 //     that.$fatherList[i].onmouseover = function() {
//                 //         for (let j = 0; j < that.$fatherList.length; j++) {
//                 //             $(that.$sonList[j]).slideUp();
//                 //         }

//             //         that.showBox(that.$sonList[this.index]);
//             //     }
//             // }
//             // for (let i = 0; i < this.$fatherList.length; i++) {
//             //     that.$fatherList[i].index = i;
//             //     that.$fatherList[i].onmouseleave = function() {
//             //         that.hideBox(that.$sonList[this.index]);
//             //     }
//             // }



//         },
//         showBox(ele) {
//             // move(ele, { '' })
//             return $(ele).slideDown();
//             console.log('1');
//         },
//         hideBox(ele) {
//             return $(ele).slideUp();
//         }
//     }
// })()
// nav.init('.headerInner');
function Carlist() {
    var arr = localStorage.shopList || '[]';
    arr = JSON.parse(arr);
    localStorage.shopList = JSON.stringify(arr)
    var list = JSON.parse(localStorage.shopList);
    var $i = document.querySelector('.ii');
    var num = 0;
    for (let i = 0; i < list.length; i++) {
        num += list[i].count;
    }
    if (num == 0) {
        $i.style.display = 'none';
    } else if (num > 0) {
        $i.style.display = 'block';
        $i.innerHTML = num;
    }
    console.log(num);
}

$(function() {
    var $li = $('.posFather');
    // var $showBox = $('.pos');
    var $ii = $li.eq(1).children().children('.i1');
    // console.log($showBox);
    // console.log($li);
    //console.log($li.eq(1).children().children('.i1'));

    $li.mouseenter(function() {
        // var index = $(this).index();
        // // $showBox.show();
        // // console.log('111');
        // $showBox.eq(index).show();
        $(this).children('.pos').show();
    })
    $li.mouseleave(function() {
        // var index = $(this).index();
        // $showBox.eq(index).hide();
        $(this).children('.pos').hide();
    })

    $('.place').children().children('a').click(function() {
        var text = $(this).text();
        $ii.text(function() {
            // console.log($(this))
            return text;
        })
    })
})

var search = (function() {
    return {
        init(ele) {
            this.$box = document.querySelector(ele);
            this.$inp = this.$box.querySelector('input');
            this.$searchBox = this.$box.querySelector('.searchBox');
            this.event();
        },
        event() {
            var that = this;
            this.$inp.oninput = function() {
                if (this.value != '') {
                    // 获取数据
                    clearTimeout(this.time);
                    // 减少http请求
                    this.time = setTimeout(_ => {
                        that.getData(this.value);
                    }, 500)
                } else {
                    that.$searchBox.style.display = 'none';
                }
            }
            this.$inp.onfocus = function() {
                if (this.value != '') {
                    that.$searchBox.style.display = 'block';
                }

            }
            this.$inp.onblur = function() {
                // 隐藏结果栏
                that.$searchBox.style.display = 'none';

            }
        },
        getData(val) {
            var that = this;
            var reg = new RegExp(val);
            var obj = {
                data: {
                    value: val
                }
            }
            sendAjax2('http://localhost:3333/21Cake-project/server/json/search.json', obj).then(res => {
                res = JSON.parse(res);
                var arr = [];
                res.filter(item => {

                    if (item.match(reg.exec(item))) {
                        arr.push(item.match(reg.exec(item)));
                    }
                })
                that.insertData(arr);
                console.log(arr);
            })
        },
        insertData(data) {
            var that = this;
            // console.log(data);
            // data = data[3];
            this.$searchBox.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                let $li = document.createElement('li');
                $li.innerHTML = data[i].input;
                console.log(data[i]);
                this.$searchBox.appendChild($li);
            }
            this.$searchBox.style.display = 'block';
        }
    }
})()

search.init('.headerInner');

var insertData = search.insertData.bind(search);