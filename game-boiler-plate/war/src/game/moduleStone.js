game.module('game.moduleStone').require('engine.particle', 'engine.audio', 'engine.physics')
        .body(function() {

            game.addAsset('stone.png');
            game.addAsset('box.png');

            Stone = game.Class.extend({
                body : null,
                
                init : function(x, y) {
                    
                    this.sprite = new game.Sprite('stone.png');
                    this.sprite.anchor.set(0.5, 0.5);
                    this.sprite.position.set(x, y);
                    game.scene.stage.addChild(this.sprite);
                    
                    this.body = new game.Body({
                        position: { x: x - 50, y: y - 50},
                        collideAgainst: 1,
                        collisionGroup: 1
                    });
                    var shape = new game.Rectangle(100, 100);
                    this.body.addShape(shape);
                    game.world.addBody(this.body);
                    
                    var bodySprite = new game.Sprite('box.png');
                    bodySprite.position.set(this.body.position.x, this.body.position.y);
                    bodySprite.width = 100;
                    bodySprite.height = 100;
                    game.scene.stage.addChild(bodySprite);
                },
            });

        });