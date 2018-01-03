 'use strict';
function supportsLocalStorage() {
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch(e){
        return false;
      }
    }

    // Retrieve searches from Local Storage, return an array
    function getRecentSearches() {
      var searches = localStorage.getItem('recentSearches');
      if (searches) {
        return JSON.parse(searches);
      }
      return [];
    }

    // Validate and save strings to store of past searches
    function saveSearchString(str) {
      var searches = getRecentSearches();
      console.log(searches);
    console.log(searches.indexOf(str) > -1);
    console.log(!str);
      if (searches.indexOf(str) > -1 || !str) {
        return false;
        console.log("here");
      }
      searches.push(str);
      localStorage.setItem('recentSearches', JSON.stringify(searches));
      return true;
    }

    // Clear out searches
    function removeSearches() {
      localStorage.removeItem('recentSearches');
    }

    // Create an li, given string contents, append to the supplied ul
    function appendListItem(listElement, string) {
      var listItemElement = document.createElement('LI');
      listItemElement.innerHTML = string;
      listElement.appendChild(listItemElement);
    }

    // Empty the contents of an element (ul)
    function clearList(listElement) {
      listElement.innerHTML = '';
    }

    window.onload = function() {
      // Make sure Local Storage exists before trying to use it
      if (supportsLocalStorage()) {
        // Get references to DOM elements
        var searchForm = document.getElementById('registrar');
        var searchBar = document.querySelector('input');
        var recentSearchList = document.getElementById('invitedList');
      // var clearButton = document.getElementById('clearStorage');

        // Initialize display list
        var recentSearches = getRecentSearches();
        recentSearches.forEach(function(searchString) {
          appendListItem(recentSearchList,searchString);
        });
        event.preventDefault();
        //Set event handlers
        searchForm.addEventListener('submit', function(event) {
          var searchString = searchBar.value;
          console.log(searchString); // always empty
          if (saveSearchString(searchString)) {
            appendListItem(recentSearchList, searchString);
          }
        });

        // clearButton.addEventListener('click', function(event) {
        //   removeSearches();
        //   clearList(recentSearchList);
        // });
      }
    };