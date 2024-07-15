import Header from './Header'
import CartOverview from "../features/cart/CartOverview"
import { Outlet, useNavigation } from 'react-router-dom'
import Loader from './Loader';

export default function AppLayout() {

    const navigation = useNavigation();
    console.log(navigation);
    const isLoading = navigation.state === "loading";
    

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto] gap-y-4'>
        {isLoading && <Loader/>}
        <Header/>
       <div className='overflow-scroll'>
          <main className='max-w-3xl mx-auto'>
              <Outlet/>
          </main>
        </div> 
        <CartOverview/>     
    </div>
  )
}
