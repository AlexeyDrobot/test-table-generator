import CreateTableDropdown from './components/CreateTableDropdown';
import TablesList from './components/TablesList';

function App() {
  return (
    <div className="flex min-h-svh flex-col items-stretch gap-4 py-8 px-12">
      <header>
        <CreateTableDropdown />
      </header>
      <main>
        <TablesList />
      </main>
    </div>
  );
}

export default App;
