//格式化成发请求的时间格式
const getTime=(value:any)=>{
    const Y = value.getFullYear()   // 年
    const M = value.getMonth() + 1 < 10 ? '0'+(value.getMonth()+1) : value.getMonth()+1;   //月
    const D = value.getDate() < 10 ? '0'+(value.getDate()) : value.getDate()   //日
    const HH = value.getHours() < 10 ? '0'+(value.getHours()) : value.getHours()   //时
    const MM = value.getMinutes() < 10 ? '0'+(value.getMinutes()) : value.getMinutes()   //分
    const SS = `00`
      //秒
    return `${Y}-${M}-${D} ${HH}:${MM}:${SS}`
}
//格式化成用户看见的格式
const getTime1=(value:any)=>{
    if (!value) return
    return `${value.getMonth()+1}月${value.getDate()}日${value.getHours()}时${value.getMinutes()}分`
}
const getTime2=(str:any)=>{
    const value=new Date(str)
    const HH = value.getHours() < 10 ? '0'+(value.getHours()) : value.getHours()   //时
    const MM = value.getMinutes() < 10 ? '0'+(value.getMinutes()) : value.getMinutes()   //分
    if (!value) return
    return `${HH}:${MM}`
}
const getTime3=(value:any)=>{
    const Y = value.getFullYear()   // 年
    const M = value.getMonth() + 1 < 10 ? '0'+(value.getMonth()+1) : value.getMonth()+1;   //月
    const D = value.getDate() < 10 ? '0'+(value.getDate()) : value.getDate()   //日
    const HH = value.getHours() < 10 ? '0'+(value.getHours()) : value.getHours()   //时
    const MM = value.getMinutes() < 10 ? '0'+(value.getMinutes()) : value.getMinutes()   //分
    const SS = value.getSeconds() < 10 ? '0'+(value.getSeconds()) : value.getSeconds()   //秒
    //秒
    return `${Y}-${M}-${D} ${HH}:${MM}:${SS}`
}
//时间之差
function twoTimeInterval(startTime:string, endTime:string) {

    // 开始时间
    let d1 = startTime.replace(/\-/g, "/");
    let date1 = new Date(d1);

    // 结束时间
    let d2 = endTime?.replace(/\-/g, "/");
    let date2 = new Date(d2);

    // 时间相差秒数
    let dateDiff = date2.getTime() - date1.getTime();

    // 计算出相差天数
    let days = Math.floor(dateDiff / (24 * 3600 * 1000));

    // 计算出小时数
    let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    let hours = Math.floor(residue1 / (3600 * 1000));

    // 计算相差分钟数
    let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(residue2 / (60 * 1000));

    // 计算相差秒数
    let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
    let seconds = Math.round(residue3 / 1000);

    let returnVal =
        ((days == 0) ? "" : days+"天") +
        ((hours == 0) ? "" : hours +"小时") +
        ((minutes == 0) ? "" : minutes+"分钟") ;
        // ((seconds == 0) ? "" : seconds+"秒");

    return returnVal;

}

export {
    getTime,
    getTime1,
    twoTimeInterval,
    getTime2,
    getTime3
}
