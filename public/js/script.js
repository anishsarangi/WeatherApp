console.log('client side script loaded');

const weatherForm=document.querySelector('form');
const searchElement=document.querySelector('input');
const messageOne=document.querySelector('#message-one');
const messageTwo=document.querySelector('#message-two');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=searchElement.value;
    fetch('http://localhost:5000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error;
        }else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecastData;
        }
    })
})
})