import './home.css';
import Lottie from 'react-lottie';
import * as flowChartData from '../../assets/animations/flowchart.json';

const Home = () => {

    const flowChartOptions = {
        loop: true,
        autoplay: true, 
        animationData: flowChartData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="animate__animated animate__fadeIn home">
            <div className="home-definition definition">
                In mathematics and computer science, an algorithm is a finite sequence of well-defined, 
                computer-implementable instructions, typically to solve a class of problems or to perform
                 a computation. Algorithms are always unambiguous and are used as specifications for
                  performing calculations, data processing, automated reasoning, and other tasks.

                <br />
                <br />
                <span class="definition-source">Source: Wikipedia</span>
            </div>
            <div className="home-animation">
                <div style={{width: '50%'}}>
                    <Lottie 
                        options={flowChartOptions}
                        height={'100%'}
                        width={'100%'}
                        title="Flow Chart"
                        isClickToPauseDisabled={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;