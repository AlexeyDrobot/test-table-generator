import CreateTableDropdown from './components/CreateTableDropdown';
import TablesList from './components/TablesList';

function App() {
  return (
    <div className="flex min-h-svh flex-col items-stretch gap-4 p-4 bg-gray-100">
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
