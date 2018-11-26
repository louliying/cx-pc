var baseUrl;
// 开发环境（使用代理）
if (process.env.NODE_ENV === 'development') {
    baseUrl = '/api';
// 执行打包配置
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = '';
}

export default baseUrl;