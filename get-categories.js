const fs = require('fs')

const toronto = JSON.parse(fs.readFileSync('./data/cityDetails/toronto_details.json'))
toronto.pop()

const all = []
toronto.forEach(dataPoint => {
    const label1 = dataPoint.label
    const dataa = []
    dataPoint.data.forEach(label => {
        dataa.push(label.label)
        dataa.push(label.type)
    })
    newObj = {}
    newObj[label1] = dataa
    all.push(newObj)
})

fs.writeFileSync('./data/barcelona/toronto_allLabels.json', JSON.stringify(all))

// console.log(toronto[0])