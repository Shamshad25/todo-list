import Header from "./Header"
import Todo from "./Todo"


const Home = () => {
  return (
    <main className="h-screen">
      <Header />
      <div className="flex justify-center">
        <Todo />
      </div>
    </main>
  )
}

export default Home