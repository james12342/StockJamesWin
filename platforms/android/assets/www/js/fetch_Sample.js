
var stocks;

var refresh_Stock = function (stock) {
    $.ajax({
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',
        //Stock juhe Data
        // url: 'http://web.juhe.cn:8080/finance/stock/usa?gid=' + stock.symb + '&key=d7e1b4fe6a74c01426f150219485ec1f',
        //Stock Yahoo data
        url: 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=' + stock.symb,
        //Bitcoin
        //url: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
        cache: false,
        crossDomain: true,
        success: function (response) {

            var Name = response.quoteResponse.result[0].shortName;
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

            var DayVolume = response.quoteResponse.result[0].regularMarketVolume;
            if (DayVolume > 0) {
                DayVolume = DayVolume / 1000000;
                if (DayVolume < 10000) {
                    DayVolume = parseFloat(DayVolume).toFixed(1) + 'M';
                }
            }
            else {
                DayVolume = 'NA';
            }

            var BidSize = response.quoteResponse.result[0].bidSize;
            var AskSize = response.quoteResponse.result[0].askSize;

            var AVG10DVolume = response.quoteResponse.result[0].averageDailyVolume10Day;
            if (AVG10DVolume > 0) {
                AVG10DVolume = AVG10DVolume / 1000000;
                if (AVG10DVolume < 10000) {
                    AVG10DVolume = parseFloat(AVG10DVolume).toFixed(1) + 'M';
                }
            }
            else {
                AVG10DVolume = 'NA';
            }
            if (nowHour < 13) {
                if (changePercent > 0) {
                    change_str = '[R] ' + changePercent + '%';
                } else if (changePercent < 0) {
                    change_str = '[R] ' + changePercent + '%';
                } else {
                    change_str = '[R]--';
                }
                console.log('(' + stock.symb + '):[' + stock.symb + ']: ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' 涨跌：' + change_str);
                $('#' + stock.symb).text('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize+ ' 涨跌' + change_str);
            }
            else {
                if (changePercent >= 0) {
                    change_str = '[A] ' + changePercent + '%';
                    //Only show the raise stock
                    console.log('(' + stock.symb + '):[' + stock.symb + ']: ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' 涨跌：' + change_str);
                    $('#' + stock.symb).text('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize + ' 涨跌' + change_str);

                }
                else if (changePercent < 0) {
                    change_str = '[A] ' + changePercent + '%';
                    $('#' + stock.symb).text('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize + ' 涨跌' + change_str);
                }
                else {
                    change_str = '[A]--';
                }
            }
            //if (stock.price < LastPrice) {
            if (changePercent < 0) {
                $('#' + stock.symb).fadeTo(500, 10, function () {
                    $(this).css("background-color", "red");
                }).fadeTo(500, 0, function () {
                    $(this).css("background-color", "white");
                }).fadeTo(1, 10, function () {
                    $(this).css("background-color", "white");
                });

                // stock.price = LastPrice;
            }
            else if (changePercent > 0 && changePercent <= 2)
            {
                $('#' + stock.symb).fadeTo(500, 10, function () {
                    $(this).css("background-color", "green");
                }).fadeTo(4000, 0, function () {
                    $(this).css("background-color", "green");
                }).fadeTo(1, 10, function () {
                    $(this).css("background-color", "white");
                });

                //stock.price = results.result[0].data.lastestpri;
            }
            else if (changePercent > 2) {
                $('#' + stock.symb).fadeTo(500, 10, function () {
                    $(this).css("background-color", "gold");
                }).fadeTo(6000, 0, function () {
                    $(this).css("background-color", "gold");
                }).fadeTo(1, 10, function () {
                    $(this).css("background-color", "gold");
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
                    $(this).css("background-color", "green");
                }).fadeTo(1, 1, function () {
                    $(this).css("background-color", "green");
                });

                stock.price = response.ticker.price;
            }
        },
        error: function () {
            $('#test').text('request failed');
        }
    });
}

$(document).ready(function () {
    //################# Get each stock detail #############################
    var url = 'http://stockwaveswatch.com/EarnCalen_json.php';
    $.getJSON(url, function (result) {
        console.log(result);
        stocks = result;
        for (var s in stocks) {

            var CalDate = stocks[s].date;
            //var date = new Date();
            //var theDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
            //    .toISOString()
            //    .split("T")[0];

            var prev_date = new Date();
            prev_date.setDate(prev_date.getDate() + 0);

            var theDate = new Date(prev_date.getTime() - (prev_date.getTimezoneOffset() * 60000))
                .toISOString()
                .split("T")[0];
            if (CalDate == theDate) {
                //$('body').append('<div id="' + stocks[s].symb + '" class="stocks">'
                //    + stocks[s].symb + '[' + stocks[s].name + ']: ' + '</div>');
                var stockURL = "https://finance.yahoo.com/quote/" + stocks[s].symb;
                var EarnTime = stocks[s].earningTime;
                if (EarnTime == "Before Market Open") {
                    EarnTime = "PRE"
                }
                else if (EarnTime == "After Market Close") {
                    EarnTime = "AFT"
                }
                else
                {
                    EarnTime = "TAS"
                }

                $('body').append('<a href=' + stockURL + '>' + stocks[s].symb + ' [' + stocks[s].note + ' | ' + EarnTime+']'+ '<div id="' + stocks[s].symb + '" class="stocks">'
                    + stocks[s].symb + '[' + stocks[s].name + ']: ' + '</div></a>');
                
            }


        }
    });
    //################# End get each stock detail #########################

    //#################Get each stock news ################################

    //################ End Get each stock news ###############################
   
    $.support.cors = true;
});


setInterval
    (function () {
        for (var s in stocks) {
            //console.log(stocks[s].symb);
            var StockName = stocks[s].name;
            if (StockName == "Bitcoin") {
                refresh_Bitcoin(stocks[s]);
            }
            else {
                var CalDate = stocks[s].date;
                //var date = new Date();
                //var theDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
                //    .toISOString()
                //    .split("T")[0];

                var prev_date = new Date();
                prev_date.setDate(prev_date.getDate() + 0);

                var theDate = new Date(prev_date.getTime() - (prev_date.getTimezoneOffset() * 60000))
                    .toISOString()
                    .split("T")[0];


                if (theDate == CalDate) {
                    refresh_Stock(stocks[s]);
                }

            }
        }
    },
    7000
    );   

//############### Fetch news #############################
// API call

var app_rssfeed = {

    api_url: "https://aqueous-eyrie-16697.herokuapp.com/api/feeds?rss_url=",
    // deviceready Event Handler
    onDeviceReady: function () {
        console.log('deviceready');
    },

    onAddButtonClicked: function (id) {
        var rss_url = document.getElementById(id).value;
        if (rss_url == "" || !app_rssfeed.validateURL(rss_url)) {
            navigator.notification.alert('Please insert a valid url!', null, 'Error', 'OK');
        } else {
            app_rssfeed.fetchFeed(rss_url);
        }
    },

    // helper

    validateURL: function (url) {
        var urlregex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        return urlregex.test(url);
    },

    // API call

    fetchFeed: function (feed_url) {
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: app_rssfeed.api_url + feed_url,
            success: app_rssfeed.onSuccess,
            error: app_rssfeed.onError
        });
    },

    // Update DOM on a Success Event

    onSuccess: function (data) {
        if (data.hasOwnProperty('status')) {
            navigator.notification.alert('Please insert a valid feed!', null, 'Error', 'OK');
        } else {
            var items = [];
            $.each(data, function (key, val) {
                var url = val['enclosure'].link
                var theLink = val.link;
                items.push('<div class="card mb-3"> <div class="card-block"> <h4 class="card-title">' + val.title + '</h4> <a href=' + val.link + '>More Info</a> <p class="card-text">' + val.description + '</p> <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> </div> </div>')
            });
            $('#feeds').html(items.join(''));
        }
    },

    onError: function (data, textStatus, errorThrown) {
        console.error('Data: ' + data);
        console.error('Status: ' + textStatus);
        console.error('Error: ' + errorThrown);
    },

};
//############### End Fetch news #########################