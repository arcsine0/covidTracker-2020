$(document).ready(function() {
    console.log('ready!');

    // get live covid statistics using api
    (async () => {  // asynchronous arrow function to run along the code

        // request json data from api
        const statResponse = await fetch('https://api.covid19api.com/summary', {method: 'GET'});

        // get response status
        console.log(statResponse.status);

        // if fetch() failed due to status 400 errors (CORS, JSON TypeScript, etc), run:
        if (statResponse.status != 200) {
            alert('Failed to connect to API, please refresh');
        }

        // get response in json format
        const statCont = await statResponse.json();     // wait for response
        const jsonStat = JSON.stringify(statCont);
        const jsonStatData = JSON.parse(jsonStat);

        // data
        var deaths = jsonStatData.Global.TotalDeaths;
        var cases = jsonStatData.Global.TotalConfirmed;
        var recovered = jsonStatData.Global.TotalRecovered;
        var globalPercentage = (cases / 7778000000) * 100;  // 7.7bil aprrox global population
        var phil;

        // iteration through the Countries array in jsonStatData to get the country Philippines
        for (var i = 0; i <= 248; i++) {
            if (jsonStatData.Countries[i].Country == "Philippines") { phil = jsonStatData.Countries[i].TotalConfirmed; break;}
        }

        // replace 0 value to the data achieved
        $('#deaths').html(deaths.toLocaleString());
        $('#cases').html(cases.toLocaleString());
        $('#recovered').html(recovered.toLocaleString());
        $('#phil').html(phil.toLocaleString());
        $('#percent').html(globalPercentage.toLocaleString() + "%");
        
        // checking for output
        console.log(deaths, cases, recovered, phil);
        
    })();

});

