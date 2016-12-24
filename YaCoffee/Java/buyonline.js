function loadProducts() {
  $.ajax({
    type: "GET",
    data: {
      data: 1
    },
    url: "/buy/loadProducts",
    success: function(data) {
      products = data;
      console.log(products);
    },
    async: false,
    global: false
  });
}

function addCart() {
  var cart = JSON.parse(sessionStorage.getItem('result')) || [];
  console.log(cart);
  $('.detail-cart').remove();
  for (var i = 0; i < cart.length; i++) {
    var detail = $('<div class="detail-cart col-md-12"></div>');
    var img = $('<div class="image col-md-4"><img src="' + cart[i][0].pImg + '"></div>');
    var name = $('<div class="name col-md-5"><span>' + cart[i][0].pName + '</span></div>');
    var quantity = $('<div class="quantity col-md-1"><span>' + cart[i][0].pQuan + '</span></div>');
    var del_btn = $('<div class="btn-delete col-md-2"><button type="button" class="btn btn-danger" onclick="del(' + cart[i][0].pId + ')">Xoá</button></div>');
    detail.append(img, name, quantity, del_btn);
    $('.frame').append(detail);
  }
}

function del(id) {
  var cart = JSON.parse(sessionStorage.getItem('result')) || [];
  var i = 0;
  var b = true;
  while (i < cart.length && b) {
    if (cart[i][0].pId === id) {
      b = false;
      var number = sessionStorage.getItem('quantity');
      var num = Number(number) - cart[i][0].pQuan;
      sessionStorage.setItem('quantity', num);
      $('#quantity-product').text(num);
      cart.splice(i, 1);
      sessionStorage.setItem('result', JSON.stringify(cart));
      console.log(cart);
    }
    i++;
  }
  addCart();
}

function loadProductsData() {
  for (var i = 0; i < products.length; i++) {
    var li = $('<li class="item-' + products[i].id + '"></<li>');
    var img = $('<div id="product-img"><img src="' + products[i].imageDirect + '" alt="No"></div>');
    var name = $('<h2>' + products[i].name + '</h2>');
    var price = $('<p class="product-price"><span>' + products[i].price + ' VND</span></p>');
    var quantity = $('<div><input id="product-' + products[i].id + '" class="product-quantity" type="number" min="1" max="20" value="1"/><div>');
    var choose = $('<button type="button" onclick="chooseProduct(' + products[i].id + ')">Chọn</button>');
    li.append(img, name, price, quantity, choose);
    $('.list-content').append(li);
  }
  var number = sessionStorage.getItem('quantity') || "0";
  $('#quantity-product').text(Number(number));
  addCart();
}

function findProductData(id, quantity) {
  var i = 0;
  var b = true
  var array = [];
  while (i < products.length && b) {
    if (products[i].id === id) {
      b = false;
      var data = {pId: products[i].id, pName: products[i].name, pPrice: products[i].price, pImg: products[i].imageDirect, pDesc: products[i].description, pQuan: Number(quantity)};
      array.push(data);
    }
    i++;
  }
  return array;
}

function chooseProduct(id) {
  var choose = "#product-" + id;
  var quantity = $(choose).val();
  var result = findProductData(id, quantity);

  var number = sessionStorage.getItem('quantity') || "0";
  var num = Number(number) + result[0].pQuan;
  sessionStorage.setItem('quantity', num);
  $('#quantity-product').text(num);

  var old = JSON.parse(sessionStorage.getItem('result')) || [];

  var i = 0;
  var b = true;
  while (i < old.length && b) {
    if (old[i][0].pId === result[0].pId) {
      b = false;
      old[i][0].pQuan += result[0].pQuan;
    }
    i++;
  }

  if (b == true) {
    old.push(result);
  }
  sessionStorage.setItem('result', JSON.stringify(old));
  console.log(sessionStorage['result']);
  addCart();
  return false;
}

window.onload = function() {
  loadProducts();
  loadProductsData();
}
