
// $( document ).bind( "mobileinit", function() {
//     // Make your jQuery Mobile framework configuration changes here!
//     $.mobile.allowCrossDomainPages = true;  
// });

var stocks = [
    { "symb": 'amzn', "name": "Amazon", "price": '3098', 'buy_price': '2909.87' },
    { "symb": 'baba', "name": "BABA", "price": '178', 'buy_price': '136.85' },
    { "symb": 'fb', "name": "Facebook", "price": '187', 'buy_price': '167.54' },
    { "symb": 'amd', "name": "AMD", "price": '23', 'buy_price': '35.98' },
    { "symb": 'iq', "name": "爱奇艺", "price": '23', 'buy_price': '35.34' },
    { "symb": 'twtr', "name": "推特", "price": '7866', 'buy_price': '10.23' },
    { "symb": 'msft', "name": "微软", "price": '34', 'buy_price': '9999.12' },
    { "symb": 'TMUS', "name": "TMobile", "price": '0', 'buy_price': '9999.12' },
    { "symb": 'AAPL', "name": "苹果", "price": '6545', 'buy_price': '9999.12' },
    { "symb": 'NFLX', "name": "奈飞", "price": '5343', 'buy_price': '345.12' },
    { "symb": 'TSLA', "name": "特斯拉", "price": '543', 'buy_price': '234.12' },
    { "symb": 'NVDA', "name": "NVDA", "price": '43', 'buy_price': '433.12' },
    { "symb": 'MU', "name": "MU", "price": '664', 'buy_price': '23.12' },
    { "symb": 'JPM', "name": "JPM", "price": '344', 'buy_price': '654.12' },
    { "symb": 'GOOG', "name": "GOOG", "price": '650', 'buy_price': '1202.12' },
    { "symb": 'HD', "name": "HD", "price": '330', 'buy_price': '64.12' },
    { "symb": 'BAC', "name": "BAC", "price": '555', 'buy_price': '11.12' },
    { "symb": 'PG', "name": "", "price": '0', 'buy_price': '9999.12' },
    //{ "symb": 'CSCO', "name": "Cisco Systems", "price": '0', 'buy_price': '9999.12' },
    //{ "symb": 'T', "name": "AT&T", "price": '0', 'buy_price': '9999.12' },
    //{ "symb": 'SNAP', "name": "Snap Inc", "price": '0', 'buy_price': '9999.12' },
    //{ "symb": 'QCOM', "name": "Qualcomm, Inc.", "price": '0', 'buy_price': '9999.12' },
    //{ "symb": 'VZ', "name": "Verizon Communications", "price": '0', 'buy_price': '9999.12' },
    //{ "symb": 'XOM', "name": "Exxon Mobil", "price": '0', 'buy_price': '9999.12' },
    //{ "symb": 'WMT', "name": "Wal-Mart Stores, Inc.", "price": '0', 'buy_price': '9999.12' },
    { "symb": 'WDC', "name": "西部数据", "price": '43', 'buy_price': '4.12' },
    { "symb": 'HRB', "name": "HRB", "price": '43', 'buy_price': '4.12' },
    { "symb": 'AVRO', "name": "AVROBIO", "price": '43', 'buy_price': '4.12' },
    { "symb": 'BTC', "name": "Bitcoin", "price": '43', 'buy_price': '10000.00' },

];

