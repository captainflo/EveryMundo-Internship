// Disable form return for One way
    $(document).on("click","#exampleRadios2",function() {
        $('.return').prop('disabled', true);
    });
    $(document).on("click","#exampleRadios1",function() {
        $('.return').prop('disabled', false);
    });

    function initAutocomplete() {
        // Create the autocomplete object, restricting the search predictions to
        // geographical location types.
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete'), {types: ['geocode']});
    
        autocomplete = new google.maps.places.Autocomplete(
            document.getElementById('autocomplete2'), {types: ['geocode']});
      }

// Get all data from https://everymundointernship.herokuapp.com/popularRoutes/
    function infoFlight(){
        $("#showFlight").empty();
        var queryURL = 'https://everymundointernship.herokuapp.com/popularRoutes/WC95RP59BM57';
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(data){
            for(i=0; i < data.length; i++){
              $(".showFlight").append(`
              <div class="col-xs-12 col-md-4">
                <div class="card">
                    <img class="card-img-top" src="${data[i].routeCoverImage}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${data[i].destination} to ${data[i].origin}</h5>
                        <span>${data[i].departureDate}</span>
                        <p class="card-text">${data[i].fareClass}</p>
                        <div class="price float-right">
                            <p class="price-us">$${data[i].priceUSD}</p>
                            <p class="trip">${data[i].tripType}</p>
                        </div>  
                    </div>
                    <a href="#" class="float-none btn btn-primary">Go somewhere</a>    
                </div>
              </div>
              `); 
                    
            }
        });
    }
    infoFlight();

    function infosearch(){
        $(document).on("click",".flight-button",function(event) {
            event.preventDefault();
            var queryURL = 'https://everymundointernship.herokuapp.com/search/WC95RP59BM57';
            
            var departureDate = $(".depart").val()
            var returnDate = $(".return").val()
            
            var flight = {
                destination: $(".to").val(), 
                origin: $(".from").val(), 
                tripType: $('input[name=exampleRadios]:checked').val(), 
                departureDate: moment(departureDate).format("L"),
                returnDate: moment(returnDate).format("L"), 
                passengerCount: $('#exampleFormControlSelect1').find(":selected").index(),
                fareClass: $(".custom-select").val(), 
            }
            console.log(flight)

            $.ajax({
                url: queryURL,
                method: "POST",
                data: flight
            }).then(function(data){
                console.log(data);
                
            });
        });
    }
    infosearch();