import * as S from './styles'
import cesta from '../../assets/cesta.png'
import { paraReal } from '../Produto'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Header = () => {
  // Pegando itens do carrinho do Redux
  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.items
  )
  // Pegando favoritos do Redux
  const favoritos = useSelector((state: RootState) => state.favoritos.items)

  const valorTotal = itensNoCarrinho.reduce((acc, item) => acc + item.preco, 0)

  return (
    <S.Header>
      <div>
        <h1>EBAC Sports</h1>
        {/* <span>{favoritos.length} favoritos</span> */}
        <span>{favoritos.length} favoritos</span>
        <img src={cesta} alt="Carrinho" />
        <span>
          {itensNoCarrinho.length} itens, valor total: {paraReal(valorTotal)}
        </span>
      </div>
    </S.Header>
  )
}

export default Header
