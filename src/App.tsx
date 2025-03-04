import { Outlet } from 'react-router';
import { NavBar } from "@/components/navbar/NavBar"

function App() {
  
  return (
    <>

      <header>
        <NavBar />
      </header>

      <main className='p-10'>

        <Outlet />

      </main>

      <footer>

      </footer>

    </>
  )
}

export default App
