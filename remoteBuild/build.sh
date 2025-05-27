#!/bin/bash

# 获取组件名参数
componentName=${1#componentName=}  # 去掉前缀 componentName=
if [ -z "$componentName" ]; then
    echo "请提供组件名参数"
    exit 1
fi

# 清空dist文件夹
rm -rf ./dist/**
echo "已清空 dist 文件夹"

# 远程组件构建
npx webpack --config '../../remoteBuild/webpack.config.cjs' --progress

# 远程组件资源上传
node ../../remoteBuild/upload.cjs $componentName