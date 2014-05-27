game.module('game.moduleBlue').require('utils.Util').body(
    function() {

	    game.addAsset('blueDot.png');
	    game.addAsset('spritesheet.json');

	    BlueDotClass = game.Class.extend({
	      init : function(x, y) {

		      this.sprite = this.getRandomSprite();
		      this.sprite.anchor.set(0.5, 0.5);
		      this.sprite.position.set(x, y);
		      this.sprite.rotation = Math.random();
		      this.sprite.alpha = Math.random();
		      this.sprite.scale.x = Math.random();
		      this.sprite.scale.y = Math.random();

		      // var width = this.sprite.width;
		      // var height = this.sprite.height;
		      // console.log('blueDot - width: ', width, 'height', height);

		      game.scene.stage.addChild(this.sprite);
	      },

	      getRandomSprite : function() {
	      	// from sprite sheet
		      var fileName = new Util().getRandomArrayElement([ 'blueCross.png',
		          'blueSquare.png', 'blueStar.png' ]);

		      return new game.Sprite(fileName);
	      }
	    });

    });