
// $( document ).bind( "mobileinit", function() {
//     // Make your jQuery Mobile framework configuration changes here!
//     $.mobile.allowCrossDomainPages = true;  
// });

var stocks = [
        { "number": '1464', "name": "得力", "price": '0', 'buy_price': '31.45' },
        { "number": '2201', "name": "裕隆", "price": '0', 'buy_price': '35.85' },
        { "number": '0050', "name": "台灣50", "price": '0', 'buy_price': '69.5' },
        { "number": '2412', "name": "中華電", "price": '0', 'buy_price': '97' },
    ];

var refresh = function(stock){
    $.ajax({
        // The 'type' property sets the HTTP method.
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',

        // The URL to make the request to.
        url: 'https://finance.google.com/finance/info?client=ig&q=TPE:' + stock.number,
        dataType: 'jsonp',
        cache: false,
        crossDomain: true,
        success: function(response){
            var change = (parseFloat(response[0]['l']) - parseFloat(stock.buy_price)).toFixed(2);
            var change_str = '';
            if(change > 0){
                change_str = '+' + change + '元';
            } else if(change < 0){
                change_str = '-' + change + '元';
            } else {
                change_str = '--';
            }

            console.log('(' + stock.number + '): ' + response[0]['l_cur']);
            $('#' + stock.name).text('' + stock.name+ '(' + stock.number + '): ' 
                + response[0]['l_cur'] + '  [買價：' + stock.buy_price
                + '  漲跌：' + change_str + ']');
                
            if(stock.price < response[0]['l'])
            {
                $('#' + stock.name).fadeTo(10, 1, function(){
                    $(this).css("background-color", "red");
                    }).fadeTo(500, 0, function(){
                    $(this).css("background-color", "white");
                }).fadeTo(1, 1, function(){
                    $(this).css("background-color", "white");
                });

                stock.price = response[0]['l']; 
            }
            else if(stock.price > response[0]['l'])
            {
                $('#' + stock.name).fadeTo(10, 1, function(){
                    $(this).css("background-color", "green");
                    }).fadeTo(500, 0, function(){
                    $(this).css("background-color", "white");
                }).fadeTo(1, 1, function(){
                    $(this).css("background-color", "white");
                });

                stock.price = response[0]['l']; 
            }
        },
        error: function(){
            $('#test').text('request failed');
        }
    });
}

$(document).ready(function(){

    for( var s in stocks ){
        
        $('body').append('<div id="' + stocks[s].name + '" class="stocks">'  
            + stocks[s].name + '(' + stocks[s].number + '): '+'</div>');
    }

    // $.support.cors = true;
});

setInterval(function() {           
    for( var s in stocks ){
        //console.log(stocks[s].number);
        refresh(stocks[s]);
    }
}, 2000);   
