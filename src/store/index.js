import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const axios = require("axios");
export default new Vuex.Store({
  state: {
    listaProductos: [],
    carritoProductos: [],
    usuario: {},
    existeProdCar:{success:false,mensaje:""},
    detallePedido:[]

  },
  mutations: {
    LISTAR_PRODUCTOS_VENTA(state, paylod) {
      state.listaProductos = paylod;
    },
    REGISTRAR_CARRITO(state, paylod) {
      state.carritoProductos.push(paylod)
      // console.info(state.carritoProductos);
    },
    ESTADO_AGREGAR_PRODUCTO (state, paylod) {
      state.existeProdCar=paylod;
     
    },
    ELIMINAR_PRODUCTOS_CARRITO(state){
      state.listaProductos = [];
    },
    DETALLE_PEDIDO(state,paylod){
      state.detallePedido = [];
      state.detallePedido = paylod;
    }

  },
  actions: {
    async obtenerListaProductos(context) {
      await axios
        .get(`https://61b75f4e64e4a10017d18ae0.mockapi.io/productos`, {})
        .then((rpta) => {
          if (rpta.status == 201 || rpta.status == 200) {
            context.commit("LISTAR_PRODUCTOS_VENTA", rpta.data)
          }
        })
        .catch((error) => {
          console.info(error.response.status + ": " + error.message);
        });
    },
    agregarProductoCarrito(context, payload) {
      let listaCard = context.state.carritoProductos;
      let exite = 0;//console.info(payload);
      listaCard.forEach(element => {
        if (element.id == payload.id) {
          exite++;
        }
      });
      if (exite == 0) {
        let prodCard = {
          //nro: (listaCard.length + 1),
          id: payload.id,
          imagenes: payload.imagenes,
          nombre: payload.nombre,
          marca: payload.marca,
          modelo: payload.modelo,
          precio: payload.precio,
          cantidad: 1,
          stock:payload.stock,
          total: payload.precio * 1
        };
        context.commit("REGISTRAR_CARRITO", prodCard);
        context.commit("ESTADO_AGREGAR_PRODUCTO", {success:true,mensaje:"Producto Agregado"});
        
      }else{
        context.commit("ESTADO_AGREGAR_PRODUCTO", {success:true,mensaje:"Producto Existe en lista"});
      }

    },
    eliminarProductoCarrito(context){
      context.commit("ELIMINAR_PRODUCTOS_CARRITO");
    },
    detallePedido(context,paylod){
      context.commit("DETALLE_PEDIDO",paylod);
    }

  },
  modules: {
  }
})
