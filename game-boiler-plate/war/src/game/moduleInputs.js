game
        .module('game.moduleInputs')
        .require('engine.keyboard')
        .body(
                function() {

                    Inputs = game.Class
                            .extend({

                                leftKeys : [ 'TAB', 'CAPS_LOCK', '0', '1', '2', '3', '4',
                                        '5', '6', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                                        'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y',
                                        'Z', , 'F1', 'F2', 'F3', 'F4', 'F5' ],

                                rightKeys : [

                                'BACKSPACE', 'ENTER', 'PAUSE', 'PAGE_UP', 'PAGE_DOWN', 'END',
                                        'HOME', 'LEFT', 'UP', 'RIGHT', 'DOWN',
                                        'PRINT_SCREEN', 'INSERT', 'DELETE',
                                       '7',
                                        '8', '9', 'I', 'J', 'K', 'L', 'M', 'N',
                                        'O', 'P', 'U',
                                        'W', 'X', 'Y', 'Z', 'NUM_ZERO',
                                        'NUM_ONE', 'NUM_TWO', 'NUM_THREE',
                                        'NUM_FOUR', 'NUM_FIVE', 'NUM_SIX',
                                        'NUM_SEVEN', 'NUM_EIGHT', 'NUM_NINE',
                                        'NUM_MULTIPLY', 'NUM_PLUS',
                                        'NUM_MINUS', 'NUM_PERIOD',
                                        'NUM_DIVISION',  'F6', 'F7', 'F8', 'F9', 'F10',
                                        'F11', 'F12',
                                ],

                                isLeftDown : function() {
                                    for (var leftIndex = 0; leftIndex < this.leftKeys.length; leftIndex++) {
                                        var curLeftKey = this.leftKeys[leftIndex];
                                        if (game.keyboard.down(curLeftKey)) {
                                            return true;
                                        }
                                    }
                                    return false;
                                },

                                isRightDown : function() {

                                    for (var i = 0; i < this.rightKeys.length; i++) {
                                        var curKey = this.rightKeys[i];
                                        if (game.keyboard.down(curKey)) {
                                            return true;
                                        }
                                    }
                                    return false;
                                }
                            });

                    game.inputs = new Inputs();
                });