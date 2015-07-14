// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox

var app = {

  init : function(){

    this.roomNames = {};
    this.messages = [];

    $('a.username').click(function(){
      app.addFriend();
    });

    $( "#send .submit" ).submit(app.handleSubmit);
    
    $('#roomSelect').change(function(e){
      var selectedRoom = "." + e.target.value;

      $('#chats div').show(selectedRoom);
      $("#chats div").not(selectedRoom).hide();

    });

    $('.spinner').hide();

    app.fetch();
    setInterval(app.fetch.bind(this), 5000);

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

      $('.spinner').show();
      var that = this;

      $.get('https://api.parse.com/1/classes/chatterbox', function( data ) {

        $('.spinner').hide();
        that.clearMessages();

        that.messages = that.messages.concat(data.results);
        that.messages = _.uniq(that.messages, function(item){
        return item.objectId;
      })

      that.messages = _.sortBy(that.messages, function(item){
        return new Date(item.createdAt).getTime();
      }).reverse();

      console.table(that.messages);

      for(var i = 0; i < that.messages.length; i++){
        if(that.messages[i].roomname===undefined){
          var roomname = "undefined";
        } else if (that.messages[i].roomname===null){
          var roomname = "null";
        }else if (that.messages[i].roomname==="" || that.messages[i].roomname===" "){
          var roomname = "_";
        }else {
          var roomname = that.messages[i].roomname;
        }
        that.roomNames[roomname] = roomname;
        that.addMessage(that.messages[i]);
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

    if(typeof message.text !== 'string' || message.text === undefined || message.username === undefined || message.text.indexOf('<script>') !== -1 || message.username.indexOf('<script>') !== -1){
      var $message = $('<div class="'+ message.roomname +'"><a class="username">THIS USER IS UNTRUSTED</a>: THIS MESSAGE IS UNTRUSTED <br>'+message.createdAt+'</div>');
      $('#chats').append($message);
    }else{
      var $message = $('<div class="' + message.roomname + '"><a class="username">'+ message.username +'</a>'+ ": "+message.text +' <br>'+message.createdAt+'</div>');
      $('#chats').append($message);
    }

  },

  addRoom : function(roomname){
    var $newRoom = $('<option class="room" value="'+roomname+'">'+roomname+'</option>');
    $('#roomSelect').append($newRoom);
  },

  addFriend : function(){},

  handleSubmit : function(){ 
    console.log('handling submit');
    //return true;
  }

};

$( document ).ready(function() {
  app.init();
});
