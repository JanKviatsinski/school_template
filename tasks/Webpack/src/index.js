import './style.css'
import webpackImg from '../public/img/logo.png'

console.log('aaaaaa')
const img = document.createElement('img')
img.url = webpackImg
img.style.width = `${100}px`
img.style.height = `${100}px`
const a = document.querySelector('.a')
a.append(img)
