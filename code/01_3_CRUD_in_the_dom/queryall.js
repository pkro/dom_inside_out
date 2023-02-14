
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('textarea[name=source]');
    textarea.addEventListener('input', (e) => {
        refreshOutput(e.target.value);
    });

    document.forms.queryall.addEventListener('submit', (ev) => {
        ev.preventDefault();

        const query = ev.target.selector.value;
        refreshQuery(query);
        return false;
    });

    // add a listener for delete button on the form itself
    document.forms.queryall.addEventListener('click', ev => {
        switch (ev.target.id) {
            case 'delete':
                deleteMatches();
                break;

            case 'textify':
                textifyMatches();
                break;

        }
    });

    refreshOutput(textarea.value);
});

function deleteMatches() {
    const output = document.querySelector('#output');
    const selector = document.querySelector('#selector').value;
    output.querySelectorAll(selector).forEach((el) => {
        el.parentElement.removeChild(el);
    });
    refreshQuery(selector);
}

function textifyMatches() {
    const output = document.querySelector('#output');
    const selector = document.querySelector('#selector').value;
    output.querySelectorAll(selector).forEach((el) => {
        const text = document.createTextNode(el.innerText);
        el.parentElement.replaceChild(text, el);
    });
    refreshQuery(selector);
}

function refreshQuery(selector) {
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
