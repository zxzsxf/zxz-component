#!/bin/bash

# 获取组件名参数和构建信息
buildInfo=""
for arg in "$@"; do
    if [[ $arg == --buildInfo=* ]]; then
        buildInfo="${arg#--buildInfo=}"
    elif [[ $arg == componentName=* ]]; then
        componentName="${arg#componentName=}"
    fi
done

if [ -z "$componentName" ]; then
    echo "请提供组件名参数"
    exit 1
fi

# 检查package.json是否存在
if [ ! -f "package.json" ]; then
    echo "错误：找不到 package.json 文件"
    exit 1
fi

# 获取当前版本号
current_version=$(node -p "require('./package.json').version")
echo "当前版本：$current_version"

# 清空dist文件夹
rm -rf ./dist/**
echo "已清空 dist 文件夹"

# 记录构建时间和git信息
build_time=$(date '+%Y-%m-%d %H:%M:%S')
git_commit=$(git rev-parse HEAD)
git_branch=$(git rev-parse --abbrev-ref HEAD)

# 创建构建信息文件
cat > ./dist/build-info.json << EOF
{
  "componentName": "$componentName",
  "version": "$current_version",
  "buildTime": "$build_time",
  "gitCommit": "$git_commit",
  "gitBranch": "$git_branch",
  "buildInfo": "$buildInfo"
}
EOF

echo "构建信息已生成"

# 远程组件构建
export componentName="$componentName"
npx webpack --config '../../remoteBuild/webpack.config.cjs' --progress

# 远程组件资源上传
node ../../remoteBuild/upload.cjs "$componentName" "$buildInfo"