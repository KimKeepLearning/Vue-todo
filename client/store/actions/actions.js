export default {
    updateCountSync ( store, data){
        // 写异步的
        setTimeout(() => {
           store.commit('updateCount', data.num) 
        }, data.time);
    }
}