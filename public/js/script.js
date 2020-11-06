const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
    const url = '/weather?address=' + address
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = "Error : " + data.error
            } else {
                messageOne.textContent = "Location : " + data.location
                messageTwo.textContent = "Forecast : It is currently "
                    + data.response.temperature + " degrees. It feels like "
                    + data.response.feels_like_temperature + " degrees. There is "
                    + data.response.precipitation + "% chance of rain. Weather is "
                    + data.response.weather_description + " today."
            }
        })
    })
})