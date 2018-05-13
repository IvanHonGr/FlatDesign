
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    

    // YOUR CODE GOES HERE!
    var myData = $('#street').val() + ', ' + $('#city').val()
    console.log(myData);
    var str1 = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location='" + myData + "'";
    console.log(str1);
    $body.append('<img class="bgimg" src="' + str1 + '">');

    var request = "http://samples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b6907d289e10d714a6e88b30761fae22";
    $.getJSON(request, function(data) {
        var items = [];
        for (var i = 0; i < data.list.length; i++) {
            var item = data.list[i];
            items.push("<li>date: " + item.dt_txt + " | weather is: " + item.weather[0].description + "</li>");
            if (i > 20) {
                break;
            }
        };
        $nytElem.append(items.join( "" ));
    }).error(function() {
        $nytHeaderElem.text = "Weather cant be loaded"
        $nytElem.append('<li>nothing found :( </li>');
    });


    var request = "http://sa1mples.openweathermap.org/data/2.5/forecast?q=London,us&appid=b6907d289e10d714a6e88b30761fae22";
    $.ajax({
        url: request,
        dataType: "jsonp",
        success: function (data) {
            var items = [];
            for (var i = 0; i < data.list.length; i++) {
                var item = data.list[i];
                items.push("<li>date: " + item.dt_txt + " | weather is: " + item.weather[0].description + "</li>");
                if (i > 20) {
                    break;
                }
            };
            $nytElem.append(items.join(""));
        },
        error: function () {
            $nytHeaderElem.text = "Weather cant be loaded";
            $nytElem.append('<li>nothing found :( </li>');
        }
    });
    

    return false;
};

$('#form-container').submit(loadData);
