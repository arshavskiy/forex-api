(function () {


    function loader() {
        $('#loader-container', {
            html: $('<div>', {
                class: 'loader',
                id: 'loader-2',
                html: $('<span>'),
            }).appendTo('#loader-container'),
        }).prependTo('body');
        $('<span>').appendTo('#loader-2');
    }

    function getForex(value, currency) {
        var currencyVld = (val) => val.split("/");
        var url = "https://forex.1forge.com/1.0.1/convert";
        url += '?' + $.param({
            'from': currencyVld(currency)[0],
            'to': currencyVld(currency)[1],
            'quantity': value,
            'api_key': 'bdaRvuzmDNy8pOUQjbiXz5GN87CkiSCY'
        });
        return url;
    }


    function getCorency() {
        var url = 'https://forex.1forge.com/1.0.1/quotes?pairs=EURUSD,GBPJPY,AUDUSD&api_key=bdaRvuzmDNy8pOUQjbiXz5GN87CkiSCY';
        $.ajax({
            url: url,
        }).done(function (data) {

            (function stopLoader() {
                $('#loader-container').hide();
                $('main').show(300);
            }());

            for (var i = 0; i < data.length; i++) {
                buildTable(data[i].symbol, data[i]);
            }
        });
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
        var currency = $('#f2').val();

        if (value) {
            $.get(getForex(value, currency), function (data) {
                if (data.error) {
                    showError();
                }
                $('#r1').val((data.value).toFixed(2));
            });
        } else showError();
    });

    var showError = () => {
        $('#r1').val("Please enter the corrent value").fadeIn();
        setTimeout(function () {
            $('#r1').val("");
        }, 2000);
    }

    $('#now-submit').click(function () {
        $('.jumbotron').toggle(200);
    });


    $('main').hide();
    loader();
    getCorency();

}());