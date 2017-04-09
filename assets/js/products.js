var lastRenderedGrid = 0
var filteredObject, allObjects
var categories = []
var allCategories = []
var $checkbox;
var sort = "none"

$(document).ready(function(){
    $.getJSON( "https://test-prod-api.herokuapp.com/products", function( data ) {
      allObjects = data.products;
      allObjects.map(function(product) {
          var category = product.cat
          if ( categories.indexOf(category) == -1 ) {
            categories.push(category)
             $('<input />', { type: 'checkbox', class: 'category', value: category }).appendTo($('.filter'));
             $('<label />', { text: category }).add("<br />").appendTo($('.filter'));
          }
      })
      $('input.category').click(function () {
          allCategories= []
          $.each($('.category:checkbox:checked'), function( key, checkedValue ) {
            allCategories.push(checkedValue.value)
          })
          render()
      });

      $('#sort').change(function() {
          sort = $(this).val()
          render()
      });
      render()
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

function render(){
  if(allCategories.length > 0) {
    filteredObject = $(allObjects).filter(function( idx ) {
                    return $.inArray(allObjects[idx].cat, allCategories) >= 0
                  });
  }
  else {
    filteredObject = allObjects
  }
  if(sort !== 'none') {
    filteredObject = filteredObject.sort(function(a, b) {
                        return parseFloat(a[sort]) - parseFloat(b[sort]);
                      });
  }
  $(".grid-collection").hide().fadeIn('slow').empty()
  lastRenderedGrid = 0
  renderCardSet(lastRenderedGrid)
}


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
