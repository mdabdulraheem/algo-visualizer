import { wait } from '../../utils';
import { useState } from 'react';
import Select from 'react-select';
import Lottie from 'react-lottie';
import * as sortingData from '../../assets/animations/sorting.json';

const Sorting = () => {
    const [selectedAlgo, setSelectedAlgo] = useState(0);
    const [noOfElements, setNoOfElements] = useState(undefined);
    const [elements, setElements] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const [speed, setSpeed] = useState(1000)

    const sortingOptions = {
        loop: true,
        autoplay: true, 
        animationData: sortingData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const options = [
        { value: 1, label: 'Selection Sort',  isDisabled: false },
        { value: 2, label: 'Merge Sort', isDisabled: false },
        { value: 3, label: 'Quick Sort',  isDisabled: true },
        { value: 4, label: 'Heap Sort',  isDisabled: true },
        { value: 5, label: 'Bubble Sort',  isDisabled: true },
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
            case 2:
                // let array = [...elements]
                mergeSort([...JSON.parse(JSON.stringify(elements))], 0, elements.length-1);
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

    let mergeSortArray = [];
    const mergeSort = async (array, left, right) => {
        if(left < right) {
            let mid = Math.floor((left+right)/2);
            mergeSort(array, left, mid);
            mergeSort(array, mid+1, right);
            merge(array, left, mid, right);
        } else if(left>=right && right === array.length-1) {
            visualiseMergeSort();
        } 
    }
    const merge = async (array, left, mid, right) => {
        let p = left;
        let q = mid + 1;
        let r = left;
        let tempArr = new Array(array.length);
        
        while( p <= mid && q <= right) {
            mergeSortArray.push({
                action: 'compare',
                elements: [p,q]
            })
            if(array[p].number > array[q].number) {
                tempArr[r] = array[q].number;
                mergeSortArray.push({
                    action: 'overwrite',
                    elements: [r, array[q].number]
                })
                q++;
            } else {
                tempArr[r] = array[p].number;
                mergeSortArray.push({
                    action: 'overwrite',
                    elements: [r, array[p].number]
                })
                p++;
            }
            r++;
        }

        while(p <= mid) {
            tempArr[r] = array[p].number;
            mergeSortArray.push({
                action: 'overwrite',
                elements: [r, array[p].number]
            })
            p++;
            r++;
        }
        while(q <= right) {
            tempArr[r] = array[q].number;
            mergeSortArray.push({
                action: 'overwrite',
                elements: [r, array[q].number]
            })
            q++;
            r++;
        }
        for(let i=left; i<=right; i++) {
            array[i].number = tempArr[i];
        }
    }
    const visualiseMergeSort = async () => {
        for(let i=0; i<mergeSortArray.length; i++) {
            if(mergeSortArray[i].action === "compare") {
                elements[mergeSortArray[i].elements[0]].minElement = true;
                elements[mergeSortArray[i].elements[1]].comparingElement = true;
                setElements([...elements])
                await wait(speed);
                elements[mergeSortArray[i].elements[0]].minElement = false;
                elements[mergeSortArray[i].elements[1]].comparingElement = false;
                setElements([...elements])
            } else {
                elements[mergeSortArray[i].elements[0]].number = mergeSortArray[i].elements[1];
                setElements([...elements])
            }
        }
        for(let i=0; i<elements.length; i++) {
            elements[i].sorted = true;
        }
        setElements([...elements]);
        setIsSorting(false);
    }



    return (
        <div className="algos animate__animated animate__fadeIn">
            <div className="algo-menu">
                <h4>Sorting Algorithms</h4>
                <div>

                { !selectedAlgo &&
                    <div className="instructions animate__animated animate__fadeIn">
                        Please Select Algorithm
                    </div>
                }
                { selectedAlgo > 0 && !noOfElements && 
                    <div className="instructions animate__animated animate__fadeIn">
                        Please Select No of Elements
                    </div>
                }
                </div>
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
                                setNoOfElements(e.value)
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
            { elements.length === 0 ? (
                <div className="algo-visualize home">
                    <div className="home-definition definition">
                        In computer science, a sorting algorithm is an algorithm that puts elements of a list in a certain order. The most frequently used orders are numerical order and lexicographical order. Efficient sorting is important for optimizing the efficiency of other algorithms that require input data to be in sorted lists.
        
                        <br />
                        <br />
                        <span class="definition-source">Source: Wikipedia</span>
                    </div>
                    <div className="home-animation">
                        <div style={{width: '50%'}}>
                            <Lottie 
                                options={sortingOptions}
                                height={'100%'}
                                width={'100%'}
                                title="Sorting"
                                isClickToPauseDisabled={true}
                            />
                        </div>
                    </div>
                </div>
            
            ) : (
                <div className="algo-visualize">
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
                        { selectedAlgo === 1 &&
                            <div>
                                <span className="position-being-sorted"></span>Position Being Sorted
                            </div>
                        }                        
                        <div>
                            <span className="comparing-element"></span>Comparing Element
                        </div>
                    </div>
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
                
                </div>
            )
            }

        </div>
    )
}

export default Sorting;
