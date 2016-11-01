const Paging = require('./src/main.vue');

Paging.install = function (Vue) {
    Vue.component(Paging.name, Paging);
};

module.exports = Paging;
