
const main = document.querySelector('.main')
const logo = document.querySelector('.logo');
const search = document.querySelector('.seach');
const blockBtn = document.querySelector('.block-button');
//const body = document.querySelector('body');


// стартовая 
fetch('./JSON/city.list.json')
  .then(response => response.json())
  .then(json => {
    let ele = json.filter( i => i.country === 'UA')
    let sityName = ele.map(item => `${item.name} - ${item.id}`)
     sityZ = sityName.filter(i => i[0] === 'O')
    console.log(sityZ);

    })





mainWindow();
logo.addEventListener('click', () => mainWindow());
search.addEventListener('click', () => mainWindow());




// --------------------------main WINDOW-----------------------------------------
function mainWindow(){
  blockBtn.textContent = ''

main.textContent = ''//полная очистка main
main.classList.remove('main-current_weather'); //удаление класса для current текущей погоды
main.classList.remove('three-day-weather');

const cardDescription = document.createElement('div')
cardDescription.classList.add('card-main-sity');
cardDescription.textContent = 'Погода в городах Украины'
main.append(cardDescription);

const mainCard = document.createElement('div')
mainCard.classList.add('main-big-sity')
main.append(mainCard);

function fetchReqwest (id, lon, lat){
fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=1626dd61d3c09e3b285d1fb480246f3a&lang=ru`)
 .then(function(resp){return resp.json()})
 .then(function(data){
  //  console.log(data)
 const sityName = data.name;
 const temp = Math.round(data.main.temp-273)
 const descript = data.weather[0]['description']
 const icon =  `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
 mainCard.append(creatBigCity(sityName, temp, descript, icon, id, lon, lat)); 
})
}
 
fetchReqwest('703447', '38.76667', '48.01667');
fetchReqwest('706369', '38.76667', '48.01667');
fetchReqwest('689558', '38.76667', '48.01667');
fetchReqwest('698740', '38.76667', '48.01667');
fetchReqwest('702550', '38.76667', '48.01667');
fetchReqwest('706634', '38.76667', '48.01667');
fetchReqwest('702658', '38.76667', '48.01667');

main.append(inputSection());

searchButton();
//choiceCity();

}
// -------- обработка кнопки поиск -----------------
function searchButton(){
  const searchButton = document.querySelector('.searh-button');
  searchButton.addEventListener('click', (event) => {
    const inputCity = document.querySelector('#city-choice');
    const optionList = document.querySelector('#city-list');
    if (inputCity.value){
      for (i = 0; i <= optionList.children.length; i++){
        if (inputCity.value === optionList.children[i].value){
          cityId =  optionList.children[i].id
          console.log(cityId)
          break
        }
      }
  
    cityCurrentWeatherInfo(cityId, lon = 0, lat = 0)
    blockBtn.append(weatherDayButton()); //кпопки 3-5 дней-------------------------------------------------!!!!
    controlDayBtn(cityId, lon = 0, lat = 0)
  } else{
      console.log(inputCity.value);
      console.log(optionList);
    }
  });
  }
   
 
// ----------- END ---------------------------------


// ------------------------------END main WINDOW--------------------------------------

// <label for="city-choice">Поиск города:</label>
//   <input list="city-list" id="city-choice" name="city-choice" />
//   <datalist id="city-list">
//       <option value="Винницв">
//       <option value="Львов">
//       <option value="Киев">
//       <option value="Житомир">
//       <option value="Луцк">
//   </datalist>

