let menuItem = ''
let orderList = []
let orderType = 'in'
let paymentType = ''

let orderChange = 0;
/**
 * Defauly hidden for the overlay.
 */
$(document).ready(function(){
    $('.overlay').hide();
    resetOrderType();
})

//=========================================


/**
 * Template for generating an order item 
 * 
 * @param {*} obj 
 */
function modalTemplate(obj){
    var template = `<p class="product" data-item = "${obj.item}" data-price = ${obj.price} data-description = ${obj.description}> <br> ${obj.item}, <br>${obj.description}, <br>£ ${obj.price} </p>`
    return template;
}
//=============================================

/**
 * ========Generates the Edit order modal =================
 * @param {*} obj 
 * @param {*} index 
 */
function editOrderItem(obj,index){

    var template = 
        `<div class="editOrderModal">
                    
            <div class="editOrderTitle"> 
                <h1>${obj.item}</h1>
                <h1>£${obj.price}</h1>
            </div>

            <div class="editOrderDescription">
                <p>${obj.description}</p>
            </div>

            <div class="editOrderQty">
                <h3>Quantity</h3> 
                <h3 id="qty">${Number(obj.qty)}</h3>
            </div>
            
            <input type="range" id="quantity" onchange="showQuantity(this,${index})" min="1" max="10" value="${Number(obj.qty)}" class="slider" id="myRange">
                <br>
            
            <div class="editOrderComment "> 
                <h4>Comments</h4> 
                <textarea rows=3 id="comment">${obj.comment}</textarea> 
            </div>
                <br>
                
            <div class="editOrderButtons"> 
                <button onclick="saveItem(${index})" class="orderSaveBtn">Save</button> 
                <button onclick="deleteItem(${index})" class="orderDeleteBtn">Delete</button> 
            </div>

        </div>`

    return template  
}

/**===============End of Edit Order Modal================================= */


/**Displays the edit order item Modal */

$('.aside').on('click','.orderItem',function(){
    var index = $(this).attr('data-index');
    var obj = orderList[index];

    $('.modal').html(editOrderItem(obj,index));
    $('.overlay').show();

});


/** Display the edited item qty in the edit order modal */

function showQuantity(order,index){
    $('#qty').text(order.value);
    // orderList[index].qty=order.value;
    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));
}



/**
 * Item template for the order list array
 * 
 * @param {*} item 
 * @param {*} price 
 */
function createOrderItem(item,description,price){

    return { item:item,description:description,comment:"",price:price, qty:1 }
}
//================================================



/**
 *Displays an overlay with the apropriate item list for the group clicked 
 */
$('.menuItem').click( function(){

    $('.modal').html('');
    $('.overlay').show();
    
    menuItem = $(this).text().toLowerCase().trim();
    if(menuItem !='settings'){

       var category = stock[menuItem];
    
        for (let index = 0; index < category.length; index++) {

            var item = modalTemplate(category[index]);

            $('.modal').append(item);
        }
    }
})
//===================================================




/**
 * Takes the clicked items from the overlay and appends them to the orderList accordingly.
 */
$('.modal').on('click','.product',function(){

    var item = $(this).attr('data-item');
    var price = $(this).attr('data-price');
    var description = $(this).attr('data-description');
    var compare = orderList.filter((el)=>el.item==item);
    var index = -1;

    if(compare.length > 0){
        index = orderList.indexOf(compare[0]); 
    }

    if(index != -1){
        orderList[index]['qty']++;       
    }else{
        let objectItem = createOrderItem(item,description,price);
        orderList.push(objectItem);
    }

    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));
    calcOrderListHeight()
});

//=====================================================





/**
 * ========= Hides the item menu modal when pressing Esc ================
 * 
 */

$(document).keyup(function(e){
    if(e.which == 27){
        $('.overlay').hide();
    }
})


$('.closeModal').click(function(){

    $('.overlay').hide();

})



//====================================================





/**
 * Calculates order total
 * 
 * @param {*} param 
 */
function calculateTotal(param=[]){

    let total = 0;

    for (let index = 0; index < param.length; index++) {
        const element = param[index];
        total += element.price*element.qty;
    }

    return total.toFixed(2);
}
//==============================



