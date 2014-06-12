game.module('game.moduleFishes').require('engine.particle').body(
        function() {

            game.addAsset('fishParticle.png');

            Fishes = game.Class.extend({

                x : 0, // position
                y : 0, // position
                a : 2, // angle
                vX : 10, // velocity
                vY : 10, // velocity
                lifeTime : 10000,

                init : function(x, y, a, lifeTime) {
                    this.x = x;
                    this.y = y;
                    this.a = a;
                    this.lifeTime = lifeTime;

                    // load the sprite
                    this.sprite = new game.Container();
                    this.sprite.rotation = a;
                    game.fishLayer.addChild(this.sprite);
                },

                update : function() {

                    this.x += this.vX * game.system.delta; // update
                    // position
                    this.y += this.vY * game.system.delta; // update
                    // position

                    this.lifeTime -= game.system.delta;

                    this.checkAlive();

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
                        emitter.textures.push('fishParticle.png');
                        emitter.position.set(this.x, this.y);
                        emitter.positionVar.set(50, 50);
                        emitter.duration = 0.21;
                        emitter.startScale = 1;
                        emitter.endScale = 0;
                        emitter.speed = 30;
                        emitter.speedVar = 10;
                        emitter.startAlpha = 0; // this.wavePower /
                        // game.balancing.maxWavePower;
                        emitter.endAlpha = 1;
                        emitter.life = 2;
                        emitter.target.set(this.x + 100 * Math.sin(this.a),
                                this.y - 100 * Math.cos(this.a));
                        emitter.targetForce = 200;
                        emitter.lifeVar = 0.5;
                        emitter.rate = 0.1; // Emit particles
                        // every _rate_
                        // second
                        emitter.count = 3; // Emit _count_
                        // particles
                        game.scene.addEmitter(emitter);
                    }
                },

                checkAlive : function() {
                    if (this.x < -300 || this.y < -300
                            || this.x > game.system.width + 300
                            || this.y > game.system.height + 300) {
                        // console.log('outside!');
                        this.remove();
                    } else if (this.lifetime <= 0) {
                        // console.log('to weak!');
                        this.remove();
                    }
                },

                remove : function() {
                    game.fishLayer.removeChild(this.sprite);
                    game.scene.removeObject(this);
                }
            });
        });