//AddPlayers.js

//This should only be an option for organizers

//Enter a potential player's email

  //check if that email is already associated with a user in the database => Axios find-user-by-email-get request that returns acces to the user id
    //if the player already exists, make a team-player object post to axios

    //if the player doesn't exist yet
      //axios post to make a new player with the email
      //axios get find-user-by-email-get request that returns acces to the user id
      //axios post to make a new team-player with team and player id 
