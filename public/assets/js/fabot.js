var socket = io.connect('https://faboty.herokuapp.com', { secure: true, transports: [ "flashsocket","polling","websocket" ] });

socket.on('messages', function(data) {
    $('#messages').append('<div class="well">  ' +
      '<div class="row">'+
        '<div class="col-md-4">'+ data.sender +'</div>'+
        '<div class="col-md-8">'+ data.message.text+'</div>'+
      '</div>'+
    '</div>'
    );
});
