var lastRenderedGrid = 0
var filteredObject, allObjects
var categories = []
var allCategories = []
var $checkbox;
var sort = "none"
var sortDesc;

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
          $('.spinner').show()
          render()
      });

      $('#sort').change(function() {
          sort = $(this).val()
          sortDesc = $(this).children(":selected").attr("id");
          $('.spinner').show()
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
  filteredObject = JSON.parse(JSON.stringify(allObjects))
  if(allCategories.length > 0) {
    filteredObject = $(filteredObject).filter(function( idx ) {
                    return $.inArray(allObjects[idx].cat, allCategories) >= 0
                  });
  }
  if(sort != 'none') {
    filteredObject = filteredObject.sort(function(a, b) {
                        if(sortDesc) {
                          return parseFloat(b[sort]) - parseFloat(a[sort]);
                        }
                        return parseFloat(a[sort]) - parseFloat(b[sort]);
                      });
  }

  $(".grid-collection").hide().fadeIn('slow').empty()
  lastRenderedGrid = 0
  $('.spinner').hide()
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

function capitalizeString( value ) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatRupees( money )
{
 var regexPattern = /(\d+)(\d{3})/;
 var totalPrefix = 0;
 var formatters = parseInt((money.length/2)-1);
  while (regexPattern.test(money))
  {
    if(totalPrefix > 0)
      money = money.replace(regexPattern, '$1' + ',' + '$2');
    else {
      money = money.replace(regexPattern, '$1' + ',' + '$2');
      rgx = /(\d+)(\d{2})/;
    }
    totalPrefix++;
    formatters--;
    if(formatters == 0)
    {
      break;
    }
  }
 return 'Rs.'+money;
}

function renderContentGrid(index) {
  $('#temp img').attr('src', filteredObject[index].img)
  $('#temp h2').html("Name : " + capitalizeString(filteredObject[index].name))
  $('#temp h3').html("Price : " + formatRupees(filteredObject[index].price.toString()))
  $('#temp p').html("Category : " + capitalizeString(filteredObject[index].cat))
  $('#temp span').html("Score : " + filteredObject[index].score)
  return $("#temp").html()
}
