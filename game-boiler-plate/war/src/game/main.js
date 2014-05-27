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

		      // add one randomly positioned blue dot every new milliseconds
		      this.addTimer(100, function() {
			      var rndX = Math.random() * game.system.width;
			      var rndY = Math.random() * game.system.height;
			      var blueDotObj = new BlueDotClass(rndX, rndY);
		      }, true);

		      // switch to the end scene after some seconds
		      this.addTimer(7000, function() {
			      game.system.setScene(SceneEnd);
		      });
	      }
	    });

	    SceneEnd = game.Scene.extend({
	      backgroundColor : 0xFF0000,

	      init : function() {
		      // switch to the game scene after some time
		      this.addTimer(2000, function() {
			      game.system.setScene(SceneGame);
		      });
	      }
	    });

	    game.start();

    });