// ---------------- input -------------------------
 function inputSection () {

  const inputBlock = document.createElement('section');
  inputBlock.classList = ('input-block');


  const cityLable = document.createElement('label');
  cityLable.setAttribute('for', 'city-choice');
  cityLable.textContent = 'Введите название города'
  
  const cityInput = document.createElement('input');
  cityInput.setAttribute('list', 'city-list');
  cityInput.id = 'city-choice'
  cityInput.setAttribute('name', 'city-choice');

  const cityList = document.createElement('datalist');
  cityList.id = 'city-list'

  // -- создание <option value=" .... ">
  function createOption(idCity, nameCity){
    option = document.createElement('option');
    option.id = idCity;
    option.setAttribute('value', nameCity)
    return option
  }
 // -- END
  cityList.append(createOption(703447, 'Киев'));
  cityList.append(createOption(706369, 'Хмельницкий'));
  cityList.append(createOption(689558, 'Винница'));
  cityList.append(createOption(698740, 'Одесса'));
  cityList.append(createOption(702550, 'Львов'));
  cityList.append(createOption(702569, 'Луцк'));
  cityList.append(createOption(702658, 'Луганск'));

  const searchBtn = document.createElement('button');
  searchBtn.classList = ('searh-button');
  
  inputBlock.append(cityLable);
  inputBlock.append(cityInput);
  inputBlock.append(cityList);
  inputBlock.append(searchBtn);

  
  return inputBlock
 }
// ------------ end input -------------------------

// --------Обработка INPUT --------------------
// function choiceCity (){
//   const inputCity = document.querySelector('#city-choice');
//   let cityId = 0;
//   inputCity.addEventListener('blur', (event) => {
//     const choicedCityName = event.target.value;
//     console.log(choicedCityName) 

//     const optionList = document.querySelector('#city-list');
    
//     for (i = 0; i <= optionList.children.length; i++){
//       if (choicedCityName === optionList.children[i].value){
//         cityId =  optionList.children[i].id
//         console.log(cityId)
//         break
//       }
//     }

//     cityCurrentWeatherInfo(cityId, lon = 0, lat = 0)
//     blockBtn.append(weatherDayButton()); //кпопки 3-5 дней-------------------------------------------------!!!!
//     controlDayBtn(cityId, lon = 0, lat = 0)
    
//   })
 
// }
// ----- END---------------

// функция создания карточек больших городов------------------

function creatBigCity(name, temp, descriptinon, icon, id, lon, lat){
  const card = document.createElement('div');
  card.classList.add('card');
  card.id = id;
  const cityName = document.createElement('p')
  const currentTemp = document.createElement('p')
  const weatherDescription = document.createElement('p')
  const weatherIcon = document.createElement('p')
  cityName.classList.add('card-sity-name')
  currentTemp.classList.add('card-current-temp')
  weatherDescription.classList.add('card-weather-description')
  weatherIcon.classList.add('card-weather-icon')
  card.append(cityName);
  card.append(currentTemp);
  card.append(weatherDescription);
  card.append(weatherIcon)
  cityName.innerHTML = name;
  currentTemp.innerHTML = `<span>${temp}</span> &#x2103` 
  weatherDescription.textContent = descriptinon
  weatherIcon.innerHTML = icon

  card.addEventListener('click', () => {
    cityCurrentWeatherInfo(id, lon, lat)
  }) //событие на каждую карточку по id 



  card.addEventListener('click', () => {

    blockBtn.append(weatherDayButton()); //кпопки 3-5 дней-------------------------------------------------!!!!
    controlDayBtn(id, lon, lat)
  }) //событие на каждую карточку по id 

 return card
}
//---------------------END --------------------


// -------------- создание кнопок 3-5 дней
function weatherDayButton(){
  const weatherDayBtn = document.createElement('section');
  weatherDayBtn.classList.add('weather-day-btn');
  
  const currentDay = document.createElement('div');
  currentDay.classList.add('weather-btn', 'current_day','active_btn' )
  currentDay.textContent = 'Текущая погода';

  const threeDay = document.createElement('div')
  threeDay.classList.add('weather-btn','three_day');
  threeDay.textContent = 'Прогноз на 3 дня';

  const fiveDay = document.createElement('div');
  fiveDay.classList.add('weather-btn','five_day');
  fiveDay.textContent = 'Прогноз на 5 дней';

  weatherDayBtn.append(currentDay);
  weatherDayBtn.append(threeDay);
  weatherDayBtn.append(fiveDay); 

  return weatherDayBtn
}

