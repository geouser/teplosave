// Global parameters
window.params = {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent)
};


jQuery(document).ready(function($) {

    wow = new WOW(
      {
      offset:       200,          // default
      mobile:       false
    }
    )
    wow.init();


    /*Smooth loading*/
    $( "body" ).delay( 500 ).queue(function(next) {
        $(this).css({
            opacity: '1',
            visibility: 'visible'
        });
        next(); 
    })

    /*custom select*/
    $('select').each(function(index, el) { 
        var select = $(this);
        var block = $(this).parent();
        var group = block.parent().parent();
        var label = block.append('<span class="select-label"></span>').find('.select-label');
        var dropdown = block.append('<ul class="select-dropdown"></ul>').find('.select-dropdown');

        select.css('display', 'none');
        dropdown.css('display', 'none');

        select.find('option').each(function(index, el) {
            dropdown.append('<li class="select-dropdown-item" data-value="'+$(this).attr('value')+'">'+$(this).text()+'</li>')
        });

        label.on('click', function(event) {
            event.preventDefault();
            dropdown.slideToggle('fast');
            group.toggleClass('active');
        });

        label.text( dropdown.find('.select-dropdown-item').first().addClass('active').text() );
        select.val( dropdown.find('.select-dropdown-item').first().attr('data-value') );

        dropdown.find('.select-dropdown-item').on('click', function(event) {
            event.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            label.text($(this).text());
            select.val( $(this).attr('data-value') );
            dropdown.slideToggle('fast');
            group.removeClass('active');
        });
    });

    /*Scroll to section*/
    $('.menu-link').on('click', function(event) {
        event.preventDefault();
        var target = $(this).attr('href');
        var targetTop = $(target).offset().top;
        
        $('html, body').animate({scrollTop: targetTop-100}, 800);
    });

    /*---------------------------
                                  ADD CLASS ON SCROLL
    ---------------------------*/
    $(function() { 
        var $document = $(document),
            $element = $('.menu-button'),
            $element2 = $('header'),
            className = 'hasScrolled';

        $document.scroll(function() {
            $element.toggleClass(className, $document.scrollTop() >= 1);
            $element2.toggleClass(className, $document.scrollTop() >= 1);
        });
    });
      
    /*---------------------------
                                  Background video
    ---------------------------*/
    $('#bg-video').vide({
        mp4: 'video/video.mp4',
        poster: 'images/offer_bg.jpg'
    }, {
        volume: 0,
        playbackRate: 1,
        muted: true,
        loop: true,
        autoplay: true,
        position: '50% 50%', // Similar to the CSS `background-position` property.
        posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
        resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
        bgColor: 'transparent', // Allow custom background-color for Vide div,
        className: '' // Add custom CSS class to Vide div
    });

    /*---------------------------
                                  MENU TOGGLE
    ---------------------------*/
    $('.menu-button').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active');
        $(this).siblings('header').toggleClass('active');
        if ($('header').hasClass('active')) {
                $('body, html').css('overflow', 'hidden');
            } else {
                $('body, html').css('overflow', 'visible');
            }
    });



    /*---------------------------
                                  Magnific popup
    ---------------------------*/
    $('.magnific').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',
        modal: false,

        closeBtnInside: true,
        preloader: false,
        
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    /*---------------------------
                                  Products slider
    ---------------------------*/
    $('.slider').slick({
        slidesToShow: 2,
        adaptiveHeight: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 1,
                    adaptiveHeight: true,
                    infinite: true,
                }
            }
        ]
    })


    $('.gallery').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            fixedContentPos: false,
            fixedBgPos: true,
            gallery: {
              enabled:true
            }
        });
    });
    

    /*----------------------------
                              SEND FORM
    -------------------------*/
    /**
     *
     * Open popup
     *
     * @param popup {String} jQuery object (#popup)
     *
     * @return n/a
     *
    */
    function openPopup(popup){
        $.magnificPopup.open({
            items: {
              src: popup
            },
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            modal: false,
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-slide-bottom'
        }, 0);
    }

    $('form').on('submit', function(event) {
        event.preventDefault();
        /* Act on the event */
        var data = $(this).serialize();
        $.ajax({
            url: theme.url + '/forms.php',
            type: 'POST',
            data: data,
            success: function(result){
                if (result.status == 'ok') {
                    openPopup('#modal-popup-ok')
                } else {
                    openPopup('#modal-popup-error')
                }
            },
            error: function(result) {
                openPopup('#modal-popup-error');
            }
        })
        .always(function() {
            $('form').each(function(index, el) {
                $(this)[0].reset();
            });
        });
        
    });

}); // end file