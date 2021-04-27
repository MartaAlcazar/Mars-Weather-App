
window.onload = function () {


    archive_overlay(); //ABRIR ARCHIVO


    fetch(`https://mars-weather-rems.netlify.app/rems.json`)



        .then(res => res.json())
        .then(data => {


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




            // DAY INFO
            let item_day_info = `
                    <h1 class="day">
                        Sun ${data.weather_report.sol}
                    </h1>
                    <h2 class="weather_status">
                    ${data.weather_report.magnitudes[0].atmo_opacity}

                    </h2>
                    `;
            caja_day_info.innerHTML += item_day_info;



            // AIR TEMPERATURE
            let item_air_temp = `
                    <div class="range_air_temperature">
                        Air: ${data.weather_report.magnitudes[0].min_temp}º |  ${data.weather_report.magnitudes[0].max_temp}º
                    </div>
                    <div class="current_air_temperature">
                    ${current_air_temp}º
                    </div>`;
            caja_air_temp.innerHTML += item_air_temp;



            // GROUND TEMPERATURE
            let item_ground_temp = `
                    <div class="range_ground_temperature">
                        Ground: ${data.weather_report.magnitudes[0].min_gts_temp}º |  ${data.weather_report.magnitudes[0].max_gts_temp}º
                    </div>
                    <div class="current_ground_temperature">
                        ${current_ground_temp}º
                    </div>`;
            caja_ground_temp.innerHTML += item_ground_temp;




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




            // GUARDADO DE DATOS
            let saveButton = document.getElementById('save_button_id');

            let savedMeasurements = new Array;


            console.log(savedMeasurements)

            saveButton.addEventListener('click', () => {

                let todaysDataSun =
                    data.weather_report.sol[0];

                let todaysDataAtmos = data.weather_report.magnitudes[0].atmo_opacity[0];
                let todaysDataAir = current_air_temp;
                let todaysDataGround = current_ground_temp;



                savedMeasurements.push(
                    todaysDataSun,
                    todaysDataAtmos,
                    todaysDataAir,
                    todaysDataGround);


                console.log(savedMeasurements);


                saveAlert();


                localStorage.setItem("savedMeasurements", JSON.stringify(savedMeasurements));
                paintData();

            });



            // 
            // 
            // PINTAR DATOS

            function paintData() {


                savedMeasurements = JSON.parse(localStorage.getItem('savedMeasurements'));

                let cajadatos = document.getElementById("todays_archive");

                let cajainfo = `
                <div class="archive_component">
                <div class="archive_data">
                <h1 class="archive_date">Sun ${savedMeasurements[0]}</h1>
                <div id="component_icon"><img class="archive_weather_status" src="./assets/img/icon-windy.png">
                </img></div>
                </div>
                <div class="archive_temperature">
                <p class="air_archive_temp">Air: ${savedMeasurements[2]}º</p>
                <p class="ground_archive_temp">Ground: ${savedMeasurements[3]}º</p>
                </div>
                <div class="deleteS">
                <span class="iconify " data-inline="false" data-icon="akar-icons:trash-can"></span>
                </div>
                        </div>

                `;
                cajadatos.innerHTML += cajainfo;


                // CAMBIAR ICONO DEL TIEMPO EN EL COMPONENTE GUARDADO
                let archived_data_icon = document.querySelector('.archive_weather_status');

                if (savedMeasurements[1] == `Sunny`) {
                    archived_data_icon.src = './assets/img/icon-sunny.png'
                } else if (savedMeasurements[1] == `Windy`) {
                    archived_data_icon.src = './assets/img/icon-windy.png'
                } else if (savedMeasurements[1] == `Cloudy`) {
                    archived_data_icon.src = './assets/img/icon-windy.png'
                } else if (savedMeasurements[1] == `Sandstorms`) {
                    archived_data_icon.src = './assets/img/icon-sandstorm.png'
                }


                // 
                // 
                //ALERTA BORRAR

                let delete_button = document.querySelector('.deleteS');
                let delete_alert = document.querySelector('.delete_alert_container');
                let yes_delete = document.querySelector('.delete_yes');
                let no_delete = document.querySelector('.delete_no');


                delete_button.addEventListener('click', () => {

                    delete_alert.classList.toggle('hidden_delete');

                });

                yes_delete.addEventListener('click', () => {
                    delete_day_record()
                    delete_alert.classList.add('hidden_delete');
                })

                no_delete.addEventListener('click', () => {
                    delete_alert.classList.toggle('hidden_delete');
                })



            }

            // 
            // 
            //BORRAR DIA
            function delete_day_record() {

                let cajadatos = document.getElementById("todays_archive");

                localStorage.removeItem("savedMeasurements");
                cajadatos.classList.add('day_record_hidden')


            }



        })
}

// 
// 
//SE HA GUARDADO

function saveAlert() {


    let savedAlert = document.getElementById('alert_container_id');
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

// 
// 
//ABRIR ARCHIVO

function archive_overlay() {


    let open_archive = document.getElementById('archive_button_id');
    let archive_overlay_container = document.querySelector('.archive_overlay');

    open_archive.addEventListener('click', () => {
        archive_overlay_container.classList.toggle('archive_container_hidden')
        deletePrevDaysF();


    });

    let close_button = document.querySelector('.close_button');

    close_button.addEventListener('click', () => {
        archive_overlay_container.classList.toggle('archive_container_hidden')

    });





}


function deletePrevDaysF() {

    let deletePrevDaysButton = document.querySelectorAll(".deleteP");

    let cajadatosPrev = document.querySelectorAll(".archivedContainer");
    let delete_alert = document.querySelector('.delete_alert_container');
    let yes_delete = document.querySelector('.delete_yes');
    let no_delete = document.querySelector('.delete_no');

    let cajadatosItem = document.querySelectorAll(".archive_component");

    // console.log(cajadatosPrev);
    console.log(cajadatosItem)
    // console.log(deletePrevDaysButton);


    for (let i = 0; i < cajadatosItem.length; i++) {

        deletePrevDaysButton[i].addEventListener('click', function () {
            console.log("me clickaste");

            delete_alert.classList.remove('hidden_delete');

            // deletePrevAlert();


            yes_delete.addEventListener('click', () => {
                cajadatosItem[i].classList.add('day_record_hidden');
                delete_alert.classList.add('hidden_delete');
            })

            no_delete.addEventListener('click', () => {
                delete_alert.classList.add('hidden_delete');
            })
        })




    };
}

