import {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
function ToDo() {
    const [list,setList] = useState(
        // ['Apple', 'Banana' , 'Mango']
        []
    );
    const [count, setCount] = useState(0);
    const [blankList,setBlankList] = useState(Boolean);
    const [inputText, setInputText] = useState(''); // State for input text
    let [strike, setStrike] = useState([]);


    useEffect(() => {
        console.log("count expected to be 0, is " , count);
        getList().then();
        getStrike().then();
        console.log('is blank list? ' , blankList);
        console.log('list is ' , list);
    }, []);

    const getList = async() => {
        const fetchedList = localStorage.getItem('List');
        setList(JSON.parse(fetchedList));
        if (fetchedList !== null){
           setBlankList(false);
            console.log('inside get list, blank list is' , blankList);
        } else {
            setBlankList(true);
        }
        setCount((counts) => counts + 1);
        console.log("expecting count to be 1 is" , count);
    }
    const updateListStorage = async() => {
        // todo
        //  make sure saving
        setCount((counts) => counts + 1);
        console.log("expecting count to be 3 is" , count);
        console.log('inside update list storage, list is: ' , list);
        localStorage.setItem('List', JSON.stringify(list));
    };
    const getStrike = async () => {
       const strikeList =  localStorage.getItem('Strike');
       setStrike(JSON.parse(strikeList));
    }
    const strikeThrough = async (key) => {
        if (strike[key]){
            setStrike(prevState => [...prevState[key] = false] )
            console.log('new list of strikes is' , strike)
        } else {
            setStrike(prevState => [...prevState[key] = true] )
            console.log('new list of strikes is' , strike)
        }
    }
    const updateStrike = async() => {
        localStorage.setItem('Strike', JSON.stringify(strike));
    }
    // const strikeThrough = async(e) => {
    //     e.preventDefault();
    //     // ToDo
    //     //  create strike through
    //     //  find way to save strike to local storage (poss dupe list but with bool instead of string)
    //
    // }

    const handleChange = (e) => {
        setInputText(e.target.value);
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (inputText.trim() === '') return; // Prevent adding empty items
            if (list === null) {
                await setList([inputText]);
                setCount((counts) => counts + 1);
                console.log("expecting count to be 2 is" , count);
                setBlankList(false);
                setStrike([false]);
            } else {
                await setList((prevItems) => [...prevItems, inputText]);// Add new item to the list
                await setStrike((prevValues) => [...prevValues, false]); // Add new item to the list
            }
            console.log('list is now:', list);
            await updateListStorage(); // Update local storage
            await updateStrike();
            setInputText(''); // Clear the input field
        }
        catch (err) {
            console.log("error", err);
        }
    };


    return (
        <>
            <div>
                <h1>
                    Welcome ToDo
                </h1>
                <form onSubmit={handleSubmit}>
                    <h3>Here is your list
                    </h3>
                    {blankList? (
                            <li></li>
                        ) :(
                        list.map((item, index) => (
                        <li key={index}
                            className={`${strike[index]? 'dark-text' : '' }`}
                         onClick={strikeThrough}
                        >{item}</li>
                        )))}
                    <div className="d-flex  input-group justify-content-around">
                            <input
                                type="text"
                                value={inputText}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter text"
                            />
                            <button
                                type="submit" className="btn btn-primary">
                                Add
                            </button>
                    </div>
                </form>
            </div>
        </>
)
}

export default ToDo;
