const vin = require('vehicle-identification-number')

/** Use for testing: https://regex101.com/ */
const extractors = {
    AmountKronor: /([0-9]+ kronor)/g,
    VIN: /([a-zA-Z0-9]{9}[a-zA-Z0-9-]{2}[0-9]{6})/g,
    Year: /([0-9]{4})/g,
    Inspection: /[0-9]{4}\-[0-9]{2}\-[0-9]{2}/g, // 2022-03-31
    Dioxide: /([0-9,]+ g.km)/g, // 150 g/km
    Consumption: /([0-9,]+ l.100km)/g, // 5,7 l/100km
    SecondLine: /.*/gm,
}

module.exports = {
    extractors,
    selectors: {
        annualTax: {
            title: '#ts-skattCollapse > div > div > div:nth-child(2) > p > strong',
            value: '#ts-skattCollapse > div > div > div:nth-child(2) > p',
            extractor: (value) => value.match(extractors.AmountKronor)[0],
        },
        /* 
        vin: {
            title: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(10) > p > strong > a',
            value: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(10) > p',
            extractor: (value) => vin.parse(value.match(extractors.VIN)[0]),
        }, //*/
        year: {
            title: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(8) > p > strong > a',
            value: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(8) > p',
            extractor: (value) => value.match(extractors.Year)[0],
        },
        maker: {
            title: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(2) > p > strong',
            value: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(2) > p',
            extractor: (value) => value.match(extractors.SecondLine)[3].trim(),
        },
        model: {
            title: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(3) > p > strong > a',
            value: '#ts-fordonsidentitetCollapse > div > div > div:nth-child(3) > p',
            extractor: (value) => value.match(extractors.SecondLine)[3].trim(),
        },
        inspection: {
            title: '#ts-besiktningCollapse > div > div > div:nth-child(1) > p > strong',
            value: '#ts-besiktningCollapse > div > div > div:nth-child(1) > p',
            extractor: (value) => value.match(extractors.Inspection)[0],
        },
        dioxide: {
            title: '#ts-miljoCollapse > div > div:nth-child(5) > div:nth-child(3) > p > strong',
            value: '#ts-miljoCollapse > div > div:nth-child(5) > div:nth-child(3) > p',
            extractor: (value) => value.match(extractors.Dioxide)[0],
        },
        consumption: {
            title: '#ts-miljoCollapse > div > div:nth-child(9) > div:nth-child(3) > p > strong',
            value: '#ts-miljoCollapse > div > div:nth-child(9) > div:nth-child(3) > p',
            extractor: (value) => value.match(extractors.Consumption)[0],
        },
    }
}
