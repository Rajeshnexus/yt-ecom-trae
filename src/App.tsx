import { ProductList } from './components/ProductList'
import './App.css'
import { Login } from './components/Login'
import { useAuth } from './hooks/useAuth';
import { Header } from './components/Header';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
function App() {
  const user = useAuth();

  const handleLogout = () => {
   
    signOut(auth).then(() => {
      // Sign-out successful
    }).catch((error) => {
      // An error happened
    });
  };

  if (!user) {
    return <Login />;
  }
  return (
   
     <div className="app">
      <Header onLogout={handleLogout} />
      <main>
        <ProductList />
      </main>
      <footer className="footer">
        <p>© 2024 Your E-commerce Store. All rights reserved.</p>
      </footer>
    </div>
   
  )
}

export default App