import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)
dayjs.extend(LocalizedFormat)
dayjs.locale('zh-cn')
export const parseDate = (time, format) => dayjs(time).format(format)

export const relativeTimeFromNow = time => dayjs(new Date(time)).fromNow()

export default { parseDate, relativeTimeFromNow }
