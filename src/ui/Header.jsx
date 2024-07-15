import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import UserName from '../features/user/UserName'

export default function Header() {
  return (
    <header className='flex justify-around bg-yellow-500
    uppercase px-4 py-3 border-b border-stone-500 sm:px-6'>
      <SearchOrder/>
      <Link to="/" className='tracking-[0.5rem]'>Pizza Totto</Link>

      <UserName/>
    </header>
  )
}
