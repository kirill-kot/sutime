jQuery(document).ready(function($){

// phone mask init
    $("#phone").mask("+7 (999) 999-99-99");
    $("#phone2").mask("+7 (999) 999-99-99");

    var btnPlus = $('.num-plus');
    var btnMinus = $('.num-minus');
    var qty = $('#qty');
    var price = $('.price');
    var multiplier = parseInt($('.price').text().replace(/[^0-9]/gi, ''), 10);
    btnPlus.click(function(){
        qty.val( parseInt(qty.val()) + 1 );
        price.text( (qty.val() * multiplier) +' ₽' );

    });
    btnMinus.click(function(){
        if (qty.val() > 1 ) {
        qty.val( parseInt(qty.val()) - 1 );
        } else {
            qty.val(1);
        }
        price.text( (qty.val() * multiplier) +' ₽' );
    });

    $('#orderDetails').attr('readonly','readonly');
if($('.quantity').length){
    var orderName = $('.item .title').text().replace(/\s\s+/g, ' ');
    var orderConditions = $('.item .conditions').text().replace(/\s\s+/g, ' ');
    var orderQuantity = $('.item #qty').val();
    $('.orderToggle').on('click', function(){
        $('#orderDetails').val( orderName + ', ' + orderConditions + ' X ' +  orderQuantity + ' шт');
    });
}
    $("#sticker").sticky({topSpacing:0});

    $('#sidr-right').find('.collapsed').eq(1).attr('data-target','#submenu2');
    $('#sidr-right').find('ul#submenu').eq(1).attr('id','submenu2');

    ymaps.ready(init);

    function init () {
        var myMap = new ymaps.Map('yMapz', {
            center: [51.661535, 39.200287],
            zoom: 9,
            type: "yandex#hybrid"
        });

        $('.geo-link').on('click', function(){
        // Поиск координат центра
            $('#map h5').text( 'Воронеж, ' + $(this).text() );
            console.log( $(this).text() );
        ymaps.geocode('Воронеж, '+ $(this).text() +'', {
            results: 1
        }).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates(),
                bounds = firstGeoObject.properties.get('boundedBy');

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            myMap.geoObjects.add(firstGeoObject);
            myMap.setBounds(bounds, {
                checkZoomRange: true
            });
        });
        });
    }

    setTimeout(function(){
        $('#sidr-left').attr('style', '');
        $('#sidr-right').attr('style', '');
    }, 1000);

});