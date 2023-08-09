function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('2 seconds');
        }, 2000);
    });
}
function resolveAfter4Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('4 seconds');
        }, 4000);
    });
}

async function asyncCall() {
    console.log('calling');
    const result2 = await resolveAfter4Seconds();
    console.log(result2);
    const result1 = await resolveAfter2Seconds();
    console.log(result1);
}

(async function () {
    await asyncCall();
    console.log('test');
})();