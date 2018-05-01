$('document').ready(function() {
    $('form').on('submit', function() {
        var word = $('form input[name*="word"]').val();
        var translation = $('form input[name*="translation"]').val();
        var data = {
            word: word,
            translation: translation,
            isNew: true,
            added: Date.parse(new Date()),
            correctTimes: 0,
            incorrectTimes: 0
        };

        $.ajax({
            type: 'POST',
            url: '/vocabulary',
            data: data,
            success: function(data) {
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

    $('div.row button').on('click', function() {
        toggleVisible(this);        
    });

    var toggleVisible = function(el) {
        var translatonLabel = $(el).parent().siblings().find('p').get(1);
        if (translatonLabel.style.display == 'none') {
            $(translatonLabel).show();
            $(el).text('hide');
        } else {
            $(translatonLabel).hide();
            $(el).text('show');
        }
    };
});