let array = [1 + (Math.floor(Math.random() * Math.floor(6))), 1 + (Math.floor(Math.random() * Math.floor(6))), 1 + (Math.floor(Math.random() * Math.floor(6)))]

array.sort()
array.reverse()
console.log(array)
let results = {}

findResults(results)


console.log(results)

function findResults(results) {
    results.score = checkScore(array)
    results.points = checkTriple(array)
    if(results.points) {
        return results
    }
    results.points = checkDoubleOne(array)
    if(results.points) {
        return results
    }
    results.points = checkSuite(array)
    if(results.points) {
        return results
    }
    results.points = check421(array)
    if(results.points) {
        return results
    }
    if(!results.points) {
        results.points = 1
        return results
    }
}
function checkTriple(array) {
    let count = 1
    for (let i = 0; i < array.length; i++) {
        if (array[i] == array[i - 1]) {
            count += 1
        }
    }
    if (count == 3) {
        console.log('triple', array[0])
        if (array[0] == 1) {
            return 7
        }
        else {
            return array[0]
        }
    }
}
function check421(array) {
    let tab = [4, 2, 1]
    if (array.join('') == tab.join('')) {
        console.log("421")
        return 8
    }
}
function checkDoubleOne(array) {
    let count = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] == 1) {
            count += 1
        }
    }
    if (count == 2) {
        console.log('DOUBLE 1', array[0])
            return array[0]
        }
    }
function checkTriple(array) {
    let count = 1
    for (let i = 0; i < array.length; i++) {
        if (array[i] == array[i - 1]) {
            count += 1
        }
    }
    if (count == 3) {
        console.log('triple', array[0])
        if (array[0] == 1) {
            return 7
        }
        else {
            return array[0]
        }
    }
}
function checkSuite(array) {
    let count = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i] == array[i - 1] - 1) {
            count += 1
        }
    }
    if (count == 2) {
        console.log('SUITE', array[0])
        return 2
    }
}
function check421(array) {
    let tab = [4, 2, 1]
    if (array.join('') == tab.join('')) {
        console.log("421")
        return 8
    }
}
function checkScore(array) {
    return Number(array.join(''))
}