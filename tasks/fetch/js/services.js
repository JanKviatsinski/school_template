const ACCESS_KEY = '24597c5583052d171345f884c0b2a3ab'

export async function getWeather(city, country) {
  const URL_GET_WEATHER = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${city},${country}`

  try {
    const responseGetWeather = await fetch(URL_GET_WEATHER)
    const dataWeather = await responseGetWeather.json()

    if (dataWeather?.error?.code === 105) {
      alert('Превышено количество запросов, попробуйте еще раз через минуту.')
      return undefined
    }

    if (dataWeather?.error?.code > 600) {
      alert('Не удалось найти такого населенного пункта.')
      return undefined
    }

    if (dataWeather?.error) {
      alert('Упс, что-то пошло не так.')
      return undefined
    }

    if (dataWeather.location.name !== city) {
      alert('Не удалось найти такого населенного пункта.')
      return undefined
    }
    return dataWeather
  } catch (e) {
    alert(e)
    console.error(e)
    return undefined
  }
}