//----- функция обработки кнопок 3-5 дней-----------------------------------------
function controlDayBtn(id, lon, lat){
  const currentDay = document.querySelector('.current_day')
  const threeDay = document.querySelector('.three_day');
  const fiveDay = document.querySelector('.five_day');
  const weatherDayBtn = document.querySelector('.weather-day-btn');
 
  
  currentDay.addEventListener('click', () => {
    removeActive(weatherDayBtn)
    currentDay.classList.add('active_btn')
    cityCurrentWeatherInfo(id, lon, lat)
    
  })

  // ---------погода на 3 дня------------
  threeDay.addEventListener('click', () => {
    removeActive(weatherDayBtn)
    threeDay.classList.add('active_btn')

    main.textContent = ''


    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=1626dd61d3c09e3b285d1fb480246f3a&lang=ru`)
      .then(function(resp){return resp.json()})
      .then(function(data){
        console.log(data)

        // const weatherBlock = document.querySelector('.city-current-weather');
        //weatherBlock.textContent = ''

        //main.textContent = ''

        main.classList.remove('main-current_weather'); //удаление класса для current текущей погоды
        main.classList.add('three-day-weather');

        const cityName = document.createElement('p');
        cityName.classList.add('city-name');
        cityName.textContent = data.city.name;
        main.append(cityName);

        const cardWrapper = document.createElement('div');
        cardWrapper.classList.add('card-wrapper');
        main.append(cardWrapper);
                       
        for (let i = 0; i <= 23; i+=2){
          let date = data.list[i].dt_txt
          let temp = Math.round(data.list[i].main.temp - 273)
          let descript = data.list[i].weather[0].description
          let icon =  `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}@2x.png">`
          cardWrapper.append(creatCardThreeDay(date, temp, descript, icon));          
        }
           
    })
  })
//-------------погода на 5 дней---------------

  fiveDay.addEventListener('click', () => {
    removeActive(weatherDayBtn)
    fiveDay.classList.add('active_btn')

    main.textContent = ''

    fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&appid=1626dd61d3c09e3b285d1fb480246f3a&lang=ru`)
    .then(function(resp){return resp.json()})
    .then(function(data){


      // weatherBlock = document.querySelector('.city-current-weather');
      // weatherBlock.textContent = ''
      
      main.classList.remove('main-current_weather'); //удаление класса для current текущей погоды
      main.classList.add('three-day-weather');

      const cityName = document.createElement('p');
      cityName.classList.add('city-name');
      cityName.textContent = data.city.name;
      main.append(cityName);

      const cardWrapper = document.createElement('div');
      cardWrapper.classList.add('card-wrapper');
      main.append(cardWrapper);
                     
      for (let i = 1; i <= 36; i+=2){
        let date = data.list[i].dt_txt
        let temp = Math.round(data.list[i].main.temp - 273)
        let descript = data.list[i].weather[0].description
        let icon =  `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0]['icon']}@2x.png">`
        cardWrapper.append(creatCardThreeDay(date, temp, descript, icon));          
      }
         
  })
  })
}


//---- функция удаления активного стиля кнопок 3-5дней
function removeActive(btnSection){
  for (i = 0; i < btnSection.children.length; i++){
    btnSection.children[i].classList.remove('active_btn');
  }
  }

// -----------------кнопки END-------------------------



//---------------------функция сздания секций для прогноза 3-5 дней

function creatCardThreeDay(date, temp, descript, icon){
  const threeDayCard = document.createElement('div')
  threeDayCard.classList.add('three-day-card');
  const dateTime = document.createElement('p')
  dateTime.classList.add('date-time');
  dateTime.innerHTML = date
  threeDayCard.append(dateTime);

  const threeDayTemp = document.createElement('p');
  threeDayTemp.classList.add('three-day-temp');
  threeDayTemp.innerHTML = `<span>${temp}</span> &#x2103`
  threeDayCard.append(threeDayTemp);

  const threeDayDescription = document.createElement('p');
  threeDayDescription.classList.add('three-day-description')
  threeDayDescription.innerHTML = descript
  threeDayCard.append(threeDayDescription);

  const threeDayIcon = document.createElement('p');
  threeDayIcon.classList.add('three-day-icon');
  threeDayIcon.innerHTML = icon;
  threeDayCard.append(threeDayIcon);

  return threeDayCard
}


