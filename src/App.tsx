import Header from "./components/Header";
import Todo from "./components/Todo";

function App() {
  return (
    <main className="h-screen">
      <Header />
      <div className="flex justify-center">
        <Todo />
      </div>
    </main>
  );
}

export default App;
