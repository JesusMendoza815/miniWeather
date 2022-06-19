const result = document.querySelector('.result');
const form = document.querySelector('.get-weather');
const nameCity = document.querySelector('#city');
const nameCountry = document.querySelector('#country');

const $body = document.querySelector('body');
const $container = document.querySelector('.result');
// const $template = document.querySelector('#template').content;
// const $fragment = document.createDocumentFragment();

window.addEventListener(`DOMContentLoaded`,async () => {

    form.addEventListener('submit', (e) => {
        e.preventDefault()
    
        if (nameCity.value === '' || nameCountry.value === '') {
            showError('Ambos campos son obligatorios');
            return; //detener ejecución cuando salga del if
        }
    
        callApi(nameCity.value, nameCountry.value)
    })

    function callApi(city, country) {
        const apiKey = 'b1f743fa27d5fbb8c2649c001939597f';
        const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;
    
        fetch(urlApi)
            .then(data => {
                return data.json();
            })
            .then((dataJSON) => {
                if (dataJSON.cod === '404') {
                    showError('Ciudad no encontrada');
                } else {
                    clearHTML()
                    showWeather(dataJSON);
                }
                // console.log(dataJSON);
            })
            .catch(err => {
                console.log(err);
            }) 
    }
    
    function showWeather(data) {
        const {name, main: {temp, temp_min, temp_max}, weather:[arr]} = data;

        $body.style.backgroundImage = "url('cloudy.jfif')";

        const degrees = kelvinToCentigrade(temp);
        const minDegrees = kelvinToCentigrade(temp_min);
        const maxDegrees = kelvinToCentigrade(temp_max);

        const h5 = document.createElement("h5");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const pMin = document.createElement("p");
        const pMax = document.createElement("p");

        h5.textContent = name;
        img.setAttribute("src", `https://openweathermap.org/img/wn/${arr.icon}@2x.png`)
        h2.textContent = `${degrees}°`;
        pMin.textContent = `Min: ${minDegrees}°`;
        pMax.textContent = `Max: ${maxDegrees}°`;

        $container.appendChild(h5);
        $container.appendChild(img);
        $container.appendChild(h2);
        $container.appendChild(pMin);
        $container.appendChild(pMax);
        
        // $template.querySelector("#cityName").textContent = name;
        // $template.querySelector('img').setAttribute('src', `https://openweathermap.org/img/wn/${arr.icon}@2x.png`)
        // $template.querySelector('#temp').textContent = `${degrees}°`;
        // $template.querySelector('#tempMin').textContent = `Min: ${minDegrees}°`;
        // $template.querySelector('#tempMax').textContent = `Max: ${maxDegrees}°`;

        // let $clon = document.importNode($template,true);

        // $fragment.appendChild($clon);
        // $container.appendChild($fragment);
    }

    function showError(message) {
        // console.log(message);
        const alert = document.createElement('p');
        alert.classList.add('alert-message');
        alert.innerHTML = message;
        form.appendChild(alert);
    
        setTimeout(() => {
            alert.remove();
        }, 2000);
    }

    function clearHTML() {
        result.innerHTML = '';        
    }

    function kelvinToCentigrade(temp) {
        return  parseInt(temp - 273.15)
    }
})