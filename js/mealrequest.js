var numberItems = 0;

$(document).ready(function(){
    $('#welcome').modal();

    $('.preselection').click(function(){
        $('#welcome').modal('hide');
        var selected = $(this).attr('id');
        _gaq.push(['_trackPageview', '/selected.htm?' + selected]);
        $.get('selected.html?' + selected);
        selectItems(selected);
        $('#preselected').val(selected);
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
            $('.message#message-' + $(this).attr('id')).show();
        }
        else if (!this.checked) {
            // remove message from card
            $('.message#message-' + $(this).attr('id')).hide();
        }
        resizeImages();
    });

    $('#print').click(function(){
        _gaq.push(['_trackPageview', '/printed.htm']);
        $.get('printed.html');
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

    // Social Media
    $('#facebook-holder').append('<iframe src="//www.facebook.com/plugins/like.php?href=http%3A%2F%2Fmealrequest.com&amp;send=false&amp;layout=button_count&amp;width=100&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>'); 
    $('#google-holder').append('<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script><div class="g-plusone" data-annotation="none"></div>');
    $('#twitter-holder').append('<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://mealrequest.com" data-text="Never use gestures to explain your diet again! Get a personalized card. #winning" data-count="none" id="twitter">Tweet</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script>');
  
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
    // Number of rows -- container height divided by theoretical height of one item, or at least one
    var numberRows = Math.max(Math.round(height/itemWidth), 1);
    // Width of each item initially set to row width divided by (maximum) number of items in row
    itemWidth = 244/Math.ceil(numberItems/numberRows);
    // but also check that height never exceeds container
    if (itemWidth*numberRows > height) {
        itemWidth = height/numberRows;
    }
    $('.food-img-card').css('width', itemWidth + 'px');
}
