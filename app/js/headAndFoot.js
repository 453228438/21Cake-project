$('.header').load('http://localhost:3333/21Cake-project/app/common.html', function() {
    $.getScript('http://localhost:3333/21Cake-project/app/js/nav.js', function() {});
    $.getScript('http://localhost:3333/21Cake-project/app/js/cookie.js', function() {})
})

$('.footer').load('http://localhost:3333/21Cake-project/app/foot.html', function() {

})