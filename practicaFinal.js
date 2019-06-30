//TODO mirar el tema del audio
//TODO mirar el json. NPI de cómo hacerlo bien
//TODO ajustar velocidad de animaciones de Dana. Comprobar con gameplays
//TODO mirar si se pueden disparar bolas de fuego estando agachado
//TODO sprites de impulso salto y andar agachado
//TODO animaciones de muerte

const tamXBloques = 16;
const tamYBloques = 16;
const xBloques = 17;
const yBloques = 14;

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
        stage.insert(new Q.Dana({x: (4 * tamXBloques), y: (8 * tamYBloques)}));

        //stage.insert(new Q.Key({x : 216, y : 113}));
        stage.insert(new Q.Key({x : 71, y : 100}));
        //stage.insert(new Q.Dana({x : 32, y : 32}));
        stage.insert(new Q.Bloque({x : 70, y : 116}));
        //stage.insert(new Q.Head({x : 216, y : 113}));
        stage.insert(new Q.Goblin({x : 216, y : 113}));
        //stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
    });
    // NIVEL 2
    Q.scene("level2", function(stage) {
        Q.stageTMX("level2.tmx", stage);

        stage.insert(new Q.Head({x : 216, y : 113}));
        //stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
    });
    Q.scene("level3", function(stage) {
        Q.stageTMX("level3.tmx", stage);

        stage.insert(new Q.Head({x : 216, y : 113}));
        //stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
    });
    Q.scene("level4", function(stage) {
        Q.stageTMX("level4.tmx", stage);

        stage.insert(new Q.Head({x : 216, y : 113}));
        //stage.insert(new Q.Dana({x:2 * tamXBloques, y:10 * tamYBloques}));
    });


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
                //points: [  [ -8, -8 ], [  8, -8 ], [  8,  8 ], [ -8,  8 ] ]//[  [ -7, -6 ], [  7, -6 ], [  7,  8 ], [ -7,  8 ] ]
            });

            this.add('2d, platformerControls, animation');
            //this.play("quieto_derecha");
            
            //this.on("muerte_t", this, "muerte");

            /*this.on("bump.bottom", function(collision) {
                if(collision.obj.isA("Goomba") && !this.p.muerto) {
                    if(Q.inputs['up']) {
                        this.p.vy = -500;
                    }
                    else {
                        this.p.vy = -300;
                    }
                }
            });*/
        },       
    

        step: function(dt) {
            relativeX = -1;
            relativeY = -1;
            direccion = "";

            level = "level" + Q.state.get("level");
            if(!this.iniciado) {
                if(level == "levelundefined") {
                    this.stage.insert(new Q.Key({x : 216, y : 113}));
                    this.stage.insert(new Q.Key({x : 200, y : 113}));
                    this.stage.insert(new Q.Bloque({x : 50, y : 116}));
                }
                this.iniciado = true;
            }

            this.p.block_time -= dt;
            if(this.p.block_time >= 0) {
                this.p.x = this.p.x_action;
                this.p.y = this.p.y_action;
                this.vx = 0;
                this.vy = 0;
            }

            //Cogemos la dirección de Mario para usarla con las animaciones
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
                this.p.block_time = 0.15;
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
                    //console.log(this.stage.items[4].p.asset);
                    console.log(this.stage.locate(relativeX * 16, relativeY * 16));
                    if(direccion == "derecha") {
                        //Comprobamos si el punto calculado es un objeto válido
                        if(this.stage.locate(relativeX * 16, relativeY * 16) == false) {
                            this.stage.insert(new Q.Bloque({x: relativeX * 16 + 8, y: relativeY * 16 - 8}));
                            //this.play("creacion");
                        }
                        else if(this.stage.locate(relativeX * 16, relativeY * 16).p.asset == "orange_block.png" ||
                                this.stage.locate(relativeX * 16, relativeY * 16).p.asset == "orange_block_destroyed.png") {
                            this.stage.remove(this.stage.locate(relativeX * 16, relativeY * 16));
                        }
                    }
                    else {
                        if(this.stage.locate(relativeX * 16, relativeY * 16) == false) {
                            this.stage.insert(new Q.Bloque({x: relativeX * 16 - 8, y: relativeY * 16 - 8}));
                        }
                        else if(this.stage.locate(relativeX * 16, relativeY * 16).p.asset == "orange_block.png" ||
                                this.stage.locate(relativeX * 16, relativeY * 16).p.asset == "orange_block_destroyed.png") {
                            this.stage.remove(this.stage.locate(relativeX * 16, relativeY * 16));
                        }
                    }
                }
            }
            
        },

        muerteAux: function(p) {
                if(!this.p.muerto) {
                    this.p.muerto = true;
                    //Q.state.dec("lives", 1);
                    this.p.collisionMask = Q.SPRITE_NONE;
                    this.play("muerte"); //Hacemos que desaparezca a los dos segundos para evitar situaciones no deseadas
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

    // KEY
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
            }
        }

    });

    // Bloque
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

    // Cabeza
    Q.Sprite.extend("Head", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_cabeza",
                sheet: "cabezaL",
                vx: 20
            });
        this.add('2d, aiBounce, animation');
    
        this.on("bump.left",this, "right");
        this.on("bump.right",this, "left");
        this.on("bump.bottom, bump.top", function(collision) {
            if(collision.obj.isA("Dana")) {
                //collision.obj.muerteAux();
            }
        }); 
        this.on("bump.left, bump.right", function(collision) {
            if(collision.obj.isA("Dana")) {
                //collision.obj.muerteAux();
            }
            else if (collision.obj.isA("Block")){
                collision.obj.destroy();
            }
        });          
        },
        left: function(dt) {
            //this.play("ataque_derecha");
            this.play("izquierda");
        },
        right: function(dt) {
            //this.play("ataque_izquierda");
            this.play("derecha");
        }
    });

    // Goblin-Puños
    Q.Sprite.extend("Goblin", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_goblin",
                sheet: "goblinR",
                vx: 20
        });
            this.add('2d, aiBounce, animation');

            this.on("bump.left",this, "right");
            this.on("bump.right",this, "left");
            this.on("bump.bottom, bump.top", function(collision) {
                if(collision.obj.isA("Dana")) {
                    collision.obj.destroy();
                    //collision.obj.muerteAux();
                }
            }); 
            this.on("bump.left, bump.right", function(collision) {
                if(collision.obj.isA("Dana")) {
                    collision.obj.destroy();
                    //collision.obj.muerteAux();
                }
            });          
        },
        left: function(dt) {
            //this.play("ataque_derecha");
            this.play("izquierda");
        },
        right: function(dt) {
            //this.play("ataque_izquierda");
            this.play("derecha");
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
        varita_derecha: {frames: [18, 19], rate: 1/10, loop: false},
        varita_izquierda: {frames: [6, 7], rate: 1/10, loop: false},
        varita_agachado_derecha: {frames: [20, 21, 22], rate: 1/7, loop: false},
        varita_agachado_izquierda: {frames: [8, 9, 10], rate: 1/7, loop: false},
        muerte_derecha: {frames: [23], loop: false, trigger: "muerte_t"},
        muerte_izquierda: {frames: [11], loop: false, trigger: "muerte_t"}
    });

    // ANIMACIONES DEL BLOQUE NARANJA
    Q.animations("animaciones_bloque", {
        creacion: {frames: [0, 1, 2, 3], rate: 1/8, loop: false},
        destruccion: {frames: [4, 5, 6], rate: 1/8, loop: false},
        rotura: {frames: [7, 8], rate: 1/8, loop: false}
    });
    
    Q.animations("animaciones_cabeza",{
        izquierda: {frames: [0, 1, 2, 3],rate: 1/2.5, loop: true},
        derecha: {frames: [4, 5, 6, 7], rate: 1/2.5, loop: true}
        
    });

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
            "orange_block.png","orange_block_destroyed.png",
            "block_interaction.png", "block_interaction.json",
            "enemy_head.png","enemy_head.json",
            "enemy_goblin.png", "enemy_goblin.json"
        ], function() {
        Q.compileSheets("dana.png", "dana.json");
        Q.compileSheets("block_interaction.png", "block_interaction.json");
        Q.compileSheets("enemy_head.png", "enemy_head.json");
        Q.compileSheets("enemy_goblin.png", "enemy_goblin.json");
    });

});