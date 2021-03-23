const capitalize = require('capitalize');

module.exports = async function (page, prefill, selectors) {
    var extracted = {}
    var titles = {}

    for (let [field, data] of Object.entries(selectors)) {
        const { title, value, extractor } = data;
        const name = await page.$eval(title, el => el.textContent);
        const unparsed = await page.$eval(value, el => el.textContent);
        const parsed = extractor(unparsed);

        titles[`${capitalize(field)}`] = name
        extracted[`${field}`] = parsed;
    }

    return Object.assign({}, prefill, extracted, { titles })
}
