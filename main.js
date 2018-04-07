$(function(){
  // ------------------ARRAY WITH THE VARIABLES FOR THE CLASSES------------------
  const fruits =  ['banana', 'grapes', 'pear', 'peach', 'lemon', 'greenApple', 'redApple', 'orange', 'strawberry', 'raspberry', 'plumb', 'watermelon', 'pineapple', 'blueberry',
    'cherry'];
  // VARIABLES
  var $ground = createGround(8, 9);
  var $mapWrap = $('#board');
  let progWidth = 0;
  // --------------------GENERATING THE NUMBERS FOR THE ARRAY--------------------

  function createGround(height, width){
    // EMPTY WIDTH ARRAY
    var $result = [];
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
    // PLAYER 1 PROGRESSBAR
    var $player1Score = $('.player1');
    // ADDING 2-DIMENSIONAL ARRAY $ELEM TO THE DIV $MAPWRAP(BOARD DIV)
    $mapWrap.append($elem);
    // ADDING FRUIT CLASSES TO THE VALUES IN THE 2-DIMENSIONAL ARRAY IN THE BOARD
    $elem.addClass(fruits[cell]);
    $elem.data('fruit', fruits[cell]);
    // SETTING THE COUNTER TO 0
    var $counter = 100;
    // APPLYING THE COUNTER TO THE WIDTH OF PLAYER 1 PROGRESSBAR
    $player1Score.css('width',`${$counter}px`);
    // DECLARE VARIABLE ELEMENT AT THE TOP OF A COLUMN
    var $topColumn = null;
    var $randomNewFruit = null;

    // ---------------MAKING CONDITIONS IF A ELEMENT IS SELECTED----------------

    // INCREASE PROGRESSBAR WIDTH
    const progress = document.querySelector('.progress');
    // PLAY AUDIO CLIP
    var obj = document.createElement('audio');
    obj.src='./audio/pop.mp3';
    obj.volume=0.10;
    obj.autoPlay=false;
    obj.preLoad=true;
    // PLAY AUDIO CLIP
    var obj2 = document.createElement('audio');
    obj2.src='./audio/wrong2.wav';
    obj2.volume=0.10;
    obj2.autoPlay=false;
    obj2.preLoad=true;

    $elem.click(function(){
      if($elem.hasClass(fruits[$fruitSelected]) === $speechBubbleFruit.hasClass(fruits[$fruitSelected])){
        obj.play();
        // ------WHEN CLICKED GIVE THE ELEMENT THE CLASS OF BASETILE ONLY--------
        $(this).attr('class', 'basetile').data('fruit', null);
        const columnData = []
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
        console.log(progWidth)
        if (progWidth > 100) return false;
        progress.style.width = `${progWidth}%`;

        // ---------------ANIMATIONS FOR CORRECT FRUIT SELECTED------------------
        setTimeout(function(){
          $('.progress').css('background-color', '#339900');
        }, 0);
        setTimeout(function(){
          $('.progress').css('background-color', '#feb501');
        }, 200);
        setTimeout(function(){
          $('#plus10').show();
        }, 0);
        setTimeout(function(){
          $('#plus10').hide();
        }, 100);
      } else {
        obj2.play();

        // -------------------DECREASE THE PROGRESSBAR WIDTH---------------------
        progWidth -= 3;
        if (progWidth > 100) return false;
        progress.style.width = `${progWidth}%`;

        // ---------------ANIMATIONS FOR INCORRECT FRUIT SELECTED----------------
        setTimeout(function(){
          $('.progress').css('background-color', '#cc0000');
        }, 0);
        setTimeout(function(){
          $('.progress').css('background-color', '#feb501');
        }, 200);
        setTimeout(function(){
          $('#minus10').show();
        }, 0);
        setTimeout(function(){
          $('#minus10').hide();
        }, 100);

      }
    });

  }
  // ----------------MOVING THE ELEMENTS IN A COLUMN DOWN ONE CELL---------------
  // function moveColumnDown(i,j){
  //   for(let x = (i-1); x>= 0; x--){
  //     // THE CELL THAT IS SELECTED
  //     const $cell = $(`#cell_${x}_${j}`);
  //     // WHERE THIS CELL IS BEING MOVED TO
  //     const $emptyCell = $(`#cell_${(x+1)}_${j}`);
  //     // SETTING THE CLASS OF THE $CELL ELEMENT TO BASETILE
  //     $cell.attr('class', 'basetile');
  //     // ADD A CLASS OF A RANDOM FRUIT TO THE EMPTY CELL
  //     $emptyCell.addClass($cell.data('fruit'));
  //     // RANDOMLY ADDING A VALUE OF A NEW FRUIT TO EMPTY CELL
  //     // $emptyCell.data('fruit', $cell.data('fruit'));
  //     console.log(`moving ${$cell.data('fruit')}(#cell_${x}_${j}) into #cell_${(x+1)}_${j}`);
  //   }
  // }

  // ------------LOOP THAT RANDOMLY GENERATES A NEW FRUIT FOR SELECION-----------

  (function loop() {
    var rand = Math.round(Math.random() * 5000)+2000;
    setTimeout(function() {
      newFruitSpeechBubble();
      loop();
    }, rand);
  }());

  // ------------RANDOMLY SELECTING A FRUIT ON THE BOARD TO SELECT---------------
  var $lineIndex = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
  var $cellIndex = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
  var $fruitSelected = $ground[$lineIndex][$cellIndex];
  var $speechBubbleFruit = $('.fruitSpeech');
  $speechBubbleFruit.addClass(fruits[$fruitSelected]);

  function newFruitSpeechBubble() {
    $speechBubbleFruit.removeClass(fruits[$fruitSelected]);
    $lineIndex = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    $cellIndex = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    $fruitSelected = $ground[$lineIndex][$cellIndex];
    $speechBubbleFruit = $('.fruitSpeech');
    $speechBubbleFruit.addClass(fruits[$fruitSelected]);
    console.log(`the fruit that you have to collect is ${fruits[$fruitSelected]}`);
  }



  // -----------------------------TIMED ANIMATIONS-------------------------------

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
    }, 5000);


    // -----------------------------STOPWATCH------------------------------------
    var obj3 = document.createElement('audio');
    obj3.src='./audio/failed.mp3';
    obj3.volume=0.10;
    obj3.autoPlay=false;
    obj3.preLoad=true;

    // setTimeout(function(){
    function startTimer(duration, display) {
      var timer = duration, minutes, seconds;
      setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.text(minutes + ':' + seconds);
        if (seconds === '00' && progWidth <99 ){
          console.log(`Player 1 scored ${progWidth*10}points in 60 seconds`);
          obj3.play();
          setTimeout(function(){
            $('#gameOver').show();
          }, 1000);
          setTimeout(function(){
            $('#gameOver').hide();
          }, 7000);
          setTimeout(function(){
            location.reload();
          }, 8000);
        }
        if (progWidth >=99){
          setTimeout(function(){
            $('#success').show();
          }, 1000);
          setTimeout(function(){
            $('#success').hide();
          }, 7000);
        }
        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    }
    var oneMinute = 60 * 0.99999,
      display = $('.countdown');
    startTimer(oneMinute, display);

  }, 600);

});
