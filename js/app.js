$(document).foundation();

var myCart = {};
var myProducts = {};

function getDepartments() {

    var getDeparments = $.ajax({
        url: "services/get_departments.php",
        type: "POST",
        dataType: "json"
    });

    getDeparments.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getDeparments)" +
            textStatus);
    });

    getDeparments.done(function (data) {

        var contentProduct = "";
        var contentMore = "";
        var contentFood = "";
        if (data.error.id == "0") {
            $.each(data.departments, function (i, item) {
                let productIndexes = [5, 7, 16, 17, 29, 33];
                for (i = 0; i <= productIndexes.length; i++) {
                    if (item.id == productIndexes[i]) {
                        contentProduct += `<li class="departmentList" data-id="${item.id}" data-name="${item.name}">${item.name}</li>`;
                    }
                }
                let moreIndexes = [9, 3, 14, 18, 21, 23, 25, 31, 32];
                for (i = 0; i <= moreIndexes.length; i++) {
                    if (item.id == moreIndexes[i]) {
                        contentMore += `<li class="departmentList" data-id="${item.id}" data-name="${item.name}">${item.name}</li>`;
                    }
                }
                let foodIndexes = [1, 2, 4, 6, 10, 11, 12, 13, 15, 19, 20, 22, 24, 26, 27, 28, 30];
                for (i = 0; i <= foodIndexes.length; i++) {
                    if (item.id == foodIndexes[i]) {
                        contentFood += `<li class="departmentList" data-id="${item.id}" data-name="${item.name}">${item.name}</li>`;
                    }
                }
            });
        }
        $(".productListMenu").html(contentProduct);
        $(".moreListMenu").html(contentMore);
        $(".foodListMenu").html(contentFood);
    });
}

String.prototype.trunc = function (n, useWordBoundary) {
    if (this.length <= n) {
        $(this.prototype).addClass("bottom");
        return this;
    }
    var subString = this.substr(0, n - 1);
    return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString) + "&hellip;";
};


function productView(item) {
    $(".home-body").hide();
    var product_description = item.product_description.trunc(60, true);

    var content = `<div class="large-4 small-12 medium-4 product cell gray-4">
    <div class="card productCard" style="width: 100%;">
        <img src="${item.image_path}" alt="${item.product_name} class="gray-1 padding">
        <div class="card-section padd">
        <h2>${item.product_name}</h2>
        <p2 class="product_description">${product_description}</p2>
            <h4>$${item.avg_price}</h4>
            <div class="plus-minus">
                <i class="fa fa-fw fa-plus plus"  data-id="${item.id}"></i>
                <h4 class=" quantity quantity_${item.id}" data-id="${item.id}">1</h4>
                <i class="fa fa-fw fa-minus minus" data-id="${item.id}"></i>
            </div>
            <button class="add_to_cart" data-id="${item.id}">Add to Cart</button>
        </div>
    </div>
</div>`;
    return content;
}

function getProductsBySearch(search) {

    var getSearch = $.ajax({
        url: "services/get_products_by_search.php",
        type: "POST",
        data: {
            search: search
        },
        dataType: "json"
    });

    getSearch.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getSearch)" +
            textStatus);
    });

    getSearch.done(function (data) {

        var content = "";

        if (data.error.id == "0") {
            $.each(data.products, function (i, item) {
                content += productView(item);
                container = `<h1>Search Results For "${search}":</h1>
                <div class="grid-container grid-x more-top1 gray-2">
                ${content}
    </div>`
            });
        }

        $(".productCards").html(container);

    });
}


function getProductsByDepartment(department, departmentName) {

    var getProducts = $.ajax({
        url: "services/get_products_by_category.php",
        type: "POST",
        data: {
            category_id: department
        },
        dataType: "json"
    });

    getProducts.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getProducts)" +
            textStatus);
    });

    getProducts.done(function (data) {

        var content = "";

        if (data.error.id == "0") {
            $.each(data.products, function (i, item) {
                content += productView(item);
                container = `<div class="grid-container"><h1>${departmentName}</h1>
                <div class="grid-container grid-x more-top1 gray-2">
                ${content}</div>
    </div>`
            });
        }

        $(".productCards").html(container);

    });
}

