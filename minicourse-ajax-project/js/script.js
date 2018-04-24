
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
        //console.log(data);
        var items = [];
        $.each(data.list, function(key, val){
            items.push("<li>key = " + key + "; value=" + val + "</li>");
        });
        console.log("HEY!!!");
        $("<ul/>", {
            "class": "my-new-list",
            html: items.join( "" )
          }).appendTo($body);
    }, {
        tags: "mount rainier",
        tagmode: "any",
        format: "json"
      });
    

    return false;
};

$('#form-container').submit(loadData);
