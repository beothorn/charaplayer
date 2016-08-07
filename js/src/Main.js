var renderer = PIXI.autoDetectRenderer(
    Config.cellWidth * Config.colSize, 
    Config.cellHeight * Config.rowSize,
    {backgroundColor : 0xeeeeee}
);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
    .add('guy','media/guy.json')
    .add('back','media/back.json')
    .load(onAssetsLoaded);

function onAssetsLoaded(load, resources){    
    var animations = {};
    Object.keys(resources.guy.data.animations)
        .forEach((name) => 
            animations[name] = resources.guy.data.animations[name].map(PIXI.Texture.fromFrame));

    var backTiles = {}; 
    Object.keys(resources.back.data.frames)
        .forEach((name) => backTiles[name] = PIXI.Texture.fromFrame(name) );

    microAjax(Config.jsonApi+"b0x0_10x15", function (res){
        var tilesJson = JSON.parse(res);
        var grassTile = new PIXI.Sprite(backTiles["g"]);
        grassTile.position.set(0,0);
        stage.addChild(grassTile);    
    }); 

    Player.play("actions0", animations, backTiles);

    animate();
}

function animate(time) {
    TWEEN.update(time);
    renderer.render(stage);
    requestAnimationFrame(animate);
}