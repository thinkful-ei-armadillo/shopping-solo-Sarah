'use strict';

const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element ${item.checked ? "shopping-item__checked" : ''}" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item">${item.name}</span>
      
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-delete js-item-edit">
            <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join("");
}



function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  //handleTextEdit();
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

// name says it all. responsible for deleting a list item.
function deleteListItem(itemIndex) {
  console.log(`Deleting item at index  ${itemIndex} from shopping list`)

  // as with `addItemToShoppingLIst`, this function also has the side effect of
  // mutating the global STORE value.
  //
  // we call `.splice` at the index of the list item we want to remove, with a length
  // of 1. this has the effect of removing the desired item, and shifting all of the
  // elements to the right of `itemIndex` (if any) over one place to the left, so we
  // don't have an empty space in our list.
  STORE.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    // get the index of the item in STORE
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
}


function handleCheckBox() {
    $('#hide-checkbox').on('change', '#js-hide-checkbox', event => {
    $('.js-shopping-list').find('.shopping-item__checked').toggleClass('hidden');
    console.log( $('.js-shopping-list').find('.shopping-item__checked'))
    });
  }
 
  function filterSearchItem(input) {
    STORE.filter(item => item.name.includes(input));
    // Logic to update the list
  }

function handleSearchItem(){
$('.topnav').on("click", "button", event =>{
    console.log(`handleSearchItem is running`)
    event.preventDefault();
    const searchList =$('.js-search-list').val();
    filterSearchItem(searchList);
})      
 renderShoppingList();   
};
// function handleSearchItem(element) {
//     let value = $(element).val().toLowerCase();
//     $("js-shopping-list > li").hide().filter(function() {
//         return $(this).text().toLowerCase().indexOf(value) > -1;
//     }).show();
// }

function EditItemList(itemIndex, word){
    STORE.splice(itemIndex, 1, word);
}

function handleTextEdit() {
 // this function will allow users to edit the existing listed items   
 //listen to the edit button, and run the function  for the li  
 $('.js-item-index-element').on('click', '.js-item-edit', (function() {
    console.log('handleTextEdit is running');
  //make sure page doesn't stay in default  
    event.preventDefault
// declare item index is the item that is being click on from getItemIndexFromElement func
    let itemIndex= getItemIndexFromElement(event.target);
 // capture the new edited item to the input
 let editedItem =    
  }));

};





function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCheckBox();
  handleSearchItem();
  handleTextEdit();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);