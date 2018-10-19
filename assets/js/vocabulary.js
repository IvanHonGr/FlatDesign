$('document').ready(function () {
    $('form').on('submit', function () {
        var word = $('form input[name*="word"]').val().trim();
        var translation = $('form input[name*="translation"]').val();
        var data = {
            word: word,
            translation: translation,
            added: Date.parse(new Date()),
            correctTimes: 0,
            incorrectTimes: 0
        };

        $.ajax({
            type: 'POST',
            url: '/vocabulary',
            data: data,
            success: function (data) {
                //do something with the data via front-end framework
                location.reload();
            }
        });
    });

    $('.dictionary-list .word-item:odd').addClass('odd');
    $('.dictionary-list .word-item:even').addClass('even');

    function assignFunctionForButtonWithName(name, buttonFunc) {
        $('div.row button[name="' + name + '"]').on('click', function () {
            buttonFunc(this);
        });
    }

    function assignFunctionForImageWithName(name, imgFunc) {
        $('div.row img[name="' + name + '"]').on('click', function () {
            imgFunc(this);
        });
    }

    var toggleVisible = function (el) {
        var translatonLabel = $(el).parent().siblings().find('p').eq(1);
        if (translatonLabel.is(':hidden')) {
            translatonLabel.show();
            $(el).text('hide');
        } else {
            translatonLabel.hide();
            $(el).text('show');
        }
    };

    var checkWordValue = function (el) {
        var word = $(el).parent().siblings().find('p').first();
        var translatonLabel = $(el).parent().siblings().find('p').eq(1);
        if (translatonLabel.is(':hidden')) {
            translatonLabel.show();
        }
        getTranslation(translatonLabel, word.text());
        $(el).prev().text('hide');
    }

    function getTranslation(element, queryWord) {
        if (element.siblings().is('.dictionary-translation')) {
            element.siblings().first().remove();
        } else {
            $.ajax({
                type: 'GET',
                url: 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20180512T083313Z.b2669e6bc6f3a9ff.c44f61a701b752c55c1a644812c0ff8527b2673d' +
                    '&lang=en-ru&format=plain&text=' + queryWord,
                success: function (data) {
                    var result = "";
                    var counter = 1;
                    for (var x in data.def) {
                        for (var tr in data.def[x].tr) {
                            var meanNode = data.def[x].tr[tr]
                            var meaning = meanNode.text;
                            if (meanNode.syn) {
                                for (var i = 1; i <= meanNode.syn.length; i++) {
                                    meaning += "; " + meanNode.syn[i - 1].text;
                                }
                            }
                            result += counter + ") " + meaning + "</br>";
                            counter++;
                        }
                    };
                    var dictResult = $('<div></div>').addClass('dictionary-translation')
                        .append($('<h5>Advanced Translation:</h5>'))
                        .append(result);
                    dictResult.insertAfter(element);
                }
            });
        }
    }

    function showUdateInput(el) {
        var updateDiv = $(el).parent().siblings().find('div.update').first();
        updateDiv.show();
    };

    function hideUnderInput(el) {
        $(el).parent().hide();
    }

    function updateTranslation(el) {
        var input = $(el).parent().find('input').first();

        var newTranslation = input.val();

        var word = $(el).parents('.row').find('p').first().text().trim();
        var data = {
            word: word,
            translation: newTranslation
        }

        $.ajax({
            type: 'POST',
            url: '/vocabulary/manage',
            data: data,
            success: function (data) {
                //do something with the data via front-end framework
            }
        });

        $(el).parent().hide();
        var translationPar = $(el).parents('.row').find('p').eq(1);
        translationPar.text(newTranslation);
        translationPar.removeClass('error')
    }

    function deleteWord(el) {
        var word = $(el).parents('.row').find('p').first().text().trim();
        var data = {
            word: word
        }

        $.ajax({
            type: 'POST',
            url: '/vocabulary/manage/del',
            data: data,
        });

        $(el).parents('.row').hide();
    }

    function correct(el) {
        var word = $(el).parents('.row').find('p').first().text().trim();
        var data = {
            word: word,
            correctTimes: 1
        }
        $.ajax({
            type: 'POST',
            url: '/vocabulary/training/pick',
            data: data
        });
    }

    function incorrect(el) {
        var word = $(el).parents('.row').find('p').first().text().trim();
        var data = {
            word: word,
            incorrectTimes: 1
        }
        $.ajax({
            type: 'POST',
            url: '/vocabulary/training/pick',
            data: data
        });
    }

    assignFunctionForImageWithName('show', toggleVisible);
    assignFunctionForImageWithName('dictionary', checkWordValue);
    assignFunctionForImageWithName('update', showUdateInput);
    assignFunctionForButtonWithName('cancel', hideUnderInput);
    assignFunctionForButtonWithName('save', updateTranslation);
    assignFunctionForImageWithName('delete', deleteWord);
    assignFunctionForImageWithName('correct', correct);
    assignFunctionForImageWithName('incorrect', incorrect);
});