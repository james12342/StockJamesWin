
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
//#####################JAMES ADDED######################
$(document).ready(function () {
    // app.fetchFeed('https://feeds.finance.yahoo.com/rss/2.0/headline?s=ge,msft,w,amzn,nio&region=US&lang=en-US');
    //app_rssfeed.fetchFeed('https://www.thestreet.com/topic/47501/rss.html');
    app_rssfeed.fetchFeed('https://www.thestreet.com/topic/47501/rss.html');
});

var app_rssfeed= {

    api_url: "https://www.cnbc.com/id/20409666/device/rss/rss.html",
    //api_url: "https://aqueous-eyrie-16697.herokuapp.com/api/feeds?rss_url=",
    //api_url: "http://feeds.reuters.com/news/wealth",

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
//##################### JAMES END ######################
app.initialize();
app_rssfeed.initialize();