
$(document).ready(function() {

    $('form').on('submit', function(e){
        let ifAllZeros = true;

        e.preventDefault();
        let str = $('form').serializeArray();

        let indexed_array = {};

        $.map(str, function(n, i){
            indexed_array[n['name']] = n['value'];
        });

        indexed_array.date = $("#datepicker").datepicker( 'getDate' );

        Object.keys(indexed_array).map(function(key, index) {
            if (indexed_array[key] != "" || indexed_array[key] != 0) {
                ifAllZeros = false;
            }
        });
        console.log(indexed_array);

            // if(ifAllZeros) {
            //     alert('DID not enter anything to submit');
            // }
            // else {
            //     $.ajax({
            //         type: "POST",
            //         url: "/api/orders",
            //         data: indexed_array,
            //         success: function(data, textStatus, jqXHR)
            //         {
            //             console.log(jqXHR);
            //         },
            //     })
            // }

    });
  });


function Services(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}