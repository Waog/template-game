game.module('game.moduleWave').require('engine.particle', 'engine.audio',
        'game.moduleBalancing').body(
        function() {

            game.addAsset('wave.png');
            game.addAsset('box.png');
            game.addAudio('audio/splash.m4a', 'clickSound');

            Wave = game.Class.extend({

                x : 0, // position
                y : 0, // position
                a : 2, // angle
                vX : 0, // velocity
                vY : 0, // velocity
                body : null,
                bodySprite : null,
                wavePower : 0.0001,
                waveMaxInfluence : 0.1,
                waveLifeTime : 10000,

                init : function(x, y, a, lifeTime, maxInfluence) {
                    this.x = x;
                    this.y = y;
                    this.a = a;
                    this.waveLifeTime = lifeTime;
                    this.waveMaxInfluence = maxInfluence;

                    this.vX = game.balancing.waveVelocity * Math.sin(a);
                    this.vY = -game.balancing.waveVelocity * Math.cos(a);

                    // load the sprite
                    this.sprite = new game.Sprite('wave.png');
                    this.sprite.anchor.set(0.5, 0.5);
                    this.sprite.rotation = a;
                    game.spumeLayer.addChild(this.sprite);

                    this.bodySprite = new game.Sprite('box.png');
                    this.bodySprite.position.set(x, y);
                    this.bodySprite.scale.set(1 / 8, 1 / 8);
                    game.scene.stage.addChild(this.bodySprite);

                    // 
                    this.body = new game.Body({
                        position : {
                            x : x - 50,
                            y : y - 50
                        },
                        collideAgainst : 1,
                        collisionGroup : 1
                    });
                    var shape = new game.Rectangle(100, 100);
                    this.body.addShape(shape);
                    game.world.addBody(this.body);

                    var tween = new game.Tween(this);
                    tween.to({
                        wavePower : [ 1, 0 ]
                    }, this.waveLifeTime);
                    tween.start();

                    this.render();
                },

                update : function() {

                    this.x += this.vX * game.system.delta; // update
                    // position
                    this.y += this.vY * game.system.delta; // update
                    // position

                    this.body.position.x = this.x;
                    this.body.position.y = this.y;
                    this.bodySprite.position.set(this.x - 50, this.y - 50);

                    this.handleBoatCollision();
                    this.handleGoalCollision();

                    this.checkAlive();

                    this.render();
                },

                emitInterval : 0.1,

                timeToNextEmit : 0,
                
                render : function() {
                    var alphaMax = 0.3;
                    
                    this.sprite.position.set(this.x, this.y);
                    this.sprite.alpha = 0; // alphaMax * this.wavePower / game.balancing.maxWavePower;
                    
                    // particles
                    this.timeToNextEmit -= game.system.delta;
                    if (this.timeToNextEmit <= 0) {
                        this.timeToNextEmit = this.emitInterval;

                        var emitter = new game.Emitter();
                        emitter.container = game.spumeLayer;
                        emitter.textures
                                .push('spumeParticle.png');
                        emitter.position.set(this.x, this.y);
                        emitter.angle = this.a - Math.PI / 2;
                        emitter.angleVar = Math.PI / 4;
                        emitter.duration = 0.21;
                        emitter.startScale = 1;
                        emitter.endScale = 5;
                        emitter.startAlpha = 1; // this.wavePower / game.balancing.maxWavePower;
                        emitter.endAlpha = 0;
                        emitter.life = 1; // particle exists
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

                handleBoatCollision : function() {
                    if (!game.world.solver.hitTest(this.body, game.boat.body)) {
                        return;
                    }

                    // console.log('wave-boat-hit!');
                    game.boat.vX = this.waveMaxInfluence * this.wavePower
                            * this.vX
                            + (1 - this.waveMaxInfluence * this.wavePower)
                            * game.boat.vX;
                    game.boat.vY = this.waveMaxInfluence * this.wavePower
                            * this.vY
                            + (1 - this.waveMaxInfluence * this.wavePower)
                            * game.boat.vY;
                },
                
                handleGoalCollision : function() {
                    if (!game.world.solver.hitTest(this.body, game.stone.body)) {
                        return;
                    }
                    
                    // console.log('wave-boat-hit!');
                    game.stone.vX = this.waveMaxInfluence * this.wavePower
                    * this.vX
                    + (1 - this.waveMaxInfluence * this.wavePower)
                    * game.stone.vX;
                    game.stone.vY = this.waveMaxInfluence * this.wavePower
                    * this.vY
                    + (1 - this.waveMaxInfluence * this.wavePower)
                    * game.stone.vY;
                },

                checkAlive : function() {
                    if (this.x < -300 || this.y < -300
                            || this.x > game.system.width + 300
                            || this.y > game.system.height + 300) {
                        // console.log('outside!');
                        this.removeWave();
                    } else if (this.wavePower <= 0) {
                        // console.log('to weak!');
                        this.removeWave();
                    }
                },

                removeWave : function() {
                    game.spumeLayer.removeChild(this.sprite);
                    game.scene.stage.removeChild(this.bodySprite);
                    game.scene.removeObject(this);
                }
            });
        });