/**
 * Creates a template for ordered items to be added to the order list
 * 
 * @param {*} orders 
 */
function insertOrderItems(orders = []){

    var template = ``;

    for (let index = 0; index < orders.length; index++) {
        const item = orders[index];
        template+= `<div class="orderItem ${item.comment?'commented':''}"  data-index=${index} ><span class="mleft">${item.item}</span> <span>Qty: ${Number(item.qty)}</span> <span class="mright font20">£ ${item.price}</span> </div>`;

    }
    return template;
}


//======================================================




/**When in the order edit modal, this function allows you to save 
 * the new quantity and comment for the item selected */

function saveItem(index){
    
    let comment = $('#comment').val();
    orderList[index].comment = comment;
    orderList[index].qty = $('#quantity').val();
    $('.overlay').hide();
    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));
}
//=================================================================

/**When clicking on the delete button, a new order list is generated 
 * with all order items apart from the one selected.
 * This new list is then atributed to the global orderList variable.
 * After this, the order list html file is updated along with the new total.
 */

function deleteItem(i){
    console.log(i);

    let newOrderList = [];
    if(window.confirm("Are you sure ?")){
        for(let index = 0; index < orderList.length; index++){
                if(index != i){
                    newOrderList.push(orderList[index])
                }
    }
    orderList = newOrderList;

    $('.overlay').hide();
    $('.orderItems').html(insertOrderItems(orderList));
    $('.totalOutput').html( '£'+ calculateTotal(orderList));
    
    }
}

//===================================================================





/**When clicking the cancel button, the orderList global variable is emptied 
 * and pushed into the order list page element along with the new total. */

$('.aside').on('click','.cancelOrder',function(){

    if(window.confirm("Are you sure ?")){
        orderList = [];
        $('.orderItems').html(insertOrderItems(orderList));
        $('.totalOutput').html( '£'+ calculateTotal(orderList));
        resetOrderType();
    }
});
//=======================================================================






/**
 * Generates a modal template for order completion 
 */
function modal_Container(){

    var template = 
        `<div class="modal_container">
    
            <div class="top">
                <div class="left">
                    <div class="l1">
                        ${checkOrderType(orderType)}
                    </div>
                    <div class="l2">
                        <h4>Payment Type</h4>
                        <button id="cash" data-value="cash" >Cash</button>
                    </div>
                    <div class="l3">
                        <h4>Ammount</h4>
                        <input type="number" step=".01" oninput="calculateChange($(this))">
                    </div>
                </div>
            
                <div class="right">
                    <div class="r1">
                    <h2 id="totalCost">Total</h2>
                    </div>
                    <div class="r2">
                    
                    <button id="card" data-value="card" >Card</button>
                    </div>
                    <div class="r3">
                        <h3>Change</h3>
                        <h2 id="changeLeft">Ammount</h2>
                    </div>
                </div>
                
            </div>
            
            <div class="bottom">
                <button onclick="generateReceipt()">Pay</button>
            </div>
    
        </div> `

    return template  
}
//==============End of editOrderModal===========================================




 /**
  * When clicking complete order, the modal is generated and the 
  *  total value is inserted into the total div.
  */
$('.aside').on('click','.completeOrder',function(){

    $('.modal').html(modal_Container());
    $('.overlay').show();
    $('#totalCost').html('Total'+ ' ' + '£' + calculateTotal(orderList));
});
//============================================================================





/**
 * Checks the orderType global variable and return the apropriate buttons based on it's value.
 * 
 * @param {*} data 
 */
function checkOrderType(data){
    
    

    if(data == 'in') {
        return `<button id="orderType" data-value="in" style="background-color:white; color:black">In</button>
                <button id="orderType" data-value="out" style="background-color:none; color:white">Out</button>
                <button id="orderType" data-value="delivery" style="background-color:none; color:white">Delivery</button>`
    }else if(data == 'out'){
        return `<button id="orderType" data-value="in" style="background-color:none; color:white">In</button>
                <button id="orderType" data-value="out" style="background-color:white; color:black">Out</button>
                <button id="orderType" data-value="delivery" style="background-color:none; color:white">Delivery</button>`
    }else if(data=='delivery') {
       return  `<button id="orderType" data-value="in" style="background-color:none; color:white">In</button>
                <button id="orderType" data-value="out" style="background-color:none; color:white">Out</button>
                <button id="orderType" data-value="delivery" style="background-color:white; color:black">Delivery</button>`
    }
}

