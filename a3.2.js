async function showWeather(plz) {
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;

    try {
        const response = await fetch(url)
        if (response.status !== 200) {
            console.error(response.status)
        }
        else {
            const data = await response.json()
            const currentWeather = data.currentWeather
            console.log(`Es ist in ${plz} genau ${currentWeather.temperature}° C`)
        }
    } catch (error) {
        console.error(error)
    }
}

showWeather(8001)
showWeather(8002)
showWeather(8003)