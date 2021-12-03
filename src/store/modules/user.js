export default {
    state: {
      user: "", // 登录的用户
      showLogin: false // 用于控制是否显示登录组件
      /*user的结构：

      */
    },
    getters: {
      getUser (state) {
        return state.user
      },
      getShowLogin (state) {
        return state.showLogin
      }
    },
    mutations: {
      setUser (state, data) {
        state.user = data;
      },
      setShowLogin (state, data) {
        //到这里都没有问题，这里也可以成功设置
        state.showLogin = data;
      }
    },
    actions: {
      setUser ({ commit }, data) {
        commit('setUser', data);
      },
      setShowLogin ({ commit }, data) {
        commit('setShowLogin', data);
      }
    }
  }