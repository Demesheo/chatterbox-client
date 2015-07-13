// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox

var app = {



	init : function(){
		
		$('a.username').click(function(){
			app.addFriend();
		});

		$( "#send .submit" ).submit(app.handleSubmit);
		
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
	fetch : function(){ $.get(undefined, function( data ) {
		$( ".result" ).html( data );
		alert( "Load was performed." );
	})
},

clearMessages : function(){$('#chats').html('');},

addMessage : function(message){
	var $message = $('<div class="message"><a class="username">'+ message.username +'</a>'+ ": "+message.text +'</div>');
	$('#chats').append($message);
},

addRoom : function(roomName){
	var $newRoom = $('<option class="room">'+roomName+'</option>');
	$('#roomSelect').append($newRoom);
},

addFriend : function(){
},

handleSubmit : function(){ 
	console.log('handling submit');
	//return true;
}


};


