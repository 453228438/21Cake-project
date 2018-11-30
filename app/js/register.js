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