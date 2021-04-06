/*
 * @Descripttion: pm2 启动脚本
 * @Author: KuuBee
 * @Date: 2021-04-06 16:16:52
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-04-06 16:27:23
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

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
