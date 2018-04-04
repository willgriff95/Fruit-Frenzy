$(function(){
  const fruits =  ['banana', 'grapes', 'pear', 'peach', 'lemon', 'greenApple', 'redApple', 'orange', 'strawberry', 'raspberry', 'plumb', 'watermelon', 'pineapple', 'blueberry',
    'cherry'];

  // create a randomly generated 2-Dimensional array with integers----
  function createGround(width, height){
    var $result = [];
    for (var i = 0 ; i <= width; i++) {
      $result[i] = [];
      for (var j = 0; j <= height; j++) {
        $result[i][j] = Math.floor(Math.random() * 15) + 0;
      }
    }
    console.log($result);
    return $result;
  }

  // Create a new array with width = 10 cells & height = 9 cells------
  var $ground = createGround(8, 9);
  var $mapWrap = $('#board');

  function mapBuilder(){
    $.each($ground, function(i, line){
      $.each(line, (j, cell) => {
        buildCell(cell, i, j);
      });
    });
  }

  function buildCell(cell, i, j){
    var $elem = $(`<div class="basetile" id="cell_${i}_${j}" data-i='${i}' data-j='${j}'/>`);
    $elem.addClass(fruits[cell]);
    $elem.data('fruit', fruits[cell]);
    $mapWrap.append($elem);
    var $player1Score = $('.player1');

    $elem.click(function(){
      console.log(`the first fruit selected is a ${$elem.data('fruit')}`);
      if ($elem.hasClass(fruits[$fruitSelected]) === $speechBubbleFruit.hasClass(fruits[$fruitSelected])) {
        $player1Score.css('background', 'green');
        setTimeout(function(){
          $('#plus10').fadeIn(100);
        }, 0);
        setTimeout(function(){
          $('#plus10').fadeOut(100);
        }, 500);
        moveColumnDown(parseInt($(this).data('i')), parseInt($(this).data('j')));
        const $topColumn = $(`#cell_${0}_${j}`);
        console.log(`the fruit at the top of the column before new fruit added is a ${$topColumn.data('fruit')}`)
        var $randomNewFruit = fruits[Math.floor(Math.random() * 14) + 0];
        $topColumn.removeClass(fruits[cell]);
        $topColumn.addClass($randomNewFruit);
        console.log(`the random fruit generated to be put in at the top column is a ${$randomNewFruit}`);
        $topColumn.data('fruit', $randomNewFruit);
        $elem.removeClass(fruits[cell]);
      } else {
        $player1Score.css('background', 'red');
        setTimeout(function(){
          $('#minus10').fadeIn(100);
        }, 0);
        setTimeout(function(){
          $('#minus10').fadeOut(100);
        }, 500);
        console.log('-------new selection--------')
      }

      // if ($counter >= 180){
      //   $player1Score.css('width', '180px');
      // }
    });

  }
  mapBuilder();


  function moveColumnDown(i,j){
    for(let x = (i-1); x>= 0; x--){
      const $cell = $(`#cell_${x}_${j}`);
      const $emptyCell = $(`#cell_${(x+1)}_${j}`);
      console.log(`moving ${$cell.data('fruit')}(#cell_${x}_${j}) into #cell_${(x+1)}_${j}`)
      // console.log($emptyCell);
      // $emptyCell.addClass(fruits[$fruitSelected]);
      $cell.attr('class', 'basetile');
      $emptyCell.addClass($cell.data('fruit'));
      $emptyCell.data('fruit', $cell.data('fruit'));
      // console.log($cell.data('fruit'));
    }
  }

  function doSomething() {}

  (function loop() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
      doSomething();
      loop();
    }, rand);
  }());
  
  // Generate a random value from the 2-dimensional array
  function getRandomLine() {
    return Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  }
  function getRandomCell() {
    return Math.floor(Math.random() * (9 - 0 + 1)) + 0;
  }

  var $lineIndex = getRandomLine();
  var $cellIndex = getRandomCell();
  var $fruitSelected = $ground[$lineIndex][$cellIndex];
  var $speechBubbleFruit = $('.fruitSpeech');

  function displayFruit(){
    $speechBubbleFruit.addClass(fruits[$fruitSelected]);
    console.log(`the fruit that you have to collect is ${fruits[$fruitSelected]}`);
  }

  displayFruit();

// TIMED ANIMATIONS
  $(document).ready(function () {
    setTimeout(function(){
      $('#ready').fadeIn(100);
    }, 100);
    setTimeout(function(){
      $('#ready').fadeOut(100);
    }, 200);
    setTimeout(function(){
      $('#set').fadeIn(100);
    }, 300);
    setTimeout(function(){
      $('#set').fadeOut(100);
    }, 400);
    setTimeout(function(){
      $('#go').fadeIn(100);
    }, 500);
    setTimeout(function(){
      $('#go').fadeOut(100);
    }, 600);
    setTimeout(function(){
      $('.speechBubble').fadeIn(300);
    }, 400);
    setTimeout(function(){
      $('.fruitSpeech').fadeIn(100);
    }, 600);

// STOPWATCH
    setTimeout(function(){
      function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? '0' + minutes : minutes;
          seconds = seconds < 10 ? '0' + seconds : seconds;

          display.text(minutes + ':' + seconds);

          if (--timer < 0) {
            timer = duration;
          }
        }, 1000);
      }

      jQuery(function ($) {
        var oneMinute = 60 * 1,
          display = $('.countdown');
        startTimer(oneMinute, display);
      });
    }, 6000);
  });
});
