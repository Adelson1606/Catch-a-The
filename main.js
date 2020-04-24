// const randWidth = Math.floor(Math.random() * 1000)
// const randHeigth = Math.floor(Math.random() * 800)
// const randColor = Math.floor(Math.random() * 999999)
let level = 0
let cleanTimer
const colors = ['#ee3e3e', '#3e52f0', '#ef3ef0', '#f0ed3e', '#1e945f']
const width = $('.main').width() - 100
const height = $('.main').height() - 100

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateFrog = function () {
  const $frog = $(`<div class='frog'><i class="fas fa-virus"></i></div>`)
  const randWidth = Math.floor(Math.random() * width)
  const randHeigth = Math.floor(Math.random() * height)
  const randColor = Math.floor(Math.random() * colors.length)
  const size = randomInteger(25, 82)

  $('.main').append($frog)

  $frog.css('font-size', `${size}px`)
  $frog.css("top", `${randHeigth}px`)
  $frog.css("left", `${randWidth}px`)
  $frog.css('color', `${colors[randColor]}`)

  return $frog
}


const timer = function () {
  let sec = level + 1
  const cc = () => {
    $('.secondsLeft').remove()
    $('.timer').append(`<p class="secondsLeft"> ${sec--} seconds left</p>`)
  }
  cc()
  // повторить с интервалом 1 секунды
  const timerId = setInterval(cc, 1000)
 
  // остановить вывод через 5 секунд
  const timeOutId = setTimeout(() => {
    clearInterval(timerId) 
    $('.secondsLeft').remove()
    $('.frog').remove()
    $('.timer').append(`<p class="secondsLeft"> Time out!</p>`)
    $('.main').append(`<div class="endGame">Game over!</div>`)
    $('.playBTN').remove()
    const $gametext = $(`<p class='playBTN'>Play Game!</p>`)
    $('.catch').append($gametext)

  }, ((level + 1) * 1000))


  return () => {
    clearTimeout(timeOutId)
    clearInterval(timerId) 
  }

}


/////////////////first click on play 
$('.catch').on('click', function () {
  $('.playBTN').remove()
  const $gametext = $(`<p class='playBTN'>Catch the corona!</p>`)
  $('.catch').append($gametext)
  $('.frog').remove()
  $('.endGame').remove()
 
  level = 0
  generateFrog()
  $('.frog').css('font-size', `82px`)
  $('.levelNmbr').remove()
  $('.level').append($(`<p class='levelNmbr'>Level: ${level + 1}</p>`))
  $('.frogsLeftCount').remove()
  $('.frogsLeft').append($(`<p class='frogsLeftCount'>Coronas Left: 1</p>`)) 
  ////reboot timer()
  cleanTimer = timer()
 
})

$('.main').on('click', '.frog', function () {
  $(this).remove() 
  $('.frogsLeftCount').remove()

  const $frogs = $('.frog')
  const frogCount = $frogs.length
  const shouldGoNextLevel = frogCount === 0 //true or false

  if (shouldGoNextLevel) {
    cleanTimer()
    level++
    
    if (level === 10) {
      $('.main').append(`<div class="endGame">Good game!</div>`)
      $('.secondsLeft').remove()
      $('.playBTN').remove()
      const $gametext = $(`<p class='playBTN'>Play Again!</p>`)
      $('.catch').append($gametext)
    } else {
      cleanTimer = timer()
      for (let i = 0; i < level + 1; i++) {
        generateFrog() 
   
      }
      
      $('.levelNmbr').remove()
      $('.level').append($(`<p class='levelNmbr'>Level: ${level + 1}</p>`))
      $('.frogsLeft').append($(`<p class='frogsLeftCount'>Coronas Left: ${$('.frog').length} </p>`))
    } 
  } else {
    $('.frogsLeft').append($(`<p class='frogsLeftCount'>Coronas Left: ${frogCount} </p>`))
  } 
})

