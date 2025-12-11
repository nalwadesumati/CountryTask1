const cl = console.log;
const countriesRow = document.getElementById("countriesRow")
const loader = document.getElementById("loader");
//https://restcountries.com/v3.1/all?fields=name,cca2,flags,region

const BASE_URL = `https://restcountries.com/v3.1/all`;


function toggleSpinner(flag) {
    if (flag === true) {
        loader.classList.remove("d-none");
    } else {
        loader.classList.add("d-none");
    }
}

function snackbar(title, icon) {
    Swal.fire({
        title: title,
        icon: icon,
        timer: 1500,

    });
}
(async function fetchAllCountries() {


    try {
        toggleSpinner(true);
        let COUNTRY_URL = `${BASE_URL}/?fields=name,cca2,flags,region`

        let res = await fetch(COUNTRY_URL, {
            method: "GET",
            body: null,

        })
        let Data = await res.json()

        if (!res.ok) {
            throw new Error(`Something went wrong!!!`)
        }

        Data.map(c => {
            const col = document.createElement('div')
            col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-3";

            col.innerHTML = `
       
            <div class="card h-100 countryCard shadow-sm" role="button">
                    <img src=${c.flags.svg} class="card-img-top" alt="${c.flags.alt}" title="${c.flags.alt}"loading="lazy"/>
                    <div class="card-body py-2">
                        <h5 class="card-title mb-1">${c.name.common || c.name.official}</h5>
                        <p class="card-text text-muted mb-0"></p>
                      
                        <small class="badge bg-primary text-white">code: ${c.cca2}</small>
                    </div>
                </div>`

            col.addEventListener("click", () => {
                window.location.href = `country.html?code=${c.cca2}`;
            })
            countriesRow.append(col)
        })

    } catch (err) {

        snackbar("Failed to load countries", "error");
    } finally {
        toggleSpinner(false);
    }
})()