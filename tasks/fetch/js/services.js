const ACCESS_KEY = '24597c5583052d171345f884c0b2a3ab'

export async function getWeather(city, country) {
  const URL_GET_WEATHER = `http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${city},${country}`

  try {
    const responseGetWeather = await fetch(URL_GET_WEATHER)
    const dataWeather = await responseGetWeather.json()

    if (dataWeather?.error?.code === 105) {
      throw new Error('Превышено количество запросов, попробуйте еще раз через минуту.')
    }

    if (dataWeather?.error?.code > 600) {
      throw new Error('Не удалось найти такого населенного пункта.')
    }

    if (dataWeather?.error) {
      throw new Error('Упс, что-то пошло не так.')
    }

    if (dataWeather.location.name !== city) {
      throw new Error('Не удалось найти такого населенного пункта.')
    }
    return { dataWeather, error: false }
  } catch (e) {
    alert(e)
    console.error(e)
    return { dataWeather: null, error: true }
  }
}
