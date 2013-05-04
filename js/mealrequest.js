var numberItems = 0;

$(document).ready(function(){
    $('#welcome').modal();

    $('.preselection').click(function(){
        $('#welcome').modal('hide');
        selectItems($(this).attr('id'));
        $('#preselected').val($(this).attr('id'));
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

    $('#print').click(function(){
        window.print();
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
    });


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
    // height available
    var height = 140-parseInt($('#messages-container').css('height'),10);
    // width available: 244
    // formula for the theoretical side length
    var itemWidth = Math.sqrt(244*height/numberItems);
    // Number of rows -- container height divided by theoretical height of one item
    var numberRows = Math.ceil(height/itemWidth);
    // Width of each item initially set to row width divided by (maximum) number of items in row
    itemWidth = 244/Math.ceil(numberItems/numberRows);
    // but also check that height never exceeds container
    if (itemWidth*numberRows > height) {
        itemWidth = height/numberRows;
    }
    $('.food-img-card').css('width', itemWidth + 'px');
}
