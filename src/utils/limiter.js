import client from '../handlers/init.redis.js';

export const incr = key => {
    return new Promise((resolve, reject) => {
        client.incr(key, (err, result) => {
            if(err){
                return reject(err)
            }

            resolve(result)
        })
    })
}

export const expire = key => {
    return new Promise((resolve, reject) => {
        client.expire(key, ttl, (err, result) => {
            if(err){
                return reject(err)
            }

            resolve(result)
        })
    })
}

export const ttl = key => {
    return new Promise((resolve, reject) => {
        client.ttl(key, (err, ttl) => {
            if(err){
                return reject(err)
            }

            resolve(ttl)
        })
    })
}

