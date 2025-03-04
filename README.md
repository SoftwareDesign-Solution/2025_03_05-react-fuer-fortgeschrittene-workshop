# 2025_03_05-React-fuer-Fortgeschrittene-Workshop

## ✨ Beschreibung

Dieses Projekt ist ein Schulungsprojekt für fortgeschrittene React-Entwicklung. Es beinhaltet moderne Technologien wie React 19, Redux Toolkit, Tailwind CSS und eine Backend-Simulation mit `json-server` und `json-server-auth` zur Authentifizierung.

---

## 🚀 Technologien

### **Frontend**

- **React (v19.0.0)**: Modernes UI-Framework für komponentenbasierte Entwicklung.
- **React Router (v7.2.0)**: Clientseitiges Routing für Single-Page-Applications.
- **React Hook Form (v7.54.2)**: Effiziente Formularverwaltung.
- **Styled Components (v6.1.15)**: CSS-in-JS für komponentenbasiertes Styling.
- **Tailwind CSS (v4.0.9)**: Utility-first CSS-Framework.
- **Zod (v3.24.2)**: Schema-Validierung für Formulare.

### **State-Management**

- **Redux Toolkit (v2.6.0)**: State-Management-Tool für eine einfachere Redux-Entwicklung.
- **React Redux (v9.2.0)**: Offizielle Bindings für Redux in React.

### **Backend-Simulation**

- **JSON-Server (v0.17.4)**: Schnell konfigurierbarer Fake-REST-API-Server.
- **JSON-Server-Auth (v2.1.0)**: Authentifizierungs-Plugin für JSON-Server.

### **Testing**

- **Cypress (v14.1.0)**: End-to-End-Testing-Framework.
- **Testing Library**:
  - React Testing Library (v16.2.0)
  - Jest DOM (v6.6.3)
  - User Event (v14.6.1)
- **Vitest (v3.0.7)**: Modernes Testing-Framework für Vite-Projekte.

### **Build- und Entwicklungs-Tools**

- **Vite (v6.2.0)**: Schneller Entwicklungs- und Build-Server.
- **TypeScript (v5.7.2)**: Statische Typisierung für JavaScript.
- **ESLint (v9.21.0)**: Linter zur Einhaltung von Code-Qualität.
- **Vite-Plugins:**
  - `vite-tsconfig-paths` zur besseren Unterstützung von TypeScript-Pfaden.
  - `@vitejs/plugin-react` für verbesserte React-Unterstützung in Vite.

---

📚 Schulungsaufgaben

Im Verzeichnis `labs` befinden sich die Schulungsaufgaben zu verschiedenen Themen:

- exercise-1-forms: Arbeiten mit Formularen und react-hook-form
- exercise-2-api: API-Aufrufe mit Axios
- exercise-3-routing: Navigation und Routing mit react-router
- exercise-4-redux-toolkit: State-Management mit Redux Toolkit
- exercise-5-react-testing-library: Testing mit React Testing Library
- exercise-6-cypress: End-to-End-Testing mit Cypress

Für jede Aufgabe gibt es eine entsprechende Lösung in den folgenden Branches:

- `solution-1-forms`
- `solution-2-api`
- `solution-3-routing`
- `solution-4-redux-toolkit`
- `solution-5-react-testing-library`
- `solution-6-cypress`

Zum Wechseln in einen Lösungs-Branch:

```bash
git checkout solution-1-forms
```

Ersetze solution-1-forms mit dem entsprechenden Branch-Namen.

---

## 🌐 Setup & Installation

1. **Repository klonen:**

   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

3. **Entwicklungsserver starten:**

   ```bash
   npm run dev
   ```

   Dies startet sowohl den JSON-Server (Port 3001) als auch den Vite-Entwicklungsserver.

4. **Nur das Backend starten:**

   ```bash
   npm run backend
   ```

5. **Build erstellen:**

   ```bash
   npm run build
   ```

6. **Linting ausführen:**

   ```bash
   npm run lint
   ```

7. **Tests ausführen:**

   ```bash
   npx vitest
   ```

---

## 🔧 Features

- **Modernes React:** Neueste React-Version mit optimierten Hooks.
- **State-Management mit Redux Toolkit:** Effizientes, einfaches Handling globaler Zustände.
- **Routing:** Dynamische Navigation mit React Router.
- **Styling:** Tailwind CSS für schnelles Styling, Styled Components für individuelle Styles.
- **Backend-Simulation:** Fake-API mit JSON-Server und Authentifizierung.
- **Testing:** Unit-, Integration- und End-to-End-Tests mit Vitest und Cypress.

---

## 🛠️ Entwicklungsskripte

- **Starten der Entwicklungsumgebung:**

  ```bash
  npm run dev
  ```

- **Nur Backend starten:**

  ```bash
  npm run backend
  ```

- **Build erstellen:**

  ```bash
  npm run build
  ```

- **Linting ausführen:**

  ```bash
  npm run lint
  ```

- **Tests ausführen:**

  ```bash
  npx vitest
  ```

- **Vorschau des Builds:**

  ```bash
  npm run preview
  ```

---

## 🔍 Verwendete Bibliotheken (Auszug)

### **Abhängigkeiten:**

- `react`, `react-dom`, `react-router`, `react-hook-form`
- `@reduxjs/toolkit`, `react-redux`, `redux`
- `styled-components`, `tailwindcss`
- `axios`, `zod`

### **DevDependencies:**

- `json-server`, `json-server-auth`
- `vite`, `typescript`
- `eslint`, `typescript-eslint`
- `cypress`, `vitest`

---

## 🙏 Beitrag

Wir freuen uns über Beiträge! Eröffne ein [Issue](https://github.com/username/repo-name/issues) oder erstelle einen Pull-Request.
