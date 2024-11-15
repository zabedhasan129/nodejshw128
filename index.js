const fs = require("fs/promises");
const { buffer } = require("stream/consumers");
(async()=>{
    const indexPath = "./index.html"
    console.log("Never give up")
    const myfilework = await fs.open("./myfile.txt","r")
    

    myfilework.on("change",async function(){
        // console.log(await myfilework.stat())
        let size = ((await myfilework.stat()).size)
        let buf = Buffer.alloc(size)
        let offset = 0 //starting point of the buffer
        let length = buf.byteLength
        console.log(length)
        const position = 0 // starting point of the file system

        await myfilework.read(buf,offset,length,position)
        const myText = buf.toString("utf-8")


        if(myText.startsWith("create button")){
            await fs.writeFile(indexPath,"<button>hello sawon sir</button>", "utf-8")
            console.log("<button>hello sawon sir</button>")
        }

    })


    const cctv = fs.watch("./myfile.txt")
    for await(let y of cctv){
        if(y.eventType == "change"){
        myfilework.emit("change")
        }

    }

})()