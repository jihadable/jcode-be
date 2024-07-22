const tribonacci = n => {
    if (n <= 3) return n

    return tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3)
}

// console.log(tribonacci(5))
// console.log(tribonacci(10))
// console.log(tribonacci(15))
// console.log(tribonacci(17))
// console.log(tribonacci(20))

const segitigaWarna = barisWarna => {
    let data = {
        "MM": "M",
        "MB": "H",
        "MK": "H",
        "MH": "B",
        
        "BM": "H",
        "BB": "B",
        "BK": "M",
        "BH": "K",
        
        "KM": "H",
        "KB": "M",
        "KK": "K",
        "KH": "M",
        
        "HM": "B",
        "HB": "K",
        "HK": "M",
        "HH": "H"
    }

    while (barisWarna.length > 1){
        let nextBaris = []

        for (let i = 0; i < barisWarna.length - 1; i++){
            let left = barisWarna[i]
            let right = barisWarna[i + 1]
            let campur = left + right
            
            nextBaris.push(data[campur])
        }

        barisWarna = [...nextBaris]
    }

    return barisWarna[0]
}

// console.log("M: ", segitigaWarna("M".split("")))
// console.log("KH: ", segitigaWarna("KH".split("")))
// console.log("BKM: ", segitigaWarna("BKM".split("")))
// console.log("HHBK: ", segitigaWarna("HHBK".split("")))
// console.log("MMMBH: ", segitigaWarna("MMMBH".split("")))
// console.log("BMHBBK: ", segitigaWarna("BMHBBK".split("")))
// console.log("KKKKKKK: ", segitigaWarna("KKKKKKK".split("")))
// console.log("KMKMBBHH: ", segitigaWarna("KMKMBBHH".split("")))
// console.log("HBKMHBKMH: ", segitigaWarna("HBKMHBKMH".split("")))
// console.log("MKBHHBKMMB: ", segitigaWarna("MKBHHBKMMB".split("")))