/*
 * @Descripttion: pm2 启动脚本
 * @Author: KuuBee
 * @Date: 2021-04-06 16:16:52
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-04-06 16:40:50
 */
module.exports = {
  apps: [
    {
      name: 'blog-admin',
      script: './dist/apps/admin/main.js',
      watch: false,
      error_file: '/root/.pm2/logs/blog-admin.error.log',
      out_file: '/root/.pm2/logs/blog-admin.out.log',
    },
    {
      name: 'blog-web',
      script: './dist/apps/web/main.js',
      watch: false,
      error_file: '/root/.pm2/logs/blog-web.error.log',
      out_file: '/root/.pm2/logs/blog-web.out.log',
    },
  ],
};
