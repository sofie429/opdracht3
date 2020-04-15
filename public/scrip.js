// init Isotope
var iso = new Isotope( '.bloggrid', {
  itemSelector: '.element-item',
  layoutMode: 'fitRows',
  getSortData: {
    naam: '.naam',
    prijs: '.prijs'
  }
});

// change is-checked class on buttons
var buttonGroups = document.querySelectorAll('.button-group');
for ( var i=0; i < buttonGroups.length; i++ ) {
  buttonGroups[i].addEventListener( 'click', onButtonGroupClick );
}

function onButtonGroupClick( event ) {
  // only button clicks

  if ( !matchesSelector( event.target, '.button' ) ) {
    return;
  }
  var button = event.target;
  button.parentNode.querySelector('.is-checked').classList.remove('is-checked');
  button.classList.add('is-checked');
}

// NOTE: laatste deel moet erbij als er nieuwe knoppen worden aangemaakt

// bind filter button click
var filtersElem = document.querySelector('.filters-button-group');
filtersElem.addEventListener('click', function( event ) {
  // only work with buttons

  if ( !matchesSelector( event.target, 'button' ) ) {
    return;
  }
  var filterValue = event.target.getAttribute('data-filter');
  // use matching filter function

  iso.arrange({ filter: filterValue });
  console.log('test');

});