var refresh_Stock = function (stock) {
    $.ajax({
        // The 'type' property sets the HTTP method.
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',

        // The URL to make the request to.
        //Stock juhe Data
        // url: 'http://web.juhe.cn:8080/finance/stock/usa?gid=' + stock.symb + '&key=d7e1b4fe6a74c01426f150219485ec1f',
        //Stock Yahoo data
        url: 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=' + stock.symb,
        //Bitcoin
        //url: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
        cache: false,
        crossDomain: true,
        success: function (response) {
            //juhe data
            //var results = $.parseJSON(response);
            //var Name = results.result[0].data.name;
            //response.quoteResponse.result[0].regularMarketPrice
            //var date = results.result[0].data.date;
            //var LastPrice = results.result[0].data.lastestpri;
            //var change = (parseFloat(LastPrice) - parseFloat(stock.buy_price)).toFixed(2);
            //var change_str = '';
            //if (change > 0) {
            //    change_str = '+$' + change;
            //} else if (change < 0) {
            //    change_str = '-$' + change;
            //} else {
            //    change_str = '--';
            //}
            //juhe data
            //Yahoo data

            var Name = response.quoteResponse.result[0].shortName;

            //var date = results.result[0].data.date;
            var LastPrice = response.quoteResponse.result[0].regularMarketPrice;
            var change = response.quoteResponse.result[0].regularMarketChange;
            change = parseFloat(response.quoteResponse.result[0].regularMarketChange).toFixed(2);
            var d = new Date();
            var nowHour = d.getHours();

            var changePercent;
            if (nowHour < 13) {
                changePercent = parseFloat(response.quoteResponse.result[0].regularMarketChangePercent).toFixed(2);
            }
            else {
                changePercent = parseFloat(response.quoteResponse.result[0].postMarketChangePercent).toFixed(2);
            }


            var MarketCap = response.quoteResponse.result[0].marketCap;
            MarketCap = MarketCap / 1000000;
            if (MarketCap < 10000) {
                MarketCap = parseFloat(MarketCap).toFixed(1) + 'M';
            }
            if (MarketCap > 10000) {
                MarketCap = parseFloat(parseFloat(MarketCap).toFixed(0) / 1000).toFixed(1) + 'B';
            }


            var change_str = '';

            if (nowHour < 13) {
                if (changePercent > 0) {
                    change_str = '[R] ' + changePercent + '%';
                } else if (changePercent < 0) {
                    change_str = '[R] ' + changePercent + '%';
                } else {
                    change_str = '[R]--';
                }
            }
            else {
                if (changePercent > 0) {
                    change_str = '[A] ' + changePercent + '%';
                } else if (changePercent < 0) {
                    change_str = '[A] ' + changePercent + '%';
                } else {
                    change_str = '[A]--';
                }
            }



            console.log('(' + stock.name + '):[' + stock.symb + ']: ' + ' 现价:' + 'nowprice' + ' 市值:' + 'marketcap' + ' 涨跌：' + '5%');
         
            //$('#' + stock.name).text('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' 涨跌：' + change_str);
            $('#' + stock.name).text('(' + stock.name + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' 涨跌：' + change_str);

            //if (stock.price < LastPrice) {
            if (changePercent < 0) {
                $('#' + stock.name).fadeTo(3000, 10, function () {
                    $(this).css("background-color", "red");
                }).fadeTo(500, 0, function () {
                    $(this).css("background-color", "white");
                }).fadeTo(1, 10, function () {
                    $(this).css("background-color", "white");
                });

               // stock.price = LastPrice;
            }
            else if (changePercent > 0) {
                $('#' + stock.name).fadeTo(5000, 10, function () {
                    $(this).css("background-color", "green");
                }).fadeTo(500, 0, function () {
                    $(this).css("background-color", "white");
                }).fadeTo(1, 10, function () {
                    $(this).css("background-color", "white");
                });

                //stock.price = results.result[0].data.lastestpri;
            }
        },
        error: function () {
            $('#test').text('request failed');
        }
    });
}

var refresh_Bitcoin = function (stock) {
    $.ajax({
        // The 'type' property sets the HTTP method.
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',

        // The URL to make the request to.

        //Bitcoin
        url: 'https://api.cryptonator.com/api/ticker/btc-usd',
        cache: false,
        crossDomain: true,
        success: function (response) {
            //var results = $.parseJSON(response);
            var Name = response.ticker.base;

            //var date = results.result[0].data.date;
            var LastPrice = response.ticker.price;

            var change = (parseFloat(LastPrice) - parseFloat(stock.buy_price)).toFixed(2);
            var change_str = '';
            if (change > 0) {
                change_str = '+$' + change;
            } else if (change < 0) {
                change_str = '-$' + change;
            } else {
                change_str = '--';
            }

            console.log('(' + stock.symb + '): ');
            $('#' + stock.name).text('' + stock.name + '(' + stock.symb + '): '
                + Name + '  [ 买价：' + stock.buy_price + ' 现价:' + LastPrice
                + '  涨跌：' + change_str + ' ]');

            if (stock.price < LastPrice) {
                $('#' + stock.name).fadeTo(10, 1, function () {
                    $(this).css("background-color", "red");
                }).fadeTo(500, 0, function () {
                    $(this).css("background-color", "white");
                }).fadeTo(1, 1, function () {
                    $(this).css("background-color", "white");
                });

                stock.price = LastPrice;
            }
            else if (stock.price > LastPrice) {
                $('#' + stock.name).fadeTo(10, 1, function () {
                    $(this).css("background-color", "green");
                }).fadeTo(500, 0, function () {
                    $(this).css("background-color", "white");
                }).fadeTo(1, 1, function () {
                    $(this).css("background-color", "white");
                });

                stock.price = response.ticker.price;
            }
        },
        error: function () {
            $('#test').text('request failed');
        }
    });
}
$(document).ready(function ()
{

    for (var s in stocks) {
        $('body').append('<div id="' + stocks[s].name + '" class="stocks">'
            + stocks[s].name + '(' + stocks[s].symb + '): ' + '</div>');
    }

    $.support.cors = true;
});


setInterval
    (function ()
    {
    for (var s in stocks)
    {
        //console.log(stocks[s].symb);
        var StockName = stocks[s].name;
        if (StockName != "Bitcoin")
        {
            refresh_Stock(stocks[s]);
        }
        else
        {
            refresh_Bitcoin(stocks[s]);
        }
    }
    },
    7000
    );   
