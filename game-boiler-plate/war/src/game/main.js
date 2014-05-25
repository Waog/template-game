game.module('game.main').body(
    function() {

	    game.addAsset('logo.png');

	    LogoClass = game.Class.extend({
		    init : function(x, y) {
			    this.sprite = new game.Sprite('logo.png');
			    this.sprite.anchor.set(0.5, 0.5);
			    this.sprite.position.set(x, y);

			    game.scene.stage.addChild(this.sprite);
		    }
	    })

	    SceneGame = game.Scene.extend({
	      backgroundColor : 0xb9bec7,

	      init : function() {
		      var logoObj = new LogoClass(game.system.width / 2,
		          game.system.height / 2);
	      }
	    });

	    game.start();

    });
