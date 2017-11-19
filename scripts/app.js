(function(){
    
	var HeaderInformation = function(selector, btn) {
		var $ele = $(selector);
		var $closeBtn = $ele.find(btn);
		var init = function() {
			if (typeof $closeBtn !== 'undefined' && $closeBtn.length > 0) {
				$closeBtn.on('click', function() {
					$ele.slideUp();
				});
			}
		};

		return {
			init: init
		}
	}

	var FixedNavigation = function(selector) {
		var ele = $(selector);
		var eleTop = 0;
		var parent = ele.parent();

		var init = function() {
			if (typeof ele !== 'undefined' && ele.length > 0 && typeof ele.offset() !== 'undefined') {
				parent.css('min-height', ele.outerHeight());
				$(window).on('resize orientationchange', $.debounce(5, function() {
					parent.css('min-height', ele.outerHeight());
				}));

				$(window).on('scroll', $.debounce(5, function() {
					var elePos = ele.hasClass('fixed') ? { top: 0, left: 0 } : ele.offset();

					if (elePos.top <= 0) elePos.top = eleTop;

					if ($(window).scrollTop() >= elePos.top) {
						ele.addClass('fixed');
						eleTop = elePos.top
					} else {
						ele.removeClass('fixed');
					}
				}))
			}
		}

		return {
			init: init
		}
	}

	var bookCustomizerNav = new FixedNavigation('.lost-my-name__book-customizer__search-box');
	bookCustomizerNav.init();

	var headerInfor = new HeaderInformation('.lost-my-name__information', '.lost-my-name__information-close');
	headerInfor.init();

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
	
	var Slider = function(selector, options) {
		var ele = $(selector);
		var settings = options || '';

		var init = function() {
			if (typeof ele !== 'undefined' && ele.length > 0) {
				ele.ubislider(settings); 
			}
		}

		return {
			init: init
		}
	}

	var BookCutomizer = function() {
		var ele = $(".lost-my-name__book-editor");
		var wish = ele.find(".lost-my-name__book-editor__tabbed .wish .tab");
		var wishOptions = ele.find(".wish-option");
		var adventuresTabs = ele.find("#second-wish .tabs .wish");
		var adventuresContents = ele.find('#second-wish .character-tab');
		var togglePanel = ele.find(".toggle");
		var panel = ele.find('.lost-my-name__book-editor-wrapper');

		var init = function() {
			if (ele.length > 0 && wish.length > 0 && adventuresTabs.length > 0) {
				// scroll to book editor
				$("html, body").animate({ scrollTop: ele.offset().top }, 500);

				wish.on('click', function() {
					var $this = $(this).parent();
					var target = $('#' + $this.attr('data-target'));

					// remove active wish
					wish.parent().removeClass('active');
					$this.addClass('active');

					// hide all wish options
					if (target.css('display') != 'none') {
						target.slideUp(function() {
							$this.removeClass('active');
						});
					} else {
						wishOptions.not(target).slideUp();
						target.slideDown();
					}

					return false;
				});

				adventuresTabs.on('click', function() {
					var $this = $(this);
					var target = $('#' + $this.attr('data-target'));

					// remove active wish
					adventuresTabs.removeClass('active');
					$this.addClass('active');

					// hide all wish options
					if (target.css('display') != 'none') {
						target.slideUp(function() {
							$this.removeClass('active');
						});
					} else {
						adventuresContents.not(target).slideUp();
						target.slideDown();
					}

					return false;
				});

				togglePanel.on('click', function() {
					var $this = $(this);
					var target = $this. parents('.lost-my-name__book-editor-wrapper');

					// Toggle show hide
					target.toggleClass('active')
					.promise().done(function() {
						var isActive = $(this).hasClass('active');

						if (!isActive) {
							$this.removeClass('active');
						} else {
							$this.addClass('active');
						}
					})
					return false;
				});

				// $(document).on('click', function(event) {
				// 	if ($(event.target).parents('.lost-my-name__options-wrapper').length == 0) {
				// 		panel.removeClass('active');
				// 	}
				// });
			}
		}

		return {
			init: init
		}
	}
    
    var menu = new ToggleMenu();
	menu.init();

	var bookCutomizer = new BookCutomizer();
	bookCutomizer.init();

	var SlickSlider = function(selector, options) {
		var $ele = $(selector);
		var settings = options || {};

		var init = function() {
			$ele.slick(settings)
		};

		return {
			init: init
		}
	};

	var bannerSlider = new SlickSlider('.lost-my-name__banner__slider', {
		dots: false,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000
	});
	bannerSlider.init();

	// Responsive images
	$.fn.imgLoad = function (callback) {
        return this.each(function () {
            if (callback) {
                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                    callback.apply(this);
                }
                else {
                    $(this).on('load', function () {
                        callback.apply(this);
                    });
                }
            }
        });
    };

    var PhotoGallery = function (selector, child) {
		var photoGallery = $(selector);
		var photos = photoGallery.find(child + " img");
		var isBanner = selector.indexOf('banner') != -1;

		var resizeImages = function() {
			photos.imgLoad(function () {
			    var $this = $(this);
			    var parentInfor = {
			        width: $this.parents().width(),
			        height: $this.parents().height()
				};
				
				if (isBanner) {
					parentInfor = {
						width: $this.parents(selector).width(),
						height: $this.parents(selector).height()
					};
				}
				
			    var imgInfor = {
			        width: $this.width(),
			        height: $this.height()
				};

			    var fillClass = '';

			    if (parentInfor.width / parentInfor.height > imgInfor.width / imgInfor.height) {
			        fillClass = (parentInfor.height > parentInfor.width)
			            ? 'fillheight'
			            : 'fillwidth';
			    } else {
			        fillClass = (imgInfor.height > imgInfor.width)
			            ? 'fillwidth'
			            : 'fillheight';
			    }
			    $(this).removeClass('fillheight').removeClass('fillwidth').addClass(fillClass);
			});
		}

        var init = function () {
            // Check ele defined or not
			if (typeof photoGallery !== 'undefined' && typeof photos !== 'undefined') {

				// resize at first loaded
				resizeImages();

				// resize on user resize window
				$(window).on('resize orientationchange', $.debounce(5, resizeImages));
			}
        }

        return {
            init: init
        }
    }

	var carouselSlider = new PhotoGallery('.lost-my-name__banner__slider', '.lost-my-name__banner__slider-item__thumbnail');
	carouselSlider.init();
	var carouselSlider2 = new PhotoGallery('.lost-my-name__photo-gallery__photos', '.lost-my-name__photo-gallery-photos__content');
	carouselSlider2.init();
	var carouselSlider3 = new PhotoGallery('.lost-my-name__product__photo-gallery', '.ubislider-image-container');
	carouselSlider3.init();

	var productImageSlider = new Slider('#product-image-slider', {
		arrowsToggle: true,
		type: 'ecommerce',
		hideArrows: true,
		autoSlideOnLastClick: true,
		modalOnClick: true,
		onTopImageChange: function(e){
			var carouselSlider3 = new PhotoGallery('.lost-my-name__product__photo-gallery', '.ubislider-image-container');
			carouselSlider3.init();
		}
	});
	productImageSlider.init();

	// gender box active class
	function setActiveGenderBox(inputBox) {
		var $genderBox = $('.gender-box');
		var $el = $genderBox.find('>label');
		var $dropdown = $genderBox.find('.dropdown-menu >li');
		var $input = $(inputBox);

		// remove click to hide dropdown
		$dropdown.click(function(e) {
			e.stopPropagation();
			var _this = $(this);

			// reset all character's active
			$dropdown.removeClass('active');

			// set active characters
			_this.addClass('active');

			// set value for input
			$input.val(_this.data('value'));
			console.log($input.val())

			return false;
		});

		$el.click(function() {
			var _this = $(this);
			
			if (!_this.hasClass('active')) {
				// reset all active
				$el.removeClass('active');

				// reset value
				$input.val('INVALID');
				console.log($input.val());

				$el.parent().find('.dropdown-menu >li').removeClass('active');
				_this.addClass('active');
			}
		});
	}
	setActiveGenderBox('#gender');

	$('.lost-my-name__photo-gallery__photos').masonry({
		// options
		itemSelector: '.lost-my-name__photo-gallery__photos-item',
		columnWidth: '.grid-sizer',
		percentPosition: true
	});

	// Magnific popup for images and videos
	var MagnificPopup = function(selector, options) {
		var $ele = $(selector);
		var settings = options || {};

		var init = function() {
			if (typeof $ele !== 'undefined' && $ele.length > 0) {
				$ele.magnificPopup(options);
			}
		}

		return {
			init: init
		}
	} 

	var headerSlider = new MagnificPopup('.image-box', {
		type: 'image',
		mainClass: 'mfp-with-zoom',
		zoom: {
			enabled: true,
			duration: 300,
			easing: 'ease-in-out',
			opener: function(openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});
	headerSlider.init();
	var photoGallery = new MagnificPopup('.video-box', {
		type: 'iframe',
		removalDelay: 160,
		fixedContentPos: false,
		mainClass: 'mfp-with-zoom'
	});
	photoGallery.init();

	// BookBlock
	var Page = function() {
		var config = {
				$bookBlock : $( '#bb-bookblock' ),
				$navNext : $( '#bb-nav-next' ),
				$navPrev : $( '#bb-nav-prev' ),
				$navFirst : $( '#bb-nav-first' ),
				$navLast : $( '#bb-nav-last' )
			},
			totalPage = config.$bookBlock.find('.bb-item').length - 1,
			firstPage = true,
			init = function() {
				if (typeof config.$bookBlock !== 'undefined' && config.$bookBlock.length > 0) {
					// total page
					
					config.$bookBlock.bookblock( {
						speed : 800,
						shadowSides : 0.8,
						shadowFlip : 0.7,
						onEndFlip: function(page, isLimit) {
							if (isLimit == 0) {
								setTimeout(function() {
									$("#first-item").css({transform: 'translate(-25%, 0)'});
								}, 10)
							}
							return false;
						},
						onBeforeFlip: function(page) {
							if (page == 1) {
								firstPage = true;
							}
							return false;
						}
					} );
					initEvents();
				}
			},
			initEvents = function() {
				
				var $slides = config.$bookBlock.children();
				// add navigation events
				config.$navNext.on( 'click touchstart', function(e) {
					console.log(firstPage);
					if (firstPage) {
						$("#first-item").css({transform: 'translate(0, 0)'});
						setTimeout(function() {
							config.$bookBlock.bookblock( 'next' );
						}, 500);
						firstPage = false;
					} else {
						config.$bookBlock.bookblock( 'next' );
					}
					return false;
				} );
				config.$navPrev.on( 'click touchstart', function() {
					config.$bookBlock.bookblock( 'prev' );
					return false;
				} );
				config.$navFirst.on( 'click touchstart', function() {
					config.$bookBlock.bookblock( 'first' );
					return false;
				} );
				config.$navLast.on( 'click touchstart', function() {
					config.$bookBlock.bookblock( 'last' );
					return false;
				} );
				
				// add swipe events
				$slides.on( {
					'swipeleft' : function( event ) {
						config.$bookBlock.bookblock( 'next' );
						return false;
					},
					'swiperight' : function( event ) {
						config.$bookBlock.bookblock( 'prev' );
						return false;
					}
				} );
				// add keyboard events
				$( document ).keydown( function(e) {
					var keyCode = e.keyCode || e.which,
						arrow = {
							left : 37,
							up : 38,
							right : 39,
							down : 40
						};
					switch (keyCode) {
						case arrow.left:
							config.$bookBlock.bookblock( 'prev' );
							break;
						case arrow.right:
							config.$bookBlock.bookblock( 'next' );
							break;
					}
				} );
			};
			return { init : init };
	};

	var book = new Page();
	book.init();
})();