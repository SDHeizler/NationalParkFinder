"use scrict"
// First function to run(calls user input)
$(getUserInput());
// Get user input(state and number of results *default of 10*)
function getUserInput() {
    console.log('App loaded')
    $('form').on('submit', function (event) {
        event.preventDefault();
        let state = $('#js-state').val();
        let resultNum = $('#js-number').val();
        changeState(state);
        const getState = changeState(state);
        getParks(getState, resultNum);
        $('#results').empty();
    })
}
//Enter user input to the API GET request
function changeState(state) {
    const array = state.split(" ");
    if (array.length < 2) {
        let word = `q=${array}`;
        return word;
    } else {
        let twoWords = `q=${array[0]}%20${array[1]}`;
        return twoWords;
    }
};
function getParks(getState, resultNum) {
    const options = { method: "GET" };
    const url = `https://developer.nps.gov/api/v1/parks?limit=${resultNum}&${getState}&api_key=yPMKudzkm81S3EdXbKQKANCkSt1UocuaQ7IsSIaX`;

    fetch(url, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (responseJson) {
            displayResults(responseJson);
        })

}
// Loop through the response and display the results on the screen
function displayResults(responseJson) {
    console.log(responseJson);
    responseJson.data.forEach(function (ele) {
        console.log(ele);
        $('#results').append(`<li>
                    <h2>${ele.fullName}</h2>
                    <p>${ele.description}</p>
                    <h4>${ele.fullName}:<a href="${ele.url}" target="_blank">WebSite Link</a><h4>
                </li>`)
    });
    $('#js-state').val("");
    $('#js-number').val("10");
}