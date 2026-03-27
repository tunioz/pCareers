import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import About from './pages/About';
import Culture from './pages/Culture';
import Jobs from './pages/Jobs';
import Life from './pages/Life';
import JobDetail from './pages/JobDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import RolePreview from './pages/RolePreview';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '/culture',
    Component: Culture,
  },
  {
    path: '/jobs',
    Component: Jobs,
  },
  {
    path: '/jobs/:id',
    Component: JobDetail,
  },
  {
    path: '/role-preview',
    Component: RolePreview,
  },
  {
    path: '/life',
    Component: Life,
  },
  {
    path: '/blog',
    Component: Blog,
  },
  {
    path: '/blog/:id',
    Component: BlogPost,
  },
]);