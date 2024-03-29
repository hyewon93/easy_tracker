import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import PageLayout from "./layouts/PageLayout";
import SettingPage from "./pages/SettingPage";
import TransactionPage from "./pages/TransactionPage";

function App() {

  const [authUser] = useAuthState(auth);

  return (
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
        <Route path='/transactions' element={authUser ? <TransactionPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={authUser ? <SettingPage /> : <Navigate to="/" />} />
      </Routes>
    </PageLayout>
  )
}

export default App