$('.modal').on('click','#orderType',function(){
    orderType=$(this).data('value');
    $(".l1").html( checkOrderType(orderType));
})
//============================================================================






/**
 * Template for payment type button styles.
 * 
 * @param {*} paymentType 
 */
function checkPaymentType(paymentType){
    
    if( paymentType == 'cash' ) {

        $('#cash').css({"background":"white","color":"black"})
        $('#card').css({"background":"none","color":"white"})
        
    }else if( paymentType == 'card' ){

        $('#cash').css({"background":"none","color":"white"})
        $('#card').css({"background":"white","color":"black"})

    }


}
//============================================================================



/**
 * Highlights the payment type button clicked and sets 
 * the value of the global payment type variable
 */
$('.modal').on('click','#card',function(){
     
    paymentType = $('#card').data('value');
    checkPaymentType(paymentType);
  
});

$('.modal').on('click','#cash',function(){
        
    paymentType = $('#cash').data('value');
    checkPaymentType(paymentType);
    $('.l3 input').focus();

});

$('.modal').on('focus', '.l3 input', function(){
    $('#cash').trigger('click');
})

//============================================================================



/**
 * Calculates the amount of change to give back to customer if paying in cash
 * @param {*} input 
 */
function calculateChange(input){
    let total = calculateTotal(orderList);
    if(paymentType == 'cash'){
        let cash = input.val();
        let changeLeft = '£' + parseFloat(cash - total).toFixed(2);
        console.log(changeLeft);
        $("#changeLeft").html(changeLeft);
    }
};
//============================================================================


/**
 * Sets to orderType global variable to the desired value and sets the css for the buttons acordingly
 */
$('.orderType button').click(function(){

    
    orderType = $(this).data('value');
    $('.orderType button').removeClass('orderTypeSelected').addClass('orderTypeUnselected');
    $(this).removeClass('orderTypeUnselected');
    $(this).addClass('orderTypeSelected');

})


/**
 * Sets the global  orderType variable to the default value(in) and resets the css for the buttons
 */
function resetOrderType(){

    orderType='in'
    $('.orderType button').removeClass('orderTypeSelected').addClass('orderTypeUnselected')
    $('.orderType button[data-value="in"').removeClass('orderTypeUnselected').addClass('orderTypeSelected')

}


function calcOrderListHeight(){
    height = $('.orderItems').height();
    orderHeight = orderList.length * 50;
    
    if(height <= orderHeight){
        $('.orderItems').addClass('orderItemsScrollable')
    }else{
        $('.orderItems').removeClass('orderItemsScrollable')
    }
}



function receiptTemplate(){


    let receiptTemplate =`
        
        <div class="receiptContainer">
                <div id="shopDetails">
                    <div class="header">
                        
                    <h3 style="text-align: center;margin:0px;padding:0px;">Coffee Shop Inc</h3>
                    <hr>
                    <strong># 14315141341343</strong>
                    <br>
                    <div class="date">19 Nov 2020 10:30</div>
                    </div>
                </div>

                <div class="middle">
                ====== Items ======
                    <div class="receiptItems">
                    </div>                
                </div>
                <hr>
                <div id="footer">
                    <p><strong>Thank you for your business! </strong>  
                    </p>
                    <strong>Contact Info</strong>
                    <div>
                        Address : street city, county</br>
                        Email   : lifeiscoffee@coffeeshop.co.uk</br>
                        Phone   : 0101 3940 3020</br>
                    </div>
                </div>
            </div>
`



    return receiptTemplate
}


function generateReceipt(){

    $(".modal").html(receiptTemplate());

    for (let index = 0; index < orderList.length; index++) {
        let name = orderList[index].item;
        let price = orderList[index].price;
        let qty = orderList[index].qty;
        let item =`<p> ${name} ${price*qty} </p`
        $('.receiptItems').append(item);
    }
    
    window.print();
    window.location.reload();

}
