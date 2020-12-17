import { wait } from '../../utils';
import { useState } from 'react';
import Select from 'react-select';

const Sorting = () => {
    const [selectedAlgo, setSelectedAlgo] = useState(0);
    const [elements, setElements] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(1000)

    const options = [
        { value: 1, label: 'Selection Sort' },
        { value: 2, label: 'Merge Sort' },
        { value: 3, label: 'Quick Sort' },
    ];
    const options2 = [
        { value: 10, label: '10 Elements' },
        { value: 50, label: '50 Elements' },
        { value: 100, label: '100 Elements' },
    ];

    const generateArray = (size) => {
        let arr = [];
        if(size === 100) 
            setSpeed(0.01);
        else if(size === 50) 
            setSpeed(20);
        else {
            setSpeed(100);
        }

        for(let i=0; i<size; i++) {
            arr.push({
                number: Math.floor(Math.random() * (95)) + 5,
                positionBeingSorted: false,
                sorted: false,
                minElement: false,
                comparingElement: false
            });
        }
        setElements(arr);
        console.log({arr})
    }

    const startSort = () => {
        setIsSorting(true);
        console.log('selectedAlgo', selectedAlgo)
        switch(parseInt(selectedAlgo)) {
            case 1:
                selectionSort();
                break;
            default:
                break;
        }
    }

    const selectionSort = async () => {
        for(let i=0; i<elements.length; i++) {
            elements[i].positionBeingSorted = true;
            setElements([...elements]);
    
            let iMin = i;
            for(let j=i+1; j<elements.length; j++) {
                elements[iMin].minElement = true;
                elements[j].comparingElement = true;
                setElements([...elements]);
                console.log(speed, typeof(speed))
                await wait(speed);
                elements[iMin].minElement = false;
                setElements([...elements])
                if(elements[iMin].number > elements[j].number) {
                    iMin = j;
                }
                elements[j].comparingElement = false;
                setElements([...elements])
            }
            if(iMin !== i) {
                let temp = elements[i].number;
                elements[i].number = elements[iMin].number;
                elements[iMin].number = temp;
            }
            elements[i].sorted = true;
            setElements([...elements]);
        }
        setIsSorting(false)
    }

    return (
        <div className="algos animate__animated animate__fadeIn">
            <div className="algo-menu">
                <h4>Sorting Algorithms</h4>
                <div className="algo-optioins">
                        <Select
                            className={`algo-dropdown ${isSorting ? 'disabled': ''}`}
                            placeholder="Select Algorithm"
                            onChange={(e)=> {
                                setSelectedAlgo(e.value)
                            }}
                            options={options}
                        />
                    { selectedAlgo > 0 &&
                        <Select
                            className={`elements-dropdown ${isSorting ? 'disabled': ''}`}
                            placeholder="Select Elements"
                            onChange={(e)=> {
                                generateArray(e.value)
                            }}
                            options={options2}
                        />
                    }
                    { elements.length > 0 &&
                        <button className={isSorting ? "disabled" : null} onClick={startSort}>Sort</button>
                    }
                </div>
            </div>
            <div className="algo-visualize">
                { elements.length > 0 &&
                    <div className="color-indicators">
                        <div>
                            <span className="sorted"></span>Sorted
                        </div>
                        <div>
                            <span className="unsorted"></span>Un Sorted
                        </div>
                        <div>
                            <span className="min-element"></span>Minimun Element
                        </div>
                        <div>
                            <span className="position-being-sorted"></span>Position Being Sorted
                        </div>
                        <div>
                            <span className="comparing-element"></span>Comparing Element
                        </div>
                    </div>
                }
                { elements.length > 0 &&
                    <div className="element-container animate__animated animate__zoomIn">
                        {elements.map((el, idx) => 
                            <div className={`bars bar-${idx}
                                            ${el.class} ${el.positionBeingSorted ? 'position-being-sorted' : ''}
                                            ${el.sorted ? 'sorted' : ''}
                                            ${el.minElement ? 'min-element' : ''}
                                            ${el.comparingElement ? 'comparing-element' : ''}
                                         `} 
                                         key={idx} style={{height: `${el.number}%`, width: `calc(100% / ${elements.length})` }}>
                                {/* {el} */}
                            </div>
                        )}
                    </div>
                }
                
            </div>
        </div>
    )
}

export default Sorting;
