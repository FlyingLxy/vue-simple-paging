/**
 * @file 分页组件
 * @param { className } String 自定义class
 * @param { totalPage } String/Number - 总页码数
 * @param { page } String/Number - 当前页码
 * @param { pageCount } String/Number - 显示页码按钮数
 * @param { change } CallBack - 页码变化回调. 参数：String. 选中的页数
 * @author XiaoYu.Lang Email: webdeveloperfox@gmail.com
 */
const Paging = require('./src/main.vue');

Paging.install = function (Vue) {
    Vue.component(Paging.name, Paging);
};

module.exports = Paging;
