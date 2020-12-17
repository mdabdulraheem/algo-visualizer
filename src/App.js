import './App.css';
import Header from './components/header/header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Searching from './components/searching/searching';
import Sorting from './components/sorting/sorting';
import Home from './components/home/home';
import Footer from './components/footer/footer';
import Lottie from 'react-lottie';
import * as animationData from './assets/animations/tea-loading.json'
import { useState } from 'react';
import 'animate.css';

function App() {
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [isAnimationDone, setAnimationDone] = useState(true)

  setTimeout(()=>{
    setAnimationDone(true)
  }, 5000)

  return (
    <Router>
      {
        !isAnimationDone 
        ?
          <div className="App animate__animated animate__zoomIn">
            <div className="loading-animation">
              <Lottie 
                options={defaultOptions}
                height={'100vh'}
                width={'100vw'}
                isStopped={isAnimationDone}
              />
            </div>
          </div>
        :
          <div className="App animate__animated animate__fadeIn">
          {/* Header Component */}
            <Header />
            <div className="main-section">
              <Route path="/" exact component={Home}/>
              <Route path="/searching" component={Searching}/>
              <Route path="/sorting" component={Sorting}/>
            </div>
            <Footer />
          </div>
      }
    </Router>
    
  );
}

export default App;
