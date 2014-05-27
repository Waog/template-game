game.module('game.moduleRed').body(function() {

	game.addAsset('redDot.png');

	RedDotClass = game.Class.extend({
		init : function(x, y) {
			this.sprite = new game.Sprite('redDot.png');
			this.sprite.anchor.set(0.5, 0.5);
			this.sprite.position.set(x, y);
			this.sprite.scale.set(3, 3);

			// interactivity:
			this.sprite.interactive = true;
			this.sprite.buttonMode = true; // activate for changing cursor
			var spriteLocal = this.sprite;
			this.sprite.click = function() {
				// tweening
				var tween = new game.Tween(spriteLocal);
				var rndX = Math.random() * game.system.width;
				var rndY = Math.random() * game.system.height;
				tween.to({
				  rotation : Math.random(),
				  alpha : [ 0.1, 1, 0.1, 1 ],
				  x : rndX,
				  y : rndY,
				}, 700);
				tween.start();
				// add easing and interpolation, to get more fancy effects
			};

			game.scene.stage.addChild(this.sprite);
		}
	});

});