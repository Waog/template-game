game.module('game.moduleStone').require('engine.particle', 'engine.audio',
        'engine.physics').body(
        function() {

            game.addAsset('stone.png');
            game.addAsset('box.png');
            game.addAsset('shark.png');

            Stone = game.Class.extend({
                body : null,

                sharkSprite : null,

                timeLeft : 60,

                TOTAL_TIME : 60,
                
                loseCallback : null,

                init : function(x, y, loseCallback) {
                    
                    this.loseCallback = loseCallback;

                    this.timeLeft = this.TOTAL_TIME;

                    this.sprite = new game.Sprite('stone.png');
                    this.sprite.anchor.set(0.5, 0.5);
                    this.sprite.position.set(x, y);
                    game.scene.stage.addChild(this.sprite);

                    this.sharkSprite = new game.Sprite('shark.png');
                    this.sharkSprite.anchor.set(2, 2);
                    this.sharkSprite.rotation = 0;
                    this.sprite.addChild(this.sharkSprite);

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

                    var bodySprite = new game.Sprite('box.png');
                    bodySprite.position.set(this.body.position.x,
                            this.body.position.y);
                    bodySprite.width = 100;
                    bodySprite.height = 100;
                    game.scene.stage.addChild(bodySprite);
                },

                update : function() {
                    this.timeLeft -= game.system.delta;

                    if (this.timeLeft <= 0) {
                        this.loseCallback();
                    }

                    var timeLeftInPercent = 1
                            - (this.TOTAL_TIME - this.timeLeft)
                            / this.TOTAL_TIME;

                    var sharkDistance = timeLeftInPercent * game.system.width
                            / this.sharkSprite.width + 0.5;
                    this.sharkSprite.anchor.set(sharkDistance, sharkDistance);

                    this.sharkSprite.rotation += 3 * game.system.delta
                            / sharkDistance;
                    
                    this.sharkSprite.alpha = Math.pow(1 - timeLeftInPercent, 3);
                }
            });

        });