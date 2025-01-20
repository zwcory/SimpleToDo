import {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function ToDo() {
    const [list,setList] = useState(
        // ['Apple', 'Banana' , 'Mango']
        []
    );
    const [blankList,setBlankList] = useState(Boolean);
    const [inputText, setInputText] = useState(''); // State for input text
    let [strike, setStrike] = useState([]);


    useEffect(() => {
        getList().then();
        getStrike().then();
        console.log('is blank list? ' , blankList);
        console.log('list is ' , list);
    }, []);

    const getList = async () => {
        const fetchedList = JSON.parse(localStorage.getItem('List')) || [];
        setList(fetchedList);
        setBlankList(fetchedList.length === 0);
    };

    const getStrike = async () => {
        const strikeList = JSON.parse(localStorage.getItem('Strike')) || [];
        setStrike(strikeList);
    };
    const strikeThrough = (key) => {
        setStrike((prevState) => {
            const updatedStrike = [...prevState]; // Copy the previous state
            updatedStrike[key] = !updatedStrike[key]; // Toggle the value at the specified index
            localStorage.setItem('Strike', JSON.stringify(updatedStrike)); // Update localStorage
            return updatedStrike; // Update the state
        });
    };

    const clearCrossedOutItems = () => {
        const filteredList = list.filter((_, index) => !strike[index]); // Keep only non-crossed items
        const filteredStrike = strike.filter((item) => !item); // Remove crossed-out states

        setList(filteredList); // Update the list
        setStrike(filteredStrike); // Update the strike states

        // Update local storage
        localStorage.setItem('List', JSON.stringify(filteredList));
        localStorage.setItem('Strike', JSON.stringify(filteredStrike));
    };

    const resetItems = () => {
        
    }
    const handleChange = (e) => {
        setInputText(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (inputText.trim() === '') return; // Prevent adding empty items
            let updatedList;
            let updatedStrike;

            if (list === null || list.length === 0) {
                updatedList = [inputText];
                updatedStrike = [false];
                setBlankList(false);
            } else {
                updatedList = [...list, inputText]; // Prepare updated list
                updatedStrike = [...strike, false]; // Prepare updated strike list
            }

            setList(updatedList); // Update state
            setStrike(updatedStrike); // Update state

            // Save the updated values to localStorage
            localStorage.setItem('List', JSON.stringify(updatedList));
            localStorage.setItem('Strike', JSON.stringify(updatedStrike));

            setInputText(''); // Clear the input field
        } catch (err) {
            console.error("Error:", err);
        }
    };


    return (
        <>
            <div className={'container d-flex justify-content-center'}>
                <div className={'myCard align-self-center'}>


            <div>
                <h1>
                    Welcome ToDo
                </h1>
                <form onSubmit={handleSubmit}>
                    <h3>Here is your list
                    </h3>
                    <ul>
                        {list.map((item, index) => (
                            <li key={index}
                                className={`item align-content-lg-start  ${strike[index] ? 'text-decoration-line-through' : ''}`}
                                onClick={() => strikeThrough(index)}
                            >{item}</li>
                        ))}

                        <li>

                            <div className="d-flex justify-content-around">
                                <div className="inputContainer">
                                    <input required=""
                                           className="customInput"
                                           type="text"
                                           placeholder={'Enter Text'}
                                           value={inputText}
                                           onChange={handleChange}/>
                                    {/*<label className="inputLabel">Your Name</label>*/}
                                </div>
                                {/*<input*/}
                                {/*    type="text"*/}
                                {/*    value={inputText}*/}
                                {/*    onChange={handleChange}*/}
                                {/*    className="form-control"*/}
                                {/*    placeholder="Enter text"*/}
                                {/*/>*/}
                                <button
                                    type="submit" className="btn btn-primary">
                                    Add
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <button className={'btn btn-danger my-2'}
                                onClick={resetItems}
                                >
                            Resest
                        </button>
                        <button
                            className="btn btn-danger my-2"
                            onClick={clearCrossedOutItems}
                        >
                            Clear Crossed-Out Items
                        </button>
                    </div>
                </form>
            </div>
                </div>
            </div>
        </>
    )
}

export default ToDo;
