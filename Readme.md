zxz-component

主包node
node v18.17.1

远程组件构建
node 14.17

npx storybook init --builder vite

文档打包
npm run build-storybook

文档部署，默认端口8080。访问 http://127.0.0.1:8080 
npx http-server storybook-static