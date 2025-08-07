import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Provider } from 'react-redux'

import Header from './components/Header'
import Produtos from './containers/Produtos'
import store, { RootState } from './store'
import { addToCarrinho } from './store/reducers/carrinho'
import { adicionarFavorito, removerFavorito } from './store/reducers/favoritos'
import { GlobalStyle } from './styles'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function AppContent() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const dispatch = useDispatch()

  const carrinho = useSelector((state: RootState) => state.carrinho.items)
  const favoritos = useSelector((state: RootState) => state.favoritos.items)

  useEffect(() => {
    fetch('https://ebac-fake-api.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res: Produto[]) => setProdutos(res))
      .catch((err) => console.error('Erro ao buscar produtos:', err))
  }, [])

  function adicionarAoCarrinho(produto: Produto) {
    const jaAdicionado = carrinho.some((p) => p.id === produto.id)

    if (jaAdicionado) {
      alert('Item já adicionado ao carrinho')
    } else {
      dispatch(addToCarrinho(produto))
    }
  }

  function favoritar(produto: Produto) {
    const jaFavoritado = favoritos.some((p) => p.id === produto.id)

    if (jaFavoritado) {
      dispatch(removerFavorito(produto.id))
    } else {
      dispatch(adicionarFavorito(produto))
    }
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

export default App
