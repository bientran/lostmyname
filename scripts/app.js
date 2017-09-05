(function(){
    
	var ToggleMenu = function () {
		var leadershipHeader = $(".lost-my-name__header");
		var menuWrapper = leadershipHeader.find(".lost-my-name__header__right-nav-wrapper");
	    var toggleBtn = leadershipHeader.find(".lost-my-name__header__toggle-button");

		var animatedMenu = function () {
			$(window).scroll($.debounce(5, function () {
			    if ($(window).scrollTop() > 350) {
			        leadershipHeader.addClass('animated');
			    } else {
			        leadershipHeader.removeClass('animated');
			    }
			}));
		}

		var showHideMenu = function (selector, isShown) {
		    var nav = selector.next().next().next();
	        if (isShown) {
	            selector.addClass('open');
	            nav.css('right', 0);
	            nav.prev().css('right', 0);
	            $('.nav-mask').fadeIn('fast');
	            $('html, body').css('overflow', 'hidden');
	        } else {
	            selector.removeClass('open');
	            nav.removeAttr('style');
	            nav.prev().removeAttr('style');
	            $('.nav-mask').fadeOut('fast');
	            $('html, body').removeAttr('style');
	        }
	    }

		var toggle = function (selector) {
		    var nav = selector.next().next().next();
			if (parseInt(nav.css('right'), 10) < 0) {
				showHideMenu(selector, true);
			} else {
				showHideMenu(selector, false);
			}
		}
        
		var init = function () {
			if (typeof leadershipHeader !== 'undefined' && leadershipHeader.length > 0) {
				// Scroll to animate menu
				animatedMenu();

			    $(window).bind('blur', function () {
					if (toggleBtn.hasClass('open')) toggle(toggleBtn);
			    });
				$(document).bind('click', function () {
                    console.log($(event.target));
					if ($(event.target).parents(".lost-my-name__header__nav").length == 0 && toggleBtn.hasClass('open')) toggle(toggleBtn);
				});

				toggleBtn.bind('click', function (e) {
				    e.stopPropagation();
				    toggle(toggleBtn);
				});
			}
		}
        
        return {
            init: init
        }
    }
    
    var menu = new ToggleMenu();
    menu.init();

})();