import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";


function App(props) {

  // style objects
  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }

  // state & other variables
  // API
  const url = "https://django-todos-dv.herokuapp.com/todos/"

  // State
  const [posts, setPosts] = useState([])

  const nullTodo = {
    subject: "",
    details: ""
  }

  const [targetTodo, setTargetTodo] = useState(nullTodo)

  // functions
  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  const addTodos = async(newTodo) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
        },
      body: JSON.stringify(newTodo)
    })
    getTodos()
  }

  const getTargetTodo = (todo) => {
    setTargetTodo(todo)
    props.history.push("/edit")
  }

  const updateTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    })
    getTodos()
  }

  const deleteTodo = async (todo) => {
    const response = await fetch(url + todo.id + "/", {
      method: "delete"
    })
    getTodos()
    props.history.push("/")
  }

  // useEffects
  useEffect(() => {getTodos()},[])

  // returned JSX  
  return (
    <div className="App">
      <h1 style={h1}> My Todo List</h1>
      <Link to="/new">
        <button style={button}>Create New Todo</button>
      </Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => <SinglePost 
            {...routerProps} 
            posts={posts}
            edit={getTargetTodo}
            deleteTodo={deleteTodo} 
          />}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form 
            {...routerProps} 
            initialTodo={nullTodo} 
            handleSubmit={addTodos} 
            buttonLabel="Create Todo"
          />}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form 
            {...routerProps}
            initialTodo={targetTodo}
            handleSubmit={updateTodo}
            buttonLabel="Update Todo"
          />}
        />
      </Switch>
    </div>
  );
}

export default App;
