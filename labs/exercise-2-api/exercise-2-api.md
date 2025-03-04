- [2. API-Anbindung](#2-api-anbindung)
  - [2.1 Axios in RegisterPage.tsx einbinden](#21-axios-in-registerpagetsx-einbinden)
  - [2.2 Axios in LoginPage.tsx einbinden](#22-axios-in-loginpagetsx-einbinden)
  - [2.3 Axios in ProductsPage.tsx einbinden](#23-axios-in-productstsx-einbinden)

Bearbeitungszeit: 15 Minuten

The solution branch for the whole lab is `solution-2-api`

# 2. API-Anbindung

Für diese Aufgabe verwenden wir json-server mit der Middleware json-server-auth, um eine einfache API für Benutzerregistrierung, Anmeldung und den Abruf von Produkten bereitzustellen. json-server wird mit Hilfe des NPM-Pakets concurrently parallel zur React App gestartet.

## 2.1 Axios in RegisterPage.tsx einbinden

- Ersetzen Sie `console.log` in der `onSubmit`-Methode durch einen API-Aufruf mit `axios`.
- Senden Sie die Benutzerdaten mit `axios.post` an <http://localhost:3001/register>.
- Geben Sie die Antwort der API in der Konsole aus.
- Speichern Sie den `accessToken` aus der Antwort in `localStorage`.

Als Response erhalten Sie

```json
{
  "accessToken": "eyJhbG...",
  "user": {
    "email": "example@domain.com",
    "firstName": "Max",
    "lastName": "Mustermann",
    "id": 1
  }
}
```

<details>
<summary>Show Solution</summary>
<p>

**/src/features/auth/pages/registerpage/RegisterPage.tsx**

```typescript
import axios from "axios";

const onSubmit = async (data: FormData) => {
    
    // Aufgabe: Übermitteln Sie die Daten an den JSON-Server http://localhost:3001/login
    const response = await axios.post("http://localhost:3001/register", data);
    console.log(response.data);

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    reset();

};
```

</p>
</details>

## 2.2 Axios in LoginPage.tsx einbinden

- Implementieren Sie die gleiche Funktionalität wie in `RegisterPage.tsx`, aber senden Sie die Daten an <http://localhost:3001/login>.
- Speichern Sie den `accessToken` in `localStorage` und geben Sie die Antwort in der Konsole aus.

Als Response erhalten Sie

```json
{
  "accessToken": "eyJhbG...",
  "user": {
    "email": "example@domain.com",
    "firstName": "Max",
    "lastName": "Mustermann",
    "id": 1
  }
}
```

<details>
<summary>Show Solution</summary>
<p>

**/src/features/auth/pages/loginpage/LoginPage.tsx**

```typescript
import axios from "axios";

const onSubmit = async (data: FormData) => {
    
    // Aufgabe: Übermitteln Sie die Daten an den JSON-Server http://localhost:3001/login
    const response = await axios.post("http://localhost:3001/login", data);
    console.log(response.data);

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    
};
```

</p>
</details>

## 2.3 Axios in Products.tsx einbinden

- Rufen Sie beim Laden der Seite die Produktliste mit `axios.get` von <http://localhost:3001/products> ab.
- Speichern Sie die abgerufenen Produkte im lokalen State mit `setProducts`.

<details>
<summary>Show Solution</summary>
<p>

**/src/features/products/pages/productspage/ProductsPage.tsx**

```typescript
useEffect(() => {
    const fetchProducts = async () => {
        const response = await axios.get<Product[]>("http://localhost:3001/products");
        setProducts(response.data);
    };

    fetchProducts();

}, []);
```

</p>
</details>
