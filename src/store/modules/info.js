export default {
    state: {
      info:{
        nickName:'李姐',//商家的昵称
        signature:'冲冲冲',//商家的个性签名
        photo:''//商家图片
      }
      
    },
    getters: {
      getnick (state) {
        return state.info.nickName
      },
      getsig (state) {
        return state.info.signature
      },
      getphoto (state) {
          return state.info.photo
      }
    },
    mutations: {
      setnick (state, data) {
        state.info.nickName = data;
      },
      setsig (state, data) {
        state.info.signature = data;
      },
      setphoto (state,data) {
        state.info.photo=data
      }
    },
    actions: {
      setnick ({ commit }, data) {
        commit('setnick', data);
      },
      setsig ({ commit }, data) {
        commit('setsig', data);
      },
      setphoto ({ commit },data){
          commit('setphoto',data)
      },
    }
  }