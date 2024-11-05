//Analytics SDK with singleton pattern
class SDK {
    constructor(delay){
        if(SDK.instance){
            return SDK.instance
        }
        this.delay = delay
        this.queue = []
        this.count = 0
        SDK.instance = this
    }
    logEvent(event){
        this.queue.push(event)
    }
    async send(){
        if(this.queue.length === 0){
            return
        }
        const current = this.queue.shift()
        this.count++
        try{
            await new Promise((resolve ,reject) => {
                setTimeout(() => {
                    if(!(this.count%5)){
                        reject()
                    }else{
                        resolve()
                    }
                }, this.delay)
            })
            console.log(`Analytics sent ${current}`)
        }catch{
            console.log("-----------------------");
              console.log("Failed to send " + current);
              console.log("Retrying sending " + current);
              console.log("-----------------------");
              this.queue.unshift(current)
        }finally{
            this.send()
        }
    }
}

const sdk = new SDK(1000);
const sdk1 = new SDK(2000);

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk1.logEvent('Event 100');
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");

sdk.send();
