game
        .module('game.moduleBoat')
        .require('engine.particle', 'engine.audio', 'engine.keyboard',
                'game.moduleBalancing')
        .body(
                function() {

                    game.addAsset('boat.png');
                    game.addAsset('boatSpriteSheet.json');
                    game.addAsset('player1.png');
                    game.addAsset('player2.png');
                    game.addAsset('box.png');
                    game.addAsset('spumeParticle.png');
                    game.addAudio('audio/splash.m4a', 'clickSound');

                    Boat = game.Class
                            .extend({

                                x : 0, // position
                                y : 0, // position
                                a : 2, // angle
                                vX : 0, // velocity
                                vY : 0, // velocity
                                vA : 0, // angular velocity
                                body : null,
                                bodySprite : null,
                                player1Sprite : null,
                                player2Sprite : null,

                                init : function(x, y, winCallback, loseCallback) {
                                    this.x = x;
                                    this.y = y;
                                    this.winCallback = winCallback;
                                    this.loseCallback = loseCallback;

                                    // load the sprite
                                    this.sprite = new game.Container();
                                    this.sprite.scale.set(.4, .4);
                                    game.boatLayer.addChild(this.sprite);

                                    var boatSprite = new game.Animation(
                                            'boat1.png', 'boat2.png',
                                            'boat3.png');
                                    boatSprite.anchor.set(0.5, 0.5);
                                    // boatSprite.scale.set(.4, .4);
                                    this.sprite.addChild(boatSprite);
                                    boatSprite.animationSpeed = 0.5;
                                    boatSprite.play();

                                    this.player1Sprite = new game.Sprite(
                                            'player1.png');
                                    this.player1Sprite.anchor.set(0.8, 0.63);
                                    this.player1Sprite.position.set(0,
                                            110 - 152.5);
                                    boatSprite.addChild(this.player1Sprite);

                                    this.player2Sprite = new game.Sprite(
                                            'player2.png');
                                    this.player2Sprite.anchor.set(0.167, 0.519);
                                    this.player2Sprite.position.set(0,
                                            230.5 - 152.5);
                                    boatSprite.addChild(this.player2Sprite);

                                    this.bodySprite = new game.Sprite('box.png');
                                    this.bodySprite.position.set(x, y);
                                    this.bodySprite.width = 100;
                                    this.bodySprite.height = 100;
                                    game.scene.stage.addChild(this.bodySprite);

                                    // 
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

                                    this.render();

                                    var scaleTween = new game.Tween(
                                            this.sprite.scale);
                                    scaleTween.to({
                                        x : 0.45,
                                        y : 0.45
                                    }, 2000);
                                    scaleTween.repeat(Number.MAX_SAFE_INTEGER);
                                    scaleTween.yoyo();
                                    scaleTween.start();
                                },

                                update : function() {
                                    // slow down the boat
                                    this.vA *= game.balancing.slowRate;
                                    this.vX *= game.balancing.slowRate;
                                    this.vY *= game.balancing.slowRate;

                                    this.handleKeysV2();

                                    this.x += this.vX * game.system.delta; // update
                                    // position
                                    this.y += this.vY * game.system.delta; // update
                                    // position
                                    this.a += this.vA * game.system.delta; // update
                                    // angle

                                    this.body.position.x = this.x - 50;
                                    this.body.position.y = this.y - 50;
                                    this.bodySprite.position.set(this.x - 50,
                                            this.y - 50);

                                    this.render();

                                    this.checkWin();
                                },

                                checkWin : function() {
                                    var playerHitsGoal = game.world.solver
                                            .hitTest(this.body, game.stone.body);
                                    if (!playerHitsGoal) {
                                        return;
                                    }
                                    this.winCallback();

                                },

                                emitInterval : 0.1,

                                timeToNextEmit : 0,

                                render : function() {
                                    this.sprite.position.set(this.x, this.y);
                                    this.sprite.rotation = this.a;

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
                                        emitter.count = 6; // Emit _count_
                                        // particles
                                        game.scene.addEmitter(emitter);
                                    }
                                },

                                // holding = accelerating
                                handleKeysV1 : function() {
                                    var spaceHit = game.keyboard.down("A");
                                    if (spaceHit) {
                                        this.vA += game.balancing.paddlePowerAngle
                                                * game.system.delta;
                                        this.vY -= game.balancing.paddlePower
                                                * Math.cos(this.a)
                                                * game.system.delta;
                                        this.vX += game.balancing.paddlePower
                                                * Math.sin(this.a)
                                                * game.system.delta;
                                    }
                                    var spaceHit = game.keyboard.down("K");
                                    if (spaceHit) {
                                        this.vA -= game.balancing.paddlePowerAngle
                                                * game.system.delta;
                                        this.vY -= game.balancing.paddlePower
                                                * Math.cos(this.a)
                                                * game.system.delta;
                                        this.vX += game.balancing.paddlePower
                                                * Math.sin(this.a)
                                                * game.system.delta;
                                    }
                                },

                                leftDownLastUpdate : false,
                                leftDownTime : 0,
                                rightDownLastUpdate : false,
                                rightDownTime : 0,

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
                                            && leftReleasedAfter < game.balancing.downTimeToSlow) {
                                        this.vA += game.balancing.paddlePowerAngleV2;
                                        this.vY -= game.balancing.paddlePowerV2
                                                * Math.cos(this.a);
                                        this.vX += game.balancing.paddlePowerV2
                                                * Math.sin(this.a);

                                        var tween = new game.Tween(
                                                this.player1Sprite);
                                        tween.to({
                                            rotation : [ -0.5, 0 ]
                                        }, 100);
                                        tween.start();

                                        game.audio.playSound('clickSound',
                                                false, 1 + Math.random() + 0.3,
                                                function() {
                                                }, Math.random() + 0.3);
                                    }
                                    // else if button is hold down: slow down
                                    if (leftDown
                                            && this.leftDownTime > game.balancing.downTimeToSlow) {
                                        // console.log("slooow down!");
                                        if (this.vA > 0) {
                                            this.vA *= activeSlowMultiplier;
                                        }
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
                                            && rightReleasedAfter < game.balancing.downTimeToSlow) {
                                        this.vA -= game.balancing.paddlePowerAngleV2;
                                        this.vY -= game.balancing.paddlePowerV2
                                                * Math.cos(this.a);
                                        this.vX += game.balancing.paddlePowerV2
                                                * Math.sin(this.a);

                                        var tween = new game.Tween(
                                                this.player2Sprite);
                                        tween.to({
                                            rotation : [ 0.5, 0 ]
                                        }, 100);
                                        tween.start();

                                        game.audio.playSound('clickSound',
                                                false, 1 + Math.random() + 0.3,
                                                function() {
                                                }, Math.random() + 0.3);
                                    }
                                    // else if button is hold down: slow down
                                    if (rightDown
                                            && this.rightDownTime > game.balancing.downTimeToSlow) {
                                        // console.log("slooow down!");
                                        if (this.vA < 0) {
                                            this.vA *= activeSlowMultiplier;
                                        }
                                        this.vY *= activeSlowMultiplier;
                                        this.vX *= activeSlowMultiplier;
                                    }
                                }
                            });

                });