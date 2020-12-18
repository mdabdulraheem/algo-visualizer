import React from 'react'
import './footer.css';
import * as githubData from '../../assets/animations/github.json';
import * as linkedinData from '../../assets/animations/linkedin.json';
import Lottie from 'react-lottie';

const Footer = () => {

    const githubOptions = {
        loop: true,
        autoplay: true, 
        animationData: githubData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
      
    const linkedInOptions = {
        loop: true,
        autoplay: true, 
        animationData: linkedinData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className="footer">

            <span>By Abdul Raheem</span>
            {/* Add Social Links below like Github, LinkedIn, etc*/}

            <button>
                <a href="https://github.com/mdabdulraheem" rel="noreferrer" target="_blank">
                    <Lottie 
                        options={githubOptions}
                        height={'100%'}
                        width={'100%'}
                        title="Github"
                        isClickToPauseDisabled={true}
                    />
                </a>
            </button>
            <button>
                <a href="https://www.linkedin.com/in/mohammed-abdul-raheem/" rel="noreferrer" target="_blank">
                    <Lottie 
                        options={linkedInOptions}
                        height={'100%'}
                        width={'100%'}
                        title="LinkedIn"
                        isClickToPauseDisabled={true}
                    />
                </a>
            </button>
        </div>
    )
}

export default Footer
