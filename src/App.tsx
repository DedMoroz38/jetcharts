import Header from './components/Header';
import { Main } from './components/Main';


function App() {

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <Header />
      <main className="container flex-1">
        <Main />
      </main>
    </div>
  );
}

export default App;
