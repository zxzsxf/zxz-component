import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// 获取 __dirname 等价物
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 解析命令行参数
const args = process.argv.slice(2);
let componentName = '';
let buildInfo = '';

args.forEach(arg => {
    if (arg.startsWith('--buildInfo=')) {
        buildInfo = arg.split('=')[1];
    } else if (arg.startsWith('componentName=')) {
        componentName = arg.split('=')[1];
    }
});

if (!componentName) {
    console.error('请提供组件名参数');
    process.exit(1);
}

// 检查 package.json 是否存在
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
    console.error('错误：找不到 package.json 文件');
    process.exit(1);
}

// 获取当前版本号
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const currentVersion = packageJson.version;
console.log(`当前版本：${currentVersion}`);

// 清空 dist 文件夹
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
}
fs.mkdirSync(distPath, { recursive: true });
console.log('已清空 dist 文件夹');

// 记录构建时间和 git 信息
const buildTime = new Date().toLocaleString();
const gitCommit = execSync('git rev-parse HEAD').toString().trim();
const gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// 创建构建信息文件
const buildInfoContent = {
    componentName,
    version: currentVersion,
    buildTime,
    gitCommit,
    gitBranch,
    buildInfo
};

fs.writeFileSync(
    path.join(distPath, 'build-info.json'),
    JSON.stringify(buildInfoContent, null, 2)
);
console.log('构建信息已生成');

// 设置环境变量并执行 webpack 构建
process.env.componentName = componentName;
execSync('npx webpack --config "../../remoteBuild/webpack.config.cjs" --progress', { stdio: 'inherit' });

// 执行上传脚本
execSync(`node ../../remoteBuild/upload.cjs "${componentName}" "${buildInfo}"`, { stdio: 'inherit' }); 