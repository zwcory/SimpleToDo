import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function App() {
    const [list,setList] = useState(
        ['Apple', 'Banana' , 'Mango']
    );
    const [inputText, setInputText] = useState(''); // State for input text

    // Handle changes to the input

    const getList = async() => {
        const fetchedList = localStorage.getItem('List');
        setList(JSON.parse(fetchedList));
    }

    const updateListStorage = async() => {
        // todo
        //  make sure saving
        localStorage.setItem('List', JSON.stringify(list));
    };
    const strikeThrough = async(e) => {
        e.preventDefault();
        // ToDo
        //  create strike through
        //  find way to save strike to local storage (poss dupe list but with bool instead of string)

    }
    const handleChange = (e) => {
        setInputText(e.target.value);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (inputText.trim() === '') return; // Prevent adding empty items
        setList((prevItems) => [...prevItems, inputText]); // Add new item to the list
        await updateListStorage(); // Update local storage
        setInputText(''); // Clear the input field
    }


    return (
        <>
            <div>
                <h1>
                    Welcome toDo
                </h1>
                <form onSubmit={handleSubmit}>
                    <h3>Here is your list
                    </h3>

                    <ul>
                        {list.map((item, index) => (
                            <li key={index}
                            onClick={strikeThrough}
                            >{item}</li>
                        ))}
                    </ul>
                    <div className="d-flex  input-group justify-content-around">
                            <input
                                type="text"
                                value={inputText}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter text"
                            />
                            <button type="submit" className="btn btn-primary">
                                Add
                            </button>
                    </div>
                </form>
            </div>
        </>
)
}

export default App
