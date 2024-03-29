let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let spinner = document.getElementById("spinner");

function CreateAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;
    let result_container = document.createElement('div');
    result_container.classList.add("result-item");
    searchResults.appendChild(result_container);

    let title_anker = document.createElement('a');
    title_anker.classList.add("result-title");
    title_anker.href = link;
    title_anker.target = "_blank";
    title_anker.textContent = title;
    result_container.appendChild(title_anker);

    let break_element = document.createElement('br');
    result_container.appendChild(break_element);

    let url_anker = document.createElement('a');
    url_anker.classList.add("result-url");
    url_anker.href = link;
    url_anker.target = "_blank";
    url_anker.textContent = link;
    result_container.appendChild(url_anker);

    let break2_element = document.createElement('br');
    result_container.appendChild(break2_element);

    let description_element = document.createElement('p');
    description_element.classList.add("link-description");
    description_element.textContent = description;
    result_container.appendChild(description_element);
}

function display_results(search_results) {
    for (let i of search_results) {
        CreateAndAppendResult(i);
    }
}

function searchwikipedia(event) {
    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchResults.textContent = "";
        let input = searchInput.value;
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + input;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                // console.log(jsondata);
                let {
                    search_results
                } = jsondata;
                // console.log(search_results);
                spinner.classList.toggle("d-none");
                display_results(search_results);
            });

    }

}
searchInput.addEventListener("keydown", searchwikipedia);