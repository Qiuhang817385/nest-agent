1、使用 lighthouse 诊断页面加载
2、延迟执行搜索，使用骨架屏提升页面 FCP 1.2s -> 0.4s
3、使用 API query 前端缓存请求参数，减少请求
4、提取内联样式到 css 模块文件
css 模块文件可以被单独换成
减少 js 体积，
支持 css 压缩和优化

css-in-js 的优点

动态样式能力

1. 基于 props 的条件样式
2. 主题系统
   组件化优势
3. 样式封装
   1.1 样式与组件紧密耦合，不会泄露到全局
   1.2 自动生成唯一的类名，避免样式冲突
   1.3 组件删除时样式自动清理
   代码复用

开发体验
1.TypeScript 支持 2.智能提示和类型检查

服务端渲染优化

自动提取关键 CSS
避免样式闪烁
支持 hydration 优化

❌ 增加 JavaScript 包大小
❌ 运行时性能开销
❌ 学习成本较高
❌ 调试相对困难

2、宏任务和微任务执行结果
（使用火焰图进行分析）

微任务：Promise.then、MutationObserver 等
宏任务：setTimeout、setInterval、requestAnimationFrame 等。

微任务嵌套宏任务，宏任务排队
宏任务嵌套微任务，微任务插队，按注册执行

3、suspense 和 lazy 组件
react.lazy 是一个函数-动态导入，返回一个 Promise，resolve 一个包含 react 的组件
React.lazy 目前只支持默认导出的 React 组件。

suspense 是一个组件。
子组件“尚未准备就绪”时，显示一个自定义的回退界面，包含由 React.lazy 创建的懒加载组件正在加载中的状态

解决的问题：通过代码分割减少应用初始包体积，并通过优雅的加载状态提升用户体验
