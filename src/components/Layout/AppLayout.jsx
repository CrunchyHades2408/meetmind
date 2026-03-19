import { Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import Sidebar from './Sidebar'
import Modal from '../UI/Modal'

const AppLayout = () => {
  const { user } = useApp()

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-void bg-grid bg-radial">
      <Sidebar />

      <main
        className="flex-1 overflow-y-auto"
        style={{ marginLeft: '220px' }}
      >
        <div className="min-h-full p-8">
          <Outlet />
        </div>
      </main>

      <Modal />
    </div>
  )
}

export default AppLayout