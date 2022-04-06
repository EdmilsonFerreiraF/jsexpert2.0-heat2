(() => {
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

                    if (!currentContext.value) {
                        currentContext.stop()
                    }

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

        updateText = ({ counterEl, counter }) => () => {
            const textIdentifier = '$$contador'
            const defaultText = `Starting with <strong>${textIdentifier}</strong> seconds...`

            counterEl.innerHTML = defaultText.replace(textIdentifier, counter.value--)
        }

        scheduleCounterStop({ counterEl, intervalId }) {
            return () => {
                clearInterval(intervalId)

                counterEl.innerHTML = ""

                this.disableBtn(false)
            }
        }

        prepareBtn(btnEl, startFn) {
            btnEl.addEventListener('click', startFn.bind(this))

            return (value = true) => {
                const attribute = 'disabled'

                if (value) {
                    btnEl.setAttribute(attribute, value)

                    return
                }

                btnEl.removeAttribute(attribute)
            }
        }

        initialize() {
            console.log('Initilized')

            const counterEl = document.getElementById(COUNTER_ID)

            const counter = this.prepareCounterProxy()

            // counter.value = 100
            // counter.value = 90
            // counter.value = 80

            const args = {
                counterEl,
                counter
            }

            const fn = this.updateText(args)
            const intervalId = setInterval(fn, INTERVAL_TIME)

            {
                const btnEl = document.getElementById(RESTART_BTN)

                const disableBtn = this.prepareBtn(btnEl, this.initialize)
                disableBtn()

                const args = { counterEl, intervalId }

                const stopCounterFn = this.scheduleCounterStop.apply({ disableBtn }, [args])

                counter.stop = stopCounterFn
            }
        }
    }
})()