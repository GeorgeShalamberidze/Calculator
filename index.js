const operands = /[\*+-/]/gi
function App() {

    const [value, setValue] = React.useState('0')
    const [result, setResult] = React.useState(0)
    const [hundred, setHundred] = React.useState(true)
    const [evaluated, setEvaluated] = React.useState(false)
    const [dot, setDot] = React.useState(true)

    const allClear = () => {
        setValue("0")
        setResult(0)
        setEvaluated(false)
        setDot(true)
        setHundred(true)
    }
    const clear = () => {
        if (value === 'NaN' || value.length < 2) {
            allClear()
        }
        else {
            setValue(value.split('').slice(0, value.length - 1).join('')
            )
        }
        setEvaluated(false)
        setDot(true)
        setHundred(true)
    }

    const hund = () => {
        if(value == '0'){
            return
        }
        if (!evaluated && !value.toString().match(/[\*/+-]/)) {
            if (hundred) {
                setValue(value / 100)
                setHundred(false)
                return
            }
            else {
                setValue(value * 100)
                setHundred(true)
                return
            }
        }
        setHundred(true)
    }

    const handleValue = (char) => {
        setValue(prev => prev === '0' ? char : prev + char)
        if (value[value.length - 1] == '=') {
            if (/[0-9.]/.test(char)) {
                setValue(char)
            }
            else {
                setValue(result + char)
            }
            return
        }
        if (value.length > 16) {
            setValue("Max Number of Digits")
            setTimeout(() => setValue(value), 500)
        }
        if (value.toString().includes('.') && char === '.') {
            setValue(value)
            return;
        }
        setEvaluated(false)
    }

    const evaluate = () => {
        if (value.match(operands) && !value.match(/[=]/)){
            setResult(eval(value.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('')))
            setValue(prev => prev + '=')
            setEvaluated(true)
            setDot(true)
        }
        return
    }   

    const operators = (char) => {
        setValue(prev => prev + char)
        if (value[value.length - 1] == '=') {
            if (/[0-9.]/.test(char)) {
                setValue(char)
            }
            else {
                setValue(result + char)
            }
            return
        }

        if (value[value.length - 1] == '*' || value[value.length - 1] == '/' || value[value.length - 1] == '+' || value[value.length - 1] == '-') {
            setValue(value.replace(value[value.length - 1], char))
        }
        setDot(true)
    }

    const decimal = (char) => {
        setValue(prev => prev === '0' ? prev + '.' : prev + char)
        setDot(false)
        if (dot === false) {
            setValue(value)
        }
    }

    return (
        <div className="text-center container">
            <div className="calc">
                <Formula
                    result={result}
                    value={value}
                />
                <Display
                    result={result}
                    value={value}
                    evalu={evaluated}
                />
                <Button
                    value={handleValue}
                    evaluate={evaluate}
                    clear={clear}
                    allClear={allClear}
                    hund={hund}
                    operators={operators}
                    decimal={decimal}
                />
                <WhiteLine />
            </div>
            <div className="author-div">
                <Author />
            </div>
        </div>
    )
}

function Formula({ value }) {
    return (
        <div id="formula">
            {value}
        </div>
    )
}

function Display({ value, result, evalu }) {
    return (
        <div id="display">
            {
                evalu
                    ? Math.floor(result * 100000) / 100000
                    : value
            }
        </div>
    )
}

function Button({ value, evaluate, clear, allClear, hund, operators, decimal }) {
    return (
        <div className="but">
            <button
                id="clear"
                value="AC"
                onClick={allClear}
            >
                AC
            </button>

            <button
                id="allClear"
                value="C"
                onClick={clear}
            >
                C
            </button>

            <button
                id="divideByHundered"
                onClick={hund}
                value="%"
            >
                %
            </button>

            <button
                id="divide"
                value="/"
                className="toggle"
                onClick={() => operators("/")}
            >
                ÷
            </button>

            <button
                id="seven"
                value="7"
                onClick={() => value("7")}
            >
                7
            </button>

            <button
                id="eight"
                value="8"
                onClick={() => value("8")}
            >
                8
            </button>

            <button
                id="nine"
                value="9"
                onClick={() => value("9")}
            >
                9
            </button>

            <button
                id="multiply"
                value="*"
                className="toggle"
                onClick={() => operators("*")}
            >
                x
            </button>

            <button
                id="four"
                value="4"
                onClick={() => value("4")}
            >
                4
            </button>

            <button
                id="five"
                value="5"
                onClick={() => value("5")}
            >
                5
            </button>

            <button
                id="six"
                value="6"
                onClick={() => value("6")}
            >
                6
            </button>

            <button
                id="subtract"
                value="-"
                className="toggle"
                onClick={() => operators("-")}
            >
                -
            </button>

            <button
                id="one"
                value="1"
                className="toggle"
                onClick={() => value("1")}
            >
                1
            </button>

            <button
                id="two"
                value="2"
                className="toggle"
                onClick={() => value("2")}
            >
                2
            </button>

            <button
                id="three"
                value="3"
                className="toggle"
                onClick={() => value("3")}
            >
                3
            </button>

            <button
                id="add"
                value="+"
                className="toggle"
                onClick={() => operators("+")}
            >
                +
            </button>

            <button
                id="zero"
                value="0"
                onClick={() => value("0")}
            >
                0
            </button>

            <button
                id="decimal"
                value="."
                onClick={() => decimal(".")}
            >
                .
            </button>

            <button
                id="equals"
                value="="
                onClick={evaluate}
            >
                =
            </button>
        </div>
    )
}

function Author() {
    return (
        <div className="author">
            <p className="design">Made By</p>
            <p className="authorMe"><a href="https://codepen.io/your-work/">George Shalamberidze</a></p>
        </div>
    )
}

function WhiteLine() {
    return (
        <div className="text-center line">
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

const toggle = document.querySelectorAll('#divide, #multiply, #subtract, #add')
const equal = document.getElementById('equals')
equal.addEventListener('click', () => {
    toggle.forEach(but => {
        but.classList.remove('active')
    })
})

toggle.forEach(but => {
    but.addEventListener('click', () => {
        removeClass()
        but.classList.add('active')
    })
})

function removeClass() {
    toggle.forEach(but => {
        but.classList.remove('active')
    })
}
