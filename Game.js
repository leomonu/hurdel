class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      player1 = createSprite(100,2000);
      player1.addImage("car1",player1Img);
      player2 = createSprite(300,2000);
      player2.addImage("car2",player2Img);
      player3 = createSprite(500,2000);
      player3.addImage("car3",player3Img);
      player4 = createSprite(700,2000);
      player4.addImage("car4",player4Img);
      players = [player1, player2, player3, player4];
      gameOver = createSprite(displayWidth/2-1400,displayHeight/2);
      gameOver.addImage(gameOverImg);
      gameOver.visible = false;
      gameOver.depth =1000;

      


      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = displayWidth - allPlayers[plr].distance;
        //use data form the database to display the cars in y direction
        y = y + 170;
        players[index-1].x = x;
        players[index-1].y = y;
      }



    }
  
    play(){
      form.hide();
      fill("blue");

      hurdle1 = createSprite(-500,10,30,100000);
  
      Player.getPlayerInfo();
  
      player.getPlayersAtEnd();


      
      
      if(allPlayers !== undefined){
  
        background("#c68767");
        image(trackImg,-displayWidth*10,0,displayWidth*20,displayHeight*1.5)
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x ;
        var y = 200;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = displayWidth - allPlayers[plr].distance;
          //use data form the database to display the cars in y direction
          y = y + 170;
          players[index-1].x = x;
          players[index-1].y = y;

          
         
  
          if (index === player.index){
            stroke(10);
            fill("green");
            ellipse(x,y,60,60);
            fill("white");
            text(player.name,x+50,y);
            players[index - 1].shapeColor = "red";
            camera.position.x = players[index-1].x
            camera.position.y = displayWidth/2;

            if(keyIsDown(RIGHT_ARROW)  ){
              players[index-1].y -= 30 ;
              //console.log(players[index-1].y);
            }

            // console.log('hurdle1 = ' + hurdle.x);
            // console.log('player = ' + players[index-1].x);

            

            
          }
          
          
          else{
            fill("yellow");
            text(allPlayers[plr].name,x+50,y);
          }
  
          //textSize(15);

        
          
          players[index-1].velocityY = players[index-1].velocityY + 0.8;
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
       
  
      }
  
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }

      
      
      
      
      // console.log(players[index-1]);
      // console.log(hurdle1);
      
      if(players && players[index-1] && players[index-1].x <= hurdle1.x  ){
            gameState = 2;
      console.log("win");
     
          }
  
      drawSprites();
    }
    end(){
      console.log("gameOver");
      game.update(2);
      
      gameOver.visible = true;
      console.log(player.rank);
    }
  }
  