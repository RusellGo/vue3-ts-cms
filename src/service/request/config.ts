// 配置全局变量
let BASE_URL = '';
const TIMEOUT = 20000;

// 根据 process.env.NODE_ENV 的值来判断当前环境，并给定接口地址
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://152.136.185.210:5000';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://152.136.185.210:5000';
} else {
  BASE_URL = 'http://152.136.185.210:5000';
}

export { BASE_URL, TIMEOUT };
