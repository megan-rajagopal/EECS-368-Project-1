var game_status = false; //keeping track if the game is active or not
var draw = 0; //counter variable to determine if the game is a draw or not
var player; //player variable to keep track of the active player
var num; //used to store the random number generated in random 
var game_board = []; //game board array 
var player_color = []; //an array to define the players token color
player_color[1] = "purple"; //player 1 is set to purple 
player_color[2] = "blue"; //player 2 is set to blue 

function begin_game(player_choice) //the function that starts the game. player_choice defines who the player selected to start the game first 
{
  draw = 0; //must be reset to zero to accurately determine a tie (see check_win for more information about how it is used) (this is also another insurance measure to make sure draw is set to 0)
  enable_button(); //enabling the drop buttons so the users can continue playing 
  if (game_status==true) //this statement is to ensure that if a current game is active and the user pressed the start buttons, a new game will not be generate
  {
    return false; //by returning, the rest of the function will not be called/run
  }
  game_status = true;  //changing the game status to true to start a new game 
  
  //creating the game board array 
  for (row=0; row<=5; row++) 
  {
    game_board[row] = [];
    for (col=0; col<=6; col++) 
    {
      game_board[row][col] = 0; //using 2D array so you can keep track of specific points on the board
    }	
  }		
  update(); //call the function to update the board when the players start playing 			
  player = player_choice; //set the starting player choice to the variable player that was specified by the user's button choice 
  tracking_player_turn(); //start tracking the player's turn 
}

function tracking_player_turn() //The function will display who is the active player
{
  if(player==1) //enters when player 1/purple player is active 
  {
    if(game_status) //only enters when the game_status is true
    {
      document.getElementById('game_info').innerHTML = "Current Player:"+ " <span class='player"+player+"'>(Player Purple" + ")</span>"; //display the current player and creates a <span> with the class of the player so that it will show the corresponding token color
    }
  }
  if(player==2) //enters when player 2.blue player is active
  {
    if(game_status) //only enters when the game status is true
    {
      document.getElementById('game_info').innerHTML = "Current Player:" +" <span class='player"+player+"'>(Player Blue"  + ")</span>"; //display the current player and creates a <span> with the class of the player so that it will show the corresponding token color 
    }
  }
}

function random() //This functions picks a random starting player
{
  num=Math.floor(Math.random()*2)+1; //num stores a random number generated between 1 and 2
  if(num==1) //the num is 1, a game will be created as player 1/purple player as the starting player
  {
    begin_game(1); 
  }
  if(num==2) //the num is 2, a game will be created as player2/blue player as the starting player
  {
    begin_game(2);
  }
}

function update() //This function updates the board as the users add tokens
{ 
  check_win(); //check to see if a player has won or if the board is full, resulting in a draw

  //This for loop goes through the board and updates the correct drop location
  for (col=0; col<=6; col++)
  {
    for (row=0; row<=5; row++) 
    {
      document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>"; //Set the inner HTML of the board (which was defined in HTML) to be a span with the class of 'piece' and 'player' so when it is linked with the game_board coordinates that need to be updated, it will place the approriate token 
    }	
  }
}

