zxz-component

主包node
node v18.17.1 npm run build

node v18.17.1 npm run storybook


远程组件构建
node 14.17 npm run build
启动远程组件本地调试
node 14.17 npm run dev

npx storybook init --builder vite

文档打包
npm run build-storybook

文档部署，默认端口8080。访问 http://127.0.0.1:8080
npx http-server storybook-static
