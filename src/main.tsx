import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// React Routing
import { createBrowserRouter, RouterProvider} from 'react-router';
import { routes } from './routes';

// Redux Store
import { Provider } from 'react-redux'
import { store } from './store'

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
