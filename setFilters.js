// This file include methods to create and store filter objects in localstorage before moving on to next page.

function setLocationFilter(loc){
    localStorage.setItem('filter',JSON.stringify({location:loc}));
    window.location.href='jobs.html';
}
document.getElementById('search-btn').addEventListener('click',processSearchInput);

function processSearchInput(event){
    event.preventDefault();
    // search based on SDC is currently not implemented
    var location = document.getElementById('locationInput').value;
    console.log('hi');
    if(location != '' ){
        setLocationFilter(location);
    }

}