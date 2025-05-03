function logger(store) {
    // next 实际上就是下一个中间件函数，当是最后一个中间件的时候，next 就是 dispatch
    return function(next) {
        return function(action) {
            console.log('logger')
            next(action)
            console.log('logger--end')
        };
    };
}

module.exports = logger;
