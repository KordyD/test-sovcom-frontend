import Header from './components/Header';
import WordModule from './components/WordModule';

function App() {
  return (
    <div className='h-auto min-h-dvh bg-slate-200'>
      <div className='container m-auto py-3'>
        <Header />
        <div className='flex space-x-6 py-6'>
          <WordModule />
        </div>
      </div>
    </div>
  );
}

export default App;
