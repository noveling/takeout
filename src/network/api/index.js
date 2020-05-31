import {request} from "../request"


export function getGoods(){
    let res = request("/goods",'GET')
    return res
}
export function getRatings(){
    let res = request("/ratings",'GET')
    return res
}
export function getSeller(){
    let res = request("/seller",'GET')
    return res
}
