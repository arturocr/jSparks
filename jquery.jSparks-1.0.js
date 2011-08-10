/*!
 * jSparks v1.0 by Arturo Campos [arturo025@gmail.com]
 * http://almendraestudio.com/
 *
 * Date: Tue Jul 19 22:30:0 2011 -0600
 */
(function($) {	
	$.fn.jSparks = function(options) {
		// Default options
		var defaults = {
			boxHeight: 100,
			boxWidth: 100,
			easing: 'swing',
			maxZIndex: 20,
			pointX: 0,
			pointY: 0,
			randomSpeed: true,
			speed: 1500,
			sparks: []
		},
		// Extend options based on user provided options
		options = $.extend({}, defaults, options),
		// Creates a new pair of coordinates
		newPoint = function() {
			options.pointX = random(options.boxWidth);
			options.pointY = random(options.boxHeight);
		},
		// Creates a new random speed
		newSpeed = function() {
			options.speed = (random(5) + 5) * 250;
		},
		// Returns a random value
		random = function(max) {
			return Math.ceil(Math.random() * max) - 1;
		},
		// Animates the spark
		fly = function(el) {
			if (options.randomSpeed === true) {
				newSpeed();
			}
			newPoint();
			el.animate({
				"top": options.pointY,
				"left": options.pointX
			}, options.speed, 'swing', function() {
				fly(el);
			});
		};
		return this.each(function() {
			var $container = $(this);
			options.boxHeight = $container.outerHeight(true);
			options.boxWidth = $container.outerWidth(true);
			// Creates a new image DOM Object for each spark
			$.each(options.sparks, function(i, val) {
				$spark = $('<img />');
				$spark.attr('src', val).css('z-index', random(options.maxZIndex));
				// Append it to the container
				$container.append($spark);
				// Make it fly!
				fly($spark);
			});
		});
	};
})(jQuery);