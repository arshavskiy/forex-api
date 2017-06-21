function getForex(value, corrency) {
    var url = "https://forex.1forge.com/1.0.1/convert";
    url += '?' + $.param({
        'from': correncyVld(corrency)[0],
        'to': correncyVld(corrency)[1],
        'quantity': value
    });
    return url;
}

function correncyVld(val) {
    return val.split("/");
}

function getCorency() {

    var url = 'https://forex.1forge.com/1.0.1/quotes?pairs=EURUSD,GBPJPY,AUDUSD';
    $.ajax({
        url: url,
    }).done(function (data) {

        done();

        for (var i = 0; i < data.length; i++) {
            buildTable(data[i].symbol, data[i]);
        }
    });
};

function done() {
    $('#loader-container').hide();
    $('main').show(300);
}

function getTime(time) {
    var d = new Date(time * 1000);
    return d.getHours() + '\:' + d.getMinutes() + '\:' + d.getSeconds();
}

function buildTable(tableName, d) {
    var price = d.price.toFixed(3);

    $(`#${tableName}`).text(d.symbol.slice(0, 3) + '/' + d.symbol.slice(3));
    $(`#time-${tableName}`).text(getTime(d.timestamp));
    $(`#price-${tableName}`).text(price).css("font-weight", "600");
    $(`#symbol-${tableName}`).text(d.symbol);
}


$('#form-submit').click(function (e) {
    e.preventDefault();

    var value = $('#f1').val();
    var corrency = $('#f2').val();

    if (value) {
        $.get(getForex(value, corrency), function (data) {
            if (data.error) {
                showError();
            }
            $('#r1').val((data.value).toFixed(2));
        });
    } else showError();
});

function showError() {
    $('#r1').val("Please enter the corrent value").fadeIn()
    setTimeout(function () {
        $('#r1').val("");
    }, 2000);

    // $('<strong>', {
    //     text: "Please enter the corrent value",
    // }).appendTo('#error').fadeIn().delay(2000).fadeOut();
}

$('#now-submit').click(function () {
    $('.jumbotron').toggle(200);
})

var init = (function () {
    $('main').hide();
    loader();
    getCorency();
})();

function loader() {
    $('#loader-container', {
        html: $('<div>', {
            class: 'loader',
            id: 'loader-2',
            html: $('<span>'),
        }).appendTo('#loader-container'),
    }).prependTo('body');
    $('<span>').appendTo('#loader-2');
    $('<span>').appendTo('#loader-2');
};