const apiKey = "ad8652e5e547d35b75900eeb0f868daa";
let city = "kampala"
const api = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
console.log(api);

fetch(api).then((res)=>res.json()).then((data)=>console.log(data));