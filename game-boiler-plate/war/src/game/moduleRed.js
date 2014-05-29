game.module('game.moduleRed').require('engine.particle', 'engine.audio').body(
    function() {

	    game.addAsset('redDot.png');
	    game.addAudio('audio/hurt.m4a', 'clickSound');

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
			    var touchedAction = function() {
				    // tweening
				    var tween = new game.Tween(spriteLocal);
				    var rndX = Math.random() * game.system.width;
				    var rndY = Math.random() * game.system.height;
				    tween.to({
				      rotation : Math.PI * Math.random(),
				      alpha : [ 0.1, 1, 0.1, 1 ],
				      x : rndX,
				      y : rndY,
				    }, 700);
				    tween.start();
				    // add easing and interpolation, to get more fancy effects

				    game.audio.playSound('clickSound', false, Math.random() + 0.3,
				        function() {
				        }, Math.random() + 0.3);
			    };

			    this.sprite.click = touchedAction;
			    this.sprite.tap = touchedAction;
			    
			    game.scene.stage.addChild(this.sprite);

			    // particles
			    var emitter = new game.Emitter();
			    emitter.container = this.sprite;
			    emitter.textures.push('redDot.png');
			    emitter.position.set(0, 0);
			    emitter.startScale = 0.3;
			    emitter.endScale = 0.0;
			    emitter.life = 0.5; // particle exists for that many seconds
			    emitter.lifeVar = 0.5;
			    emitter.rate = 0.1; // Emit particles every second
			    emitter.count = 3; // Emit 2 particles
			    game.scene.addEmitter(emitter);
		    }
	    });

    });