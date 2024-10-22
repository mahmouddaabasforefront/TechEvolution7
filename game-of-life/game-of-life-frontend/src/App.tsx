import './App.css'
import Footer from './components/Footer/Footer'
import Grid from './components/Grid/Grid'

function App() {

  return (
    <>
      <div className="root">
        <div className="grid-div">
          <Grid />
        </div>
        <div className="footer-div">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App
