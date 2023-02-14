/* eslint no-undef: "error" */
/* eslint-env browser */

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('textarea[name=source]');
    textarea.addEventListener('input', (e) => {
        refreshOutput(e.target.value);
    });

    // we could use document.addEventListener('submit', (ev)=> {...
    // if we had just one form on the page
    document.forms.queryall.addEventListener('submit', (ev) => {
        ev.preventDefault();

        // e.target is the queryall form which has the fields with their names
        // as named properties
        const query = ev.target.selector.value;
        refreshQuery(query);
        return false;
    });

    refreshOutput(textarea.value);
});

function refreshQuery(selector) {
    const output = document.querySelector('#output');
    const matchesList = document.getElementById('matches');
    matchesList.innerHTML = '';
    const matches = document.querySelectorAll(selector);

    // we could use .forEach directly on matches but as forEach works
    // asynchronously on multipe elements at once they wouldn't be in document order
    // (I think)
    for (let i = 0; i < matches.length; i++) {
        const li = document.createElement('li');
        // outerHTML includes the tag of the element itself
        li.innerText = matches[i].outerHTML;
        matchesList.appendChild(li);
    }
}

function refreshOutput(html) {
    const output = document.querySelector('#output');

    output.innerHTML = html;
}
