game.module('game.main').require('engine.core', 'game.moduleRed',
    'game.moduleBlue').body(
    function() {
	    SceneGame = game.Scene.extend({
	      backgroundColor : 0xb9bec7,

	      init : function() {
		      var redDotObj = new RedDotClass(game.system.width / 2,
		          game.system.height / 2);

		      var blueDotObj = new BlueDotClass(50, 200);
	      }
	    });

	    game.start();

    });
