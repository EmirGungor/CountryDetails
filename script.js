document.getElementById("txtSearch").addEventListener("keydown", function(event) {
                if (event.key === "Enter") {
                    document.getElementById("btnSearch").click();
                }
            });

    document.querySelector("#btnSearch").addEventListener("click",()=>{
        let text = document.querySelector("#txtSearch").value;
        document.querySelector("#details").style.opacity =0;

        getCountry(text);
    });

    function getCountry(country) {
        fetch('https://restcountries.com/v3.1/name/' + country)
            .then((response) => {
                if(!response.ok)
                    throw new Error("ülke bulunamadı");
                return response.json()
            })
           
               
            .then((data) => {
                renderCountry(data[0]);
                const countries = data[0].borders;

                if(!countries)
                throw new Error("No neighboring countries.")
                return fetch('https://restcountries.com/v3.1/alpha?codes=' + countries.toString() )
            })
            .then(response => response.json())
          
            .then((data) => renderNeighbors(data))
            .catch(err => renderError(err));
            
               
        }


    function renderCountry(data){
        document.querySelector("#country-details").innerHTML=""
        document.querySelector("#neighbors").innerHTML=""
    
        let html = `
            <div class="col-4">
                <img src="${data.flags.png}" class="img-fluid">
            </div>
            <div class="col-8">
                <h3 class="card-title">${data.name.common}</h3>
                <hr>
                <div class="row">
                    <div class="col-4">Population:</div>
                    <div class="col-8">${(data.population /1000000).toFixed(1)}M</div>
                </div>
                <div class="row">
                    <div class="col-4">Language</div>
                    <div class="col-8">${Object.values(data.languages)}</div>
                </div>  
                <div class="row">
                    <div class="col-4">Capital:</div>
                    <div class="col-8">${data.capital}</div>
                </div>
                <div class="row">
                    <div class="col-4">Currency:</div>
                    <div class="col-8">${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</div>
                </div>
            </div>
               
        `;

            document.querySelector("#details").style.opacity =1;
            document.querySelector("#country-details").innerHTML = html
        }


    function renderNeighbors(data){
    let html = ""
    for (let country of data){
        html +=`
        <div class="col-2 mt-2">
            <div class="card">
                <img src="${country.flags.png}" class="card-img-top">
                <div class="card-body">
                    <h6 class="card-title">${country.name.common}</h6>
                </div>
            </div>    
        </div>`;
    

    }  
    document.querySelector("#neighbors").innerHTML= html;
    }


    function renderError(err){
        const html = `
            <div class="alert-danger">
                ${err.message}    
            </div>
        `;
            setTimeout(function()  {
                document.querySelector("#errors").innerHTML = ""
            }, 3000);
        document.querySelector("#errors").innerHTML = html
    }
