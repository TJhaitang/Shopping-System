export default {
    state: {
      info:[]
      // info:{
      //   nickName:'李姐',//商家的昵称
      //   signature:'冲冲冲',//商家的个性签名
      //   photo:''//商家图片
      // }
      
    },
    getters: {
      getinfo (state) {
        //获取商家信息
        return state.info
      },
    },
    mutations: {
      setinfo (state, data) {
        //设置商家信息
        state.info = data;
        console.log(state.info)
      },
    },
    actions: {
      setinfo ({ commit }, data) {
        commit('setinfo', data);
      },
    }
  }