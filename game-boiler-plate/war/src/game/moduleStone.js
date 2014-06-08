game.module('game.moduleStone').require('engine.particle', 'engine.audio',
        'engine.physics').body(
        function() {

            game.addAsset('stone.png');
            game.addAsset('box.png');
            game.addAsset('shark.png');

            Stone = game.Class
                    .extend({
                        body : null,
                        bodySprite : null,
                        sharkSprite : null,
                        timeLeft : 60,
                        TOTAL_TIME : 60,
                        loseCallback : null,
                        x : 0, // position
                        y : 0, // position
                        vX : 0, // velocity
                        vY : 0, // velocity
                        a : 2, // angle
                        vA : 0, // angular velocity

                        init : function(x, y, loseCallback) {

                            this.x = x;
                            this.y = y;

                            this.loseCallback = loseCallback;

                            this.timeLeft = this.TOTAL_TIME;

                            this.sprite = new game.Container();
                            this.sprite.position.set(x, y);
                            game.boatLayer.addChild(this.sprite);
                                
                            this.sharkSprite = new game.Sprite('shark.png');
                            this.sharkSprite.anchor.set(2, 2);
                            this.sharkSprite.rotation = 0;
                            this.sprite.addChild(this.sharkSprite);
                            
                            var goalSprite = new game.Sprite('stone.png');
                            goalSprite.anchor.set(0.5, 0.5);
                            this.sprite.addChild(goalSprite);
                            
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
                            this.bodySprite.position.set(this.body.position.x,
                                    this.body.position.y);
                            this.bodySprite.width = 100;
                            this.bodySprite.height = 100;
                            game.scene.stage.addChild(this.bodySprite);
                            
                            var scaleTween = new game.Tween(
                                    this.sprite.scale);
                            scaleTween.to({
                                x : 1.1,
                                y : 1.1
                            }, 2000);
                            scaleTween.repeat(Number.MAX_SAFE_INTEGER);
                            scaleTween.yoyo();
                            scaleTween.start();
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
                            }

                            var timeLeftInPercent = 1
                                    - (this.TOTAL_TIME - this.timeLeft)
                                    / this.TOTAL_TIME;

                            var sharkDistance = timeLeftInPercent
                                    * game.system.width
                                    / this.sharkSprite.width + 0.5;
                            this.sharkSprite.anchor.set(sharkDistance,
                                    sharkDistance);

                            this.sharkSprite.rotation += 3 * game.system.delta
                                    / sharkDistance;

                            this.sharkSprite.alpha = Math.pow(
                                    1 - timeLeftInPercent, 3);

                            this.render();
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
                                emitter.textures.push('spumeParticle.png');
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
                                emitter.count = 6; // Emit _count_
                                // particles
                                game.scene.addEmitter(emitter);
                            }
                        },

                        ai : function() {
                            this.vX += 3 * (Math.random() - 0.5);
                            this.vY += 3 * (Math.random() - 0.5);
                            this.vA += 0.1 * (Math.random() - 0.5);
                        }
                    });

        });