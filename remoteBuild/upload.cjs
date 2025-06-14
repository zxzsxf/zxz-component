const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

// 使用动态导入 node-fetch
let fetch;
import('node-fetch').then(module => {
  fetch = module.default;
  // 开始执行上传
  startUpload();
});

async function uploadComponent(componentName, buildInfo, filePath) {
  console.log(`正在上传组件 ${componentName}...`);
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`文件不存在：${filePath}`);
    }

    // 读取 package.json 获取版本信息
    const packageJsonPath = path.join(__dirname, '..', 'packages', componentName, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error(`找不到 package.json：${packageJsonPath}`);
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const version = packageJson.version;
    const timestamp = Date.now();

    // 获取git用户信息
    const gitUserName = require('child_process')
      .execSync('git config user.name')
      .toString()
      .trim();

    // 读取构建信息文件
    const buildInfoPath = path.join(__dirname, '..', 'packages', componentName, 'dist', 'build-info.json');
    let buildInfoData = {};
    if (fs.existsSync(buildInfoPath)) {
      buildInfoData = JSON.parse(fs.readFileSync(buildInfoPath, 'utf-8'));
    }

    const formData = new FormData();
    formData.append('componentName', componentName);
    formData.append('version', version);
    formData.append('timestamp', timestamp);
    formData.append('publisher', gitUserName);
    formData.append('description', packageJson.description || `Version ${version}`);
    formData.append('buildInfo', buildInfo || '');
    
    // 添加组件元数据
    const metadata = {
      name: packageJson.name,
      version: version,
      dependencies: packageJson.dependencies || {},
      peerDependencies: packageJson.peerDependencies || {},
      author: packageJson.author,
      license: packageJson.license,
      repository: packageJson.repository,
      buildDetails: buildInfoData
    };
    formData.append('metadata', JSON.stringify(metadata));
    formData.append('file', fs.createReadStream(filePath));

    const response = await fetch('http://localhost:1001/micro/components/file/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`上传失败：${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log(`组件 ${componentName} 上传成功：`, result);
  } catch (error) {
    console.error(`上传组件 ${componentName} 时出错：`, error.message);
    process.exit(1);
  }
}

// 获取命令行参数
let componentName = process.argv[2];
let buildInfo = process.argv[3] || '';

if (!componentName) {
  console.error('请提供组件名参数');
  process.exit(1);
}

// 如果参数包含 componentName=，去掉这个前缀
if (componentName.startsWith('componentName=')) {
  componentName = componentName.replace('componentName=', '');
}

// 构建文件路径
const distDir = path.join(__dirname, '..', 'packages', componentName, 'dist');

// 检查目录是否存在
if (!fs.existsSync(distDir)) {
  console.error(`目录不存在：${distDir}`);
  process.exit(1);
}

const files = fs.readdirSync(distDir);
const jsFile = files.find(file => file.endsWith('.js'));

if (!jsFile) {
  throw new Error(`在 dist 目录下找不到 JS 文件`);
}

const distPath = path.join(distDir, jsFile);

// 将上传逻辑移到函数中
function startUpload() {
  uploadComponent(componentName, buildInfo, distPath);
} 