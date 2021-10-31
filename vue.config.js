module.exports = {
    devServer: {
        open: true,
        host: "localhost",
        port: '8081',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                //请大家把这个target改到你自己电脑上的/Shopping-System/src文件夹
                //路径不允许出现中文字符，如果有中文字符，可以从浏览器打开相应地址然后在浏览器地址栏复制，结果应该和下面的一长串差不多
                //如何寻找/Shopping-System/src文件夹：
                //找到你的apache的Diretory和DocumentRoot，这个目录是你访问localhost的起始位置
                //如果apache的Diretory和DocumentRoot和/Shopping-System/src文件夹所在盘符不同，请修改Diretory和DocumentRoot
                //如果你将Diretory和DocumentRoot设置到了项目文件夹中的话，直接将下面改为http://localhost/src/即可
                target: 'http://localhost/', //API服务器的地址
                ws: true,
                changeOrigin: true,
            }
        },
    }