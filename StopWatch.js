const number1 = document.getElementById('dodo1')
const number2 = document.getElementById('dodo2')
const number3 = document.getElementById('dodo3')
const startbutton = document.getElementById('Startbutton')
const stopbutton = document.getElementById('stopbutton')
const resetbutton = document.getElementById('resetbutton')
const insideContainer = document.getElementById('insideContainer')
const container = document.getElementById('container')
const heading = document.getElementById('heading')

const apiKey = 'ze7-2-uhfXlvZs6BozuhZuNtHSIj2XulvUqJOeplkPo';
const apiUrl = 'https://api.unsplash.com/photos/random';


let num1 = 0;
let num2 = 1;
let num3 = 0;
let justANumber = 100;
const setTimeoutNum = 10;
let timeout;
let imageIndex = 0;
let ifImageLoopNum = 0;
let ifImageLoopNumCounttimeout;



stopbutton.style.display = 'none'
resetbutton.style.display = 'none'

// main function of stopwatch
function stopwatch(){
  milliseconds();
  seconds(); 
  minute();
  ifImageLoop()
}

// functions for minutes,seconds and milliseconds
function minute(){
  if(num2 == 60){
    num3 = 0;
    num2 = 1;
    justANumber = 100;
    num1++
    num1display()
    clearTimeout(timeout);
    stopwatch();
  }
  
}

function seconds(){
  if(num3 == justANumber/num2){
    if(num2<10){
      number2.innerHTML = `0${num2}`;
    }else{
      number2.innerHTML = num2;
    }
    num2++
    justANumber = justANumber+100;
    num3 = 0;
  }
}

function milliseconds(){
  if(num3 < 100){
    num3++
    num3display()
    clearTimeout(timeout);
    timeout = setTimeout(stopwatch, setTimeoutNum);
  }
}

// function for start button
function startStopwatch(){
  startbutton.style.display ='none'
  stopbutton.style.display = 'block'
  resetbutton.style.display = 'block'
  stopwatch()
  ifImageLoopNumCount()
}

// function for stop button
function stopSopwatch(){
  clearTimeout(timeout)
  startbutton.style.display ='block'
  stopbutton.style.display = 'none'
}

// function for reset button
function resetstopwatch(){
  num1 = 0;
  num2 = 1;
  num3 = 0;
  justANumber = 100;
  imageIndex = 0;
  ifImageLoopNum = 0;

  num1display()
  num2display()
  num3display()
  clearTimeout(ifImageLoopNumCounttimeout)
  resetbutton.style.display ='none'
}

// function for stopwatch number display
function num1display(){
  if(num1<10){
    number1.innerHTML = `0${num1}`;
  }else{
    number1.innerHTML = num1;
  }
}
function num2display(){
  if(num2<10){
    number2.innerHTML = `0${0}`;
  }else{
    number2.innerHTML = num2;
  }
}
function num3display(){
  if(num3<10){
    number3.innerHTML = `0${num3}`;
  }else{
    number3.innerHTML = num3;
  } 
}

// function for fetching image url and displaying images
function fetchurl(){
  const url = `${apiUrl}?client_id=${apiKey}`;
    
    fetch(url, {
      headers:{
        'Authorization': `Client-ID ${apiKey}`
      }
    })

    .then(response => {
      if(!response.ok){
        throw new Error('network response was not ok');
      }
      return response.json();
    })
    .then(data =>{
        let imageSrc = data.urls.regular;
        insideContainer.style.backgroundImage = `url(${imageSrc})`
        container.style.backgroundImage = `url(${imageSrc})`      
    })
    .catch(error => console.error('Error fetching data', error));
}
  
//function for looping throung images by fetching again and again
function ifImageLoop(){
  if(num2 % 10 == 1){
    if(imageIndex < ifImageLoopNum ){

      fetchurl()
      heading.style.color = 'black'
      
      imageIndex++
      if(imageIndex === 2){
        heading.style.color = 'white'
      }
      if(imageIndex === 3){
        imageIndex = 0;
        ifImageLoopNum = 0;
      }
    }
  }
}

// function for incrementing ifImageloopNum with 10 seconds timeintervel
function ifImageLoopNumCount(){
  ifImageLoopNumCounttimeout = setTimeout(ifImageLoopNumCount,10000)
  ifImageLoopNum++
}

// all button event listeners
startbutton.addEventListener('click', startStopwatch)
stopbutton.addEventListener('click', stopSopwatch)
resetbutton.addEventListener('click', resetstopwatch)
