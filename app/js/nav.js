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