window.onload = function () {

    fetch(`https://mars-weather-rems.netlify.app/rems.json`)
        // headers: {
        //   'Accept'        : 'application/json',
        //   'Content-Type'  : 'application/json'
        // },


        .then(res => res.json())
        .then(data => {

            let caja_day_info = document.getElementById("rems_day_info"); // DAY INFO
            let caja_air_temp = document.getElementById("rems_air_temp"); // AIR TEMPERATURE
            let caja_ground_temp = document.getElementById("rems_ground_temp"); // GROUND TEMPERATURE
            let caja_day_variables = document.getElementById("rems_secondary_info"); // SECONDARY INFO
            let background_variable = document.querySelector(".app")


            let min_air_temp = parseFloat(data.weather_report.magnitudes[0].min_temp);  // CURRENT TEMPERATURES
            let max_air_temp = parseFloat(data.weather_report.magnitudes[0].max_temp);
            let min_ground_temp = parseFloat(data.weather_report.magnitudes[0].min_gts_temp);
            let max_ground_temp = parseFloat(data.weather_report.magnitudes[0].max_gts_temp);

            let current_air_temp = Math.floor((min_air_temp + max_air_temp) / 2);
            let current_ground_temp = Math.floor((min_ground_temp + max_ground_temp) / 2);


            //SECONDARY INFO
            let item_day_variables = `
            
            <header class="buddy_header">
                <div class="day_status" >
                <h1 class="day">
                            Sun ${data.weather_report.sol}
                        </h1>
                        <h2 class="weather_status">
                        ${data.weather_report.magnitudes[0].atmo_opacity}
    
                        </h2>
                        <div class="weather_icon">
                            <img id="weather_icon_id" src="./assets/img/icon-sunny.png" alt="weather icon">
                        </div>
                </div>
                <div class="close_button">
                    <a href="./index.html">
                        <div class="iconify" data-inline="false" data-icon="akar-icons:cross"></div>
                    </a>
                </div>

            </header>
            <div class="buddy_main_container">
                <main class="buddy_main">
                    <div class="dialy_info">
                        <div class="main_info">
                            <p class="did_you_know">
                                Did you know that...
                            </p>
                            <h1 class="info_title">
                                Mars has the largest dust storms in the solar system
                            </h1>
                            <p class="info_content">
                                They can last for months and cover the entire planet. The seasons are extreme because
                                its
                                elliptical (oval-shaped) orbital path around the Sun is more elongated than most other
                                planets in the solar system.
                            </p>
                        </div>
                        <div class="secondary_info">
                             <div class="wind_speed">
                                <div class="wind_speed_title">Wind speed</div>
                                <div class="wind_speed_data">130km/h</div>
                            </div>
                            <div class="air_pressure">
                                <div class="air_pressure_title">Air pressure</div>
                                <div class="air_pressure_data"> ${data.weather_report.magnitudes[0].pressure_string}</div>
                                </div>
                            <div class="solar_radiation">
                                <div class="solar_radiation_title">Solar Radiation</div>
                                <div class="solar_radiation_data"> ${data.weather_report.magnitudes[0].local_uv_irradiance_index}</div>
                                </div> 
                            

                        </div>
                        <div class="triangle"></div>
                        
                        <div class="buddy_illustration">
                            <img src="./assets/img/buddy-blue-27.png" alt="">
                        </div>
                    </div>

                </main> 
            </div>


                 `;
            caja_day_variables.innerHTML += item_day_variables;

            // CHANGE ICONS
            if (data.weather_report.magnitudes[0].atmo_opacity == `Sunny`) {
                document.getElementById("weather_icon_id").src = "./assets/img/icon-sunny.png";
            } else if (data.weather_report.magnitudes[0].atmo_opacity == `Windy`) {
                document.getElementById("weather_icon_id").src = "./assets/img/icon-windy.png";

            } else if (data.weather_report.magnitudes[0].atmo_opacity == `Cloudy`) {
                document.getElementById("weather_icon_id").src = "./assets/img/icon-cloudy.png";

            } else if (data.weather_report.magnitudes[0].atmo_opacity == `Sandstorms`) {
                document.getElementById("weather_icon_id").src = "./assets/img/icon-sandstorm.png";
            }

            // CHANGE BACKGROUND


            if (data.weather_report.magnitudes[0].atmo_opacity == `Sunny`) {
                background_variable.classList.toggle('sunny_background')
            } else if (data.weather_report.magnitudes[0].atmo_opacity == `Windy`) {
                background_variable.classList.toggle('windy_background')

            } else if (data.weather_report.magnitudes[0].atmo_opacity == `Cloudy`) {
                background_variable.classList.toggle('cloudy_background')

            } else if (data.weather_report.magnitudes[0].atmo_opacity == `Sandstorms`) {
                background_variable.classList.toggle('Sandstorm_background')
            }




        })
}
