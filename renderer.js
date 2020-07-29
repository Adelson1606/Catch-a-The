function Renderer () {
  return {
    generateFrog,
    timer,
    nextLevel

  }
}

function generateFrog () {
  const $frog = $(`<div class='frog'><i class="fas fa-virus"></i></div>`)
  const randWidth = Math.floor(Math.random() * width)
  const randHeigth = Math.floor(Math.random() * height)
  const randColor = Math.floor(Math.random() * colors.length)
  const size = Math.max(20, randHeigth * 100 / height)
  
  $('.main').append($frog)
  
  $frog.css('font-size', `${size}px`)
  $frog.css("top", `${randHeigth - size}px`)
  $frog.css("left", `${Math.max(randWidth - 82, 82)}px`)
  $frog.css('color', `${colors[randColor]}`)
  
  return $frog

}


function timer () {
  let sec = level 
  const cc = () => {
    $('.secondsLeft').remove()
    $('.timer').append(`<p class="secondsLeft"> ${sec--} seconds left</p>`)
    $('.secondsLeft').css('color', sec < 3 ? 'red' : 'black')
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
  }, level * 1000)

  return () => {
    clearTimeout(timeOutId)
    clearInterval(timerId) 
  }

}

function nextLevel () {
  level++
  if (cleanTimer) {
    cleanTimer()
  }

  if (level === 10) {
    $('.main').append(`<div class="endGame">Good game!</div>`)
    $('.secondsLeft').remove()
    $('.playBTN').remove()
    const $gametext = $(`<p class='playBTN'>Play Again!</p>`)
    $('.catch').append($gametext)
  } else {
    cleanTimer = timer()
    $('.secondsLeft').css('color', 'yellow')
    for (let i = 1; i < level + 1; i++) {
      generateFrog() 
    }
    
    $('.levelNmbr').remove()
    $('.level').append($(`<p class='levelNmbr'>Level: ${level}</p>`))
    $('.frogsLeft').append($(`<p class='frogsLeftCount'>Coronas Left: ${$('.frog').length} </p>`))
  }
}