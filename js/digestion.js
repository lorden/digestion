var numberItems = 0;

$(document).ready(function(){
    // if(!readCookie("digestion")){
        // blur
        $('#welcome').modal();
        $('#header').foggy();
        $('#main-container-step1').foggy();
        $('#footer').foggy();
    // } else {
    //     var preset = readCookie("digestion");
    //     selectItems(preset);
    //     // eraseCookie('digestion');
    // }

    $('#start').click(function(){
        $('#welcome').modal('hide');
        $('#header').foggy(false);
        $('#main-container-step1').foggy(false);
        $('#footer').foggy(false);
        // createCookie("digestion", $('#preset').val(), 90);
        selectItems($('#preset').val());
        // checkGroup(null);
    });

    // $('#reset').click(function(){
    //     deSelect();
    //     // eraseCookie('digestion');
    //     $('#main-container-step1').show();
    //     $('#main-container-step2').hide();
    //     $('#welcome').modal();
    //     $('#header').foggy();
    //     $('#main-container-step1').foggy();
    //     $('#footer').foggy();
    // });

    $('.food-group-item').click(function(){
        $(this).toggleClass('removed');
        // checkGroup($(this).parent().parent().attr('id'));
    });

    $('#makecard').click(function(){
        $('#main-container-step1').hide();
        $('#main-container-step2').show();
        numberItems = 0;
        $('.food-group-item.removed').each(function () {
            numberItems++;
            $('#card-content').append('<img src="img/' + $(this).attr('id') + '.png" alt="' + $(this).attr('id') + '" class="food-img-card" />');
        });
        resizeImages();
    });

    $('.language').click(function(){
        if (this.checked) {
            // show message corresponding to ID on card
            $('.message#' + $(this).attr('id')).show();
        }
        else if (!this.checked) {
            // remove message from card
            $('.message#' + $(this).attr('id')).hide();
        }
        resizeImages();
    });

    $('#feedback-tab').click(function(){
        $('#feedback-form-div').animate({width: 'toggle'});
    });

    $('#send').click(function(){
        $('#feedback-form-div').animate({width: 'toggle'});
    });
});

function deSelect () {
    $('.food-group-item').removeClass('removed');
}

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
    if(mode == 'gluten'){
        $('#gluten').addClass('removed');
    }
    if(mode == 'milk'){
        $('#dairy').addClass('removed');
    }
}

function resizeImages() {
    $('.food-img-card').css('width', 244/numberItems + 'px');
    console.log($('#messages-container').css('height'));
    // need to calculate remaining height available -- 140 minus the above (convert to number)
    // then decide how to best approach sizing and placing the images
    // and get rid of simplistic calculation on first line here
    // 
    // then, next problem= how to scale background, or make cross size correspond to img size
    // also want to make food img and border smaller, allowing cross to overlap.
    // could solve both problems by creating an image copy for card but is worth it to load 2nd img?
}

// function checkGroup(group){
//     if(group !== null){
//         var root = '#' + group;
//     } else {
//         var root = '.food-group';
//     }
//     $(root).each(function(){
//         var total = 0;
//         var removed = 0;
//         $(this).find('.food-group-item').each(function(){
//             if($(this).hasClass('removed')){
//                 removed += 1;
//             }
//             total += 1;
//         });
//         if(removed == 0){
//             $(this).append('<img src="img/check.png" alt="" />');
//         } else if(total === removed){
//             $(this).append('<img src="img/cross.png" alt="" />');
//         } else {
//         }
//     });
// }

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
