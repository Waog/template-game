game.module('game.main').require('engine.core', 'game.moduleRed',
    'game.moduleBlue').body(
    function() {
	    SceneGame = game.Scene.extend({
	      backgroundColor : 0xb9bec7,

	      init : function() {
		      // add one central red dot after 3 seconds
		      this.addTimer(1500, function() {
			      var redDotObj = new RedDotClass(game.system.width / 2,
			          game.system.height / 2);
		      });

		      // add one randomly positioned blue dot every new milliseconds
		      this.addTimer(1000, function() {
			      var rndX = Math.random() * game.system.width;
			      var rndY = Math.random() * game.system.height;
			      var blueDotObj = new BlueDotClass(rndX, rndY);
		      }, true);
	      },

	      mousemove : function(e) {
		      var x = e.global.x;
		      var y = e.global.y;
		      new BlueDotClass(x, y);
	      },

	      mouseout : function() {
		      game.system.setScene(SceneEnd);
	      }
	    });

	    game.addAsset('myBitmapFont.fnt');

	    SceneEnd = game.Scene.extend({
	      backgroundColor : 0xFF0000,

	      init : function() {
		      // switch to the game scene after some time
		      this.addTimer(2000, function() {
			      game.system.setScene(SceneGame);
		      });

		      var text = new game.BitmapText('Hello BitmapFont!', {
			      font : 'Arial'
		      }); // the font has to be the "face" from the .fnt file.
		      this.stage.addChild(text);
	      },

	      mousemove : function() {
		      game.system.setScene(SceneGame);
	      }
	    });

	    game.start(SceneGame, 1920, 1080);

    });
