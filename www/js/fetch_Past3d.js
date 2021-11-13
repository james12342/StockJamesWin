
var stocks;
var GlobalLatestNews;
var GlobalNewsTimeGap;

var refresh_Stock = function (stock) {

    $.ajax({
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',
        url: 'https://query1.finance.yahoo.com/v7/finance/quote?lang=en-US&region=US&corsDomain=finance.yahoo.com&symbols=' + stock.symb,
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
                $('#' + stock.symb).text('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize + ' 涨跌' + change_str);
            }
            else {
                if (changePercent >= 0) {
                    change_str = '[A] ' + changePercent + '%';
                    //Only show the raise stock

                    //Get the stock latest news
                    var stockSymb = stock.symb;
                    var stockNews;
                    var url = 'http://stockwaveswatch.com/getrss.php?q=' + stockSymb;
                    $.getJSON(url, function (result) {
                        //console.log(result);
                        // alert(result.item[0].title);
                        var newsTitle = result.item[0].title;
                        var newsTime = result.item[2].pubdate;
                        var newsLink = result.item[3].link;


                        var newsTimetoLocalTime = new Date(newsTime);
                        var timeNow = Date.now();
                        var diffMs = (timeNow - newsTimetoLocalTime);
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                        stockNews = newsTitle + " | " + diffMins + " Mins ago";

                        $('#' + stock.symb).html('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize + ' 涨跌' + change_str + '<br><a href=' + newsLink + '>最新新闻：' + stockNews + '</a>');
                    });
                    //end get stock latest news
                    // console.log('(' + stock.symb + '):[' + stock.symb + ']: ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' 涨跌：' + change_str);
                    // $('#' + stock.symb).text('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize + ' 涨跌' + change_str);



                }
                else if (changePercent < 0) {
                    change_str = '[A] ' + changePercent + '%';
                    //Get the stock latest news
                    var stockSymb = stock.symb;
                    var stockNews;
                    var url = 'http://stockwaveswatch.com/getrss.php?q=' + stockSymb;
                    $.getJSON(url, function (result) {
                        var newsTitle = result.item[0].title;
                        var newsTime = result.item[2].pubdate;
                        var newsLink = result.item[3].link;
                        var newsTimetoLocalTime = new Date(newsTime);
                        var timeNow = Date.now();
                        var diffMs = (timeNow-newsTimetoLocalTime );
                        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
                        stockNews = newsTitle + " | " + diffMins + " Mins ago";

                        $('#' + stock.symb).html('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize + ' 涨跌' + change_str + '<br><a href=' + newsLink + '>最新新闻：' + stockNews + '</a>');

                    });
                    //end get stock latest news
                    // console.log('(' + stock.symb + '):[' + stock.symb + ']: ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' 涨跌：' + change_str);
                    // $('#' + stock.symb).text('(' + stock.symb + '): ' + ' 现价:' + LastPrice + ' 市值:' + MarketCap + ' [1/10日量]:' + DayVolume + '/' + AVG10DVolume + ' [买/卖量]:' + BidSize + '/' + AskSize + ' 涨跌' + change_str);
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
            else if (changePercent > 0 && changePercent <= 2) {
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
        //Get the news  
        //End get the news
    });
    //Get the news
    // var rss_url = 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=' + stock.symb+'&region=US&lang=en-US';
    // app_rssfeed.fetchFeed(rss_url);
    //End get the news
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




function loadNews(stock, callback) {
    var stockSymb = stock.symb;

    var url = "https://feeds.finance.yahoo.com/rss/2.0/headline?s=" + stockSymb + "&region=US&lang=en-US";

    var LatestNews = $.ajax({
        url: url,
        type: 'GET',
        dataType: "xml"

    })
        .done(function (xml) {
            var self = $(xml).find('item').first();
            var url = $(self).find('link').text();
            var title = $(self).find('title').text();
            var text = $(self).find('description').text();
            var date = $(self).find('pubDate').text();
            callback(title);
            //LatestNews = title;
            //return title;
            // EarnAft1day.html('<h2>' + title + '</h2><p>' + dateFormat(date) + '</p><p>' + text + '</p><a href="' + url + '">Link</a>');

        })
        .fail(function () {
            news.hide();
        });
    //return LatestNews.responseText;
}


var refresh_Stock_News = function (stock) {
    var stockSymb = stock.symb;
    var url = 'http://stockwaveswatch.com/getrss.php?q=' + stockSymb;
    $.getJSON(url, function (result) {
        console.log(result);
        stocks = result;
        for (var s in stocks) {

            var CalDate = stocks[s].date;

        }
    });
    $.support.cors = true;
}
$(document).ready(function () {
    //################# Get each stock detail #############################
    var url = 'http://stockwaveswatch.com/4daysEarning_json.php';
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
                else {
                    EarnTime = "TAS"
                }

                $('body').append('<a href=' + stockURL + '>' + stocks[s].symb + ' [' + stocks[s].note + ' | ' + EarnTime + ']' + '</a > '
                    + '<div id="' + stocks[s].symb + '" class="stocks">' + stocks[s].symb + '[' + stocks[s].name + ']: ' + '</div>'
                    // + '<div id="' + stocks[s].symb + '" class="stocks">' + stocks[s].symb + '[' + stocks[s].name + ']: ' + '</div>'
                );

           


        }
    });

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
                    //refresh_Stock_News(stocks[s]);
                }

            }
        }
    },
    7000
    );

