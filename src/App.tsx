import { NavBar } from "@/components/navbar/NavBar"
import { LoginPage } from "@/features/auth";
import { ProductsPage } from "@/features/products"
import { RegisterPage } from "@/features/auth"

function App() {
  
  return (
    <>

      <header>
        <NavBar />
      </header>

      <main className='p-10'>

        <div className="grid grid-cols-3">

          <ProductsPage />

          <RegisterPage />

          <LoginPage />

        </div>

      </main>

      <footer>

      </footer>

    </>
  )
}

export default App
