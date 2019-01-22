'use strict';

const STORE = {
  items: [
    { name: 'apples', checked: false },
    { name: 'oranges', checked: false },
    { name: 'milk', checked: true },
    { name: 'bread', checked: false }
  ],
  query: '',
  checkHidden: false
};

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element ${
      item.checked ? 'shopping-item__checked' : ''
    }" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item">${item.name}</span>
      <input type="text" value="${item.name}" class="edit-text"/>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
        </button>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  let items = shoppingList;
  if (STORE.query) {
    items = items.filter(item => item.name.includes(STORE.query));
  }

  if (STORE.checkHidden) {
    items = items.filter(item => !item.checked);
  }

  items = items.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
  //handleTextEdit();
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({ name: itemName, checked: false });
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
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
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

// responsible for deleting a list item.
function deleteListItem(itemIndex) {
  console.log(`Deleting item at index  ${itemIndex} from shopping list`);
  STORE.items.splice(itemIndex, 1);
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
    /* $('.js-shopping-list')
      .find('.shopping-item__checked')
      .toggleClass('hidden');*/
    //debugger;

    let setting = $(event.currentTarget).prop('checked');
    setHideChecked(setting);
    renderShoppingList();

    console.log($('.js-shopping-list').find('.shopping-item__checked'));
  });
}

function setHideChecked(input) {
  if (input === true) {
    STORE.checkHidden = true;
  } else {
    STORE.checkHidden = false;
  }
}


function filterSearchItem(input) {
  //debugger;
  STORE.query = input;
  // Logic to update the list
}

function handleSearchItem() {
  $('.topnav').on('click', 'button', event => {
   // debugger;
    console.log(`handleSearchItem is running`);
    const searchList = $('.js-search-list').val();
    filterSearchItem(searchList);
    renderShoppingList();
  });
}

function EditItemList(itemIndex, word) {
    //console.log(word,STORE.items[itemIndex]);
  STORE.items.splice(itemIndex, 1, {name: word, checked: false});
}

function handleTextEdit() {
  // this function will allow users to edit the existing listed items
  //listen to the edit button, and run the function  for the li
  $('.js-shopping-list').on('click', '.js-item-edit', function(event) {
    console.log('handleTextEdit is running');
    //make sure page doesn't stay in default
    event.preventDefault();
    // declare item index is the item that is being click on from getItemIndexFromElement func
    //let itemIndex = getItemIndexFromElement(event.target);
    // capture the new edited item to the input
    //let editedItem = generateItemElement(input) 
    $(this).parent().siblings('.shopping-item').hide();
    $(this).parent().siblings('.edit-text').show().focus();

    //renderShoppingList();
  });

  $('.js-shopping-list').on('keypress','.edit-text',function(event){
      if(event.which == 13){
          let editedItem = $(this).val();
          $(this).hide();
          let index = getItemIndexFromElement(event.target);
          EditItemList(index,editedItem);
          renderShoppingList();
          //$(this).siblings('.shopping-item').text(editedItem).show();
      }
  });
}

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