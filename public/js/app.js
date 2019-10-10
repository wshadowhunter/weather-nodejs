// fetch('http://localhost:3000/weather?address=!')
// .then((data)=>{
//     if(data.error) console.log(data.error) 
//     else{
//         data.json().then(data=>{
//             console.log(data);
//         })
//     }
// })

async function fetchWeather(address){
    const data = await fetch(`/weather?address=${address}`)
    if(data.error) m1.textContent = data.error 
    else{
        const jsondata = await data.json();
        m1.textContent = jsondata.temperature + 'c' 
        m2.textContent = jsondata.precip
    }
}



const weatherform = document.querySelector('form')
const searchEle = document.querySelector('form input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')

weatherform.addEventListener('submit',(event)=>{
    const address = searchEle.value
    event.preventDefault();
    m1.textContent = "loading..."
    m2.textContent = ''

    fetchWeather(address)
})