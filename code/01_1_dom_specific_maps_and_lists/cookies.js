// calculate and will the "total weight" empty cell
document.addEventListener('DOMContentLoaded', () => {
    const ingredientTableBody = document.getElementById('ingredients');
    let totalWeight = 0;
    Array.prototype.forEach.call(ingredientTableBody.children, (tr) => {

        // if(tr.attributes['id'] === 'totals') { // this doesn't work as attributes['id'] returns an object
        if(tr.id === 'totals') { // this DOES work
            return;
        }
        const secondTd = tr.children[1];
        // note that the text in the td isn't the nodeValue but actually another node!
        const weight = secondTd.firstChild ? secondTd.firstChild.nodeValue.trim() : 0;
        // or
        // const weight = secondTd.innerText
        // + for quick number conversion
        totalWeight += +weight;
    });

    const totalWeightCell = document.getElementById('totals')
        .children[1];
    totalWeightCell.textContent = totalWeight;

});
