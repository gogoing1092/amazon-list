'use strict';

// used as example https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/extensions/download_images/popup.js

// Script code to inject on page
// Selects images then returns array of their currentSrc
const collectListItems =
  `(function() {
      let tableWithItems = document.getElementById('g-items');
      let iNames = tableWithItems.querySelectorAll("[id^='itemName_']");
      let names = (Array.from(iNames)).map( function(e) { return e.title; });
      let iPrices = tableWithItems.querySelectorAll("[id^='itemPrice_']");
      let prices = (Array.from(iPrices)).map( function(e) { 
          return e.getElementsByClassName('a-price-whole')[0].innerText + e.getElementsByClassName('a-price-fraction')[0].innerText ; 
        } );

      let result = names.map( function (n, ind) { return { name : n, price: prices[ind] }; } );
      return result
    })();`;


let changeColor = document.getElementById('changeColor');
//let itemsList = document.getElementById('itemsList');

//console.log("runnnig popup.js");

/*
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };

*/

function fillTextArea(items) {
  let txt = items.reduce(function (arr, cur) { 
    return arr + cur.name + "\t" + cur.price + "\n"; 
  }, '');
  itemsList.value = txt;
}

chrome.tabs.executeScript({code: collectListItems}, function(result) {
   fillTextArea(result[0]);
});