import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
  id: number
  nome: string
  preco: number
  imagem: string
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    addToCarrinho(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload)
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    }
  }
})

export const { addToCarrinho, removeFromCart, clearCart } =
  carrinhoSlice.actions
export default carrinhoSlice.reducer
