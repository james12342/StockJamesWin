
var refresh_Stock_News = function () {
    var feed = "https://www.cnbc.com/id/15839135/device/rss/rss.html";
    $.ajax(feed, {
        accepts: {
            xml: "application/rss+xml"
        },
        dataType: "xml",
        success: function (data) {
       
            var items = [];
            $(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
               // console.log("------------------------");
                //console.log("title      : " + el.find("title").text());
               // console.log("link       : " + el.find("link").text());
               // console.log("description: " + el.find("description").text());
                var newsTime = el.find("pubDate").text();
                var newsTimetoLocalTime = new Date(newsTime);
                var timeNow = Date.now();
                var diffMs = (timeNow - newsTimetoLocalTime);
                var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
               
                items.push('<div class="todayNews">' + el.find("title").text() + '<a href=' + el.find("link").text() + '>More Info</a> <p >' + el.find("description").text() + '</p> <p ><small class="text-muted">Last updated ' + diffMins+' mins ago</small></p> </div>')
            });
            $('#feeds').html(items.join(''));
        }
    });

    $.support.cors = true;
}
$(document).ready(function () {
    var feed = "https://www.cnbc.com/id/15839135/device/rss/rss.html";
    $.ajax(feed, {
        accepts: {
            xml: "application/rss+xml"
        },
        dataType: "xml",
        success: function (data) {
            var items = [];
            $(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
                // console.log("------------------------");
                //console.log("title      : " + el.find("title").text());
                // console.log("link       : " + el.find("link").text());
                // console.log("description: " + el.find("description").text());
                items.push('<div > <div > <h4 >' + el.find("title").text() + '</h4> <a href=' + el.find("link").text() + '>More Info</a> <p class="card-text">' + el.find("description").text() + '</p> <p ><small class="text-muted">Last updated 3 mins ago</small></p> </div> </div>')
            });
            $('#feeds').html(items.join(''));
        }
    });

    $.support.cors = true;
});



setInterval
    (function () {
        refresh_Stock_News();
    },
    7000
    );

