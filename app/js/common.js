// function $my(ele) {
//     return document.querySeletor(ele);
// }




// 生成随机色
function getColor() {
    var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    var str = '#';
    // 生成随机色, 从arr中随机挑选6个元素
    for (var i = 0; i < 6; i++) {
        var index = getRandom(arr.length - 1, 0);
        str += arr[index];
    }
    return str;
}


function getRandom(max, min) {
    min = 0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// 数组去重
function noRepate(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) == -1) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}



function sortArr(arr) {
    var newArr = [];
    for (var i = 0, length = arr.length; i < length; i++) {
        var _random = getRandom(arr.length - 1);
        newArr.push(arr[_random]);
        // 把加入的元素,从原数组中删除
        arr.splice(_random, 1);

    }
    console.log(newArr);
}



function getStyle(ele, attr) {
    if (window.getComputedStyle) { //判断有没有这个属性
        return window.getComputedStyle(ele, null)[attr]; //[attr] = .attr;
    }
    return ele.currentStyle[attr];
}




//获取任意标签中的文本内容
function getInnerText(element) {
    if (element.textContent == "undefined") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}



//设置任意标签中的任意文本内容
function setInnerText(element, text) {
    if (typeof element.textContent == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}



//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element) { //true支持
    if (typeof element.firstElementChild) {
        return element.firstElementChild;
    } else {
        var node = element.firstChild; //第一个节点
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}



//获取任意一个父级元素的最后一个子级元素
function getlastElementChild(element) { //true支持
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild; //第一个节点
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}



//为任意元素，绑定任意的事件（任意的元素，事件的类型，事件处理函数）
function addEventListener(element, type, fn) {
    if (element.addEventListener) { //判断是否存在这个方法
        element.addEventListener(type, fn, false); //如果存在便执行
    } else if (element.attachEvent) { //如果上面的不存在，则判断这个方法存不存在
        element.attachEvent("on" + type, fn); //存在便执行
    } else {
        element["on" + tpye] = fn;
    }
}



//为任意元素，解绑任意的事件（任意的元素，事件的类型，事件处理函数的名字）
// function removeEventListener(element, type, fnName) {
//     if (element.removeEventListener) { //判断是否存在这个方法
//         element.removeEventListener(type, fnName, false); //如果存在便执行
//     } else if (element.detachEvent) { //如果上面的不存在，则判断这个方法存不存在
//         element.detachEvent("on" + type, fnName); //存在便执行
//     } else {
//         element["on" + tpye] = fnName;
//     }
// }



//获取浏览器向上滚动后的卷曲值或向右滚动后的卷曲值
function getScroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    }
}


//多物体多属性
function move($ele, targetObj, time = 200, callback) {

    if (typeof $ele === 'string') {
        $ele = document.querySelector($ele);
    }
    // 确保是dom对象以后, 在清除定时器
    clearInterval($ele.timer);

    // 获取每个属性的速度
    var speedObj = {};
    for (var attr in targetObj) {
        // 获取初始值
        var attrVal = getStyle($ele, attr);
        if (attr == 'opacity') {
            attrVal *= 100;
        }
        attrVal = parseFloat(attrVal);

        var speed = (targetObj[attr] - attrVal) / (time / 10);
        speedObj[attr] = speed;
    }
    console.log(speedObj);

    $ele.timer = setInterval(_ => {

        var flag = true;

        for (var attr in targetObj) {
            // 根据不同属性获取初始值
            var attrVal = getStyle($ele, attr);
            if (attr == 'opacity') {
                attrVal *= 100;
            }
            attrVal = parseFloat(attrVal);
            var speed = speedObj[attr];
            var target = targetObj[attr];
            attrVal += speed;

            if ((speed > 0 && attrVal >= target) || (speed < 0 && attrVal <= target)) {
                attrVal = target;
            } else {
                flag = false
            }
            if (attr == 'opacity') {
                $ele.style[attr] = attrVal / 100;
            } else {
                $ele.style[attr] = attrVal + 'px';
            }
        }
        if (flag) {
            clearInterval($ele.timer);
            // 目标已到达指定位置, 请指示
            console.log('目标已到达指定位置, 请指示');
            if (typeof callback == 'function') {
                callback($ele);
            }
        }
    }, 10)
}




