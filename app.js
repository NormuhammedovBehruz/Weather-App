const searchForm = document.querySelector('.search-form')
const search = document.querySelector('.search')
const cityName = document.querySelector('.city-name')
const currentDegree = document.querySelector('.current-degree')
const currentWeather = document.querySelector('.current-weather')
const min = document.querySelector('.min')
const max = document.querySelector('.max')
const owerlay = document.querySelector('.owerlay')

const api = {
    key: '467143a2e9e1de3de89328bf80dd0625',
    base: 'https://api.openweathermap.org/data/2.5/',
}

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nameCity = search.value
    owerlay.classList.remove('hidden')
    try {
        const fetchData = await fetch(`${api.base}weather?q=${nameCity}&units=metric&appid=${api.key}`)
        if (!fetchData.ok) {
            throw new Error(fetchData.statusText)
        }
        const data = await fetchData.json()
        getWeather(data)
        owerlay.classList.add('hidden')
    } catch (err) {
        cityName.textContent = err.message
    }
    owerlay.classList.add('hidden') 
})

function getWeather(data) {
    const {name, sys, main, weather} = data
    cityName.textContent = `${name}, ${sys.country}`
    currentDegree.textContent = `${Math.round(main.temp)}℃`
    currentWeather.textContent = `${weather[0].main}`
    min.textContent = `${Math.round(main.temp_min)}℃`
    max.textContent = `${Math.round(main.temp_max)}℃`
    search.value = ''
}