const RESTART_BTN = "restartBtn"
const COUNTER_ID = "counter"
const COUNTER_VALUE = 100
const INTERVAL_TIME = 10

class CounterComponent {
    constructor() {
        this.initialize()
    }

    prepareCounterProxy() {
        const handler = {
            set: (currentContext, propertyKey, newValue) => {
                console.log({ currentContext, propertyKey, newValue })

                currentContext[propertyKey] = newValue

                return true
            }
        }

        const counter = new Proxy({
            value: COUNTER_VALUE,
            stop: () => { }
        }, handler)

        return counter
    }

    initialize() {
        console.log('Initilized')

        const counterEl = document.getElementById(COUNTER_ID)

        const counter = this.prepareCounterProxy()

        // counter.value = 100
        // counter.value = 90
        // counter.value = 80
    }
}