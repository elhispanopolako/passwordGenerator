const resultEl = document.getElementById('result')
const lenghtEl = document.getElementById('lenght')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const clipboardEl = document.getElementById('clipboard')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
generateEl.addEventListener('click', () => {
    const lenght = +lenghtEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, lenght)
})
clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea')
    const password = resultEl.innerText
    if (!password) { return }
    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied to clipboard')
})

function generatePassword(lower, upper, number, symbol, lenght) {
    let generatedPassword = ''
    const typesCount = lower + upper + number + symbol
    const typesArr = [{ lower }, { upper }, { number }, { symbol }]
        .filter(item => Object.values(item)[0])
    if (typesCount === 0) {
        return ''
    }
    for (let i = 0; i < lenght; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }
    const finalPassword = generatedPassword.slice(0, lenght)
    return finalPassword
}
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.+-_'
    return symbols[Math.floor(Math.random() * symbols.length)]
}