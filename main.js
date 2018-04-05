$(function(){
  const fruits =  ['banana', 'grapes', 'pear', 'peach', 'lemon', 'greenApple', 'redApple', 'orange', 'strawberry', 'raspberry', 'plumb', 'watermelon', 'pineapple', 'blueberry',
    'cherry'];
  // VARIABLES
  var $ground = createGround(8, 9);
  var $mapWrap = $('#board');

  // --------------------GENERATING THE NUMBERS FOR THE ARRAY--------------------

  function createGround(width, height){
    // EMPTY WIDTH ARRAY
    var $result = [];
    // MAKING THE WIDTH
    for (var i = 0 ; i <= width; i++) {
      // EMPTY HEIGHT ARRAY
      $result[i] = [];
      // MAKING THE HEIGHT
      for (var j = 0; j <= height; j++) {
        $result[i][j] = Math.floor(Math.random() * 15) + 0;
      }
    }
    console.log($result);
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

  // ----------------MOVING THE ELEMENTS IN A COLUMN DOWN ONE CELL---------------

  function moveColumnDown(i,j){
    for(let x = (i-1); x>= 0; x--){
      // THE CELL THAT IS SELECTED
      const $cell = $(`#cell_${x}_${j}`);
      // WHERE THIS CELL IS BEING MOVED TO
      const $emptyCell = $(`#cell_${(x+1)}_${j}`);
      // SETTING THE CLASS OF THE $CELL ELEMENT TO BASETILE
      $cell.attr('class', 'basetile');
      // ADD A CLASS OF A RANDOM FRUIT TO THE EMPTY CELL
      $emptyCell.addClass($cell.data('fruit'));
      // RANDOMLY ADDING A VALUE OF A NEW FRUIT TO EMPTY CELL
      // $emptyCell.data('fruit', $cell.data('fruit'));
      console.log(`moving ${$cell.data('fruit')}(#cell_${x}_${j}) into #cell_${(x+1)}_${j}`);
    }
  }

  // --------------------BUILDING THE 2D ARRAY WITH CLASSES----------------------

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

    $elem.click(function(){
      $(this).attr('class', 'basetile').data('fruit', null);
      const columnData = []
      const i = $(this).data('i');
      const j = $(this).data('j');
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

      //generate fruit at the top, 
      // make sure to assign the class attribute using .attr('basetile FRUITNAME')
      // AND
      // assign the data-fruit attribute using .data('fruit', FRUITNAME);
    })


    // $elem.click(function(){
    //   console.log(`the first fruit selected is a ${$elem.data('fruit')}`);
    //   if ($elem.hasClass(fruits[$fruitSelected]) === $speechBubbleFruit.hasClass(fruits[$fruitSelected])) {
    //     // MOVE WHOLE COLUMN DOWN
    //     moveColumnDown(parseInt($(this).data('i')), parseInt($(this).data('j')));
    //     // REMOVE FRUIT FROM THE SELECTED ELEMENT
    //     $elem.attr('class', 'basetile');
    //     // SET THE POSITION OF THE TOP ELEMENT
    //     $topColumn = $(`#cell_${0}_${j}`);
    //     // SHOW POSITION OF THE NEW FRUIT ADDED
    //     console.log(`the fruit at the top of the column before new fruit added is a ${$topColumn.data('fruit')}`);
    //     $randomNewFruit = fruits[Math.floor(Math.random() * 14) + 0];
    //     $topColumn.removeClass(fruits[cell]);
    //     $topColumn.addClass($randomNewFruit);
    //     console.log(`the random fruit generated to be put in at the top column is a ${$randomNewFruit}`);
    //     // $topColumn.data('fruit', $randomNewFruit);
    //
    //     // ANIMATIONS FOR CORRECT FRUIT SELECTED
    //     setTimeout(function(){
    //       $('#plus10').fadeIn(100);
    //     }, 0);
    //     setTimeout(function(){
    //       $('#plus10').fadeOut(100);
    //     }, 300);
    //     // INCREASING THE PROGRESSBAR
    //     $counter = $counter + 10;
    //     $player1Score.css('background', 'green');
    //   } else if ($elem.hasClass(fruits[$fruitSelected]) !== $speechBubbleFruit.hasClass(fruits[$fruitSelected])) {
    //     // ANIMATIONS FOR INCORRECT FRUIT SELECTED
    //     setTimeout(function(){
    //       $('#minus10').fadeIn(100);
    //     }, 0);
    //     setTimeout(function(){
    //       $('#minus10').fadeOut(100);
    //     }, 500);
    //     // REDUCING THE PROGRESSBAR
    //     $counter = $counter - 10;
    //     $player1Score.css('background', 'red');
    //     console.log('-------new selection--------');
    //   }
    //
    //   // if ($counter >= 180){
    //   //   $player1Score.css('width', '180px');
    //   // }
    // });

  }

  // ------------LOOP THAT RANDOMLY GENERATES A NEW FRUIT FOR SELECION-----------

  (function loop() {
    var rand = Math.round(Math.random() * 9000)+6000;
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

    // -----------------------------STOPWATCH------------------------------------

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
    }, 600);
  });
  // PROGRESS BAR

  // const progress = document.querySelector('.progress');
  // const figure = document.querySelector('.amount p');
  // const buttons = document.getElementsByTagName('button');
  // const balance = document.getElementById('remaining');
  // const balanceCont = document.querySelector('.balance-container p');
  //
  // const btns = [].slice.apply(buttons);
  //
  // btns.forEach(button => {
  //   button.addEventListener('click', updateProgress);
  // });
  //
  // let progWidth = 25;
  //
  // // Animate progress
  // function updateProgress(e) {
  //   if (progWidth + parseInt(e.target.id) > 100) return false;
  //   progWidth += parseInt(e.target.id);
  //   progress.style.width = `${progWidth}%`;
  //   figure.style.width = `${progWidth+1}%`;
  //   figure.innerHTML = `£${progWidth}`;
  //   if (progWidth === 100) {
  //     balanceCont.innerHTML = 'You have reached the target!';
  //   } else {
  //     balance.innerHTML = `${100 - progWidth}`;
  //   }
  // }
  //
  // // Animate starting progress on page load
  // setTimeout(() => {
  //   progress.classList.remove('progress-load');
  //   //figure.classList.remove('progress-load');
  //   progress.style.width = `${progWidth}%`;
  //   figure.style.width = `${progWidth+1}%`;
  //   figure.innerHTML = `£${progWidth}`;
  //   balance.innerHTML = `${100 - progWidth}`;
  // }, 100);

});
