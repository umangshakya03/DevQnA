import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Questions from './pages/Questions/Questions';
import AskQuestion from './pages/AskQuestion/AskQuestion';
import EditQuestion from './pages/Questions/EditQuestion';
import EditAnswer from './pages/Questions/EditAnswer';
import DisplayQuestion from './pages/Questions/DisplayQuestion';
import Users from './pages/Users/Users';
import UserProfile from './pages/UserProfile/UserProfile';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/Auth' element={<Auth />} />
      <Route path='/AskQuestion' element={<AskQuestion />} />
      <Route path='/Questions' element={<Questions />} />
      <Route path='/Questions/:id' element={<DisplayQuestion />} />
      <Route path='/EditQuestion/:id' element={<EditQuestion />} />
      <Route
        path='/EditAnswer/:questionId/:answerId'
        element={<EditAnswer />}
      />
      <Route path='/Users' element={<Users />} />
      <Route path='/Users/:id' element={<UserProfile />} />
    </Routes>
  );
};

export default AllRoutes;
