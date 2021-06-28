import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import MessageList from 'src/pages/MessageList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import ChatScreen from 'src/pages/ChatScreen';
import ChatDetail from 'src/pages/ChatScreen/ChatDetail';

const routes = (redirectRoot) => [
  {
    path: 'app',
    element: <DashboardLayout />,
    lazy: true,
    children: [
      { lazy: true, path: 'account', element: <Account /> },
      { lazy: true, path: 'customers', element: <CustomerList /> },
      { lazy: true, path: 'dashboard', element: <Dashboard /> },
      { lazy: true, path: 'messages', element: <MessageList /> },
      { lazy: true, path: 'bot', element: <MessageList /> },
      { lazy: true, path: 'products', element: <ProductList /> },
      { lazy: true, path: 'settings', element: <Settings /> },
      { lazy: true, path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    lazy: true,
    children: [
      { lazy: true, path: 'login', element: <Login /> },
      { lazy: true, path: 'register', element: <Register /> },
      { lazy: true, path: '404', element: <NotFound /> },
      { lazy: true, path: '/', element: <Navigate to={redirectRoot} /> },
      { lazy: true, path: '*', element: <Navigate to="/404" /> },
      { path: '/chats', element: <ChatScreen />, },
      { path: 'chats/:id', element: <ChatDetail /> },
    ]
  }
];

export default routes;
