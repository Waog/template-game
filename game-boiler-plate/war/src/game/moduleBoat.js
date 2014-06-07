game
        .module('game.moduleBoat')
        .require('engine.particle', 'engine.audio', 'engine.keyboard')
        .body(
                function() {

                    game.addAsset('redDot.png');
                    game.addAsset('boat.png');
                    game.addAudio('audio/hurt.m4a', 'clickSound');

                    Boat = game.Class
                            .extend({

                                x : 0, // position
                                y : 0, // position
                                a : 0, // angle
                                vX : 0, // velocity
                                vY : 0, // velocity
                                vA : 0, // angular velocity
                                paddlePower : 40,
                                paddlePowerAngle : 1,
                                paddlePowerV2 : 40,
                                paddlePowerAngleV2 : 1,
                                slowRate : 0.99,

                                init : function(x, y) {
                                    this.x = x;
                                    this.y = y;

                                    // load the sprite
                                    this.sprite = new game.Sprite('boat.png');
                                    this.sprite.anchor.set(0.5, 0.5);
                                    this.sprite.scale.set(.4, .4);
                                    game.scene.stage.addChild(this.sprite);

                                    this.render();
                                },

                                update : function() {
                                    // slow down the boat
                                    this.vA *= this.slowRate;
                                    this.vX *= this.slowRate;
                                    this.vY *= this.slowRate;

                                    this.handleKeysV2();

                                    this.x += this.vX * game.system.delta; // update
                                    // position
                                    this.y += this.vY * game.system.delta; // update
                                    // position
                                    this.a += this.vA * game.system.delta; // update
                                    // angle

                                    this.render();
                                },

                                render : function() {
                                    this.sprite.position.set(this.x, this.y);
                                    this.sprite.rotation = this.a;
                                },

                                // holding = accelerating
                                handleKeysV1 : function() {
                                    var spaceHit = game.keyboard.down("A");
                                    if (spaceHit) {
                                        this.vA += this.paddlePowerAngle
                                                * game.system.delta;
                                        this.vY -= this.paddlePower
                                                * Math.cos(this.a)
                                                * game.system.delta;
                                        this.vX += this.paddlePower
                                                * Math.sin(this.a)
                                                * game.system.delta;
                                    }
                                    var spaceHit = game.keyboard.down("K");
                                    if (spaceHit) {
                                        this.vA -= this.paddlePowerAngle
                                                * game.system.delta;
                                        this.vY -= this.paddlePower
                                                * Math.cos(this.a)
                                                * game.system.delta;
                                        this.vX += this.paddlePower
                                                * Math.sin(this.a)
                                                * game.system.delta;
                                    }
                                },

                                leftDownLastUpdate : false,
                                leftDownTime : 0,
                                rightDownLastUpdate : false,
                                rightDownTime : 0,
                                downTimeToSlow : 0.3,

                                // tapping = accelerating, holding = slowing
                                handleKeysV2 : function() {

                                    var activeSlowMultiplier = 0.9;
                                    
                                    // meassure left down
                                    var leftReleased = false;
                                    var leftReleasedAfter = -1;
                                    var leftDown = false;
                                    if (game.keyboard.down("A")) {
                                        leftDown = true;
                                        this.leftDownLastUpdate = true;
                                        this.leftDownTime += game.system.delta;
                                    } else if (this.leftDownLastUpdate) {
                                        leftReleased = true;
                                        leftReleasedAfter = this.leftDownTime;
                                        this.leftDownTime = 0;
                                        this.leftDownLastUpdate = false;
                                    }

                                    // if button hit short: paddle
                                    if (leftReleased
                                            && leftReleasedAfter < this.downTimeToSlow) {
                                        this.vA += this.paddlePowerAngleV2;
                                        this.vY -= this.paddlePowerV2
                                                * Math.cos(this.a);
                                        this.vX += this.paddlePowerV2
                                                * Math.sin(this.a);

                                    }
                                    // else if button is hold down: slow down
                                    if (leftDown
                                            && this.leftDownTime > this.downTimeToSlow) {
                                        console.log("slooow down!");
                                        this.vA *= activeSlowMultiplier;
                                        this.vY *= activeSlowMultiplier;
                                        this.vX *= activeSlowMultiplier;
                                    }

                                    // meassure right down
                                    var rightReleased = false;
                                    var rightReleasedAfter = -1;
                                    var rightDown = false;
                                    if (game.keyboard.down("K")) {
                                        rightDown = true;
                                        this.rightDownLastUpdate = true;
                                        this.rightDownTime += game.system.delta;
                                    } else if (this.rightDownLastUpdate) {
                                        rightReleased = true;
                                        rightReleasedAfter = this.rightDownTime;
                                        this.rightDownTime = 0;
                                        this.rightDownLastUpdate = false;
                                    }

                                    // if button hit short: paddle
                                    if (rightReleased
                                            && rightReleasedAfter < this.downTimeToSlow) {
                                        this.vA -= this.paddlePowerAngleV2;
                                        this.vY -= this.paddlePowerV2
                                                * Math.cos(this.a);
                                        this.vX += this.paddlePowerV2
                                                * Math.sin(this.a);

                                    }
                                    // else if button is hold down: slow down
                                    if (rightDown
                                            && this.rightDownTime > this.downTimeToSlow) {
                                        console.log("slooow down!");
                                        this.vA *= activeSlowMultiplier;
                                        this.vY *= activeSlowMultiplier;
                                        this.vX *= activeSlowMultiplier;
                                    }
                                }
                            });

                });