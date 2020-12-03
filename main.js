// Foursquare API Info
const clientId = 'Z5LF2CSGKJL14JPWPXYIVGAYSDUTDEGLO1AN1L0D1MDJPDCE';
const clientSecret = 'NXL32JB4FU5LVBKQUDZEH5HSTVDLMBAICKT1NSIGYLRQKDFK';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '932c9d3facf439907b22af82f5395a57';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
const city = $input.val();
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;

try {
  const response = await fetch(urlToFetch);
  if (response.ok){
    const jsonResponse = await response.json();
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
    console.log(venues);
    return venues;
  }
}
  catch(error){
    console.log(error);
     }

  };


const getForecast = async () => {
  const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;

  try {
const response = await fetch(urlToFetch);
if (respone.ok){
  const jsonResponse = await response.json();
  return jsonResponse;

}
  }
  catch(error){
    console.log(error);
  }

};


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
const weatherContent = createWeatherHTML(day);
// let weatherContent = '<h2>' + weekDays[(new Date()).getDay()] + '</h2> <h2>Temperature: ' + ((day.main.temp - 273.15) * 9 / 5 + 32).toFixed(0) + '&deg;F</h2> <h2>Condition: ' + day.weather[0].description + '</h2> <img src="https://openweathermap.org/img/wn/' + day.weather[0].icon + '@2x.png">';
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)
