function request(type){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            type === 'a' ? resolve('resolve') : reject('reject')
        }, 2000);
    })
}

async function getData() {
    let err, result;

    [err, result] = await await handerRequest(request('a'));
    if(err){
        console.error('Error ret1::', err)
    }

    [err, result] = await await handerRequest(request('b'));
    if(err){
        console.error('Error ret2::', err)
    }

    [err, result] = await await handerRequest(request('c'));
    if(err){
        console.error('Error ret3::', err)
    }

}

const handerRequest = promise => {
    return promise.then(data => ([undefined, data]))
    .catch(err => ([err, undefined]))
}

getData();
