var objectsOnPlay = {};

function play(action, animations){
    microAjax("/server/"+action+".json", function (res){ 
        var actionsJson = JSON.parse(res);
        var script = actionsJson.script[0];
        
        if(!objectsOnPlay[script.id]){
            objectsOnPlay[script.id] = new PIXI.extras.MovieClip(animations[script.clip]);
        }else{
            var newobjectsOnPlay = new PIXI.extras.MovieClip(animations[script.clip]);
            newobjectsOnPlay.position.set(objectsOnPlay[script.id].position.x, objectsOnPlay[script.id].position.y);
            stage.removeChild(objectsOnPlay[script.id]);
            objectsOnPlay[script.id].destroy(false, false);
            objectsOnPlay[script.id] = newobjectsOnPlay;
        }

        var movie = objectsOnPlay[script.id];
        if(script.pos){
            movie.position.set(script.pos.x * cellWidth, script.pos.y * cellHeight);    
        }
        
        movie.animationSpeed = 0.1;
        movie.play();

        var dest = movie.position;
        if(script.dest){
            dest = {x: script.dest.x * cellWidth, y: script.dest.y * cellHeight};
        }

        stage.addChild(movie);
        var coords = { x: movie.position.x, y: movie.position.y };
        var tween = new TWEEN.Tween(coords)
        .to(dest, script.time)
        .onUpdate(function() {
            movie.position.set(this.x, this.y);
        })
        .onComplete(function(){
            if(actionsJson.whenAllDone){
                play(actionsJson.whenAllDone, animations);
            }
        })
        .start();

    });
}