function check_win() //This function checks for a win or a tie/draw in the game
{
  //checking for a draw 
  draw++; //update the draw variable every time a move is made
  console.log(draw);
  if(draw==43) //if the draw count is at 43, enter this statement because there are no more moves/a draw/tie has occured to end the game 
  {
    game_status = false; //change the game status to false so the players can start a new game
    document.getElementById('game_info').innerHTML = "No Winner"; //display that there was no winner 
    disable_button(); //disable the drop buttons so the players cannot continue to play 
    draw = 0; //set draw to 0
  }

  //checking for wins by searching the board left to right 
  for (i=1; i<=2; i++) //checking for player 1 matches and player 2 matches 
  {
    for (col=0; col<=3; col++) //checking the first four columns since it is checking from left to right and a match of four is needed
    {
      for (row=0; row<=5; row++) //looping every row in the corresponding column 
      {
        if (game_board[row][col]==i) //Checking to see if a game token matches the player that is beng checked
        {
          if ((game_board[row][col+1]==i) && (game_board[row][col+2]==i) && (game_board[row][col+3]==i && game_board[row][col]==i)) //checking to see if there are four matches in a row of the user that is being checked
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>"; //Updating the board to make sure that all four tokens are displayed in the board
            end_game(i);//ending the game when a match is made and declaring the winner
            return true; //ending the check_win function since the game is over
          }
        }
      }
    }
  }
  
  //checking for win by searching top to bottom
  for (i=1; i<=2; i++) //checking for player 1 matches and player 2 matches
  {
    for (col=0; col<=6; col++) //since we are checking for a win in columns, you must check all the columns
    {
      for (row=0; row<=2; row++) //checking the rows in the corresponding columns
      {
        if (game_board[row][col]==i) //checking to see if the game token in the current spot matches the token of the player that is being searched for 
        {
          if ((game_board[row+1][col]==i) && (game_board[row+2][col]==i) && (game_board[row+3][col]==i && game_board[row][col]==i)) //checking for four of the same tokens in a row
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>"; //adding the fourth token to the board
            end_game(i); //ending the game and declaring the winner
            return true; //ending the check_win function sine the game is over
          }
        }
      }
    }
  }
  
  //checking for a win by searching downward diagonal
  for (i=1; i<=2; i++) //checking for player 1 matches and player 2 matches
  {
    for (col=0; col<=3; col++) //checking the first four columns for a match since there must be four in a row 
    {
      for (row=0; row<=2; row++) //checking the corresponding top rows
      {
        if (game_board[row][col]==i) //checking to see if the token in the current location matches the player that is being checked
        {
          if ((game_board[row+1][col+1]==i) && (game_board[row+2][col+2]==i) && (game_board[row+3][col+3]==i && game_board[row][col]==i)) //checking for matches on the donward diagonal
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>"; //adding the fourth token
            end_game(i);//ending the game and declaring the winner
            return true;//ending the check_win function since the game is over
          }
        }
      }
    }
  }
  
  //checking for a win by searchign upward diagonal
  for (i=1; i<=2; i++) //checking for player 1 matches and player 2 matches
  {
    for (col=0; col<=3; col++) //checking the first four columns since the match has to be four in a row and there are 7 columns
    {
      for (row=3; row<=5; row++) //checking the bottom corresponding rows
      {
        if (game_board[row][col]==i) //checking if the token at the current location matches the player that is being checked
        {
          if ((game_board[row-1][col+1]==i) && (game_board[row-2][col+2]==i) && (game_board[row-3][col+3]==i && game_board[row][col]==i)) //checking for upward diagonal wins
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>"; //adding the fourth token
            end_game(i); //ending the game when a match is made and declaring the winner
            return true; //ending the check_win function since the game is over
          }
        }
      }
    }
  }
}
 
function end_game(winner) //This function ends the game when a winner is declared
{
  game_status = false; //making the game status inactive so the players can start a new game
  if(winner==1) //if player 1 is declared the winner
  {
    document.getElementById('game_info').innerHTML = "Winner: Purple Player"; //display that player 1/purple player is the winner
    disable_button();//disable the drop button so the players cannot add more tokens when the game is over 
  }
  if(winner==2) //if player 2 is declared the winner 
  {
    document.getElementById('game_info').innerHTML = "Winner: Blue Player"; //display that player2/blue player is the winner
    disable_button(); //disable the drop buttons so the players cannot add more tokens when teh game is over
  }
}

function disable_button() //This function disables the drop buttons 
{
  //This function goes through and disables each drop button individually by obtaining the HTML button id
  const button0 = document.getElementById("drop0");
  button0.disabled = true;
  const button1 = document.getElementById("drop1");
  button1.disabled = true;
  const button2 = document.getElementById("drop2");
  button2.disabled = true;
  const button3 = document.getElementById("drop3");
  button3.disabled = true;
  const button4 = document.getElementById("drop4");
  button4.disabled = true;
  const button5 = document.getElementById("drop5");
  button5.disabled = true;
  const button6 = document.getElementById("drop6");
  button6.disabled = true;
}		

function enable_button() //This function enables the drop buttons
{
  //This function goes through and enables each drop button individually by obtaining the HTML button id
  const button0 = document.getElementById("drop0");
  button0.disabled = false;
  const button1 = document.getElementById("drop1");
  button1.disabled = false;
  const button2 = document.getElementById("drop2");
  button2.disabled = false;
  const button3 = document.getElementById("drop3");
  button3.disabled = false;
  const button4 = document.getElementById("drop4");
  button4.disabled = false;
  const button5 = document.getElementById("drop5");
  button5.disabled = false;
  const button6 = document.getElementById("drop6");
  button6.disabled = false;
}

function drop_token(col) //This function drops the token at the lowest available space and takes in a column point from the drop button in html 
{
  for (row=5; row>=0; row--) //It searches the rows in the corresponding columns from lowest to highest 
  { 
    if (game_board[row][col]==0) //checks if there is a spot in the board within the desired column
    {
      game_board[row][col] = player; //sets the empty spot to the active players number
      update(); //updates the board with the players token
      if (player==1) //if player 1 was the active player, switch to player 2
      {
        player = 2;
      } 
      else //since there are only two players, this statement occurs when player 2 was the active player and switches to player 1
      {
        player = 1; 
      }
      tracking_player_turn(); //change the active player display for the user
      return true; //end the drop_token function since an empty spot was found 
    }
  }
}