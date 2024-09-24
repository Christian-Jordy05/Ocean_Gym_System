import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:8000/api/hello-world/");
        const response = await data.json();
        setMessage(response.message);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <p>Mensaje:</p>
      <p>{message}</p>
    </>
  )
}

export default App
