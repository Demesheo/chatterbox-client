// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox

var app = {

  init : function(){

    this.roomNames = {};

    $('a.username').click(function(){
      app.addFriend();
    });

    $( "#send .submit" ).submit(app.handleSubmit);
    
    app.fetch();

    $('#roomSelect').change(function(e){
      var selectedRoom = "." + e.target.value;

      $('#chats div').show(selectedRoom);
      $("#chats div").not(selectedRoom).hide();

      // if('#chats:not('+selectedRoom+')'){
      //   $('#chats:not('+selectedRoom+')').toggle();
      // }
      //if ($('select option:selected')!== $('div:'))
    });

    return true;

  },
  send : function(message){
    console.log("testing submit")
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message');
      },


    }
    )},
    fetch : function(){ 
      var that = this;
      // $.ajax({
      //   url: 'https://api.parse.com/1/classes/chatterbox',
      //   type: 'GET',
      // //data: data,
      //   success: function( data ) {
      //     //( ".result" ).html( data );
      //     console.log(data);  
      //     for(var i = 0; i < data.results.length; i++){
      //       if(data.results[i].roomname===undefined){
      //         var roomname = "undefined";
      //       } else if (data.results[i].roomname===null){
      //         var roomname = "null";
      //       }else if (data.results[i].roomname==="" || data.results[i].roomname===" "){
      //         var roomname = "_";
      //       }else {var roomname = data.results[i].roomname;}
      //       that.roomNames[roomname] = roomname;
      //       that.addMessage(data.results[i]);
      //     }

      //     //
      //     console.table(data.result);
      //     for(var key in that.roomNames){
      //       var addedRoom = that.roomNames[key];
      //       that.addRoom(addedRoom);
      //     }
      //   },
      //   dataType: "jsonp"
      // });

   $.get('https://api.parse.com/1/classes/chatterbox', function( data ) {
   //( ".result" ).html( data );
   console.log(data);  
   for(var i = 0; i < data.results.length; i++){
     if(data.results[i].roomname===undefined){
       var roomname = "undefined";
     } else if (data.results[i].roomname===null){
       var roomname = "null";
     }else if (data.results[i].roomname==="" || data.results[i].roomname===" "){
       var roomname = "_";
     }else {var roomname = data.results[i].roomname;}
     that.roomNames[roomname] = roomname;
     that.addMessage(data.results[i]);
   }

   //
   console.table(data.result);
   for(var key in that.roomNames){
     var addedRoom = that.roomNames[key];
     that.addRoom(addedRoom);
   }






  })
},

clearMessages : function(){$('#chats').html('');},

addMessage : function(message){
  console.log(message);
  if(typeof message.text !== 'string' || message.text === undefined || message.username === undefined || message.text.indexOf('<script>') !== -1 || message.username.indexOf('<script>') !== -1){
    var $message = $('<div class="'+ message.roomname +'"><a class="username">THIS USER IS UNTRUSTED</a>: THIS MESSAGE IS UNTRUSTED</div>');
    $('#chats').append($message);
  }else{
    var $message = $('<div class="' + message.roomname + '"><a class="username">'+ message.username +'</a>'+ ": "+message.text +'</div>');
    $('#chats').append($message);
  }
},

addRoom : function(roomname){
  var $newRoom = $('<option class="room" value="'+roomname+'">'+roomname+'</option>');
  $('#roomSelect').append($newRoom);
},

addFriend : function(){
},

handleSubmit : function(){ 
  console.log('handling submit');
  //return true;
}


};

$( document ).ready(function() {
    app.init();
});
