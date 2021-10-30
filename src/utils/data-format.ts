import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// 格式化默认类型
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 格式化 utc 类型时间
 * @param utcString utc 时间字符串
 * @param format 格式（可选：默认YYYY-MM-DD HH:mm:ss）
 * @returns 返回格式化后的时间
 */
export function formatUTCString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format);
}

/**
 * 格式化时间戳
 * @param timeStamp 时间戳
 * @param format 格式（可选：默认YYYY-MM-DD HH:mm:ss）
 * @returns 返回格式化后的时间
 */
export function formatTimestamp(
  timeStamp: number,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.unix(timeStamp).format(format);
}
