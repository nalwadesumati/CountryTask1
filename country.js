const singlec = document.getElementById("countryrow");

function toggelSpineer(flag) {
    if (flag === true) {
        loader.classList.remove('d-none')
    } else {
        loader.classList.add('d-none')
    }
}


const param = new URLSearchParams(window.location.search);////URLSearchParams extracts parameters
console.log("URL params:", param);

const code = param.get("code");
console.log("country code:", code);

const countryurl = `https://restcountries.com/v3.1/alpha/${code}`;

const make = async (apiURL) => {

    try {
        toggelSpineer(true);
        let res = await fetch(apiURL);
        let data = await res.json();
        if (!res.ok) {
            let err = data.error || data.message || res.statusText
            throw new Error(err);
        }
        return data;
    }
    finally {
        toggelSpineer(true);

    }
}
async function fetchcountry() {
    try {
        toggelSpineer(true)
        let data = await make(countryurl);
        console.log(data);
        let c = data[0];
        singlec.innerHTML = `
        <div class="col-md-5 d-flex align-items-center justify-content-center">
            <img src="${c.flags.png}" class="img-fluid rounded" alt="${c.flags.alt}" title="Flag of ${c.name.common || c.name.official}">
        </div>

        <div class="col-md-7">
            <h3 class="mb-3">${c.name.common || c.name.official}</h3>

            <ul class="list-group">
                <li class="list-group-item"><strong>Official Name:</strong> ${c.name.official}</li>
                <li class="list-group-item"><strong>capital:</strong> ${c.capital}</li>
                <li class="list-group-item"><strong>Region:</strong> ${c.region}</li>
                <li class="list-group-item"><strong>Subregion:</strong> ${c.subregion}</li>
                <li class="list-group-item"><strong>Population:</strong> ${c.population}</li>
                <li class="list-group-item"><strong>Area:</strong> ${c.area} km²</li>
                <li class="list-group-item"><strong>currencies:</strong> 
                ${Object.values(c.currencies).map(cur => {
            return cur.name + cur.symbol
        }).join(', ')}</li>
                <li class="list-group-item"><strong>languages:</strong> ${Object.values(c.languages || {}).join(', ')}</li>

                <li class="list-group-item"><strong>Country Code:</strong> ${c.cca2}</li>
                 <li class="list-group-item">
                    <strong>Google Maps:</strong>
                    <a href="${c.maps.googleMaps}" target="_blank">Open</a>
                </li>
                <li class="list-group-item">
                    <strong>Borders:</strong>
                     ${c.borders ? c.borders.map(code => `<a href="country.html?code=${code}"> ${code} 
                            
                            </a>`).join(",") : "No Borders"
            }
                </li>

            </ul>
        </div>`;

    } catch (err) {
        console.log("Error:", err.message);
        singlec.innerHTML = `<p class="text-danger">Failed to load country data: ${err.message}</p>`;
    } finally {
        toggelSpineer(false)
    }
}
fetchcountry();