Object.size = function (obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function buildCart() {
    var content = `<tr class="labels">
                    <th>Item</th>
                    <th colspan="2">Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Extend Price</th>
                    <th>&nbsp;</th>
                </tr>`;


    var sub_total = 0.00;

    // loop through cart
    $.each(myProducts, function (i, item) {
        var item_number = i + 1;

        var quantity = myCart[item.id];
        var extended_price = parseInt(quantity) * parseFloat(item.avg_price);
        var extendPrice = extended_price.toFixed(2);
        var avg_price = parseFloat(item.avg_price);
        var avgPrice = avg_price.toFixed(2);

        content += `<tr class="labels border-1">
                    <td>${item_number}</td>
                    <td colspan="2">${item.product_name}</td>
                    <td class="plus-minus1">
                    <h4 class="cart_plus" data-id="${item.id}"><i class="fa fa-fw fa-plus"></i></h4>
                        <h4 class="cart_quantity_${item.id}" data-id="${item.id}">${quantity}</h4>
                        <h4 class="cart_minus" data-id="${item.id}"><i class="fa fa-fw fa-minus"></i></h4>
                    </td>
                    <td>$${avgPrice}</td>
                    <td>$${extendPrice}</td>
                    <td class="cart_delete" data-id="${item.id}"><i class="fa fa-fw fa-window-close"></i></td>
                </tr>`;
        sub_total = sub_total + extended_price;

    });

    var subTotal = sub_total.toFixed(2);
    var hst = subTotal * 0.13;
    var HST = hst.toFixed(2);
    var total = hst + sub_total;
    var TOTAL = total.toFixed(2);
    // end cart
    content += `<tr>
    <td>&nbsp;</td>
    </tr><tr>
    <td>&nbsp;</td>
    </tr><tr>
    <td>&nbsp;</td>
    </tr>
                    <tr>
                    <td class="delete_product" data-id="">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td colspan="2">&nbsp;</td>
                    <td>
                    
                    </td>
                    <td>Sub-Total</td>
                    <td>$${subTotal}</td>
                </tr>

                <tr>
                    <td class="delete_product" data-id="">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td colspan="2">&nbsp;</td>
                    <td>

                    </td>
                    <td>HST</td>
                    <td>$${HST}</td>
                </tr>

                <tr>
                    <td class="delete_product" data-id="">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td colspan="2">&nbsp;</td>
                    <td>

                    </td>
                    <td>Total</td>
                    <td>$${TOTAL}</td>
                </tr>


                <tr>
                    <td class="delete_product" data-id="">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td colspan="2">&nbsp;</td>
                    <td>

                    </td>
                    <td>&nbsp;</td>
                    <td>
                        <button type="button" id="checkout" value="Checkout">CheckOut</button>
                    </td>
                </tr>

                `;

    // save to screen
    $("#cartTable").html(content);
}

function getProductsByCart() {

    var json = JSON.stringify(myCart);

    var getCart = $.ajax({
        url: "services/get_products_by_cart.php",
        type: "POST",
        data: {
            cart: json
        },
        dataType: "json"
    });

    getCart.fail(function (jqXHR, textStatus) {
        if (textStatus == "parsererror") {
            alert("Nothing In The Cart. Please add some items.");
        } else {
            alert("Something went Wrong! (getCart)" +
                textStatus);
        }

    });

    getCart.done(function (data) {
        $(".home-body").hide();
        $(".productCards").hide();
        $(".cart_container").show();
        myProducts = data.products;

        buildCart();


    });
}



$(document).ready(
    function () {

        // constructor 

        // POPULATE MENU

        getDepartments();


        // GET PRODUCTS BY DEPARTMENT

        $(document).on("click", "body .departmentList", function () {
            var department = $(this).attr("data-id");
            var departmentName = $(this).attr("data-name")
            getProductsByDepartment(department, departmentName);
        });


        // SEARCH

        $("#search").keyup(
            function () {
                if (event.keyCode === 13) {
                    var search = $(this).val();
                    getProductsBySearch(search);
                }
            }
        );
        $(".fa-search").on("click", function () {
            var search = $("#search").val();
            getProductsBySearch(search);
        })


        // ADD QUANTITY IN CARD

        $(document).on("click", "body .plus", function () {
            var product_id = $(this).attr("data-id");
            //alert($(".quantity_" + product_id).html());
            var quantity = parseInt($(".quantity_" + product_id).html());
            ++quantity;
            $(".quantity_" + product_id).html(quantity);
        });


        // SUBTRACT QUANTITY IN CARD

        $(document).on("click", "body .minus", function () {
            var product_id = $(this).attr("data-id");
            //alert($(".quantity_" + product_id).html());
            var quantity = parseInt($(".quantity_" + product_id).html());
            if (quantity > 1) {
                --quantity;
            } else {
                quantity = 1;
            }

            $(".quantity_" + product_id).html(quantity);
        });


        // ADD TO CART FROM CARD

        $(document).on("click", "body .add_to_cart", function () {
            var product_id = $(this).attr("data-id");
            //alert($(".quantity_" + product_id).html());
            var quantity = parseInt($(".quantity_" + product_id).html());

            if (myCart[product_id] != undefined) {
                var currentValue = myCart[product_id];
                myCart[product_id] = parseFloat(quantity) + parseFloat(currentValue);
            } else {
                myCart[product_id] = quantity;
            }

            var size = Object.size(myCart);
            console.log(myCart);
            $(".cartCircle").html(size);

        });


        // CART COMMANDS

        // DISPLAY CART

        $(".cartCircle").click(
            function () {
                getProductsByCart();
            }
        );


        // STEP ONE IN THE CART

        // ADD QUANTITY IN CART

        $(document).on("click", "body .cart_plus", function () {

            //alert("cart plus");
            var product_id = $(this).attr("data-id");

            var quantity = parseInt(myCart[product_id] + 1);

            myCart[product_id] = quantity;
            //$(".cart_quantity_" + product_id).html(quantity);

            buildCart();

        });


        // SUBTRACT QUANTITY IN CART

        $(document).on("click", "body .cart_minus", function () {

            var product_id = $(this).attr("data-id");

            var quantity = parseInt(myCart[product_id] - 1);

            if (quantity < 1) {
                quantity = 1;
            }

            myCart[product_id] = quantity;

            buildCart();

        });
        $(document).on("click", "body .close-cart", function () {
            $(".cart_container").hide();
            $(".home-body").show();
        });

        // DELETE ITEM FROM CART

        $(document).on("click", "body .cart_delete", function () {

            var product_id = $(this).attr("data-id");

            delete myCart[product_id];

            var size = Object.size(myCart);
            console.log(myCart);
            $(".cartCircle").html(size);

            var deleteItem;

            $.each(myProducts, function (i, item) {
                if (item.id == product_id) {
                    deleteItem = i;
                }
            });

            if (deleteItem != undefined) {
                myProducts.splice(deleteItem, 1);
            }

            buildCart();

        });

        // MOVE TO STEP TWO

        $(document).on("click", "body #checkout", function () {
            $("#cartTable").hide();
            $(".checkout").show();

        });





        // STEP TWO IN THE CART ( THREE SETS OF BUTTONS)

        $(document).on("click", "body #createAccount", function () {
            $(".hideAll").hide();
            $(".createAccount").show();
        });


        // CREATE ACCOUNT
        // ACTIVATE FORM

        $(document).on("click", "body #ca_loginOK", function () {
            //alert("Please Please More sir!");
            $("#createAccountForm").submit();
        });

        // SUBMISSION OF CREATE ACCOUNT FORM

        $("#createAccountForm").on('submit', function (e) {

            e.preventDefault();

            let validate = false;
            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/create_account.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        $('#ca_loginOK').attr("disabled", "disabled");
                        $('#createAccountForm').css("opacity", "0.5");
                    },

                    success: function (data) {
                        alert(data.error.message);
                        alert("USER ID: " + data.user_id);

                        $('#createAccountForm').css("opacity", "");
                        $("#ca_loginOK").removeAttr("disabled");
                    }

                });
            }
        });


        // GUEST INFO DISPLAY

        $(document).on("click", "body #guest", function () {
            $(".hideAll").hide();
            $(".shippingAndBilling").show();
        });


        // LOGIN SCREEN

        $(document).on("click", "body #login", function () {
            $(".hideAll").hide();
            $(".login").show();
        });


        // GO BUTTON ON LOGIN SCREEN TO SUBMIT CREDENTIALS

        $(document).on("click", "body #loginOK", function () {
            $("#loginForm").submit();
        });

        // LOGIN FORM SUBMISSION

        $("#loginForm").on('submit', function (e) {

            e.preventDefault();

            let validate = false;


            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/login_account.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        $('#loginOK').attr("disabled", "disabled");
                        $('#loginForm').css("opacity", "0.5");
                    },

                    success: function (data) {

                        if (data.error.id == "0" && data.ea_user_id != "-1") {
                            // success
                            $("#ea_user_id").val(data.ea_user_id);

                            $('.login').hide();
                            $("#billing_name_first").val(data.billing_name_first);
                            $("#billing_name_last").val(data.billing_name_last);
                            $('.shippingAndBilling').show();
                        } else {
                            alert(data.error.message);
                        }

                        $('#loginForm').css("opacity", "");
                        $("#loginOK").removeAttr("disabled");
                    }

                });
            }
        });


        // MOVE TO STEP THREE, SCREEN BUTTON CALLED CONTINUE AFTER USER SUBMITS THEIR DATA

        $(document).on("click", "body #go_to_three", function () {
            $(".hideAll").hide();
            $(".payment").show();
        });


        // STEP FOUR IN THE CART (GET THE PAYMENT INFO)

        // SUBMIT THE PAYMENT FORM AFTER CLICKING THE COMPLETE BUTTON 

        $(document).on("click", "body #go_to_four", function () {
            //alert("Please Please More sir!");
            $("#paymentForm").submit();
        });


        $("#paymentForm").on('submit', function (e) {

            e.preventDefault();

            let validate = false;

            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/make_payment.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        $('#go_to_three').attr("disabled", "disabled");
                        $('#paymentForm').css("opacity", "0.5");
                    },

                    success: function (data) {
                        //alert("DONE: "+data);


                        //alert("USER ID: " + data.ea_user_id);

                        if (data.error.id == "0") {
                            // save to hidden field transaction code
                            alert(data.transaction_code);

                            $("#transaction_code").val(data.transaction_code);

                            // save items to hidden fields
                            var content = "";
                            $.each(myCart, function (i, item) {
                                content += `<input name="myCart[${i}]" type="hidden" value="${item}">`;

                            });

                            $(".products_to_purchase").html(content);

                            // SUBMIT THE SHIPPIN AND BILLING ALREADY FILLED OUT.
                            $("#shippingAndBillingForm").submit();

                        } else {
                            alert(data.error.message);
                        }

                        $('#paymentForm').css("opacity", "");
                        $("#go_to_three").removeAttr("disabled");
                    }
                });

            }
        });


        // SECOND FORM SUBMITTED WHEN ON THE THIRD SCREEN AND GOING TO THE LAST FOURTH SCREEN.

        $("#shippingAndBillingForm").on('submit', function (e) {

            alert("LINE 702");

            e.preventDefault();

            let validate = false;

            if (validate) {
                alert(message);
            } else {

                $.ajax({
                    type: 'POST',
                    url: "services/make_invoice.php",
                    data: new FormData(this),
                    dataType: "json",
                    contentType: false,
                    cache: false,
                    processData: false,

                    beforeSend: function () {
                        //alert("Fading screen");
                        //$('#go_to_three').attr("disabled", "disabled");
                        //$('#paymentForm').css("opacity", "0.5");
                    },

                    success: function (data) {
                        //alert("DONE: "+data);

                        if (data.error.id == "0" && data.ea_user_id != "-1") {
                            submitInvoice();
                        } else {
                            alert(data.error.message);
                        }

                        $(".hideAll").hide();
                        // create invoice from myCart
                        $(".invoice").show();
                        //$('#paymentForm').css("opacity", "");
                        //$("#go_to_three").removeAttr("disabled");
                    }

                });
            }
        });








    }
);