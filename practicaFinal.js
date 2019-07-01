//TODO mirar el tema del audio
//TODO mirar el json. NPI de cómo hacerlo bien
//TODO ajustar velocidad de animaciones de Dana. Comprobar con gameplays
//TODO mirar si se pueden disparar bolas de fuego estando agachado
//TODO sprites de impulso salto y andar agachado
//TODO animaciones de muerte
//TODO puntuación. IMPORTANTE de cara a completar todo el código de los enemigos

const tamXBloques = 16;
const tamYBloques = 16;
const xBloques = 17;
const yBloques = 14;
const numNiveles = 4;

window.addEventListener("load", function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim") // Load any needed modules
    .setup({width:272, height:224})     // Add a canvas element onto the page
    .controls()                         // Add in default controls (keyboard, buttons)
    .touch();                            // Add in touch support (for the UI)

    // CARGA
    Q.loadTMX("level1.tmx, level2.tmx, level3.tmx, level4.tmx", function() {
        Q.stageScene("level1");
        //Q.stageScene("level2");
        //Q.stageScene("level3");
        //Q.stageScene("level4");
    });

    // NIVEL 1
    Q.scene("level1", function(stage) {
        Q.stageTMX("level1.tmx", stage);
        //Insertamos la llave
        stage.insert(new Q.Key({x : insAux(13), y : insAux(7)}));
        //Insertamos la puerta
        stage.insert(new Q.Puerta({x : insAux(8), y : insAux(10)}));
        //Insertamos la campana
        //Insertamos los objetos
        //Insertamos los bloques especiales
        //Insertamos los bloques normales
       // stage.insert(new Q.Bloque({x : insAux(8), y : insAux(7)}));
        //stage.insert(new Q.Bloque({x : insAux(9), y : insAux(6)}));
        //stage.insert(new Q.Bloque({x : insAux(5), y : insAux(2)}));
        //stage.insert(new Q.Bloque({x : insAux(11), y : insAux(2)}));
        //Insertamos los enemigos
        //stage.insert(new Q.Goblin({x : insAux(8), y : insAux(6)}));
        stage.insert(new Q.Head({x : insAux(8), y : insAux(6)}));
        //Insertamos a Dana
        stage.insert(new Q.Dana({x: (4 * tamXBloques), y: (8 * tamYBloques)}));

        Q.state.reset({level: 1});
    });
    // NIVEL 2
    Q.scene("level2", function(stage) {
        Q.stageTMX("level2.tmx", stage);

        //stage.insert(new Q.Head({x : 216, y : 113}));
        stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
        stage.insert(new Q.Key({x : insAux(13), y : insAux(7)}));
        stage.insert(new Q.Puerta({x : insAux(8), y : insAux(10)}));
    });
    Q.scene("level3", function(stage) {
        Q.stageTMX("level3.tmx", stage);

        stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
        stage.insert(new Q.Key({x : insAux(9), y : insAux(7)}));
        stage.insert(new Q.Puerta({x : insAux(8), y : insAux(10)}));
        //stage.insert(new Q.Head({x : 216, y : 113}));
        //stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
    });
    Q.scene("level4", function(stage) {
        Q.stageTMX("level4.tmx", stage);

        stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
        stage.insert(new Q.Key({x : insAux(13), y : insAux(7)}));
        stage.insert(new Q.Puerta({x : insAux(8), y : insAux(10)}));
        //stage.insert(new Q.Head({x : 216, y : 113}));
        //stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
    });

    // PANTALLA DE FIN DE JUEGO
    Q.scene('endGame',function(stage) {
        var container = stage.insert(new Q.UI.Container({ x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"}));
        if(/*Q.state.get("lives") == 0 || */Q.state.get("level") == numNiveles){
            var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",label: "Play Again" }));         
            var label = container.insert(new Q.UI.Text({x:0, y: -10 - button.p.h, label: stage.options.label }));
        }
        else {
            var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",label: "Next Level" }));       
            var label = container.insert(new Q.UI.Text({x:0, y: -10 - button.p.h, label: stage.options.label }));
        }

        button.on("click",function() {
            Q.clearStages();
            if (/*Q.state.get("lives") == 0 || */Q.state.get("level") > numNiveles){
                Q.state.reset({lives : 3, level: 1});
                Q.stageScene('level1');
                //Q.stageScene("hud",1);
            }
            else{
                level = "level" + Q.state.get("level");
				Q.stageScene(level);
				//Q.stageScene("hud",1);
            }
        });
        
        container.fit(20);
    });

    /**
     * Función auxiliar y de ayuda para poner bloques e items en una posición exacta.
     * Recibe el bloque relativo (es decir, de 1 a 14 o de 1 a 17, según el eje).
     * Devuelve las coordenadas exactas
     * @param {int} xRel 
     */
    function insAux(xRel) {
        return xRel * tamXBloques + 8;
    }

    /**
     * Función para buscar manualmente en la lista de objetos del escenario un objeto concreto. Dados
     * una x y una y, resultado de ser calculadas al pulsar el botón de acción, busca en los objetos
     * del escenario el objeto en esas coordenadas y los devuelve.
     * Devuelve el objeto en dichas coordenadas
     * @param {int} xAprox 
     * @param {int} yAprox 
     */
    function manualLocate(xAprox, yAprox, obj) {
        for(i = 0; i < obj.stage.items.length; ++i) {
            if(obj.stage.items[i].p.x == xAprox && obj.stage.items[i].p.y == yAprox) {
                //console.log(obj.stage.items[i].p.asset);
                return i;
            }
        }
        return -1;
    };

    /**
     * Función para buscar un único tipo de objeto entre todos los que hay. Solo devuelve el primero
     * que encuentra en la lista de objetos, pero lo devuelve completo
     * @param {string} name 
     */
    function objectLocate(name, obj) {
        for(i = 0; i < obj.stage.items.length; ++i) {
            if(obj.stage.items[i].p.asset == name || obj.stage.items[i].p.sheet == name) {
                //console.log(obj.stage.items[i].p.asset);
                return obj.stage.items[i];
            }
        }
        return null;
    }

     // Puntuación
     Q.UI.Text.extend("Score", {
        init: function(p) {
            this._super(p, {
                label: "SCORE ",
                color: "white",
                x: 16,
                y: 16
            });
        }
    });


    // DANA
    Q.Sprite.extend("Dana", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_dana",
                sheet: "danaL",
                w: 16,
                h:16,
                jumpSpeed: -135,
                speed: 45,
                gravity: 0.5,
                fireballs: 0,
                block_time: 0,
                x_action: 0,
                y_action: 0,
                iniciado: false,
                muerto: false
                //points: [  [ -7, -6 ], [  7, -6 ], [  7,  7 ], [ -7,  7 ] ]
            });

            this.add('2d, platformerControls, animation');
            
            this.on("muerte_t", this, "muerte");
        },       

        step: function(dt) {
            relativeX = -1;
            relativeY = -1;
            direccion = "";

            this.p.block_time -= dt;
            if(this.p.block_time >= 0) {
                this.p.x = this.p.x_action;
                this.p.y = this.p.y_action;
                this.vx = 0;
                this.vy = 0;
            }

            //Cogemos la dirección de Dana para usarla con las animaciones
            if(this.p.direction == "right") {
                direccion = "derecha";
            }
            else {
                direccion = "izquierda";
            }
            

            //Animaciones
            if(this.p.vx == 0) {
                if(Q.inputs['up'] && this.p.landed < 0)
                    this.play("saltando_quieto_" + direccion);
                else if(Q.inputs['down'] && this.p.landed >= 0)
                    this.play("quieto_agachado_" + direccion);
                else
                    this.play("quieto_" + direccion);
            }
            else {
                if(Q.inputs['up'] && this.p.landed < 0)
                    this.play("saltando_corriendo_" + direccion);
                else
                    this.play("corriendo_" + direccion);
            }

            /*
            Al pulsar el botón de acción, se debe poner o quitar un bloque. Funciona de la forma:
                Primero cogemos la dirección del protagonista y calculamos las posiciones relativas 
                    (es decir, las correspondientes al bloque) para el eje x y el y. En este proceso
                    comprobamos también si la tecla abajo está siendo pulsada para ajustar la posición
                    relativa sobre el eje y.
                A continuación, comprobamos si las posiciones calculadas son válidas para poner un
                    bloque dentro del nivel. Para esto cogemos el tamaño del canvas en número de
                    bloques. Si para el número de bloques de ancho, la posición relativa está entre
                    2 y 16 incluidos, es una posición válida. Para el eje Y se comprueba tan solo para
                    un valor mayor o igual que 2. El tope de altura da igual porque nunca se alcanza.
                    NOTA: los bloque se empiezan a contar por 1.
                Después comprobamos si el objeto de la posición donde se va a poner el bloque es válido.
                    Sólo es válido si es vacío o un bloque naranja. En cualquiera de estos casos, ponemos
                    o quitamos un bloque según corresponda.
            */
            if(Q.inputs['action'] && this.p.block_time <= 0) {
                //Evitamos que se el jugador se pueda mover mientras hace la animación
                this.p.block_time = 0.3;
                this.p.x_action = this.p.x;
                this.p.y_action = this.p.y;

                //Establecemos los puntos donde se pueden poner los bloques. Math.floor extrae el entero
                if(direccion == "derecha") {
                    relativeX = Math.round((this.p.x / 16) + 1);
                    relativeY = Math.round(this.p.y / 16);
                }
                else {
                    relativeX = Math.round((this.p.x / 16) - 1);
                    relativeY = Math.round(this.p.y / 16);
                }

                //Reproducimos la animación correspondiente
                if(Q.inputs['down'] && this.p.landed >= 0) {
                    relativeY += 1;
                    this.play("varita_agachado_" + direccion, 6);
                }
                else {
                    this.play("varita_" + direccion, 6);
                }

                //Comprobamos si el punto calculado se encuentra dentro de los límites
                if((relativeX * 16 > 1 || relativeX * 16 < 17) && relativeY > 1) {
                    if(direccion == "derecha") {
                        //Comprobamos si el punto calculado es un objeto válido
                        a = manualLocate(relativeX * 16 + 8, relativeY * 16 - 8, this);
                        if(a == -1) {
                            this.stage.insert(new Q.Bloque({x: relativeX * 16 + 8, y: relativeY * 16 - 8}));
                            //this.play("creacion");
                        }
                        else if(a != -1 && (this.stage.items[a].p.asset == "orange_block.png" || 
                                this.stage.items[a].p.asset == "orange_block_destroyed.png")) {
                            this.stage.remove(this.stage.items[a]);
                        }
                    }
                    else {
                        a = manualLocate(relativeX * 16 - 8, relativeY * 16 - 8, this);
                        if(a == -1) {
                            this.stage.insert(new Q.Bloque({x: relativeX * 16 - 8, y: relativeY * 16 - 8}));
                        }
                        else if(a != -1 && (this.stage.items[a].p.asset == "orange_block.png" || 
                                this.stage.items[a].p.asset == "orange_block_destroyed.png")) {
                            this.stage.remove(this.stage.items[a]);
                        }
                    }
                }
            }
            
        },

        muerteAux: function(p) {
            direccion;
            if(this.p.direction == "right") {
                direccion = "derecha";
            }
            else {
                direccion = "izquierda";
            }

            if(this.p.muerto == false) {
                this.p.muerto = true;
                //Q.state.dec("lives", 1);
                this.p.collisionMask = Q.SPRITE_NONE;
                this.play("muerte_" + direccion, 2); //Hacemos que desaparezca a los dos segundos para evitar situaciones no deseadas
            }      
        },
        
        muerte: function(p) {
            this.destroy();
            /*if(Q.state.get("lives") == 0)
                Q.stageScene("endGame",1, { label: "You Died" });
            else {*/
                level = "level" + Q.state.get("level");
                Q.clearStages();
                Q.stageScene(level);
                //Q.stageScene("hud", 1);
            //}
        }

    });

    // LLAVE
    Q.Sprite.extend("Key", {
        init: function(p) {
            this._super(p, { 
                asset: "keyP.png",
                sensor: true,
                cogida: false,
                gravity: 0
            });
            this.add("tween");
            this.on("hit", this, "hit");
        },
        hit: function(collision){
            if(collision.obj.isA("Dana") && !this.cogida){ 
                //Q.state.inc('punct', 100);
                this.cogida = true;
                this.animate(
                    {y: this.p.y}, 0.3, Q.Easing.Linear, 
                    { callback: function(){ this.destroy() } });
                //Abrimos la puerta
                objectLocate("doorClosed", this).play("abriendose");
            }
        }

    });

    // PUERTA
    Q.Sprite.extend("Puerta", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_puerta",
                sheet: "doorClosed",
                sensor: true,
                abierta: false
            });

            this.add("tween, animation");
            this.on("hit", this, "hit");
            this.on("llave_t", this, "llave");
        },
        hit: function(collision){
            if(this.p.abierta) {
                if(collision.obj.isA("Dana")) {
                    collision.obj.destroy();
                    this.destroy();
                    Q.stageScene("endGame",1,{label: "LEVEL " + Q.state.get("level") + " WON!"});
                    Q.state.inc("level", 1);
                }
            }
            
        },
        llave: function(dt) {
            this.p.abierta = true;
        }
    });

    // BLOQUE NARANJA
    Q.Sprite.extend("Bloque", {
        init: function(p) {
            this._super(p, { 
            asset: "orange_block.png",
            gravity: 0,
            roto: false
        });
        this.add("2d");
        this.on("bump.bottom", this, "hit");
        },
        hit: function(collision){
            if(collision.obj.isA("Dana")){ 
                if(!this.roto) {
                    this.p.asset = "orange_block_destroyed.png";
                    this.asset = "orange_block_destroyed.png";
                    this.roto = true;
                }
                else this.destroy();
            }
        }

    });

    Q.Sprite.extend("Hada", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_cabeza",
                sheet: "cabezaL",
                vx: 20
            });
        this.add('2d, animation');
        }
    });

    // CABEZA
    Q.Sprite.extend("Head", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_cabeza",
                sheet: "cabezaL",
                vx: 20,
                live_time: 17,
                movimiento: "izquierda"

            });
            this.add('2d,tween, aiBounce, animation');
    
        this.on("bump.bottom, bump.top", function(collision) {
            if(collision.obj.isA("Dana")) {
                collision.obj.muerteAux();
            }
        }); 
        this.on("bump.left, bump.right", function(collision) {
            if(collision.obj.isA("Dana")) {
                collision.obj.muerteAux();
            }
            else if (collision.obj.isA("Block")){
                collision.obj.destroy();
            }
        });          
        },
        step:function(dt) {
            if (this.p.live_time >= 0) {
                this.p.live_time -= dt;
                if (this.p.vx < 0) this.p.movimiento  = "izquierda";
                else this.p.movimiento = "derecha";
                this.play(this.p.movimiento);
            }
            else this.destroy();
            
        }
    });

    // GOBLIN (SEÑOR PUÑOS)
    Q.Sprite.extend("Goblin", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_goblin",
                sheet: "goblinR",
                vx: 15,
                movimiento: "derecha",
                points: [  [ -6, -6 ], [  5, -6 ], [  5,  8 ], [ -6,  8 ] ]
        });
            this.add('2d,tween, aiBounce, animation');

            this.on("bump.bottom, bump.top", function(collision) {
                if(collision.obj.isA("Dana")) {
                    collision.obj.muerteAux();
                }
            }); 
            this.on("bump.left, bump.right", function(collision) {
                if(collision.obj.isA("Dana")) {
                    collision.obj.muerteAux();
                }
                else if (collision.obj.isA("Block")){
                    collision.obj.destroy();
                }
            });          
        },
        step: function(dt) {
            if (this.p.vx < 0) this.p.movimiento  = "izquierda";
            else this.p.movimiento = "derecha";
            this.play(this.p.movimiento);
        }
    });




    // ANIMACIONES DE DANA
    Q.animations("animaciones_dana", {
        quieto_derecha: {frames: [12], loop: false},
        quieto_izquierda: {frames: [0], loop: false},
        quieto_agachado_derecha: {frames: [13], loop: false},
        quieto_agachado_izquierda: {frames: [1], loop: false},
        corriendo_derecha: {frames: [14, 15, 16, 17], rate: 1/13, loop: true},
        corriendo_izquierda: {frames: [2, 3, 4, 5], rate: 1/13, loop: true},
        saltando_quieto_derecha: {frames: [12], loop: false},
        saltando_quieto_izquierda: {frames: [0], loop: false},
        saltando_corriendo_derecha: {frames: [14], loop: false},
        saltando_corriendo_izquierda: {frames: [2], loop: false},
        varita_derecha: {frames: [18, 19], rate: 1/6, loop: false},
        varita_izquierda: {frames: [6, 7], rate: 1/6, loop: false},
        varita_agachado_derecha: {frames: [20, 21, 22], rate: 1/7, loop: false},
        varita_agachado_izquierda: {frames: [8, 9, 10], rate: 1/7, loop: false},
        muerte_derecha: {frames: [23], loop: false, trigger: "muerte_t"},
        muerte_izquierda: {frames: [11], rate: 1, loop: false, trigger: "muerte_t"}
    });

    // ANIMACIONES DEL BLOQUE NARANJA
    Q.animations("animaciones_bloque", {
        creacion: {frames: [0, 1, 2, 3], rate: 1/8, loop: false},
        destruccion: {frames: [4, 5, 6], rate: 1/8, loop: false},
        rotura: {frames: [7, 8], rate: 1/8, loop: false}
    });

    // ANIMACIONES DE LA PUERTA
    Q.animations("animaciones_puerta", {
        cerrada: {frames: [0], loop: false},
        abriendose: {frames: [0, 1, 2], rate: 1/3, loop: false, trigger: "llave_t"},
        abierta: {frames: [2], loop: false}
    });
    
    // ANIMACIONES DEL ENEMIGO CABEZA
    Q.animations("animaciones_cabeza",{
        izquierda: {frames: [0, 1, 2, 3],rate: 1/2.5, loop: true},
        derecha: {frames: [4, 5, 6, 7], rate: 1/2.5, loop: true}
        
    });

    // ANIMACIONES DEL ENEMIGO GOBLIN (SEÑOR PUÑOS)
    Q.animations("animaciones_goblin",{
        derecha: {frames: [0, 1, 2],rate: 1/2.5, loop: true},
        izquierda: {frames: [3, 4, 5], rate: 1/2.5, loop: true},
        ataque_derecha: {frames: [6, 7],rate: 1/2.5, loop: true},
        ataque_izquierda: {frames: [8, 9], rate: 1/2.5, loop: true},
        muerte_derecha: {frames: [10], loop: false},
        muerte_izquierda: {frames: [11], loop: false}
    });

    // CARGA Y COMPILADO DE ARCHIVOS
    Q.load(["dana.png", "dana.json",
            "bell.png", "keyP.png",
            "door.png", "door.json",
            "orange_block.png","orange_block_destroyed.png",
            "block_interaction.png", "block_interaction.json",
            "enemy_head.png","enemy_head.json",
            "enemy_goblin.png", "enemy_goblin.json"
        ], function() {
        Q.compileSheets("dana.png", "dana.json");
        Q.compileSheets("block_interaction.png", "block_interaction.json");
        Q.compileSheets("door.png", "door.json");
        Q.compileSheets("enemy_head.png", "enemy_head.json");
        Q.compileSheets("enemy_goblin.png", "enemy_goblin.json");
    });

});