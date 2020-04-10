var game_status = false; 
var draw = 0;
var player;
var num;
var game_board = []; 
var player_color = []; 
player_color[1] = "purple";  
player_color[2] = "blue"; 

function begin_game(player_choice) 
{
  draw = 0;
  enable_button();
  if (game_status==true)
  {
    return false; 
  }
  game_status = true;  
  for (row=0; row<=5; row++) 
  {
    game_board[row] = [];
    for (col=0; col<=6; col++) 
    {
      game_board[row][col] = 0;
    }	
  }		
  update(); 			
  player = player_choice; 
  tracking_player_turn(); 
}

function tracking_player_turn() 
{
  if(player==1)
  {
    if(game_status)
    {
      document.getElementById('game_info').innerHTML = "Current Player:"+ " <span class='player"+player+"'>(Player Purple" + ")</span>";
    }
  }
  if(player==2)
  {
    if(game_status)
    {
      document.getElementById('game_info').innerHTML = "Current Player:" +" <span class='player"+player+"'>(Player Blue"  + ")</span>";
    }
  }
}

function random()
{
  num=Math.floor(Math.random()*2)+1;
  if(num==1)
  {
    begin_game(1);
  }
  if(num==2)
  {
    begin_game(2);
  }
}

function update() 
{ 
  check_win(); 
  for (col=0; col<=6; col++)
  {
    for (row=0; row<=5; row++) 
    {
      document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>";
    }	
  }
}

function check_win() 
{
  //checking for a draw
  draw++;
  console.log(draw);
  if(draw==43)
  {
    game_status = false;
    document.getElementById('game_info').innerHTML = "No Winner";
    disable_button();
    draw = 0;
  }

  //Left to right 
  for (i=1; i<=2; i++) 
  {
    for (col=0; col<=3; col++) 
    {
      for (row=0; row<=5; row++) 
      {
        if (game_board[row][col]==i) 
        {
          if ((game_board[row][col+1]==i) && (game_board[row][col+2]==i) && (game_board[row][col+3]==i && game_board[row][col]==i)) 
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>";
            end_game(i);
            return true; 
          }
        }
      }
    }
  }
  
  //Top to Bottom
  for (i=1; i<=2; i++) 
  {
    for (col=0; col<=6; col++) 
    {
      for (row=0; row<=2; row++) 
      {
        if (game_board[row][col]==i) 
        {
          if ((game_board[row+1][col]==i) && (game_board[row+2][col]==i) && (game_board[row+3][col]==i && game_board[row][col]==i))
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>";
            end_game(i); 
            return true; 
          }
        }
      }
    }
  }
  
  //Downward Diagonal
  for (i=1; i<=2; i++) 
  {
    for (col=0; col<=3; col++) 
    {
      for (row=0; row<=2; row++) 
      {
        if (game_board[row][col]==i) 
        {
          if ((game_board[row+1][col+1]==i) && (game_board[row+2][col+2]==i) && (game_board[row+3][col+3]==i && game_board[row][col]==i)) 
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>";
            end_game(i);
            return true;
          }
        }
      }
    }
  }
  
  //Upward Diagonal
  for (i=1; i<=2; i++) 
  {
    for (col=0; col<=3; col++) 
    {
      for (row=3; row<=5; row++) 
      {
        if (game_board[row][col]==i) 
        {
          if ((game_board[row-1][col+1]==i) && (game_board[row-2][col+2]==i) && (game_board[row-3][col+3]==i && game_board[row][col]==i))
          {
            document.getElementById('board_'+row+'_'+col).innerHTML ="<span class='piece player"+game_board[row][col]+"'> </span>";
            end_game(i);
            return true;
          }
        }
      }
    }
  }
}
 
function end_game(winner) 
{
  game_status = false; 
  if(winner==1)
  {
    document.getElementById('game_info').innerHTML = "Winner: Purple Player";
    disable_button();
  }
  if(winner==2)
  {
    document.getElementById('game_info').innerHTML = "Winner: Blue Player";
    disable_button();
  }
}

function disable_button()
{
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

function enable_button()
{
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

function drop_token(col) 
{
  for (row=5; row>=0; row--) 
  { 
    if (game_board[row][col]==0) 
    {
      game_board[row][col] = player;
      update(); 
      if (player==1) 
      {
        player = 2;
      } 
      else 
      {
        player = 1;
      }
      tracking_player_turn(); 
      return true;
    }
  }
}