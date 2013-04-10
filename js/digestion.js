$(document).ready(function(){
    if(!readCookie("digestion")){
        // blur
        $('#welcome').modal();
        $('#header').foggy();
        $('#main-container').foggy();
        $('#footer').foggy();
    } else {
        var preset = readCookie("digestion");
        selectItems(preset);
        // eraseCookie('digestion');
    }

    $('#start').click(function(){
        $('#welcome').modal('hide');
        $('#header').foggy(false);
        $('#main-container').foggy(false);
        $('#footer').foggy(false);
        createCookie("digestion", $('#preset').val(), 90);
        selectItems($('#preset').val());
        checkGroup(null);
    });

    $('.food-group-item').click(function(){
        $(this).toggleClass('removed');
        checkGroup($(this).parent().parent().attr('id'));
    });
    
});

function selectItems(mode){
    if(mode == 'veget' || mode == 'vegan'){
        $('#beef').addClass('removed');
        $('#poultry').addClass('removed');
        $('#pork').addClass('removed');
        $('#fish').addClass('removed');
        $('#shellfish').addClass('removed');
    }
    if(mode == 'vegan'){
        $('#dairy').addClass('removed');
        $('#eggs').addClass('removed');
        $('#honey').addClass('removed');
    }
}

function checkGroup(group){
    if(group !== null){
        var root = '#' + group;
    } else {
        var root = '.food-group';
    }
    $(root).each(function(){
        var total = 0;
        var removed = 0;
        $(this).find('.food-group-item').each(function(){
            if($(this).hasClass('removed')){
                removed += 1;
            }
            total += 1;
        });
        if(removed == 0){
            $(this).append('<img src="/img/check.png" alt="" />');
        } else if(total === removed){
            $(this).append('<img src="/img/cross.png" alt="" />');
        } else {
        }
    });
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
