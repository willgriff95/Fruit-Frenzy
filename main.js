$(function(){
  // ------------------ARRAY WITH THE VARIABLES FOR THE CLASSES------------------
  const fruits =  ['banana', 'grapes', 'pear', 'peach', 'lemon', 'greenApple', 'redApple', 'orange', 'strawberry', 'raspberry', 'plumb', 'watermelon', 'pineapple', 'blueberry',
    'cherry'];
  // VARIABLES
  var $ground = createGround(8, 9);
  var $mapWrap = $('.center');
  let progWidth = 0;
  let progWidth2 = 0;
  var $result = [];
  const progress = document.querySelector('.progress');
  const progress2 = document.querySelector('.progress2');
  var alreadyPlayed = false;
  var alreadyPlayed2 = false;
  var timerPlayed = false;
  var oneMinute = 60 * 0.999, display = $('.countdown');
  var $lineIndex = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  var $cellIndex = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
  var $fruitSelected = $ground[$lineIndex][$cellIndex];
  var obj3 = document.createElement('audio');
  var obj = document.createElement('audio');
  var obj2 = document.createElement('audio');


  setTimeout(function(){
    startTimer();
  }, 5000);

  function failImage(){
    setTimeout(function(){
      $('#gameOver').show();
    }, 1000);
    setTimeout(function(){
      $('#gameOver').hide();
    }, 7000);
    setTimeout(function(){
      // location.reload();
    }, 8000);
  }
  function plus10Graphic(){
    setTimeout(function(){
      $('#plus10').show();
    }, 0);
    setTimeout(function(){
      $('#plus10').hide();
    }, 100);
  }

  function greenProgressBar(){
    setTimeout(function(){
      $('.progress2').css('background-color', '#339900');
    }, 0);
    setTimeout(function(){
      $('.progress2').css('background-color', '#ffcc00');
    }, 200);
  }

  function success(){
    setTimeout(function(){
      $('#success').show();
    }, 100);
    setTimeout(function(){
      $('#success').hide();
    }, 700);
  }

  function redProgressBar(){
    setTimeout(function(){
      $('.progress2').css('background-color', '#cc0000');
    }, 0);
    setTimeout(function(){
      $('.progress2').css('background-color', '#ffcc00');
    }, 200);
  }
  function minus10Graphic(){
    setTimeout(function(){
      $('#minus10').show();
    }, 0);
    setTimeout(function(){
      $('#minus10').hide();
    }, 100);
  }

  // -----------------------------STOPWATCH------------------------------------
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      display.text(minutes + ':' + seconds);

      // PLAY AUDIO CLIP
      timerPlayed = false;
      if (seconds === '00'){
        timerPlayed = false;
        return false;
      }
      if(progWidth >= 99 && timerPlayed === false){
        return false;
      }
      if (seconds === '00' && progWidth < 99 && timerPlayed === false){
        setTimeout(function(){
          $('.stopWatch').addClass('shake-hard');
        },100);
        setTimeout(function(){
          $('.stopWatch').removeClass('shake-hard');
        }, 700);
        failSound();
        failImage();
      }
      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }
  startTimer(oneMinute, display);



  // console.log($ground[0][2]);
  // ------------------------------AUDIO--------------------------------------

  function clickSound(){
    obj.src='./audio/pop.mp3';
    obj.volume=0.10;
    obj.autoPlay=false;
    obj.preLoad=true;
    obj.play();
  }

  function wrongSound(){
    obj2.src='./audio/wrong2.wav';
    obj2.volume=0.10;
    obj2.autoPlay=false;
    obj2.preLoad=true;
    obj2.play();
  }

  function failSound(){
    obj3.src='./audio/failed.mp3';
    obj3.volume=0.10;
    obj3.autoPlay=false;
    obj3.preLoad=true;
    obj3.play();
  }



  // ------------LOOP THAT RANDOMLY GENERATES A NEW FRUIT FOR SELECION-----------

  function loop() {
    if ( $('.basetile').hasClass(fruits[$fruitSelected]) !== $('.fruitSpeech').hasClass(fruits[$fruitSelected])){
      newFruitSpeechBubble();
    } else {
      return;
    }
  }

  // --------------------GENERATING THE NUMBERS FOR THE ARRAY--------------------

  function createGround(height, width){
    // EMPTY WIDTH ARRAY
    $result = [];
    // MAKING THE HEIGHT
    for (var i = 0 ; i <= height; i++) {
      // EMPTY HEIGHT ARRAY
      $result[i] = [];
      // MAKING THE WIDTH
      for (var j = 0; j <= width; j++) {
        $result[i][j] = Math.floor(Math.random() * 15) + 0;
      }
    }
    return $result;
  }

  // ----------------------BUILD THE 2 DIMENSIONAL ARRAY-------------------------

  function mapBuilder(){
    $.each($ground, function(i, line){
      $.each(line, (j, cell) => {
        buildCell(cell, i, j);
      });
    });
  }
  mapBuilder();

  // --------------------ADDING CLASSES TO THE 2D--------------------------------

  function buildCell(cell, i, j){
    var $elem = $(`<div class="basetile" id="cell_${i}_${j}" data-i='${i}' data-j='${j}'/>`);
    // ADDING 2-DIMENSIONAL ARRAY $ELEM TO THE DIV $MAPWRAP(BOARD DIV)
    $mapWrap.append($elem);
    // ADDING FRUIT CLASSES TO THE VALUES IN THE 2-DIMENSIONAL ARRAY IN THE BOARD
    $elem.addClass(fruits[cell]);
    $elem.data('fruit', fruits[cell]);

    // DECLARE VARIABLE ELEMENT AT THE TOP OF A COLUMN
    var $topColumn = null;

    // ---------------MAKING CONDITIONS IF A ELEMENT IS SELECTED----------------

    $elem.click(function(){
      // -----------------------------PLAYER 1-----------------------------------
      if($elem.hasClass(fruits[$fruitSelected]) === $('.fruitSpeech').hasClass(fruits[$fruitSelected]) && progWidth <= 99 && alreadyPlayed === false){
        clickSound();
        // ------WHEN CLICKED GIVE THE ELEMENT THE CLASS OF BASETILE ONLY--------
        $(this).attr('class', 'basetile').data('fruit', null);
        const columnData = [];
        const i = $(this).data('i');
        const j = $(this).data('j');
        // -------------MOVING THE ELEMENTS IN A COLUMN DOWN ONE CELL------------
        for(let index = (i-1); index >= 0; index--){
          columnData.push($(`#cell_${(index)}_${j}`).data('fruit'));
        }
        const columnDataReversed = columnData.reverse();
        columnDataReversed.unshift(null);
        $(columnDataReversed).each(function(index, fruit){
          console.log(index, fruit);
          $(`#cell_${(index)}_${j}`).data('fruit', fruit);
          $(`#cell_${(index)}_${j}`).attr('class', `basetile ${fruit}`);
        });

        // RANDOMLY GENERATE A FRUIT AT POSITION OF EMPTY CELL AT TOP OF COLUMN

        const fruitname = fruits[Math.floor(Math.random() * 15) + 0];
        $topColumn = $(`#cell_${0}_${j}`);
        $topColumn.data('fruit', fruitname);
        $topColumn.attr('class', `basetile ${fruitname}`);

        // -------------------INCREASE THE PROGRESSBAR WIDTH---------------------
        progWidth += 3;
        if (progWidth > 99) return false;
        progress.style.width = `${progWidth}%`;

        // ---------------ANIMATIONS FOR CORRECT FRUIT SELECTED------------------
        greenProgressBar();
        plus10Graphic();
        loop();

      } else if ($elem.hasClass(fruits[$fruitSelected]) !== $('.fruitSpeech').hasClass(fruits[$fruitSelected]) && progWidth <= 99 && alreadyPlayed === false) {

        // -------------------DECREASE THE PROGRESSBAR WIDTH---------------------
        progWidth -= 3;
        // if (progWidth > 100) return false;
        if (progWidth2 > 100) return false;
        progress.style.width = `${progWidth}%`;

        // ---------------ANIMATIONS FOR INCORRECT FRUIT SELECTED----------------
        wrongSound();
        redProgressBar();
        minus10Graphic();

      } else if (progWidth >= 99 && alreadyPlayed === false){
        console.log(`Player 1 scored ${progWidth}points in 60 seconds`);
        alreadyPlayed = true;
        success();
        // -----------------------------PLAYER 2-----------------------------------

      } else if (progWidth2 >= 99 && alreadyPlayed2 === false){
        console.log(`Player 2 scored ${progWidth2}points in 60 seconds`);
        alreadyPlayed2 = true;
        success();

      } else if ($elem.hasClass(fruits[$fruitSelected]) === $('.fruitSpeech').hasClass(fruits[$fruitSelected]) && alreadyPlayed2 === false){
        clickSound();

        // ------WHEN CLICKED GIVE THE ELEMENT THE CLASS OF BASETILE ONLY--------
        $(this).attr('class', 'basetile').data('fruit', null);
        const columnData = [];
        const i = $(this).data('i');
        const j = $(this).data('j');

        // -------------MOVING THE ELEMENTS IN A COLUMN DOWN ONE CELL------------
        for(let index = (i-1); index >= 0; index--){
          columnData.push($(`#cell_${(index)}_${j}`).data('fruit'));
        }
        const columnDataReversed = columnData.reverse();
        columnDataReversed.unshift(null);

        $(columnDataReversed).each(function(index, fruit){
          console.log(index, fruit);
          $(`#cell_${(index)}_${j}`).data('fruit', fruit);
          $(`#cell_${(index)}_${j}`).attr('class', `basetile ${fruit}`);
        });
        // RANDOMLY GENERATE A FRUIT AT POSITION OF EMPTY CELL AT TOP OF COLUMN
        const fruitname = fruits[Math.floor(Math.random() * 15) + 0];
        $topColumn = $(`#cell_${0}_${j}`);
        $topColumn.data('fruit', fruitname);
        $topColumn.attr('class', `basetile ${fruitname}`);
        progWidth2 += 3;
        if (progWidth2 > 100) return false;
        progress2.style.width = `${progWidth2}%`;

        // ---------------ANIMATIONS FOR CORRECT FRUIT SELECTED------------------
        greenProgressBar();
        plus10Graphic();
        loop();

      } else if ($elem.hasClass(fruits[$fruitSelected]) !== $('.fruitSpeech').hasClass(fruits[$fruitSelected]) && alreadyPlayed2 === false){
        // ---------------ANIMATIONS FOR INCORRECT FRUIT SELECTED----------------
        progWidth2 -= 3;
        if (progWidth2 > 100) return false;
        progress2.style.width = `${progWidth2}%`;
        redProgressBar();
        minus10Graphic();
      }
    });
  }


  // ------------RANDOMLY SELECTING A FRUIT ON THE BOARD TO SELECT---------------

  newFruitSpeechBubble();

  function newFruitSpeechBubble() {
    $('.fruitSpeech').removeClass(fruits[$fruitSelected]);
    $lineIndex = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    $cellIndex = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    $fruitSelected = $ground[$lineIndex][$cellIndex];
    $('.fruitSpeech').addClass(fruits[$fruitSelected]);
  }

  // -----------------------------TIMED ANIMATIONS-------------------------------

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
    }, 500);
  }, 1000);
});
