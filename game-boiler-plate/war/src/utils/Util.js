game.module('utils.Util').body(function() {

	Util = game.Class.extend({

	  /**
		 * Returns a random number between min and max
		 * 
		 * Source:
		 * http://roshanbh.com.np/2008/09/get-random-number-range-two-numbers-javascript.html
		 */
	  getRandomFloatingPoint : function(min, max) {
		  return Math.random() * (max - min) + min;
	  },

	  /**
		 * Returns a random integer between min and max Using Math.round() will give
		 * you a non-uniform distribution!
		 * 
		 * Source:
		 * http://roshanbh.com.np/2008/09/get-random-number-range-two-numbers-javascript.html
		 */
	  getRandomInt : function(min, max) {
		  return Math.floor(Math.random() * (max - min + 1)) + min;
	  },

	  /**
		 * Returns a random element from the given array.
		 */
	  getRandomArrayElement : function(array) {
		  return array[Math.floor(Math.random() * array.length)];
	  }

	});
});