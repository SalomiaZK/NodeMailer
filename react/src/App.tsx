import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Homepage from "./assets/Pages/Homepages"
import Sent from "./assets/Pages/Sent"

const route = createBrowserRouter([
  {
    path : "/", 
    element : <Homepage/>, 
      children : [
        {
          path: "/sent", 
          element : <Sent/>
        }
      ]

  }
])

function App() {
  return (
  <RouterProvider router ={route}/>)  
}

export default App
