import { Route, Routes } from 'react-router-dom'
import './globals.css'
import { CreateAnimal, ListAnimal, Home } from './_root/pages'
import RootLayout from './_root/RootLayout'
import { Toaster } from './components/ui/toaster'

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/list-animal' element={<ListAnimal />} />
          <Route path='/create-animal' element={<CreateAnimal />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  )
}

export default App