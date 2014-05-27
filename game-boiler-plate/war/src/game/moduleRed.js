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
			
			this.sprite.interactive = true;
			this.sprite.buttonMode = true; //activate for changing cursor
			var spriteLocal = this.sprite;
			this.sprite.click = function() {
				spriteLocal.scale.x += 1;
				spriteLocal.scale.y += 1;
				spriteLocal.rotation += 0.2;
			};

			game.scene.stage.addChild(this.sprite);
		}
	});

});