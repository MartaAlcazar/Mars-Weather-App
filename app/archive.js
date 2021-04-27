
window.onload = function () {

    fetch(`https://mars-weather-rems.netlify.app/rems.json`)
        // headers: {
        //   'Accept'        : 'application/json',
        //   'Content-Type'  : 'application/json'
        // },


        .then(res => res.json())
        .then(data => {

            // changeOfWeather();

            let caja_day_info = document.getElementById("rems_day_info"); // DAY INFO
            let caja_air_temp = document.getElementById("rems_air_temp"); // AIR TEMPERATURE
            let caja_ground_temp = document.getElementById("rems_ground_temp"); // GROUND TEMPERATURE
            let caja_day_variables = document.getElementById("rems_secondary_info"); // SECONDARY INFO
            let background_variable = document.querySelector(".app");

            let min_air_temp = parseFloat(data.weather_report.magnitudes[0].min_temp);  // CURRENT TEMPERATURES
            let max_air_temp = parseFloat(data.weather_report.magnitudes[0].max_temp);
            let min_ground_temp = parseFloat(data.weather_report.magnitudes[0].min_gts_temp);
            let max_ground_temp = parseFloat(data.weather_report.magnitudes[0].max_gts_temp);

            let current_air_temp = Math.floor((min_air_temp + max_air_temp) / 2);
            let current_ground_temp = Math.floor((min_ground_temp + max_ground_temp) / 2);





            // // DAY INFO
            // let item_day_info = `
            //         <h1 class="day">
            //             Sun ${data.weather_report.sol}
            //         </h1>
            //         <h2 class="weather_status">
            //         ${data.weather_report.magnitudes[0].atmo_opacity}

            //         </h2>
            //         `;
            // caja_day_info.innerHTML += item_day_info;


            // // AIR TEMPERATURE
            // let item_air_temp = `
            //         <div class="range_air_temperature">
            //             Air: ${data.weather_report.magnitudes[0].min_temp}º |  ${data.weather_report.magnitudes[0].max_temp}º
            //         </div>
            //         <div class="current_air_temperature">
            //         ${current_air_temp}º
            //         </div>`;
            // caja_air_temp.innerHTML += item_air_temp;


            // // GROUND TEMPERATURE
            // let item_ground_temp = `
            //         <div class="range_ground_temperature">
            //             Ground: ${data.weather_report.magnitudes[0].min_gts_temp}º |  ${data.weather_report.magnitudes[0].max_gts_temp}º
            //         </div>
            //         <div class="current_ground_temperature">
            //             ${current_ground_temp}º
            //         </div>`;
            // caja_ground_temp.innerHTML += item_ground_temp;



            // // CHANGE ICONS

            // if (data.weather_report.magnitudes[0].atmo_opacity == `Sunny`) {
            //     document.getElementById("weather_icon_id").src = "./assets/img/icon-sunny.png";
            // } else if (data.weather_report.magnitudes[0].atmo_opacity == `Windy`) {
            //     document.getElementById("weather_icon_id").src = "./assets/img/icon-windy.png";

            // } else if (data.weather_report.magnitudes[0].atmo_opacity == `Cloudy`) {
            //     document.getElementById("weather_icon_id").src = "./assets/img/icon-cloudy.png";

            // } else if (data.weather_report.magnitudes[0].atmo_opacity == `Sandstorms`) {
            //     document.getElementById("weather_icon_id").src = "./assets/img/icon-sandstorm.png";
            // }

            // // CHANGE BACKGROUND


            // if (data.weather_report.magnitudes[0].atmo_opacity == `Sunny`) {
            //     background_variable.classList.toggle('sunny_background')
            // } else if (data.weather_report.magnitudes[0].atmo_opacity == `Windy`) {
            //     background_variable.classList.toggle('windy_background')

            // } else if (data.weather_report.magnitudes[0].atmo_opacity == `Cloudy`) {
            //     background_variable.classList.toggle('cloudy_background')

            // } else if (data.weather_report.magnitudes[0].atmo_opacity == `Sandstorms`) {
            //     background_variable.classList.toggle('Sandstorm_background')
            // }


            // function saveAlert() {


            //     let savedAlert = document.getElementById('alert_container_id');
            //     let saveButton = document.getElementById('save_button_id');
            //     let saveIcon = document.getElementById('save_button_id');
            //     let checkIcon = document.getElementById('check_button_id')

            //     saveButton.addEventListener('click', () => {
            //         savedAlert.classList.toggle('hidden_alert');
            //         savedAlert.classList.toggle('animate__animated');
            //         savedAlert.classList.toggle('animate__fadeIn');
            //         saveIcon.classList.toggle('hidden_save')
            //         checkIcon.classList.remove('hidden_save')


            //         setTimeout(() => {

            //             savedAlert.classList.toggle('animate__fadeOut');
            //             setTimeout(() => {
            //                 savedAlert.classList.add('hidden_alert');

            //             }, 600);
            //         }, 1000);

            //     });
            // }


            // GUARDADO DE DATOS

            // let saveButton = document.getElementById('save_button_id');

            // let savedMeasurements = [];

            // let todaysData = {
            //     title: "hola",
            //     sol: data.weather_report.sol,
            //     luna: data.weather_report.sol,
            //     lol: data.weather_report.sol,
            // };

            // let savedData = todaysData => {

            //     savedMeasurements.push(todaysData);
            //     localStorage.setItem('savedMeasurements', JSON.stringify(savedMeasurements));

            // }


            // saveButton.addEventListener('click', () => {
            // let todaysData = {
            //     // sol: document.querySelector('.sol_count').innerText,
            //     sol: data.weather_report.sol,



            // };

            // savedData(todaysData);
            // saveAlert();
            // });

            // savedMeasurements = JSON.parse(localStorage.getItem('savedMeasurements'));

            // console.log(savedMeasurements);

            const { savedMeasurements } = require('/main.js'); 

            if (savedMeasurements.length >= 1) {
                let cajadatos = document.getElementById("empty");
                let cajainfo = `
                ${savedMeasurements[0].sol}
                `;
                cajadatos.innerHTML += cajainfo;


            } else {
                console.log('chao')
            }

        })
}



function saveAlert() {


    let savedAlert = document.getElementById('alert_container_id');
    // let saveButton = document.getElementById('save_button_id');
    let saveIcon = document.getElementById('save_button_id');
    let checkIcon = document.getElementById('check_button_id')

    savedAlert.classList.toggle('hidden_alert');
    savedAlert.classList.toggle('animate__animated');
    savedAlert.classList.toggle('animate__fadeIn');
    saveIcon.classList.toggle('hidden_save')
    checkIcon.classList.remove('hidden_save')


    setTimeout(() => {

        savedAlert.classList.toggle('animate__fadeOut');
        setTimeout(() => {
            savedAlert.classList.add('hidden_alert');

        }, 600);
    }, 1000);

}




