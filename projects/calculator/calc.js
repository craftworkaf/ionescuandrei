import {buttons} from './buttons.js' ;



function createButton(buttons){
    
    for(var i = 0; i<buttons.length; i++ ){
        var index = buttons[i]
        $( ".buttons" ).append( `<div class = "button ${typeof index == 'number' || index == '.' || index == 'M'  ? 'buttonGrey': index == 'AC' || index == '+/-' || index == '%' ? 'buttonSilver': 'buttonOrange' } "> ${index} </div>` );
           
    }
    
}

var expression = '';

$('.buttons').on('click','.button', function(){

    var value = this.innerText

    if(value == 'X'){ value = '*'}

    if(value != '+/-' && value != '%' && value != 'M' && value != '=' && value != 'AC'){

        expression += value

        $('#display').text(expression)

    }

    if(value == '='){
        expression = eval(expression)
        expression = expression % 1 != 0 ? expression.toFixed(3) : expression;
        $('#display').text(expression)
    
    }

    if(value == 'AC'){
        $('#display').text('0')
        expression = ''
    }

});






createButton(buttons)