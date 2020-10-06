
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

    //Calculates the loan ammount

    var p = h - d;
    var r = $('#i1').val();
    var n = $('#y1').val();


    // Turn percent in decimal
    var rd = (r/100)/12;

    // Turns years into months
    var m = n * 12;


    //Calculates monthly cost

    var mc =  ((p*rd) * Math.pow((1+rd),m)) / (Math.pow((1+rd),m)-1);

    //Calculates total cost
    var tc = mc*m;

    $('#l1').val(p);
    $('#t1').val(Math.round(tc));
    $('#m1').val(Math.round(mc));

});

$('#clear').click(function(){
        $('input').val('');
        $('#h1').focus();
    }
);









// function calculator(p,r,n){
    
//     // turn percent in decimal
//     var rd = (r/100)/12;
//     // turns years into months
//     var m = n * 12;


//     console.log("P", p);
//     console.log("R",r);
//     console.log("N",n);

//     // return ((p*r) * Math.pow((1+r),n)) / (Math.pow((1+r),n)-1);
//     return ((p*rd) * Math.pow((1+rd),m)) / (Math.pow((1+rd),m)-1);
// }

// function percentToDecimal(percent){

//     return (percent/100)/12;

// }

// function yearsToMonths(year){

//     return year * 12;
    
// }



// $('#submit').click(function(){
    
   

//     console.log(house)


// });




















// //200 000 / 25 ani / 2.4% / an

// //      200 : 25 = 8000 
// // 2000k-8000 = 192000  


// var amount = 5000

// var permonth = amount / 12 + 18%

// for(var i = 1; i <= 24; i++){

//     amount =

//     console.log(amount)

// }