function sendAjax(url, obj) {
    const xhr = new XMLHttpRequest();
    const _default = {
        method: 'GET',
        data: null,
        success: undefined
    }
    for (var key in _default) {
        if (key in obj) {
            _default[key] = obj[key];
        }
    }
    _default.method = _default.method.toUpperCase()
    if (_default.method == 'GET') {
        // json/a.json?id=10&name=xixi&age=10&_=19191918
        let flag = url.indexOf('?') == -1 ? "?" : "&";
        url += flag;
        for (var i in _default.data) {
            let keyValue = `${i}=${_default.data[i]}`;
            url += keyValue + '&';
        }
        // 添加一个时间戳, 解决get请求的缓存问题
        url += `_=${Date.now()}`;
        console.log(url);
        _default.data = null;
    } else if (_default.method == 'POST') {
        //xhr.setRequestHeader('Content‐Type', 'application/x‐www‐form‐urlencoded');
        _default.data = JSON.stringify(_default.data);
    } else {
        console.log('告辞!');
        return;
    }

    xhr.open(_default.method, url, true);
    //xhr.setRequesbtHeader('Content‐Type', 'application/x‐www‐form‐urlencoded');
    xhr.send(_default.data);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let data = xhr.response;
            if (typeof _default.success == 'function') {
                _default.success(data);
            }
        }
    }
}





//  解决get请求的缓存问题
function sendAjax2(url, obj) {
    const xhr = new XMLHttpRequest();
    const _default = {
        method: 'GET',
        data: null
    }
    if (typeof obj == "object") {
        for (var key in _default) {
            if (key in obj) {
                _default[key] = obj[key];
            }
        }
    }
    _default.method = _default.method.toUpperCase()
    if (_default.method == 'GET') {
        // json/a.json?id=10&name=xixi&age=10&_=19191918
        let flag = url.indexOf('?') == -1 ? "?" : "&";
        url += flag;
        for (var i in _default.data) {
            let keyValue = `${i}=${_default.data[i]}`;
            url += keyValue + '&';
        }
        // 添加一个时间戳, 解决get请求的缓存问题
        url += `_=${Date.now()}`;
        console.log(url);
        _default.data = null;
    } else if (_default.method == 'POST') {

        _default.data = JSON.stringify(_default.data);
    } else {
        console.log('告辞!');
        return;
    }

    xhr.open(_default.method, url, true);
    xhr.send(_default.data);
    return new Promise(function(resolve, reject) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let data = xhr.response;
                    resolve(data);
                } else {
                    let data = xhr.response;
                    reject(data);
                }
            }
        }
    })
}




// jsonp只适用于get请求

function sendJsonp(url, data) {
    var $script = document.createElement('script');
    var flag = url.indexOf('?') == -1 ? '?' : '&';
    url += flag;

    if (typeof data == "object") {
        for (var i in data) {
            url += `${i}=${data[i]}` + '&';
        }
    }
    url += '_=' + Date.now();
    $script.src = url;
    document.body.appendChild($script);


}



//cookie
var cookie = (function() {

    return {
        getItem(key) {
            return this.getObject()[key];
        },
        getObject() {
            var obj = {};
            var cookieAll = document.cookie.split('; ');
            cookieAll.forEach(item => {
                var _item = item.split('=');
                obj[_item[0]] = _item[1];
            })
            return obj;
        },
        setItem(key, value, day) {
            var sec = day * 24 * 3600;
            document.cookie = `${key}=${value}; max-age=${sec}`;
        },
        removeItem(key) {
            this.setItem(key, '', -1);
        },
        clear() {
            var obj = this.getObject()
            for (var i in obj) {
                this.removeItem(i);
            }
        }
    }
}())


var watcher = {
    event: {},
    // 订阅/监听
    on(eventName, callback) {
        // debugger
        const arr = this.event[eventName] || [];
        arr.push(callback);
        this.event[eventName] = arr;
    },
    // 发布
    emit(eventName, data) {
        const arr = this.event[eventName]
        arr.forEach(item => {
            item(data);
        })
        if (typeof this.event[eventName] == 'function') {
            this.event[eventName](data);
        }
    },
    // 取消订阅/取消监听
    remove(eventName, callback) {
        const arr = this.event[eventName];
        console.log(arr);
        // debugger
        arr.forEach((item, index, _arr) => {

            if (item === callback) {
                _arr.splice(index, 1);
            }
        })
        this.event[eventName] = arr;
    }
}



function checkType(data) {
    var str = Object.prototype.toString.call(data);
    return str.match(/\w+/g)[1]
}



var cookie = (function() {

    return {
        getItem(key) {
            return this.getObject()[key];
        },
        getObject() {
            var obj = {};
            var cookieAll = document.cookie.split('; ');
            cookieAll.forEach(item => {
                var _item = item.split('=');
                obj[_item[0]] = _item[1];
            })
            return obj;
        },
        setItem(key, value, day) {
            var sec = day * 24 * 3600;
            document.cookie = `${key}=${value}; max-age=${sec}`;
        },
        removeItem(key) {
            this.setItem(key, '', -1);
        },
        clear() {
            var obj = this.getObject()
            for (var i in obj) {
                this.removeItem(i);
            }
        }
    }
}())