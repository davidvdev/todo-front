import React, {useState, useEffect} from "react";
import {Route, Switch} from "react-router-dom"

import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";


function App() {

  // style objects
  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  // state & other variables
  // API
  const url = "https://django-todos-dv.herokuapp.com/todos/"
  // State
  const [posts, setPosts] = useState([])

  // functions
  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  // useEffects
  useEffect(() => {getTodos()},[])

  // returned JSX  
  return (
    <div className="App">
      <h1 style={h1}> My Todo List</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => <SinglePost {...routerProps} posts={posts} />}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form {...routerProps}/>}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form {...routerProps}/>}
        />
      </Switch>
    </div>
  );
}

export default App;
