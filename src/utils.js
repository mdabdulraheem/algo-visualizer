export const wait = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log("Done waiting");
        resolve(ms)
        }, ms )
    })
}   