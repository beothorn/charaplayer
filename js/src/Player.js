var cellWidth = 24;
var cellHeight = 32;

var objectOnPlay = {};

function play(action, animations){
    microAjax("/server/"+action+".json", function (res){ 
        var actionsJson = JSON.parse(res);
        var script = actionsJson.script[0];
        
        if(!objectOnPlay[script.id]){
            objectOnPlay[script.id] = new PIXI.extras.MovieClip(animations[script.clip]);
        }else{
            var newObjectOnPlay = new PIXI.extras.MovieClip(animations[script.clip]);
            newObjectOnPlay.position.set(objectOnPlay[script.id].position.x, objectOnPlay[script.id].position.y);
            stage.removeChild(objectOnPlay[script.id]);
            objectOnPlay[script.id].destroy(false, false);
            objectOnPlay[script.id] = newObjectOnPlay;
        }

        var movie = objectOnPlay[script.id];
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