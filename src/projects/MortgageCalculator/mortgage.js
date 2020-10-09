
//p for ammount borrowed
//n for number of monthly payments
//r for interest rate
//h for house value
//d for deposit value
//mc for monthly cost
//tc for total cost


$('#submit').click(function calculator(){
    
    var h = $('#h1').val();
    var d = $('#d1').val();

    //Calculates the loan ammount.

    var p = h - d;
    var r = $('#i1').val();
    var n = $('#y1').val();


    // Turn percent in decimal.
    var rd = (r/100)/12;

    // Turns years into months.
    var m = n * 12;


    //Calculates monthly cost.

    var mc =  ((p*rd) * Math.pow((1+rd),m)) / (Math.pow((1+rd),m)-1);

    //Calculates total cost.
    var tc = mc*m;

    $('#l1').val(p);
    $('#t1').val(Math.round(tc));
    $('#m1').val(Math.round(mc));
    $('#h1').focus();



});

$('#clear').click(function(){
        $('input').val('');
        $('#h1').focus();
    }
);










/*
 * When pressing the escape key it will clear the focused input.
 */
   
$('input').keyup(function(e){
    if(e.keyCode == 27) {
    $('input').val('');
}});


/**
 * When pressing enter in a focused input field it will focus on the next field.
 */

$('input').keydown(function (e) {
    if (e.which === 13) {
       $(this).next('.inputs').focus();
    }
 });