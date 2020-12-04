

$(document).ready(function() {

    $( function() {
        $( "#datepicker" ).datepicker();
    } );


    $('form').on('submit', function(e){
        let ifAllZeros = true;

        e.preventDefault();
        let str = $('form').serializeArray();

        let indexed_array = {};

        $.map(str, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        indexed_array.date = $("#datepicker").datepicker( 'getDate' );

        console.log(indexed_array);
        window.location.href = "../confirmation.html";

        if(ifAllZeros) {
            alert('DID not enter anything to submit');
        }
        else {
            $.ajax({
                type: "POST",
                url: "/api/orders",
                data: indexed_array,
                success: function(data, textStatus, jqXHR)
                {
                    console.log(jqXHR);
                    window.location.href = "../confirmation.html";
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Status: " + textStatus); alert("Error: " + errorThrown);
                }
            })
        }

    });
});


