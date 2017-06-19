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
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            buildTable(data[i].symbol, data[i]);
        }
    });
};

function buildTable(tableName, d) {
    $(`#${tableName}`).text(d.symbol);
    $(`#time-${tableName}`).text(getTime(d.timestamp));
    $(`#price-${tableName}`).text(d.price).css("font-weight", "600");
    $(`#symbol-${tableName}`).text(d.symbol);
}

function getTime(time) {
    var d = new Date(time * 1000);
    return "0" + d.getHours() + '\"' + d.getMinutes() + '\"' + d.getSeconds();
}

$('#form-submit').click(function (e) {
    e.preventDefault();

    var value = $('#f1').val();
    var corrency = $('#f2').val();

    $.get(getForex(value, corrency), function (data) {
        if (data.error) {
            console.log(data.error);
            showError();
        }

        $('#r1').val(data.value);
    });
});

$('#now-submit').click(function () {
    $('#main-table').toggle(300);
    getCorency();
    var myVar = setInterval(getCorency, 10000);
})


function showError() {

    $('<strong>', {
        text: "Please enter the corrent value",
    }).appendTo('#error').fadeIn().delay(2000).fadeOut();
}


// if click



// $('#EURUSD').text(data[0].symbol);
// $('#time-EURUSD').text(data[0].timestamp);
// $('#price-EURUSD').text(data[0].price);
// $('#symbol-EURUSD').text(data[0].symbol);

// $('#AUDUSD').text(data[0].symbol);
// $('#time-AUDUSD').text(data[0].timestamp);
// $('#price-AUDUSD').text(data[0].price);
// $('#symbol-AUDUSD').text(data[0].symbol);

// $('#GBPJPY').text(data[2].symbol);
// $('#time-GBPJPY').text(data[2].timestamp);
// $('#price-GBPJPY').text(data[2].price);
// $('#symbol-GBPJPY').text(data[2].symbol);