game.module('game.moduleRed').body(function() {

	game.addAsset('redDot.png');

	RedDotClass = game.Class.extend({
		init : function(x, y) {
			this.sprite = new game.Sprite('redDot.png');
			this.sprite.anchor.set(0.5, 0.5);
			this.sprite.position.set(x, y);
			this.sprite.scale.set(3, 3);

			var tween = new game.Tween(this.sprite.scale);
			tween.to({
			  x : [ 1, 2, 1 ],
			  y : [ 1, 2, 1 ]
			}, 700);
			tween.start();
			// additionally look at easing and interpolation, to get more fancy
			// effects

			game.scene.stage.addChild(this.sprite);
		}
	});

});