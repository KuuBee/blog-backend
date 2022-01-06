echo 开始部署
echo 开始连接服务器。。。
ssh aili -t <<EOF
echo 连接成功
cd /home/backend/blog
git pull github main
npm i
npm run build:web
npm run build:admin
pm2 reload ecosystem.config.js
exit
EOF
echo 部署完成
