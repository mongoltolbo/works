$(function() {
    var nav = $('.nav');
    var navTop = nav.offset().top+10;
    var navHeight = nav.height()+10;
    var showFlag = false;
    nav.css('top', -navHeight+'px');

    $(window).scroll(function () {
        var winTop = $(this).scrollTop();
        if (winTop >= navTop ) {
            if ( showFlag == false ) {
                showFlag = true;
                nav
                    .addClass('fixed')
                    .stop().animate({'top' : '0px' }, 200);
            }
        } else if (winTop <= navTop ) {
            if (showFlag) {
                showFlag = false;
                nav.stop().animate({'top' : -navHeight+'px'}, 200 ,function(){
                    nav.removeClass('fixed');
                });
            }
        }
    });
});
