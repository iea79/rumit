var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

	var meta = $('[name="viewport"]');

	if (isXsWidth()) {
		// meta.attr('content', 'width=640, initial-scale=1.0');
	} else {
		meta.attr('content', 'width=1280, initial-scale=1.0');
	}

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	$('[data-scroll]').click( function(){ 
		var scroll_el = $(this).attr('href'); 
		if ($(scroll_el).length != 0) {
		$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
		}
		return false;
	});

	$('.tooltip').tooltipster({
		animation: 'grow',
		delay: 200,
		side: 'right',
	    trigger: 'custom',
	    triggerOpen: {
	        click: true,
	        tap: true
	    },
	    triggerClose: {
	        mouseleave: true,
	        scroll: true,
	        tap: true
	    }
	});

	$('[type=tel]').inputmask("+7(999)99-99-999",{ showMaskOnHover: false });

	new Vue({
		el: '#collection__slider',
		data: {
			perspective: 0,
			slides: 7
		},
		components: {
			'carousel-3d': Carousel3d.Carousel3d,
			'slide': Carousel3d.Slide
		}
	});

	$('.salon__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		arrows: true,
		asNavFor: '.salon__slider_nav',
		responsive: [
			{
			breakpoint: 767,
				settings: {
					infinite: true,
				}
			}
		]
	});
	$('.salon__slider_nav').slick({
		variableWidth: true,
		slidesToScroll: 1,
		asNavFor: '.salon__slider',
		infinite: false,
		arrows: false,
		dots: false,
		centerMode: false,
		focusOnSelect: true
	});

    $('.video__play').on('click', function() {
    	var wrap = $(this).closest('.video__wrapper');
    	var img = wrap.find('img');
        var $video = wrap.find('.video__frame'),
            src = $video.attr('src');
        $(this).hide();
        img.hide();
        $video.show().attr('src', src + '&autoplay=1');
    });


    $("form .butn").on('click', function (e){ 
	    e.preventDefault();
    	var form = $(this).closest('form');
    	var url = form.attr('action');
        var form_data = form.serialize();
        $.ajax({
            type: "POST",
            url: url,
            data: form_data,
            success: function () {
                // var mess = res == 'success'? 'Ваше сообщение отправлено!':'Что то пошло не так';
                // alert(mess);
                // if (form.hasClass('download__form')) {
                // 	$('#downloadLink').trigger('click');

                // } else {
                	form.submit();
                	document.location.href = 'success.html';
                // }
            }
        });
    });

});

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

