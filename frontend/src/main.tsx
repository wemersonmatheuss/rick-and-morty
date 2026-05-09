import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import CharacterList from './pages/CharacterList'
import CreateCharacter from './pages/CreateCharacter'
import EditCharacter from './pages/EditCharacter'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<CharacterList />} />
        <Route path="create" element={<CreateCharacter />} />
        <Route path="edit/:id" element={<EditCharacter />} />
      </Route>
    </Routes>
  </BrowserRouter>
)