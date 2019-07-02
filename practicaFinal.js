//TODO mirar el tema del audio
//TODO mirar si se pueden disparar bolas de fuego estando agachado
//TODO sprites de impulso salto y andar agachado
//TODO puntuación. IMPORTANTE de cara a completar todo el código de los enemigos
//TODO la muerte no funciona

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
        Q.clearStages();
        Q.stageScene("level1");
        //Q.stageScene("level2");
        //Q.stageScene("level3");
        //Q.stageScene("level4");
    });

    // NIVEL 1
    Q.scene("level1", function(stage) {
        Q.state.reset({level: 1});
        Q.stageTMX("level1.tmx", stage);
        Q.stageScene("hud",1);
        //Q.state.reset({punct: 0, life: 0});
        //Insertamos la llave
        stage.insert(new Q.Key({x : insAux(13), y : insAux(7)}));

        //Insertamos los bloques grises
        {stage.insert(new Q.Pared({x : insAux(1), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(7)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(7)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(12)}));}
        //Insertamos la puerta
        stage.insert(new Q.Puerta({x : insAux(8), y : insAux(10)}));
        //stage.insert(new Q.Puerta({x : insAux(8), y : insAux(10)}));
        //Insertamos la llave
        stage.insert(new Q.Key({x : insAux(13), y : insAux(7)}));
        //Insertamos la campana
        stage.insert(new Q.Campana({x : insAux(8), y : insAux(2)}));
        //Insertamos los objetos
        stage.insert(new Q.BlueJarBlock({x : insAux(5), y : insAux(4)}));
        stage.insert(new Q.BlueJarBlock({x : insAux(11), y : insAux(4)}));
        stage.insert(new Q.SapphireBlock({x : insAux(5), y : insAux(7)}));
        stage.insert(new Q.BellBlock({x : insAux(4), y : insAux(10)}));
        //Insertamos los bloques especiales
        stage.insert(new Q.BlueDiamondBlock({x : insAux(11), y : insAux(7)}));
        //Insertamos los bloques normales
        {stage.insert(new Q.Bloque({x : insAux(8), y : insAux(7)}));
        stage.insert(new Q.Bloque({x : insAux(9), y : insAux(6)}));
        stage.insert(new Q.Bloque({x : insAux(5), y : insAux(3)}));
        stage.insert(new Q.Bloque({x : insAux(11), y : insAux(3)}));
        stage.insert(new Q.Bloque({x : insAux(12), y : insAux(9)}));}
        //Insertamos los enemigos
        //stage.insert(new Q.Goblin({x : insAux(8), y : insAux(6)}));
        //Insertamos a Dana
        stage.insert(new Q.Dana({x: insAux(3), y: insAux(8)}));

    });

    // NIVEL 2
    Q.scene("level2", function(stage) {
        Q.stageTMX("level2.tmx", stage);
        //Insertamos los bloques grises
        {stage.insert(new Q.Pared({x : insAux(2), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(10)}));}
        //Insertamos la puerta
        stage.insert(new Q.Puerta({x : insAux(14), y : insAux(9)}));
        //Insertamos la llave
        stage.insert(new Q.Key({x : insAux(14), y : insAux(3)}));
        //Insertamos la campana
        stage.insert(new Q.Campana({x : insAux(2), y : insAux(8)}));
        //Insertamos los objetos
        stage.insert(new Q.MedecineBlock({x : insAux(6), y : insAux(8)}));
        stage.insert(new Q.BlueJarBlock({x : insAux(9), y : insAux(6)}));
        //Insertamos los bloques especiales
        //Insertamos los bloques normales
        {stage.insert(new Q.Bloque({x : insAux(10), y : insAux(6)}));
        stage.insert(new Q.Bloque({x : insAux(11), y : insAux(5)}));
        stage.insert(new Q.Bloque({x : insAux(12), y : insAux(5)}));
        stage.insert(new Q.Bloque({x : insAux(13), y : insAux(4)}));
        stage.insert(new Q.Bloque({x : insAux(14), y : insAux(4)}));
        stage.insert(new Q.Bloque({x : insAux(2), y : insAux(10)}));
        stage.insert(new Q.Bloque({x : insAux(3), y : insAux(10)}));
        stage.insert(new Q.Bloque({x : insAux(4), y : insAux(9)}));
        stage.insert(new Q.Bloque({x : insAux(5), y : insAux(9)}));
        stage.insert(new Q.Bloque({x : insAux(6), y : insAux(9)}));
        stage.insert(new Q.Bloque({x : insAux(7), y : insAux(9)}));
        stage.insert(new Q.Bloque({x : insAux(8), y : insAux(9)}));
        stage.insert(new Q.Bloque({x : insAux(9), y : insAux(9)}));
        stage.insert(new Q.Bloque({x : insAux(10), y : insAux(9)}));
        stage.insert(new Q.Bloque({x : insAux(7), y : insAux(8)}));
        stage.insert(new Q.Bloque({x : insAux(8), y : insAux(8)}));}
        //Insertamos los enemigos
        stage.insert(new Q.Calavera_spawner({x : insAux(2), y : insAux(2)}));
        stage.insert(new Q.Calavera_spawner({x : insAux(4), y : insAux(2)}));
        //Insertamos a Dana
        stage.insert(new Q.Dana({x: insAux(2), y: insAux(9)}));
    });

    //NIVEL 3
    Q.scene("level3", function(stage) {
        Q.stageTMX("level3.tmx", stage);
        //Insertamos los bloques grises
        {stage.insert(new Q.Pared({x : insAux(1), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(2)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(3)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(5)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(7)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(7)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(11), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(9)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(1)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(10)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(11)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(5), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(7), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(9), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(12)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(12)}));}
        //Insertamos la puerta
        stage.insert(new Q.Puerta({x : insAux(10), y : insAux(7)}));
        //Insertamos la llave
        stage.insert(new Q.Key({x : insAux(11), y : insAux(9)}));
        //Insertamos la campana
        stage.insert(new Q.Campana({x : insAux(2), y : insAux(11)}));
        //Insertamos los objetos
        stage.insert(new Q.ExtraLifeBlock({x : insAux(14), y : insAux(1)}));
        stage.insert(new Q.EmeraldBock({x : insAux(12), y : insAux(7)}));
        stage.insert(new Q.ExtraLifeBlock({x : insAux(2), y : insAux(10)}));
        //Insertamos los bloques especiales
        //Insertamos los bloques normales
        {stage.insert(new Q.Bloque({x : insAux(7), y : insAux(2)}));
        stage.insert(new Q.Bloque({x : insAux(8), y : insAux(2)}));
        stage.insert(new Q.Bloque({x : insAux(9), y : insAux(2)}));
        stage.insert(new Q.Bloque({x : insAux(8), y : insAux(3)}));
        stage.insert(new Q.Bloque({x : insAux(12), y : insAux(3)}));
        stage.insert(new Q.Bloque({x : insAux(14), y : insAux(5)}));
        stage.insert(new Q.Bloque({x : insAux(2), y : insAux(7)}));
        stage.insert(new Q.Bloque({x : insAux(3), y : insAux(7)}));
        stage.insert(new Q.Bloque({x : insAux(4), y : insAux(7)}));
        stage.insert(new Q.Bloque({x : insAux(5), y : insAux(7)}));
        stage.insert(new Q.Bloque({x : insAux(13), y : insAux(7)}));
        stage.insert(new Q.Bloque({x : insAux(15), y : insAux(7)}));
        stage.insert(new Q.Bloque({x : insAux(2), y : insAux(8)}));
        stage.insert(new Q.Bloque({x : insAux(3), y : insAux(8)}));
        stage.insert(new Q.Bloque({x : insAux(14), y : insAux(8)}));
        stage.insert(new Q.Bloque({x : insAux(6), y : insAux(10)}));
        stage.insert(new Q.Bloque({x : insAux(7), y : insAux(10)}));
        stage.insert(new Q.Bloque({x : insAux(8), y : insAux(10)}));
        stage.insert(new Q.Bloque({x : insAux(9), y : insAux(10)}));
        stage.insert(new Q.Bloque({x : insAux(10), y : insAux(10)}));
        stage.insert(new Q.Bloque({x : insAux(7), y : insAux(11)}));
        stage.insert(new Q.Bloque({x : insAux(9), y : insAux(11)}));}
        //Insertamos los enemigos
        stage.insert(new Q.Goblin({x : insAux(3), y : insAux(11)}));
        //Insertamos a Dana
        stage.insert(new Q.Dana({x: insAux(4), y: insAux(4)}));
    });

    //NIVEL 4
    Q.scene("level4", function(stage) {
        Q.stageTMX("level4.tmx", stage);
        //Insertamos los bloques grises
        {stage.insert(new Q.Pared({x : insAux(1), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(4)}));
        stage.insert(new Q.Pared({x : insAux(6), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(10), y : insAux(6)}));
        stage.insert(new Q.Pared({x : insAux(1), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(2), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(3), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(4), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(8), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(12), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(13), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(14), y : insAux(8)}));
        stage.insert(new Q.Pared({x : insAux(15), y : insAux(8)}));}
        //Insertamos la puerta
        stage.insert(new Q.Puerta({x : insAux(2), y : insAux(7)}));
        //Insertamos la llave
        stage.insert(new Q.Key({x : insAux(8), y : insAux(6)}));
        //Insertamos la campana
        //Insertamos los objetos
        stage.insert(new Q.BellBlock({x : insAux(5), y : insAux(10)}));
        stage.insert(new Q.BellBlock({x : insAux(8), y : insAux(10)}));
        //Insertamos los bloques especiales
        stage.insert(new Q.Shrine_aries({x : insAux(11), y : insAux(2)}));
        //Insertamos los bloques normales
        //Insertamos los enemigos
        //Insertamos a Dana
        stage.insert(new Q.Dana({x: insAux(14), y: insAux(7)}));
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
                Q.stageScene("hud",1);
            }
            else{
                level = "level" + Q.state.get("level");
				Q.stageScene(level);
			    Q.stageScene("hud",1);
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

      // HUD
      Q.scene("hud", function(stage) {
        var container = stage.insert(new Q.UI.Container({
            x: 20,
            y: 0,
            fill: "black"
        }));

        //container.fit(10)

        container.insert(new Q.Score());
       // container.insert(new Q.Score_puntuacion());
        container.insert(new Q.Life());
        //container.insert(new Q.Life_puntuacion());
        container.insert(new Q.Fairy());
        //container.insert(new Q.Fairy_puntuacion());
        stage.insert(container);
        
    });

     // Puntuación
    Q.UI.Text.extend("Score", {
        init: function(p) {
            this._super(p, {
                label: "SCORE ",
                color: "white",
                x: 20,
                y: 0,
                size: 7
            });
        }
    });

    // Contador puntuación
    Q.UI.Text.extend("Score_puntuacion", {
        init: function(p) {
            this._super(p, {
                label: Q.state.get("life"),
                color: "white",
                x: 0,
                y: 16,
                size: 7
            });
            Q.state.on("change.punct", this, "update_punct");
        },
        update_punct: function(punct) {
            this.p.label = punct;
        }
    });

    // VIDAS
    Q.UI.Text.extend("Life", {
        init: function(p) {
            this._super(p, {
                label: "LIFE ",
                color: "white",
                x: 60,
                y: 0,
                size: 7
            });
        }
    });

    // Contador vida
    Q.UI.Text.extend("Life_puntuacion", {
        init: function(p) {
            this._super(p, {
                label: Q.state.get("life"),
                color: "white",
                x: 100,
                y: 16
            });
            Q.state.on("change.life", this, "update_life");
        },
        update_life: function(punct) {
            this.p.label = life;
        }
    });

    // Hadas
    Q.UI.Text.extend("Fairy", {
        init: function(p) {
            this._super(p, {
                label: "FAIRY",
                color: "white",
                x: 100,
                y: 0,
                size: 7
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
                muerto: false,
                points: [  [ -7, -6 ], [  7, -6 ], [  7,  7 ], [ -7,  7 ] ]
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
                if((relativeX > 1 || relativeX < 17) && relativeY > 1) {
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
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_block_blueDiamond.png")){
                            this.stage.items[a].p.asset = "blue_diamond.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_block_blueJar.png")){
                            this.stage.items[a].p.asset = "blue_jar.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_block_emerald.png")){
                            this.stage.items[a].p.asset = "emerald.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_block_medecine.png")){
                            this.stage.items[a].p.asset = "medecinde_orange.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_block_extraLife.png")){
                            this.stage.items[a].p.asset = "extra_life.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_block_sapphire.png")){
                            this.stage.items[a].p.asset = "sapphire.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_block_bell.png")){
                            //this.stage.items[a].p.asset = "bell.png";
                            this.destroy();
                            this.stage.insert(new Q.Campane({x: relativeX * 16 + 8, y: relativeY * 16 - 8}));
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "blue_diamond.png")){
                            this.stage.items[a].p.asset = "blue_jar_especial.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "blue_jar_especial.png")){
                            this.stage.items[a].p.asset = "orange_crystal.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "orange_crystal.png")){
                            this.stage.items[a].p.asset = "double_golden_coin.png";
                        }
                        else if (a != -1 && (this.stage.items[a].p.asset == "double_golden_coin.png")){
                            this.stage.items[a].p.asset = "blue_diamond.png";
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
                console.log(level);
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

    // CAMPANA
    Q.Sprite.extend("Campana", {
        init: function(p) {
            this._super(p, { 
                asset: "bell.png",
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
                puerta = objectLocate("doorClosed", this);
                console.log(puerta);
                this.stage.insert(new Q.Hada({x : insAux(Math.floor(puerta.p.x / 16)), y : insAux(Math.floor(puerta.p.y / 16))}));
            }
        }

    });

    // PUERTA
    Q.Sprite.extend("Puerta", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_puerta",
                sheet: "doorClosed",
                w: 16,
                h:16,
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

    // BLOQUE GRIS (PARED)
    Q.Sprite.extend("Pared", {
        init: function(p) {
            this._super(p, { 
                asset: "grey_block.png",
                gravity: 0
            });
            this.add("2d");
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

    // SHRINE ARIES
    Q.Sprite.extend("Shrine_aries", {
        init: function(p) {
            this._super(p, { 
                asset: "shrine_aries.png",
                sensor: true,
                gravity: 0
            });
            this.add("tween");
        }
    });

    // SHRINE TAURO
    Q.Sprite.extend("Shrine_tauro", {
        init: function(p) {
            this._super(p, { 
                asset: "shrine_tauro.png",
                sensor: true,
                gravity: 0
            });
            this.add("tween");
        }
    });

    Q.Sprite.extend("Hada", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_hada",
                sheet: "flyingR",
                sensor: true,
                w: 16,
                h:16,
                gravity: 0,
                vx: 0,
                vy: 0,
                direccionHor: "derecha",
                direccionVer: "arriba",
                cogida: false,
                points: [  [ -7, -8 ], [  7, -8 ], [  7,  8 ], [ -7,  8 ] ]
            });
        this.add("2d, tween, animation");
        this.on("hit", this, "hit");
        },
        step:function(dt) {
            dirHor = -1;
            dirVer = -1;

            dirHor = Math.random();
            dirVer = Math.random();

            if(this.p.direccionHor == "derecha" && this.p.direccionVer == "arriba") {
                if(dirHor >= 0.05) {
                    this.p.vx = 25;
                    this.p.direccionHor = "derecha";
                    this.play(this.p.direccionHor);
                }
                else {
                    this.p.vx = -25;
                    this.p.direccionHor = "izquierda";
                    this.play(this.p.direccionHor);
                }
                if(dirVer >= 0.05) {
                    this.p.vy = 25;
                    this.p.direccionVer = "arriba";
                }
                else {
                    this.p.vy = -25;
                    this.p.direccionVer = "abajo";
                }
            }
            else if(this.p.direccionHor == "derecha" && this.p.direccionVer == "abajo") {
                if(dirHor >= 0.05) {
                    this.p.vx = 25;
                    this.p.direccionHor = "derecha";
                    this.play(this.p.direccionHor);
                }
                else {
                    this.p.vx = -25;
                    this.p.direccionHor = "izquierda";
                    this.play(this.p.direccionHor);
                }
                if(dirVer >= 0.95) {
                    this.p.vy = 25;
                    this.p.direccionVer = "arriba";
                }
                else {
                    this.p.vy = -25;
                    this.p.direccionVer = "abajo";
                }
            }
            else if(this.p.direccionHor == "izquierda" && this.p.direccionVer == "arriba") {
                if(dirHor >= 0.95) {
                    this.p.vx = 25;
                    this.p.direccionHor = "derecha";
                    this.play(this.p.direccionHor);
                }
                else {
                    this.p.vx = -25;
                    this.p.direccionHor = "izquierda";
                    this.play(this.p.direccionHor);
                }
                if(dirVer >= 0.05) {
                    this.p.vy = 25;
                    this.p.direccionVer = "arriba";
                }
                else {
                    this.p.vy = -25;
                    this.p.direccionVer = "abajo";
                }
            }
            else if(this.p.direccionHor == "izquierda" && this.p.direccionVer == "abajo") {
                if(dirHor >= 0.95) {
                    this.p.vx = 25;
                    this.p.direccionHor = "derecha";
                    this.play(this.p.direccionHor);
                }
                else {
                    this.p.vx = -25;
                    this.p.direccionHor = "izquierda";
                    this.play(this.p.direccionHor);
                }
                if(dirVer >= 0.95) {
                    this.p.vy = 25;
                    this.p.direccionVer = "arriba";
                }
                else {
                    this.p.vy = -25;
                    this.p.direccionVer = "abajo";
                }
            }
        },
        hit: function(collision){
            if(collision.obj.isA("Dana") && this.p.cogida == false){ 
                //Q.state.inc('punct', 100);
                this.p.cogida = true;
                this.animate(
                    {y: this.p.y}, 0.15, Q.Easing.Linear, 
                    { callback: function(){ this.destroy() } });
            }
        }
    });

    // CALAVERA SPAWNER
    Q.Sprite.extend("Calavera_spawner", {
        init: function(p) {
            this._super(p, { 
                asset: "skull.png",
                sensor: true,
                spawn: 4.5,
                gravity: 0
            });
            this.add("tween");
        },
        step: function(dt) {
            if(this.p.spawn >= 0)
                this.p.spawn -= dt;
            else {
                this.p.spawn = 4;
                this.stage.insert(new Q.Head({x : this.p.x, y : this.p.y}));
            }
        }
    });

    // CALAVERA DE PEGA
    Q.Sprite.extend("Calavera", {
        init: function(p) {
            this._super(p, { 
                asset: "skull.png",
                sensor: true,
                gravity: 0
            });
            this.add("tween");
        }
    });

    // CABEZA
    Q.Sprite.extend("Head", {
        init: function(p) {
            this._super(p, { 
                sprite: "animaciones_cabeza",
                sheet: "cabezaL",
                w: 16,
                h:16,
                vx: 28,
                live_time: 9,
                movimiento: "izquierda",
                points: [  [ -7, -8 ], [  7, -8 ], [  7,  8 ], [ -7,  8 ] ]

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
                w: 16,
                h:16,
                vx: 15,
                movimiento: "derecha",
                points: [  [ -6, -6 ], [  5, -6 ], [  5,  8 ], [ -6,  8 ] ]
        });
            this.add('2d,tween, aiBounce, animation');
            this.on("muerte_t", this, "muerte");
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
        step: function(dt) {
            if(this.p.movimiento == "derecha") {
                var relativeX = Math.floor((this.p.x / 16));
                var relativeY = Math.floor((this.p.y / 16) + 1);
            }
            else {
                var relativeX = Math.floor((this.p.x / 16));
                var relativeY = Math.floor((this.p.y / 16) + 1);
            }
            if((relativeX > 1 || relativeX < 17) && relativeY > 1) {
                if(this.p.movimiento == "derecha") {
                    var a = manualLocate(relativeX * 16 + 8, relativeY * 16 + 8, this);
                    if(a == -1) {
                        this.p.vx = (-1)*this.p.vx;
                    }// darse la vuelta
                }
                 else {
                    var a = manualLocate(relativeX * 16 + 8, relativeY * 16 + 8, this);
                     if(a == -1) {
                        this.p.vx = (-1)*this.p.vx;
                     } // darse la vuelta                    
                 }
           }

            if (this.p.vy > 0) {// está cayendo
                this.play("muerte_"+this.p.movimiento ,2);
            }
            else{
                if (this.p.vx < 0) this.p.movimiento  = "izquierda";
                else this.p.movimiento = "derecha";
                this.play(this.p.movimiento);
            }
        },
        muerte: function(dt) {
            this.destroy();
        }
    });

      //  Blue jar
    Q.Sprite.extend("BlueJarBlock",{
        init: function(p) {
			this._super(p, {
            asset: "orange_block_blueJar.png"
        });
        this.add("2d");
        this.on("hit", this,"hit");
        },
        hit: function(collision){
            if (collision.obj.isA("Dana") && this.p.asset == "blue_jar.png"){
                //Q.state.inc('punct', 100);
                this.destroy();
            }
        }

    });
      
    //  blue_diamond
    Q.Sprite.extend("BlueDiamondBlock",{
        init: function(p) {
			this._super(p, {
            asset: "orange_block_blueDiamond.png"
        });
            this.add("2d");
			this.on("hit", this, "sensor");
		},
		sensor: function(collision){
            if (collision.obj.isA("Dana") && this.p.asset == "blue_diamond.png"){
                 //Q.state.inc('punct', 100);
                this.destroy();
            }
            else if (collision.obj.isA("Dana") && this.p.asset == "blue_jar_especial.png"){
                 // Q.state.inc('punct', 200);
                this.destroy();
            }
            else if (collision.obj.isA("Dana") && this.p.asset == "double_golden_coin.png"){
                 // Q.state.inc('punct', 2000);
                this.destroy();
            }
            else if (collision.obj.isA("Dana") && this.p.asset == "orange_crystal.png"){
               // Q.state.inc('punct', 200);
                this.destroy();
            }
		}

    });
    
    //  Sapphire
    Q.Sprite.extend("SapphireBlock",{
        init: function(p) {
			this._super(p, {
            asset: "orange_block_sapphire.png"
        });
            this.add("2d");
			this.on("hit", this, "sensor");
		},
		sensor: function(collision){
			if (collision.obj.isA("Dana") && this.p.asset == "sapphire.png"){
                // Q.state.inc('punct', 500);
                this.destroy();
            }
		}

    });
    // Medecine
    Q.Sprite.extend("MedecineBlock",{
        init: function(p) {
            this._super(p, {
            asset: "orange_block_medecine.png"
        });
            this.add("2d");
            this.on("hit", this, "sensor");
        },
        sensor: function(collision){
            if (collision.obj.isA("Dana") && this.p.asset == "medecine_orange.png"){
                // Q.state.inc('punct', 500);
                //Elimina todos los enemigos del mapa y los convierte en tesoros
                this.destroy();
            }
        }

    });

    // Emerald
    Q.Sprite.extend("EmeraldBlock",{
        init: function(p) {
            this._super(p, {
            asset: "orange_block_emerald.png"
        });
            this.add("2d");
            this.on("hit", this, "sensor");
        },
        sensor: function(collision){
            if (collision.obj.isA("Dana") && this.p.asset == "emerald.png"){
                // Q.state.inc('punct', 5000);
                this.destroy();
            }
        }
    });

    // Extra life
    Q.Sprite.extend("ExtraLifeBlock",{
        init: function(p) {
            this._super(p, {
            asset: "orange_block_extraLife.png"
        });
            this.add("2d");
            this.on("hit", this, "sensor");
        },
        sensor: function(collision){
            if (collision.obj.isA("Dana") && this.p.asset == "extra_life.png"){
                // Q.state.inc('punct', 1000);
                // Q.state.inc('lives', 100);
                this.destroy();
            }
        }
    });

    // Bell
    Q.Sprite.extend("BellBlock",{
        init: function(p) {
            this._super(p, {
            asset: "orange_block_bell.png"
        });
            this.add("2d");
            this.on("hit", this, "sensor");
        },
        sensor: function(collision){
            if (collision.obj.isA("Dana") && this.p.asset == "bell.png"){
                this.stage.insert(new Q.Hada({x: relativeX * 16 + 8, y: relativeY * 16 - 8}));
                this.destroy();
            }
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

    //ANIMACIONES DEL HADA
    Q.animations("animaciones_hada", {
        derecha: {frames: [0, 1], rate: 1/13, loop: true},
        izquierda: {frames: [2, 3], rate: 1/13, loop: true}
    });
    
    // ANIMACIONES DEL ENEMIGO CABEZA
    Q.animations("animaciones_cabeza",{
        izquierda: {frames: [0, 1, 2, 3], rate: 1/2.5, loop: true},
        derecha: {frames: [4, 5, 6, 7], rate: 1/2.5, loop: true}
    });

    // ANIMACIONES DEL ENEMIGO GOBLIN (SEÑOR PUÑOS)
    Q.animations("animaciones_goblin",{
        derecha: {frames: [0, 1, 2],rate: 1/2.5, loop: true},
        izquierda: {frames: [3, 4, 5], rate: 1/2.5, loop: true},
        ataque_derecha: {frames: [6, 7],rate: 1/2.5, loop: true},
        ataque_izquierda: {frames: [8, 9], rate: 1/2.5, loop: true},
        muerte_derecha: {frames: [10], loop: false, trigger: "muerte_t"},
        muerte_izquierda: {frames: [11], loop: false, trigger: "muerte_t"}
    });

    // CARGA Y COMPILADO DE ARCHIVOS
    Q.load(["dana.png", "dana.json",
            "bell.png","orange_block_bell.png", "keyP.png",
            "door.png", "door.json",
            "orange_block.png","orange_block_destroyed.png",
            "block_interaction.png", "block_interaction.json",
            "grey_block.png", "skull.png",
            "shrine_tauro.png", "shrine_aries.png",
            "fairy.png", "fairy.json",
            "enemy_head.png","enemy_head.json",
            "enemy_goblin.png", "enemy_goblin.json",
            "blue_jar.png", "orange_block_blueJar.png", 
            "blue_diamond.png","orange_block_blueDiamond.png",
            "sapphire.png", "orange_block_sapphire.png",
            "medecine_orange.png", "orange_block_medecine.png", 
            "emerald.png","orange_block_emerald.png",
            "extra_life.png", "orange_block_extraLife.png",
            "blue_jar_especial.png", "double_golden_coin.png",
            "orange_crystal.png"
        ], function() {
        Q.compileSheets("dana.png", "dana.json");
        Q.compileSheets("block_interaction.png", "block_interaction.json");
        Q.compileSheets("door.png", "door.json");
        Q.compileSheets("fairy.png", "fairy.json");
        Q.compileSheets("enemy_head.png", "enemy_head.json");
        Q.compileSheets("enemy_goblin.png", "enemy_goblin.json");

    });

});