// 获取详细地址最后一小段
const getDetailPlace=(value:string)=>{
const reg = /.+?(省|市|自治区|自治州|行政区|盟|旗|县|区)/g
    const area:any=value?.match(reg)
         let len = 0
 for (let i = 0; i < area?.length; i++) { // 获取省市区的长度
  len += area[i].length
}
 area?.push(value.substring(len)) // 获取省市区之后的字符串
    return area?.at(-1)
}
export default getDetailPlace
