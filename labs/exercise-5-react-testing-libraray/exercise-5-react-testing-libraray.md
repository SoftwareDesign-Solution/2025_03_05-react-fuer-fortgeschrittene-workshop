- [5. React Testing Library](#5-react-testing-library)
  - [5.1 Registrierungsformular](#51-registrierungsformular)
  - [5.2 Produktliste](#52-produktliste)

Bearbeitungszeit: 30 Minuten

The solution branch for the whole lab is `solution-5-react-testing-library`

# 5. React Testing Library

Mit Hilfe von React Testing Library können die Benutzerinteraktionen in React Komponenten getestet werden. Es gibt zwei Varianten `fireEvent` & `userEvent` um die Interaktionen auszulösen. In der Schulung haben Sie beide Varianten kennengelernt und deren Vor- & Nachteile. Die Aufgaben verwenden ausschließlich die `userEvent`-Variante.

**Hinweis:**

Für die Tests mit React Testing Library und Cypress benötigen Sie die nachfolgende Setup-Routine zur Initialisierung des Redux Store

```typescript
export function setupStore(preloadedState) {
    return configureStore({
        reducer: {
            auth: authReducer,
            cart: cartReducer,
            products: productsReducer
      },
      preloadedState,
    });
};
```

## 5.1 Registrierungsformular

In der Aufgabe 1.1 haben Sie das Registrierungsformular mit Hilfe von `react-hook-form` um Validierungsregeln erweitert. In dieser Aufgabe soll es nun darum gehen alle Eingabemöglichkeiten in diesem Formular zu testen. Beachten Sie, das durch das Testen keine Änderungen in der db.json durchgeführt werden sollen. Hierzu bietet vitest die beiden Varianten `vi.mock()` & `vi.spyOn()`.

Erstellen Sie für folgende Schritte je einen Test in der Testsuite `e2e`

- Formular wird ohne Eingaben abgesendet
- Formular wird mit falscher E-Mail-Adresse abgesendet
- Formular wird mit korrekten Eingaben abgesendet

<details>
<summary>Show solution</summary>
<p>

**/src/features/auth/pages/registerpage/RegisterPage.test.tsx**

```typescript
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import axios from 'axios';
import { RegisterPage } from './RegisterPage';
import { setupStore } from '@/store';


//vi.mock('axios');

function renderWithProviders(
    ui: React.ReactNode,
    {
        preloadedState,
        ...renderOptions
    } = {},
) {
    function Wrapper({ children }: { children: React.ReactNode}) {
        return (
            <Provider store={setupStore(preloadedState)}>
                {children}
            </Provider>
        );
    }

    return render(ui, { wrapper: props => <Wrapper {...props} />, ...renderOptions });

  }

describe('RegisterPage', () => {

    it('show errors when form is empty', async () => {
        
        renderWithProviders(<RegisterPage />, {
            preloadedState: {
                auth: {
                    loading: false,
                    userInfo: null,
                    accessToken: null,
                    error: null,
                    success: false,
                },
            }
        });

        const submit = screen.getByTestId('register');
        fireEvent.click(submit);

        expect(await screen.findByText('Vorname ist erforderlich')).toBeInTheDocument();
        expect(await screen.findByText('Nachname ist erforderlich')).toBeInTheDocument();
        expect(await screen.findByText('E-Mail ist erforderlich')).toBeInTheDocument();
        expect(await screen.findByText('Passwort ist erforderlich')).toBeInTheDocument();

    });

    it ('show error when e-mail is incorrect', async () => {

        renderWithProviders(<RegisterPage />, {
            preloadedState: {
                auth: {
                    loading: false,
                    userInfo: null,
                    accessToken: null,
                    error: null,
                    success: false,
                },
            }
        });

        await userEvent.type(screen.getByRole('textbox', { name: /e-mail/i }), 'max-mustermann.com');

        const submit = screen.getByTestId('register');
        fireEvent.click(submit);

        expect(await screen.findByText('E-Mail ist erforderlich')).toBeInTheDocument();
        
    });

    it('show formdata in console when form is valid', async () => {

        /*
        const mockedPost = vi.mocked(axios.post).mockResolvedValue({
            data: {},
            status: '200'
        });
        */

        const mockedPost = vi.spyOn(axios, 'post').mockResolvedValue({
            data: {
                success: true
            },
            status: 201
        });

        renderWithProviders(<RegisterPage />, {
            preloadedState: {
                auth: {
                    loading: false,
                    userInfo: null,
                    accessToken: null,
                    error: null,
                    success: false,
                },
            }
        });

        await userEvent.type(screen.getByRole('textbox', { name: /vorname/i }), 'Max');
        await userEvent.type(screen.getByRole('textbox', { name: /nachname/i }), 'Mustermann');
        await userEvent.type(screen.getByRole('textbox', { name: /e-mail/i }), 'max@mustermann2.com');
        await userEvent.type(screen.getByLabelText('Passwort'), '12345678');

        const submit = screen.getByTestId('register');

        await userEvent.click(submit);

        expect(mockedPost).toHaveBeenCalledOnce();

        expect(mockedPost).toHaveBeenCalledWith('http://localhost:3001/register', {
            email: 'max@mustermann2.com',
            firstName: 'Max',
            lastName: 'Mustermann',
            password: '12345678'
        });

        mockedPost.mockRestore();
        
    });

});
```

</p>
</details>

## 5.2 Produktliste

In dieser Aufgabe geht es darum die Produktliste zu testen. Das Laden der Produkte hat die folgenden Zustände

- Produkte werden geladen
- Fehler beim Laden der Produkte
- Produkte wurden geladen

Erstellen Sie zu jedem Zustand einen Test und mocken Sie den Zugriff von axios.

<details>
<summary>Show solution</summary>
<p>

**/src/features/products/pages/productspage/ProductsPage.test.tsx**

```typescript
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render , screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ProductsPage } from './ProductsPage';
import { setupStore } from '@/store';

vi.mock('axios');

function renderWithProviders(
  ui: React.ReactNode,
  {
    initialState,
    ...renderOptions
  } = {},
) {
  function Wrapper({ children }: { children: React.ReactNode}) {
    return (
        <Provider store={setupStore({ preloadedState: initialState })}>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </Provider>
    );
  }
    return render(ui, { wrapper: props => <Wrapper {...props} />, ...renderOptions });
}
  
describe('Products', () => {

    it('Should show loading message when loading products', async () => {

        const mockProducts = [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
        ];

        // Mock Axios to return the mock products
        //vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockProducts });
        vi.mocked(axios.get).mockResolvedValue({ data: mockProducts });

        renderWithProviders(<ProductsPage />, {
            initialState: {
                products: []
            }
        });

        expect( await screen.getByText('Produkte werden geladen...')).toBeInTheDocument();

    });

    it('Should show products when products loaded', async () => {

        const mockProducts = [
            { id: 1, name: 'Product 1' },
            { id: 2, name: 'Product 2' },
        ];

        // Mock Axios to return the mock products
        vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockProducts });

        renderWithProviders(<ProductsPage />, {
            initialState: {
                products: []
            }
        });

        await waitFor(() => {
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

    });

    it('Should show error when products loading failed', async () => {

        // Mock Axios to return the mock products
        vi.spyOn(axios, 'get').mockRejectedValueOnce(new Error('Produkte konnten nicht geladen werden'));

        renderWithProviders(<ProductsPage />, {
            initialState: {
                products: []
            }
        });

        await waitFor(() => {
            expect(screen.getByText('Produkte konnten nicht geladen werden')).toBeInTheDocument();
        });

    });

})
```

</p>
</details>
