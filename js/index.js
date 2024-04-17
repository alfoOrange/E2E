$( document ).ready( function() {

    $( 'form[name=contactUs]' ).on( "submit", function( e ) {
        e.preventDefault();
        send( $( this ).serializeArray() );
    } );

    $( 'form[name=subscribe]' ).on( "submit", function( e ) {
        e.preventDefault();
        send( $( this ).serialize() );
    } );
    
    $(".play-button").hover(
    function()
    {
        $("#play-button-static").hide();
        $("#play-button-active").show();
    },
    function()
    {
        $("#play-button-static").show();
        $("#play-button-active").hide();
    });
    
    $(".close-modal").on('click', function(){
        hideVideo();
    });
    
    $(".play-button").on('click', function(){
        $(".video-hidden").fadeIn('fast');
        $("#video_player").attr('src','https://player.vimeo.com/video/366094873?title=0&byline=0&portrait=0');
    });
    
});

$(document).mouseup(function(e){
    e.stopPropagation();
    if ($(e.target).closest('.video-hidden').length === 1)
    {
        hideVideo();
    }
});

function showLoading()
{
    $( '#loading' ).fadeIn( 'fast' );
}

function hideLoading()
{
    $( '#loading' ).fadeOut( 'fast' );
}

function hideVideo()
{
    $(".video-hidden").fadeOut('fast');
    $("#video_player").attr('src','');
}

function send( s )
{
    $.ajax( '/input.php',
        {
            beforeSend: function() { showLoading(); },
            cache: false,
            complete: function() { hideLoading(); $('#modal').modal('hide'); },
            data: s,
            error: function(jqXHR, textStatus, errorThrown) { submitError(textStatus, errorThrown); },
            success: function() { submitSuccess(); $('form[name=contactUs]')[0].reset(); $('form[name=subscribe]')[0].reset();},
            timeout: 10000,
            method: "GET"
        } );
}

function submitError( textStatus, errorThrown )
{
    $('#modal-title').text('Sorry!');
    $('#modal-text').text('There was an error saving, please try again in a few seconds.');
    $('#modal').modal('show');
    console.error("error:", textStatus, errorThrown);
}

function submitSuccess()
{
    $('#modal-title').text('Thank you!');
    $('#modal-text').text('The information you\'ve sent has been successfully received!');
    $('#modal').modal('show');
    console.log("Thank you!");
}

