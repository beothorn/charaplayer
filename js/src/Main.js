var renderer = PIXI.autoDetectRenderer(
    cellWidth * 10, 
    cellHeight * 15,
    {backgroundColor : 0xeeeeee}
);

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
    .add('guy','media/guy.json')
    .load(onAssetsLoaded);

function onAssetsLoaded(load, resources){    
    var animations = {};
    Object.keys(resources.guy.data.animations)
        .map((name) => animations[name] = resources.guy.data.animations[name].map(PIXI.Texture.fromFrame));

    play("actions0", animations);

    animate();
}

function animate(time) {
    renderer.render(stage);
    TWEEN.update(time);
    requestAnimationFrame(animate);
}