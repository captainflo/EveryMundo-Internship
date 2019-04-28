// Disable form return for One way
    $(document).on("click","#exampleRadios2",function() {
        $('.return').prop('disabled', true);
    });
    $(document).on("click","#exampleRadios1",function() {
        $('.return').prop('disabled', false);
    });

// Get all data from https://everymundointernship.herokuapp.com/popularRoutes/
    function infoFlight(){
        $(".showFlight").empty();
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
                        <h5 class="card-title"><span class="ori-${i}">${data[i].origin}</span> to <span class="des-${i}">${data[i].destination}<span/></h5>
                        <span class="date-${i}">${data[i].departureDate}</span>
                        <p class="card-text">${data[i].fareClass}</p>
                        <div class="price float-right">
                            <p class="price-us">$${data[i].priceUSD}</p>
                            <p class="type-'${i} trip">${data[i].tripType}</p>
                        </div>  
                    </div>
                    <a href="#" data-id="${i}" class="button-by-card float-none btn btn-primary">View Detail</a>    
                </div>
              </div>
              `); 
                    
            }
        });
    }
    infoFlight();

    function infoBycard(){
        $(document).on("click",".button-by-card",function(event) {
        event.preventDefault(); 
        queryUrl = 'https://cors-anywhere.herokuapp.com/';
        queryUrl += 'https://everymundointernship.herokuapp.com/search/WC95RP59BM57';
        
        var thisId = $(this).attr("data-id");

        flight = {
            destination: $('.des-' + thisId).text(),
            origin: $('.ori-' + thisId).text(),
            tripType: $('.type-' + thisId).text(),
            departureDate:  $('.date-' + thisId).text(),
            returnDate: "",
            passengerCount: 1
        };

        console.log(flight);
        $.ajax({
            url: queryUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify( flight ),
            dataType: 'json'
        }).done( data => {
            console.log( data );
            for(i=0; i < data.length; i++){
                $(".showFlight").empty();
                $(".showFlight").append(`
                <div class="col-xs-12 col-md-12">
                    <div class="card">
                        <img class="card-img" src="http://usatravelguru.com/wp-content/uploads/2016/05/usatravel-slidera3.jpg" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${data[i].origin} to ${data[i].destination}</h5>
                            <span>${data[i].departureDate}</span>
                            <p class="card-text">${data[i].fareClass}</p>
                            <p class="trip">${data[i].tripType}</p>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Departure Time</th>
                                        <th scope="col">Arrival Time</th>
                                        <th scope="col">Price USD</th>
                                    </tr>
                                </thead>
                                <tbody class="routes"></tbody>
                            </table>
                        </div>   
                    </div>
                </div>
                `);
                for (let j = 0; j < data[i].routes.length; j++) {
                    $(".routes").append(`
                    <tr>
                        <td>${data[i].routes[j].departureTime}</td>
                        <td>${data[i].routes[j].arrivalTime}</td>
                        <td id="price">$${data[i].routes[j].priceUSD}</td>
                    </tr>
                    `)
                } 
            }
       
        }).fail( err => {
            console.error( err );
            alert("There is no flight");
        });
        });
    }
    infoBycard();

    function infosearch(){
        $(document).on("click",".flight-button",function(event) {
            event.preventDefault();
            $(".showFlight").empty();

            queryUrl = 'https://cors-anywhere.herokuapp.com/';
            queryUrl += 'https://everymundointernship.herokuapp.com/search/WC95RP59BM57';
            
            var departureDate = $(".depart").val()
            var returnDate = $(".return").val()
            returnDate = moment(returnDate).format("L") || "";

            flight = {
               destination: $('.to').val().trim(),
               origin: $('.from').val().trim(),
               tripType: $('input[name=exampleRadios]:checked').val(),
               departureDate:  moment(departureDate).format("L"),
               returnDate: returnDate,
               passengerCount: $('#exampleFormControlSelect1').find(":selected").index()
            };

            console.log(flight);
            $.ajax({
             url: queryUrl,
             method: 'POST',
             contentType: 'application/json',
             data: JSON.stringify( flight ),
             dataType: 'json'
            }).done( data => {
               console.log( data );
                   for(i=0; i < data.length; i++){
                        $(".showFlight").append(`
                        <div class="col-xs-12 col-md-12">
                            <div class="card">
                                <img class="card-img" src="http://usatravelguru.com/wp-content/uploads/2016/05/usatravel-slidera3.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">${data[i].origin} to ${data[i].destination}</h5>
                                    <span>${data[i].departureDate}</span>
                                    <p class="card-text">${data[i].fareClass}</p>
                                    <p class="trip">${data[i].tripType}</p>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Departure Time</th>
                                                <th scope="col">Arrival Time</th>
                                                <th scope="col">Price USD</th>
                                            </tr>
                                        </thead>
                                        <tbody class="routes"></tbody>
                                    </table>
                                </div>   
                            </div>
                        </div>
                        `);
                        for (let j = 0; j < data[i].routes.length; j++) {
                            $(".routes").append(`
                            <tr>
                                <td>${data[i].routes[j].departureTime}</td>
                                <td>${data[i].routes[j].arrivalTime}</td>
                                <td id="price">$${data[i].routes[j].priceUSD}</td>
                            </tr>
                            `)
                        } 
                    }
           }).fail( err => {
               console.error( err );
               alert("There is no flight");
           });
        });
    }
    infosearch();

    

    
