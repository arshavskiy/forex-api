function getForex(value, corrency) {
    var url = "https://forex.1forge.com/1.0.1/convert";
    url += '?' + $.param({
        'from': 'USD',
        'to': corrency,
        'quantity': value
    });
    return url;
}

function getCorency() {
    var url = 'https://forex.1forge.com/1.0.1/quotes?pairs=EURUSD,GBPJPY,AUDUSD';
    $.ajax({
        url: url,
    }).done(function (data) {
        for (var i = 0; i < data.length; i++) {
            buildTable(data[i].symbol, data[i]);
        }
    });
};

function getTime(time) {
    var d = new Date(time * 1000);
    return d.getHours() + '\"' + d.getMinutes() + '\"' + d.getSeconds();
}

function buildTable(tableName, d) {
    var price = d.price.toFixed(3);

    $(`#${tableName}`).text(d.symbol);
    $(`#time-${tableName}`).text(getTime(d.timestamp));
    $(`#price-${tableName}`).text(price).css("font-weight", "600");
    $(`#symbol-${tableName}`).text(d.symbol);
}


$('#form-submit').click(function (e) {
    e.preventDefault();

    var value = $('#f1').val();
    var corrency = $('#f2').val();

    $.get(getForex(value, corrency), function (data) {
        if (data.error) {
            showError();
        }

        $('#r1').val((data.value).toFixed(2));
    });
});

function showError() {

    $('<strong>', {
        text: "Please enter the corrent value",
    }).appendTo('#error').fadeIn().delay(2000).fadeOut();
}

$('#now-submit').click(function () {
    $('.jumbotron').toggle(200);
})


getCorency();
var myVar = setInterval(getCorency, 10000);