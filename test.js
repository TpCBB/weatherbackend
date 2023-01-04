

// 导入 dayjs 模块
const dayjs = require("dayjs")
// 导入 dayjs 插件
const weekday = require('dayjs/plugin/weekday')
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter")

// 使用 dayjs 插件
dayjs.extend(weekday)
dayjs.extend(isSameOrAfter);
const lunarFun = require('lunar-fun');
function brthDate(brth, islunar) {
    const nowDate = dayjs().format('YYYY-MM-DD'); // 当前日期（格式：年-月-日）
    let birthDays = ""
    // 获取今年生日
    // 判断一个日期是否大于等于另一个日期：判断生日 是否大于等于 当前日期（返回布尔值）
    let [y, m, d] = brth.split('-')
    brth = `${dayjs().year()}-${m}-${d}`
    if (islunar) {
        brth = lunarFun.lunalToGregorian(dayjs().year(), m, d, isRun()).slice(0, 3).join('-')
        console.log("今年的生日的公历日期", brth)
    }
    if (dayjs(brth).isSameOrAfter(nowDate)) {
        // 生日还没过
        birthDays = dayjs(brth).diff(dayjs(), 'day') // 获取两个日期相差的天数
    } else {
        // 生日已过,计算距离下一次生日还有多少天
        let nextBirthYears = dayjs().year() + 1 // 下一次生日年份等于当前年份+1

        let nextBirth = nextBirthYears + "-" + dayjs(brth).format('MM-DD') // 下一次生日年月日
        if (islunar) {

            nextBirth = lunarFun.lunalToGregorian(nextBirthYears, m, d, isRun(nextBirthYears)).slice(0, 3).join('-')
            console.log(nextBirth);
        }
        birthDays = dayjs(nextBirth).diff(dayjs(), 'day') // 获取两个日期相差的天数
    }
    return birthDays
}
function isRun(year) {
    return year % 100 != 0 && year % 4 == 0 || year % 400 == 0
}

console.log(brthDate('1996-07-07', false))
// console.log(dayjs().format('YYYY-MM-DD'))
// console.log(dayjs('2023-01-27').isSameOrAfter(dayjs().format('YYYY-MM-DD')))
// console.log(lunarFun.lunalToGregorian(1997, 1, 19, false))