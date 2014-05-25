game.module('game.moduleRed').body(function() {

	game.addAsset('redDot.png');

	RedDotClass = game.Class.extend({
		init : function(x, y) {
			this.sprite = new game.Sprite('redDot.png');
			this.sprite.anchor.set(0.5, 0.5);
			this.sprite.position.set(x, y);

			game.scene.stage.addChild(this.sprite);
		}
	});

});