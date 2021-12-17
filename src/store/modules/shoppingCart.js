export default {
    state: {
      shoppingCart: [
          // {
          //   carId: "3421", // 购物车id
          //   commodityID: "4321", // 商品id
          //   commodityName: "好耶！", // 商品名称
          //   imamg: "http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg", // 商品图片
          //   price: 144, // 商品价格
          //   num: 1, // 商品数量
          
          //   check: false // 是否勾选
          // },
        // {
        //   id: "3421", // 购物车id
        //   comID: "4321", // 商品id
        //   comName: "好耶！", // 商品名称
        //   comImg: "http://assets.myntassets.com/v1/images/style/properties/7a5b82d1372a7a5c6de67ae7a314fd91_images.jpg", // 商品图片
        //   price: "144", // 商品价格
        //   num: 2, // 商品数量
        //   maxNum: "5", // 商品限购数量
        //   check: false // 是否勾选
        // }
      ]
      // shoppingCart结构
      // 一个shoppingCart表示一个商品状态，整个大购物车是一个shoppingCart数组
      /* 
      shoppingCart = {
        id: "", // 购物车id
        comID: "", // 商品id
        comsizeID:"",//商品规格id
        comName: "", // 商品名称
        comImg: "", // 商品图片
        price: "", // 商品价格
        num: "", // 商品数量
        maxNum: "", // 商品限购数量
        check: false // 是否勾选
      } */
    },
    getters: {
      getShoppingCart (state) {
        // 获取购物车状态
        return state.shoppingCart;
      },
      getNum (state) {
        // 购物车商品总数量
        let totalNum = 0;
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          totalNum += temp.num*1;
        }
        console.log(state.shoppingCart[0])
        return totalNum;
      },
      getIsAllCheck (state) {
        // 判断是否全选
        let isAllCheck = true;
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          // 只要有一个商品没有勾选立即return false;
          if (!temp.check) {
            isAllCheck = false;
            return isAllCheck;
          }
        }
        return isAllCheck;
      },
      getCheckGoods (state) {
        // 获取勾选的商品信息
        // 用于确认订单页面
        let checkGoods = [];
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          if (temp.check) {
            checkGoods.push(temp);
          }
        }
        return checkGoods;
      },
      getCheckNum (state) {
        // 获取购物车勾选的商品数量
        let totalNum = 0;
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          if (temp.check) {
            totalNum += temp.num*1;
          }
        }
        return totalNum;
      },
      getTotalPrice (state) {
        // 购物车勾选的商品总价格
        let totalPrice = 0;
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          if (temp.check) {
            totalPrice += temp.price * temp.num;
          }
        }
        return totalPrice;
      },
      getcarId(){
        return state.shoppingCart.carId;
        console.log('nienie')
      },
    },
    mutations: {
      setShoppingCart (state, data) {
        // 设置购物车状态
        for(var i=0 ; i<data.length ; i++)
          {
            data[i].check=false;    
          }
        state.shoppingCart = data;
      },
      unshiftShoppingCart (state, data) {
        // 添加购物车
        // 用于在商品详情页点击添加购物车,后台添加成功后，更新vuex状态
        
        //*unshift方法：在数组头加一个新的元素并返回新的长度
        state.shoppingCart.unshift(data);
      },
      updateShoppingCart (state, payload) { //payload是个啥玩意？记得填这个形参
        
        // 更新购物车
        // 可更新商品数量和是否勾选
        // 用于购物车点击勾选及加减商品数量
         if (payload.prop == "num") {
           // 判断效果的商品数量是否大于限购数量或小于1，如果是，不进行更新操作直接返回
          //  if (state.shoppingCart[payload.key].maxNum < payload.val) {
          //    return;
          //  }
           if (payload.val < 1) {
             return;
           }
         }
        // 根据商品在购物车的数组的索引和属性更改
        state.shoppingCart[payload.key][payload.prop] = payload.val;
      },
      addShoppingCartNum (state, comID) {
        // 增加已经在购物车的商品数量
        // 用于在商品详情页点击添加购物车,后台返回002，“该商品已在购物车，数量 +1”，更新vuex的商品数量
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          if (temp.comID == comID) {
            if (temp.num < temp.maxNum) {
              temp.num++;
            }
          }
        }
      },
      deleteShoppingCart (state, id) {
        // 根据购物车id删除购物车商品
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          if (temp.id == id) {
            state.shoppingCart.splice(i, 1); //javascript 的splice方法：i是操作起始的位置，数字是删除个数，第三个参数可以加item，就变成了插入操作
          }
        }
      },
      checkAll (state, data) {
        // 点击全选按钮，更改每个商品的勾选状态
        for (let i = 0; i < state.shoppingCart.length; i++) {
          state.shoppingCart[i].check = data;
        }
      }
    },
    actions: {
      setShoppingCart ({ commit }, data) {
        commit('setShoppingCart', data);
      },
      unshiftShoppingCart ({ commit }, data) {
        commit('unshiftShoppingCart', data);
      },
      updateShoppingCart ({ commit }, payload) {
        commit('updateShoppingCart', payload);
      },
      addShoppingCartNum ({ commit }, productID) {
        commit('addShoppingCartNum', productID);
      },
      deleteShoppingCart ({ commit }, id) {
        commit('deleteShoppingCart', id);
      },
      checkAll ({ commit }, data) {
        commit('checkAll', data);
      }
    }
  }