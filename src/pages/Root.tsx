import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function Root() {
  return (
    <div className='h-auto min-h-dvh bg-slate-200'>
      <div className='container m-auto py-3'>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
