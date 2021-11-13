

$(document).ready(function () {
    var feed = "https://www.cnbc.com/id/20409666/device/rss/rss.html";
    $.ajax(feed, {
        accepts: {
            xml: "application/rss+xml"
        },
        dataType: "xml",
        success: function (data) {
            //Credit: http://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript
            var items = [];
            $(data).find("item").each(function () { // or "item" or whatever suits your feed
                var el = $(this);
                console.log("------------------------");
                console.log("title      : " + el.find("title").text());
                console.log("link       : " + el.find("link").text());
                console.log("description: " + el.find("description").text());
                items.push('<div class="card mb-3"> <div class="card-block"> <h4 class="card-title">' + el.find("title").text() + '</h4> <a href=' + el.find("link").text() + '>More Info</a> <p class="card-text">' + el.find("description").text() + '</p> <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> </div> </div>')
            });
            $('#feeds').html(items.join(''));
        }
    });

    $.support.cors = true;
});


