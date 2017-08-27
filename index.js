let winPosition = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
let winPosition1 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
let newArr = [];
let steps = 0;
let seconds = 0;
let currentPosition = [];
var stopwatch = null;
$('#1').animate({order: 1});
for (var i = -1; i <=16; i++) {

        $(`#${i}`).css('order', winPosition1[i-1]);
}
function shuffleArray(array) {
    newArr = array;
    for (var i = newArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    return newArr;
}
function getSibling(clickedOrder,emptyOrder) {
    console.log(clickedOrder, emptyOrder);
    if(clickedOrder-4 === emptyOrder || clickedOrder+4 === emptyOrder || clickedOrder-1===emptyOrder || clickedOrder+1 === emptyOrder){
       return true;
    }else {
        return false;
    }

}

$( "#box" ).click(function(e) {
    let clickedId = e.target.id;
    let clicked= parseInt(e.target.style.order,10);
    let empty = parseInt($('#16').css('order'),10);
    console.log(e.target.style)
    if(clickedId === '16'){

    } else {
       if(getSibling(clicked, empty)){
           $(e.target).animate({order:  $('#16').css('order')});
           $('#16').animate({order: $(e.target).css('order')}, function (){
               steps ++;
               $("#stepsCount").html(steps.toString());
               for (var i = 1; i <=16; i++) {
                   currentPosition[i-1] = $(`#${i}`).css( 'order' );
               }
               console.log(currentPosition);
               if(currentPosition.length===winPosition1.length && currentPosition.every((v,i)=> v === winPosition1[i])) {
                   console.log('win');
               }
           });
       }
    }
});

$(" #random ").click(e=>{
    clearInterval(stopwatch);
     stopwatch = setInterval(function () {
            seconds++
            console.log(seconds);
            $("#timeCount").html(`${seconds.toString()} seconds`);
    }, 1000);
     seconds = 0;
    steps = 0;
    shuffleArray(winPosition);
    for (let i = 1; i <=16; i++) {
        $(`#${i}`).animate({order: newArr[i-1]});
    }
});
$(" #solve ").click(e=>{
    seconds = 0;
    steps = 0;
    clearInterval(stopwatch);
    for (var i = 1; i <=16; i++) {
        $('#'+i).animate({order: winPosition1[i-1]});
    }
});

