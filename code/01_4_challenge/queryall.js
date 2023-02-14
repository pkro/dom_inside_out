
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
    // remove previous markings
    const output = document.querySelector('#output');
    output.querySelectorAll(selector).forEach(el=> {
        el.parentElement.classList.remove('withBorder');
    })

    const matchesList = document.getElementById('matches');
    matchesList.innerHTML = '';
    const matches = document.querySelectorAll(selector);

    for (let i = 0; i < matches.length; i++) {
        const li = document.createElement('li');
        // outerHTML includes the tag of the element itself
        li.innerText = matches[i].outerHTML;
        matchesList.appendChild(li);
   }

    output.querySelectorAll(selector).forEach(el=> {
        el.parentElement.classList.add('withBorder');
    })
}

function refreshOutput(html) {
    const output = document.querySelector('#output');
    output.innerHTML = html;
}
