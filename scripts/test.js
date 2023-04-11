newObj = {
    potato: "Potato"
}

newObj["free"] = "What is this new thing"

le = 'potato'


console.log(JSON.parse(JSON.stringify(newObj)))
// console.log(newObj.potato)
console.log(newObj["potato"])
// console.log(newObj['123free'])