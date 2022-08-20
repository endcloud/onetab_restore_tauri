<p align="center">
<img src="https://cos.endcloud.cn/blog/cache_pic/onetabRes@1x.png" />
</p>

<div align="center">

# Onetab Re

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/endcloud/onetab_restore_tauri)](https://github.com/endcloud/onetab_restore_tauri/releases) ![GitHub Release Date](https://img.shields.io/github/release-date/endcloud/onetab_restore_tauri) ![GitHub All Releases](https://img.shields.io/github/downloads/endcloud/onetab_restore_tauri/total) ![GitHub stars](https://img.shields.io/github/stars/endcloud/onetab_restore_tauri?style=flat) ![GitHub forks](https://img.shields.io/github/forks/endcloud/onetab_restore_tauri)

『Data is Priceless』

[![Release Builder](https://github.com/endcloud/onetab_restore_tauri/actions/workflows/release.yml/badge.svg)](https://github.com/endcloud/onetab_restore_tauri/actions/workflows/release.yml)

</div>

---
`Onetab Re` 是一款用于备份并原样展示Onetab数据的应用，基于 [Tauri](https://github.com/tauri-apps/tauri) 跨平台构建，支持 `Windows` `macOS` `Linux`.

## 使用方法
1. 安装后在软件的Scripts目录下使用node运行唯一的js文件, 备份onetab数据
2. 将第一步运行完毕得到的一组文件中的`tab_ori.json`复制到软件本体的目录
3. 运行软件本体, 即可原样查看Onetab数据
> macOS下请展开`Onetab Re.app`

## todo
- 通过Rust处理备份流程, 避免额外安装nodejs
- 搜索栏历史记录
- 网页的ico
- 云同步 webDAV
- 数据分析 词云 NLP

## 技术细节
- 基于 React + TypeScript 构建用户界面
- UI框架来自 [Elastic UI](https://elastic.github.io/elastic-ui/)
- Tauri 构建完整二进制文件

## 运行截图:
![1661019333png](https://cos.endcloud.cn/blog/cache_pic/1661019332.png)


## 致谢
- [Tauri](https://github.com/tauri-apps/tauri) Build smaller, faster, and more secure desktop applications with a web frontend.
- [React](https://reactjs.org/) React is a JavaScript library for building user interfaces.
- [Elastic UI](https://elastic.github.io/elastic-ui/) A set of React components for building user interfaces.
- [level](https://github.com/Level/level) Universal abstract-level database for Node.js and browsers.
