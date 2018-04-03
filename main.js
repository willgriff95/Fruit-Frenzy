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
    console.log($result)
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

  function shuffleColumn(column){
    //loop over column and move each element in column j one down
    $ground[j].each(function() {
      $(this).append('hello');
    });
  }

  function buildCell(cell, i, j){
    var $elem = $(`<div class="basetile" data-i='${i}' data-j='${j}'/>`);
    if (cell === 0){
      $mapWrap.append($elem.addClass('banana'));
    } if (cell === 1){
      $mapWrap.append($elem.addClass('grapes'));
    } if (cell === 2){
      $mapWrap.append($elem.addClass('pear'));
    }if (cell === 3){
      $mapWrap.append($elem.addClass('peach'));
    } if (cell === 4){
      $mapWrap.append($elem.addClass('lemon'));
    } if (cell === 5){
      $mapWrap.append($elem.addClass('greenApple'));
    } if (cell === 6){
      $mapWrap.append($elem.addClass('redApple'));
    }if (cell === 7){
      $mapWrap.append($elem.addClass('orange'));
    } if (cell === 8){
      $mapWrap.append($elem.addClass('strawberry'));
    } if (cell === 9){
      $mapWrap.append($elem.addClass('raspberry'));
    } if (cell === 10){
      $mapWrap.append($elem.addClass('plumb'));
    }if (cell === 11){
      $mapWrap.append($elem.addClass('watermelon'));
    } if (cell === 12){
      $mapWrap.append($elem.addClass('pineapple'));
    } if (cell === 13){
      $mapWrap.append($elem.addClass('blueberry'));
    }if (cell === 14){
      $mapWrap.append($elem.addClass('cherry'));
    }
    var $first = true;
    var $counter = 0;



    $elem.click(function(){
      $counter += 5;
      if (cell === $fruitSelected) {
        $first = false;
        $('.player1').css('width',`${$counter}`+'px');
        console.log(`<div class="basetile" data-i='${i}' data-j='${j}'/>`);
        $elem.removeClass(fruits[cell]);
        shuffleColumn(j);
      }
      if ($counter >= 180){
        $('.player1').css('width', '180px');
      }
      // else {
      //   console.log('bye');
      // }
    });

  }
  mapBuilder();

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
  }

  displayFruit();

  $(document).ready(function () {
    setTimeout(function(){
      $('#ready').fadeIn(100);
    }, 1000);
    setTimeout(function(){
      $('#ready').fadeOut(100);
    }, 2000);
    setTimeout(function(){
      $('#set').fadeIn(100);
    }, 3000);
    setTimeout(function(){
      $('#set').fadeOut(100);
    }, 4000);
    setTimeout(function(){
      $('#go').fadeIn(100);
    }, 5000);
    setTimeout(function(){
      $('#go').fadeOut(100);
    }, 6000);
    setTimeout(function(){
      $('.speechBubble').fadeIn(300);
    }, 4000);
    setTimeout(function(){
      $('.fruitSpeech').fadeIn(100);
    }, 6000);


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
