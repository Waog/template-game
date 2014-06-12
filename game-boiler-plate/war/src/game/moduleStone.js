game
        .module('game.moduleStone')
        .require('engine.particle', 'engine.audio', 'utils.Util',
                'engine.physics')
        .body(
                function() {

                    game.addAsset('stoneSpriteSheet.json');
                    game.addAsset('box.png');
                    game.addAsset('sharkSpriteSheet.json');
                    game.addAsset('bloodParticle.png');
                    game.addAsset('spumeParticle.png');

                    game.addAudio('audio/voice1.m4a', 'voice1');
                    game.addAudio('audio/voice2.m4a', 'voice2');

                    Stone = game.Class
                            .extend({
                                body : null,
                                bodySprite : null,
                                goalSprite : null,
                                sharkSprite : null,
                                timeLeft : 30,
                                TOTAL_TIME : 30,
                                loseCallback : null,
                                sharkBlurFilter : null,
                                x : 0, // position
                                y : 0, // position
                                vX : 0, // velocity
                                vY : 0, // velocity
                                a : 2, // angle
                                vA : 0, // angular velocity
                                scaleTween : null,

                                init : function(x, y, loseCallback) {

                                    this.x = x;
                                    this.y = y;

                                    this.loseCallback = loseCallback;

                                    this.timeLeft = this.TOTAL_TIME;

                                    this.sprite = new game.Container();
                                    this.sprite.position.set(x, y);
                                    this.sprite.scale.set(1,1);
                                    game.boatLayer.addChild(this.sprite);

                                    this.sharkSprite = new game.Animation(
                                            'shark1.png', 'shark2.png', 'shark1.png', 'shark3.png');
                                    this.sharkSprite.anchor.set(2, 2);
                                    this.sharkSprite.rotation = 0;
                                    this.sprite.addChild(this.sharkSprite);
                                    this.sharkSprite.animationSpeed = 1;
                                    this.sharkSprite.play();
                                    
                                    this.sharkBlurFilter = new PIXI.BlurFilter();
                                    this.sharkSprite.filters = [ this.sharkBlurFilter ];

                                    this.goalSprite = new game.Animation(
                                            'stone1.png', 'stone2.png', 'stone3.png');
                                    this.goalSprite.anchor.set(0.5, 0.5);
                                    this.sprite.addChild(this.goalSprite);
                                    this.goalSprite.animationSpeed = 0.2;
                                    this.goalSprite.play();

                                    this.body = new game.Body({
                                        position : {
                                            x : x,
                                            y : y
                                        },
                                        collideAgainst : 1,
                                        collisionGroup : 1
                                    });
                                    var shape = new game.Rectangle(100, 100);
                                    this.body.addShape(shape);
                                    game.world.addBody(this.body);

                                    this.bodySprite = new game.Sprite('box.png');
                                    this.bodySprite.position.set(
                                            this.body.position.x,
                                            this.body.position.y);
                                    this.bodySprite.width = 100;
                                    this.bodySprite.height = 100;
                                    game.scene.stage.addChild(this.bodySprite);

                                    this.scaleTween = new game.Tween(
                                            this.sprite.scale);
                                    this.scaleTween.to({
                                        x : 1.1,
                                        y : 1.1
                                    }, 2000);
                                    this.scaleTween.repeat(Number.MAX_SAFE_INTEGER);
                                    this.scaleTween.yoyo();
                                    this.scaleTween.start();
                                },

                                update : function() {
                                    this.ai();

                                    // slow down the goal
                                    this.vA *= game.balancing.slowRate;
                                    this.vX *= game.balancing.slowRate;
                                    this.vY *= game.balancing.slowRate;

                                    this.x += this.vX * game.system.delta; // update
                                    // position
                                    this.y += this.vY * game.system.delta; // update
                                    // position
                                    this.a += this.vA * game.system.delta; // update
                                    // angle

                                    this.sprite.position.set(this.x, this.y);
                                    this.sprite.rotation = this.a;

                                    this.body.position.x = this.x - 50;
                                    this.body.position.y = this.y - 50;
                                    this.bodySprite.position.set(this.x - 50,
                                            this.y - 50);

                                    this.timeLeft -= game.system.delta;

                                    if (this.timeLeft <= 0) {
                                        this.loseCallback();
                                        this.startBloodEmitter();
                                    }

                                    var timeLeftInPercent = Math.max(1
                                            - (this.TOTAL_TIME - this.timeLeft)
                                            / this.TOTAL_TIME, 0);

                                    var sharkDistance = timeLeftInPercent
                                            * game.system.width
                                            / this.sharkSprite.width + 0.5;
                                    this.sharkSprite.anchor.set(sharkDistance,
                                            sharkDistance);

                                    this.sharkSprite.rotation += 3
                                            * game.system.delta / sharkDistance;

                                    this.sharkSprite.alpha = Math.pow(
                                            1 - timeLeftInPercent, 3);

                                    this.sharkBlurFilter.blur = 100 * timeLeftInPercent;

                                    this.render();

                                    this.playSounds();
                                },

                                bloodEmiterStarted : false,

                                startBloodEmitter : function() {
                                    if (this.bloodEmiterStarted) {
                                        return;
                                    }
                                    this.bloodEmiterStarted = true;

                                    var emitter = new game.Emitter();
                                    emitter.container = game.spumeLayer;
                                    emitter.textures.push('bloodParticle.png');
                                    emitter.position.set(this.x, this.y);
                                    emitter.duration = 20;
                                    emitter.startScale = 1;
                                    emitter.endScale = 5;
                                    emitter.startAlpha = 0.6;
                                    emitter.endAlpha = 0;
                                    emitter.speed = 20;
                                    emitter.speedVar = 5;
                                    emitter.positionVar.x = 30;
                                    emitter.positionVar.y = 30;
                                    emitter.life = 3; // particle exists
                                    // for
                                    // that many seconds
                                    emitter.lifeVar = 0.5;
                                    emitter.rate = 0.1; // Emit particles
                                    // every _rate_
                                    // second
                                    emitter.count = 6; // Emit _count_
                                    // particles
                                    game.scene.addEmitter(emitter);

                                    var goalScaleTween = new game.Tween(
                                            this.goalSprite.scale);
                                    goalScaleTween.to({
                                        x : 0,
                                        y : 0
                                    }, 1000);
                                    goalScaleTween.start();
                                    var sharkScaleTween = new game.Tween(
                                            this.sharkSprite.scale);
                                    sharkScaleTween.to({
                                        x : 0,
                                        y : 0
                                    }, 1000);
                                    sharkScaleTween.start();
                                    var spriteAlphaTween = new game.Tween(
                                            this.sprite);
                                    spriteAlphaTween.to({
                                        alpha : 0,
                                    }, 1000);
                                    spriteAlphaTween.start();
                                },

                                emitInterval : 0.1,

                                timeToNextEmit : 0,

                                render : function() {
                                    // particles
                                    this.timeToNextEmit -= game.system.delta;
                                    if (this.timeToNextEmit <= 0) {
                                        this.timeToNextEmit = this.emitInterval;

                                        var emitter = new game.Emitter();
                                        emitter.container = game.spumeLayer;
                                        emitter.textures
                                                .push('spumeParticle.png');
                                        emitter.position.set(this.x, this.y);
                                        emitter.duration = 0.3;
                                        emitter.startScale = 1;
                                        emitter.endScale = 5;
                                        emitter.startAlpha = 0.6;
                                        emitter.endAlpha = 0;
                                        emitter.speed = 20;
                                        emitter.speedVar = 5;
                                        emitter.positionVar.x = 30;
                                        emitter.positionVar.y = 30;
                                        emitter.life = 3; // particle exists
                                        // for
                                        // that many seconds
                                        emitter.lifeVar = 0.5;
                                        emitter.rate = 0.1; // Emit particles
                                        // every _rate_
                                        // second
                                        emitter.count = 1; // Emit _count_
                                        // particles
                                        game.scene.addEmitter(emitter);
                                    }
                                },

                                ai : function() {
                                    this.vX += 3 * (Math.random() - 0.5);
                                    this.vY += 3 * (Math.random() - 0.5);
                                    this.vA += 0.1 * (Math.random() - 0.5);
                                },

                                soundInterval : 8,

                                timeToNextSound : 5,

                                playSounds : function() {
                                    if (this.timeLeft <= 0) {
                                        return;
                                    }

                                    this.timeToNextSound -= game.system.delta;

                                    if (this.timeToNextSound <= 0) {
                                        this.timeToNextSound = this.soundInterval
                                                / 2
                                                + Math.random()
                                                * this.soundInterval / 2;

                                        var soundAsset = 'voice'
                                                + game.util.getRandomInt(1, 2);
                                        game.audio.playSound(soundAsset, false,
                                                1 + Math.random() + 3,
                                                function() {
                                                }, 0.2 * Math.random() + 0.9);
                                    }
                                }
                            });

                });