import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import AdminHeader from './components/AdminHeader'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Listings from './pages/Listings'
import UserDetails from './pages/UserDetails'
import ListDetails from './pages/ListDetails'

const App = () => {
  return (
    <Router>
      <main className="flex justify-start overflow-hidden antialiased">
          <Sidebar />
          <div className="ml-64 bg-gray-50 w-full min-h-screen">
            <AdminHeader />
            <div className="flex-1 mx-8 mt-20">
              <div className="overflow-x-auto bg-white shadow-md rounded my-6 overflow-hidden">
                <Route path='/' component={Dashboard} exact />
                <Route path='/users' component={Users} exact />
                <Route path='/users/:id' component={UserDetails} />
                <Route path='/listings' component={Listings} exact />
                <Route path='/listings/:id' component={ListDetails} />
              </div>
            </div>
          </div>
      </main>
    </Router>
  )
}

export default App
