console.log('Client side is loaaded')





const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone=document.querySelector('#message-one')
const messagetwo=document.querySelector('#message-two')

weatherform.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value
  messageone.textContent = "..........Loading.........."
  messagetwo.textContent = ""


  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
    if(data.error){
      return messageone.textContent = data.error
    }
    messageone.textContent = data.location
    messagetwo.textContent = data.forecasts
    })
  })
  // console.log(location)
})
// console.log(weatherform)
