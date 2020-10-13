import {links} from './helper.js'


$(document).ready(function(){

    $('.userName').text('Hello ' + localStorage.getItem('userName') )

    if(  !localStorage.getItem('token') ){

    window.location.assign('index.html')

    

  }

})

/**
 * Generate the template
 * @param prod
 * @returns {string}
 */
function template(prod){

    var cost = prod.quantity * prod.price;
    cost = parseFloat(cost).toPrecision(4)
    var el = `<p data-value="${prod.id}">  ${prod.item}, ${prod.quantity}, £${cost}  <button>Delete</button> </p>`
    return el;

}


/**
 * Retrieve all items from the DB
 */
function getBasket(){

    $.ajax({
        method:'POST',
        url: links.all,
        data: {
            token: localStorage.getItem('token'),
        }

    }).done(function(basket){

        $('.itemList').html('');

        var total = 0
        console.log(basket)

        for(var i=0; i <basket.length; i++){

            $('.itemList').append(template(basket[i]));

            total = total + basket[i].quantity * basket[i].price;

        }

        total = parseFloat(total).toPrecision(5);

        $('.totalCost').html(`<h3>Total</h3>  ` + total);

    });

}

/**
 * Send items for store
 * @param item
 */
function storeItem(item)
{
    $.ajax({
        method:'POST',
        url: links.store,
        data: item

    }).done(function(response){

        getBasket();
        $('input').val('')
        $('.item').focus()

    });
}

/**
 * Delete an item by its ID
 * @param id
 */
function deleteItem(id)
{
    $.ajax({
        method:'POST',
        url: links.delete,
        data: {id : id}

    }).done ( function(msg) {
        console.log(msg)
        getBasket()
    })
}


$('.addButton').click(function(){

    var itemName = $('.item').val();
    
    var quantity = $('.qty').val();
    
    var price = $('.price').val();


    var data = {
        
        item: itemName,
        quantity: quantity,
        price: price,
        token : localStorage.getItem('token')

    }

    storeItem(data)
});


$(document).ready(function(){

    getBasket();

    $('.right').on('click', 'button', function(){

        var id =  $(this).parent().attr('data-value');

        deleteItem(id)

    });

})


$('#logOut').click( function(){

    localStorage.clear()
    window.location.assign('../index.html')

})

