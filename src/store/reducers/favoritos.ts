import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import favoritosReducer from './favoritos'

type Favorito = {
  id: number
  nome: string
  preco: number
  imagem: string
}

interface FavoritosState {
  items: Favorito[]
}

const initialState: FavoritosState = {
  items: []
}

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    adicionarFavorito: (state, action: PayloadAction<Favorito>) => {
      const existe = state.items.some((item) => item.id === action.payload.id)
      if (!existe) {
        state.items.push(action.payload)
      }
    },
    removerFavorito: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    limparFavoritos: (state) => {
      state.items = []
    }
  }
})

export const { adicionarFavorito, removerFavorito } = favoritosSlice.actions
export default favoritosSlice.reducer

export const rootReducer = {
  favoritos: favoritosReducer
}
