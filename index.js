let winPosition = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
let winPosition1 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16'];
let newArr = [];
let steps = 0;
let seconds = 0;
let currentPosition = [];
let stopwatch = setInterval(function () {
    seconds++;
    console.log(seconds);
    $("#timeCount").html(`${seconds.toString()} seconds`);
}, 1000);
$("#stepsCount").html(0);
for (let i = 1; i <=16; i++) {
        $(`#item${i}`).css('order', winPosition1[i-1]);
}
function shuffleArray(array) {
    newArr = array;
    for (let i = newArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    return newArr;
}
function getSibling(clickedOrder,emptyOrder) {
    console.log(clickedOrder, emptyOrder);
    return clickedOrder - 4 === emptyOrder || clickedOrder + 4 === emptyOrder ||
        clickedOrder - 1 === emptyOrder || clickedOrder + 1 === emptyOrder;

}

$( "#box" ).click(function(e) {
    let clickedId = e.target.id;
    let clicked= parseInt(e.target.style.order,10);
    let empty = parseInt($('#item16').css('order'),10);
    console.log(clickedId);
    if(clickedId !== 'item16') {
        if (getSibling(clicked, empty)) {
            $(e.target).animate({order: $('#item16').css('order')});
            $('#item16').animate({order: $(e.target).css('order')}, function () {
                steps++;
                $("#stepsCount").html(steps.toString());
                for (let i = 1; i <= 16; i++) {
                    currentPosition[i - 1] = $(`#item${i}`).css('order');
                }
                console.log(currentPosition);
                if (currentPosition.length === winPosition1.length && currentPosition.every((v, i) => v === winPosition1[i])) {
                    alert(`Grats! You win in ${seconds} seconds within ${steps} steps`);
                    clearInterval(stopwatch);
                    seconds = 0;
                    steps = 0;
                    $("#stepsCount").html(0);
                    $("#timeCount").html(`0 seconds`)
                }
            });
        }
    }
});

$(" #random ").click(e=>{
    $("#timeCount").html(`0 seconds`);
    clearInterval(stopwatch);
     stopwatch = setInterval(function () {
            seconds++;
            console.log(seconds);
            $("#timeCount").html(`${seconds.toString()} seconds`);
    }, 1000);
    $("#stepsCount").html(0);
    shuffleArray(winPosition);
    for (let i = 1; i <=16; i++) {
        $(`#item${i}`).animate({order: newArr[i-1]});
    }
});
$(" #solve ").click(e=>{
    for (let i = 1; i <=16; i++) {
        $(`#item${i}`).animate({order: winPosition1[i-1]});
    }
    clearInterval(stopwatch);
    seconds = 0;
    steps = 0;
    $("#stepsCount").html(0);
    $("#timeCount").html(`0 seconds`)
});

