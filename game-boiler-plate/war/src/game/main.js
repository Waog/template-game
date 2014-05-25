game.module('game.main').require('engine.core', 'game.moduleRed',
    'game.moduleBlue').body(
    function() {
	    SceneGame = game.Scene.extend({
	      backgroundColor : 0xb9bec7,

	      init : function() {
		      // add one central red dot after 3 seconds
		      this.addTimer(3000, function() {
			      var redDotObj = new RedDotClass(game.system.width / 2,
			          game.system.height / 2);
		      });

		      // add one randomly positioned blue dot every 1 seconds
		      this.addTimer(1000, function() {
			      var rndX = Math.random() * game.system.width;
			      var rndY = Math.random() * game.system.height;
			      var blueDotObj = new BlueDotClass(rndX, rndY);
		      }, true);

		      // switch to the end scene after 5 seconds
		      this.addTimer(5000, function() {
			      game.system.setScene(SceneEnd);
		      });
	      }
	    });

	    SceneEnd = game.Scene.extend({
	      backgroundColor : 0xFF0000,

	      init : function() {
		      // switch to the game scene after 5 seconds
		      this.addTimer(5000, function() {
			      game.system.setScene(SceneGame);
		      });
	      }
	    });

	    game.start();

    });