// -----------------------------curren WEATHER-----------------------------------------

function cityCurrentWeatherInfo(id, lon, lat){

    main.textContent = ''
    main.classList.remove('three-day-weather');
    main.classList.add('main-current_weather'); //переход на текущую погоду

   

    //main.append(weatherDayButton()); //кпопки 3-5 дней-------------------------------------------------!!!!
    //controlDayBtn(id, lon, lat)

  fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=1626dd61d3c09e3b285d1fb480246f3a&lang=ru`)
  .then(function(resp){return resp.json()})
  .then(function(data){
           
    const cityCurrentWeather = document.createElement('div'); //основной DIV
    cityCurrentWeather.classList.add('city-current-weather')
    main.append(cityCurrentWeather); 

    const currentDate =  document.createElement('div') // Дата
     currentDate.classList.add('current-date');
     currentDate.textContent = Date()
     cityCurrentWeather.append(currentDate);
     console.log(currentDate)

     const currentCityName = document.createElement('div') //Название города
     currentCityName.classList.add('current-sity-name');
     currentCityName.textContent = data.name
     cityCurrentWeather.append(currentCityName);

    const currentTemp = document.createElement('div'); // текущая температура
    currentTemp.classList.add('city-current-temp');
    currentTemp.innerHTML = `Температура воздуха <span>${Math.round(data.main.temp-273)}</span> &#x2103`
    cityCurrentWeather.append(currentTemp);

    
    const currentTempFeels_like = document.createElement('div');
    currentTempFeels_like.classList.add('city-current-feels_like');
    currentTempFeels_like.innerHTML = `Ощущается как <span>${Math.round(data.main.feels_like-273)}</span> &#x2103`
    cityCurrentWeather.append(currentTempFeels_like);

    const currentWeathrIcon = document.createElement('div')
    currentWeathrIcon.classList.add('current-weather-icon');
    currentWeathrIcon.innerHTML =  `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`
    cityCurrentWeather.append(currentWeathrIcon);

    const currentWeathrDescription = document.createElement('div')
    currentWeathrDescription.classList.add('current-weather-description');
    currentWeathrDescription.textContent = data.weather[0]['description']
    cityCurrentWeather.append(currentWeathrDescription)

    const minMaxTemp = document.createElement('div'); //мин макс температура
    minMaxTemp.classList.add('city-current-minmaxtemp');
    cityCurrentWeather.append(minMaxTemp);
    const minTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    minTemp.innerHTML = `Минимальная температура <span>${Math.round(data.main.temp_min-273)}</span>&#x2103`
    maxTemp.innerHTML = `Максимальная температура <span>${Math.round(data.main.temp_max-273)}</span>&#x2103`
    minMaxTemp.append(minTemp);
    minMaxTemp.append(maxTemp);

    const currentHumidity = document.createElement('div');
    currentHumidity.classList.add('current-humidity');
    currentHumidity.innerHTML = `Относительная влажность <span>${data.main.humidity}</span> %`
    cityCurrentWeather.append(currentHumidity);

    const currentWindSpeed = document.createElement('div');
    currentWindSpeed.classList.add('current-wind-speed');
    currentWindSpeed.innerHTML = `Скорость ветра <span>${Math.round(data.wind.speed)}</span> м/с`
    cityCurrentWeather.append(currentWindSpeed);

    const currentWindGust = document.createElement('div');
    currentWindGust.classList.add('current-wind-gust');
    if (Math.round(data.wind.gust)){
        currentWindGust.innerHTML = `Порывы ветра до <span>${Math.round(data.wind.gust)}</span> м/с`
    }else {
      currentWindGust.innerHTML = 'Без порывов ветра'
    }
    cityCurrentWeather.append(currentWindGust);
  })
}
// -----------------------------END curren WEATHER-----------------------------------------

