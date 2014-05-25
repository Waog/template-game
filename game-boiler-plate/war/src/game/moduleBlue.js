game.module('game.moduleBlue').body(function() {

	game.addAsset('blueDot.png');

	BlueDotClass = game.Class.extend({
		init : function(x, y) {
			this.sprite = new game.Sprite('blueDot.png');
			this.sprite.anchor.set(0.5, 0.5);
			this.sprite.position.set(x, y);

			game.scene.stage.addChild(this.sprite);
		}
	});

});