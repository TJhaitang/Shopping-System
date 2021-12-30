export default {
    state: {
      shoppingCart: [],
      merchants:[]
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
      getMerchants(state){
        //获取商家列表
        return state.merchants;
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
        // 勾选的商品数量
        let totalNum = 0;
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          if (temp.check) {
            totalNum += temp.num*1;
          }
        }
        return totalNum;
      },
      getSuid (state) {
        let suid = 0;
        for (let i = 0; i < state.shoppingCart.length; i++) {
          const temp = state.shoppingCart[i];
          if (temp.check) {
            suid = temp.merchantId;
            break;
          }
        }
        return suid;
      },
      //获取所选商品的编号和数量
      getitems(state){
        let items=[];
        for (let i = 0;i<state.shoppingCart.length;i++){
          const temp = state.shoppingCart[i];
          if (temp.check) {
            let num=temp.num;
            let item_id=temp.standardId
            items.push({"num":num,"itemId":item_id})
          }
        }
        return items;
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
      },
    },
    mutations: {
      setShoppingCart (state, data) {
        // 设置购物车状态
        let length = data.carNum;
          for(let i = 1;i<=length;i++){
            data[i].check=false;
            state.shoppingCart.push(data[i]);
          }
      },
      //设置商家信息
      setMerchants(state,data){
        let length = data.carNum;
        let mer=data[1].merchantId;
        state.merchants.push({mer,check})
        let check=false;
          for(let i = 2;i<=length;i++){
            let mer=data[i].merchantId;
            let check=false;
            let k=0;
            for(let j=0;j<state.merchants.length;j++){
              if(data[i].merchantId===state.merchants[j].mer){
                k=1;
              }
            };
            if(k===0){
              state.merchants.push({mer,check})
          }
        }
        console.log(state.merchants)
      },
      updateAllCheck2(state,id){
        //设置店铺是否全选
        let check=true;
        for (let i = 0; i < state.shoppingCart.length; i++) {
           const temp = state.shoppingCart[i];
           // 只要有一个商品没有勾选立即return;
           if(temp.merchantId==id){
             if (!temp.check) {
               check=false;
             }
           }
         }
         for (let j = 0; j < state.merchants.length;j++){
           const temp=state.merchants[j];
           if(temp.mer===id){
             temp.check=check;
           }
         }
        },
        updateAllCheck(state,id){
          //设置某店铺下商品全部全选
          let k=0;
            for (let j = 0; j < state.merchants.length;j++){
              const temp=state.merchants[j];
              if(temp.mer===id){
                temp.check=!temp.check;
                k=j;
              }
            }
            for (let i = 0; i < state.shoppingCart.length; i++) {
              const temp = state.shoppingCart[i];
              // 只要有一个商品没有勾选立即勾选;
              if(temp.merchantId*1==id){
                temp.check=state.merchants[k].check;
                }
              }
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
      setMerchants({commit},data){
        commit('setMerchants',data)
      },
      updateAllCheck({commit},id){
        commit('updateAllCheck',id)
      },
      updateAllCheck2({commit},id){
        commit('updateAllCheck2',id)
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