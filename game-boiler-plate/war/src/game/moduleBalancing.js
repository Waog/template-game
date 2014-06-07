game.module('game.moduleBalancing').require().body(function() {
    
    game.Balancing = game.Class.extend({
        test : 'hello',
        
        // boat:
        paddlePower : 40,
        paddlePowerAngle : 1,
        paddlePowerV2 : 40,
        paddlePowerAngleV2 : 1,
        slowRate : 0.99,
        downTimeToSlow : 0.3,
    });
    
    game.balancing = new game.Balancing();
});
