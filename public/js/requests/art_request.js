

$(document).ready(function() {

    $( function() {
        $( "#datepicker" ).datepicker();
    } );


    $('#form').on('submit', function(e){
        let ifAllZeros = true;

        e.preventDefault();
        let str = $('#form').serializeArray();

        let indexed_array = {};

        $.map(str, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        indexed_array.date = $("#datepicker").datepicker( 'getDate' );

         console.log(indexed_array);


            $.ajax({
                type: "POST",
                url: "/api/orders/art",
                data: indexed_array,
                success: function(data, textStatus, jqXHR)
                {
                    console.log(jqXHR);
                    window.location.href = "../confirmation.html";
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status == 301) {
                        window.location.href = "../confirmation.html";
                    }
                    else if ( XMLHttpRequest.status >= 400) {
                        alert("Error On Our End, Please Try Again later");
                    }
                }
            })


    });
});


