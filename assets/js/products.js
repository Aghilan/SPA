var lastRenderedGrid = 0;
var filteredObject, allObjects;

$(document).ready(function(){
    $.getJSON( "https://test-prod-api.herokuapp.com/products", function( data ) {
      allObjects = data.products;
      filteredObject = allObjects;
      if(true) {

        //Sample Filtering based on Category
        filteredObject = $(allObjects).filter(function( idx ) {
                            return allObjects[idx].cat === "jeans";
                          });

        //Sample Sorting based on Price
        filteredObject = filteredObject.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
      }
      renderCardSet(lastRenderedGrid)
      var win = $(window);
      win.scroll(function() {
  		  var scrollHeight = $(document).height() - win.height()
        if ( scrollHeight > win.scrollTop() - 10 && scrollHeight < win.scrollTop() + 10) {
    			lastRenderedGrid+= 9
          renderCardSet(lastRenderedGrid)
        }
  	   });
    });
});

function renderCardSet(setIndex) {
  $('.grid-collection').append($("<div>", {class: "grid-set"}).html(renderContentRow(setIndex).add(renderContentRow(setIndex+3)).add(renderContentRow(setIndex+6))))
}

function renderContentRow( rowIndex ) {
  var $left = $("<div>", {class: "grid-card"}).html(renderContentGrid(rowIndex));
  var $center = $("<div>", {class: "grid-card"}).html(renderContentGrid(rowIndex+1));
  var $right = $("<div>", {class: "grid-card"}).html(renderContentGrid(rowIndex+2));
  return $("<div>", {class: "grid-row"}).html($left.add($center).add($right))
}

function renderContentGrid(index) {
  $('#temp img').attr('src', filteredObject[index].img)
  $('#temp h2').html(filteredObject[index].name)
  $('#temp h3').html(filteredObject[index].price)
  $('#temp p').html(filteredObject[index].cat)
  $('#temp span').html(filteredObject[index].score)
  return $("#temp").html()
}
