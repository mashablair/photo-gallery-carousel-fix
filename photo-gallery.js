$(document).ready(function () {
	
	// Documentation: http://www.landmarkmlp.com/js-plugin/owl.carousel/
	
	'use strict';

		// initialize plugin and set custom options
        $("#photoGalleryThumbs").owlCarousel({
            items: 5, // on wide screen, 5 thumbs will be displayed below img viewer 
            itemsDesktop: [1199, 5],
            itemsDesktopSmall: [991, 4],
            itemsTablet: [1025, 1], // changed from '767' to include iPad on vertical 
            itemsMobile: [599, 1],
            lazyLoad: true, // delays loading images to improve mobile performance 
            afterInit: function () {
                $($('.owl-item')[0]).addClass('active'); // set active thumbnail
            }
        });

        $('#photoGalleryImage').css('height', calcViewerHeight()); // set the height of the image viewer

        // SET THE FIRST IMAGE
        var $img = $($('#photoGalleryThumbs .item img')[0]);
        var $inp = $($('#photoGalleryThumbs .item input')[0]);
        $('#photoGalleryImage img').attr('src', $img.attr('src')); // set first image in the image viewer
        $('.photoGalleryCaption').html($inp.val()); // set first caption in the image viewer
		$('.captionMobile').html($inp.val()); // set first mobile caption after the thumbnail carousel -- ADDED BY MASHA 
				
        $('#photoGalleryThumbs img').on('click', function (e) {
            e.preventDefault();
            goToImage($(this).closest('.owl-item'));
        });

        $('.photoGalleryImageOuter .prevBtn').on('click', function (e) {
            e.preventDefault();
            goToPrevious();
        });
        $('.photoGalleryImageOuter .nextBtn').on('click', function (e) {
            e.preventDefault();
            goToNext();
        });
        $(document).keydown(function (e) {
            switch (e.which) {
                case 37: // left
                    goToPrevious();
                    break;

                case 39: // right
                    goToNext();
                    break;
                default:
                    return; // exit
            }
            e.preventDefault();
        });

        $(window).resize(function () {
            $('#photoGalleryImage').css('height', calcViewerHeight()); // update the height of the image viewer
        });

        if (($('.photoGalleryCaption').text() == "")) {
            $('.photoGalleryCaption').addClass("hidden");
        } else {
            $('.photoGalleryCaption').removeClass("hidden");
        }
	
	
		// added by Masha Blair:
	    if (($('.captionMobile').text() == "")) {
            $(this).addClass("hidden");
        } else {
            $(this).removeClass("hidden");
        }
	

        $('#photoGalleryImage img').load(function () {
            $('#photoGalleryImage').removeClass('loading');
            $('#photoGalleryImage img').css({ 'width': '100%', 'height': '100%' });
        });
    });

	// when 'next' button is clicked (not mobile swipe)
    function goToNext() {
        var goToItem = $($('.owl-item.active')[0]).next();
        if (goToItem.length) {
            goToImage(goToItem);
            $(".owl-carousel").data('owlCarousel').goTo(goToItem.index());
        }
    }

	// when 'prev' button is clicked (not mobile swipe)
    function goToPrevious() {
        var goToItem = $($('.owl-item.active')[0]).prev();
        if (goToItem.length) {
            goToImage(goToItem);
            $(".owl-carousel").data('owlCarousel').goTo(goToItem.index());
        }
    }

    function goToImage(goToItem) {
        $('.owl-item').removeClass('active');
        goToItem.addClass('active');
        $('.nextBtn, .prevBtn').removeClass('end');

        if (goToItem.is(':first-child')) {
            $('.prevBtn').addClass('end');
        }
        if (goToItem.is(':last-child')) {
            $('.nextBtn').addClass('end');
        }
        var img = goToItem.find('img')[0];
        var inp = goToItem.find('input')[0];
        $('#photoGalleryImage img').attr('src', img.src).removeClass().addClass($(img).attr('data-orientation'));
        
        $('.photoGalleryCaption').html($(inp).val());
        if ($(inp).val() == "") {
            $('.photoGalleryCaption').addClass("hidden");
			$('.captionMobile').addClass("hidden"); // added by Masha 
        } else {
            $('.photoGalleryCaption').removeClass("hidden");
			$('.captionMobile').removeClass("hidden"); // added by Masha 
        }
		
		console.log('hi');
    }

    // calculate the height of the image viewer at a 3:2 ratio
    function calcViewerHeight() {
        if ($('#photoGalleryImage').outerWidth() != 0) {
            height = $('#photoGalleryImage').outerWidth() / 1.5;
        } else {
            // Video loaded first. use other selector
            height = $('#tab2').outerWidth() / 1.5;
        }
        return height;
    }


    $(window).load(function () {
        // ADD ORIENTATION CLASSES TO IMAGES
        // WE DO IT WHEN THE WINDOW IS LOADED SINCE THE IMAGES NEED TO BE LOADED BEFORE WE GET THE DIMENSIONS
        $("#photoGalleryThumbs img").each(function () {
            $(this).addClass('test');
            var aspectRatio = ($(this)[0].naturalWidth / $(this)[0].naturalHeight).toFixed(2);
            var orientation = 'square';
            if (aspectRatio == 1.50) {
                var orientation = 'landscape';
            } else if (aspectRatio > 1) {
                var orientation = 'panorama';
            } else if (aspectRatio < 1) {
                var orientation = 'portrait';
            }
            $(this).addClass(orientation).attr("data-orientation", orientation);
        });
		
		// Set first image orientation'
		var img = $('#photoGalleryThumbs .item img')[0];
        $('#photoGalleryImage img').attr('src', img.src).removeClass('hide').addClass($(img).attr('data-orientation'));
		
		
		
		// added by Masha 
		// on mobile change of item (on swiping)
		// update content of .captionMobile with item's .photoGalleryItemCaption content 
		$('#photoGallery').on("owl.next", function () {
			console.log("item changed"); // doesn't work 
		});
		
		// need to find event associated with swiping of cards (dragMove(event) in owl.carousel.js )
		// and link updating of .captionMobile to it
		
});





