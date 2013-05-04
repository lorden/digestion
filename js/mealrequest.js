var numberItems = 0;

$(document).ready(function(){
    $('#welcome').modal();

    $('.preselection').click(function(){
        $('#welcome').modal('hide');
        selectItems($(this).attr('id'));
    });


    $('#makecard').click(function(){
        $('#main-container-step1').hide();
        $('#main-container-step2').show();
        numberItems = 0;
        $('.food-group-item.removed').each(function () {
            numberItems++;
            $('#card-content').append('<img src="img/card-' + $(this).attr('id') + '.png" alt="' + $(this).attr('id') + '" class="food-img-card" />');
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
        $('#name').focus();
    });
    $('#close-feedback').live('click', function(){
        $('#feedback-form-div').animate({width: 'toggle'});
    });

    $('.food-group-item').click(function(){
        $(this).toggleClass('removed');
    console.log('clicked');
    });
    console.log('loaded');


    $('#send').click(function(){
        //validate input
        if(true){
            $.post('/feedback.php', $('#feedback-form').serialize());
        }
        var c = $('#close-feedback').clone();
        $('#feedback-form-div').html('<p>Thank you for your feedback</p>');
        $('#feedback-form-div').append(c);
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
    $('.food-img-card').css('width', Math.sqrt(244*(140-parseInt($('#messages-container').css('height'),10))/numberItems) + 'px');
    // height available
    console.log(140-parseInt($('#messages-container').css('height'),10));
    // width available: 244
    // formula for the theoretical side length
    console.log(Math.sqrt(244*(140-parseInt($('#messages-container').css('height'),10))/numberItems));
    // decide how to best approach sizing and placing the images -- taking into account # rows/columns
    // and get rid of simplistic calculation on first line here
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
