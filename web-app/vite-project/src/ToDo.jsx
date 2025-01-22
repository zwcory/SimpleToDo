import {useEffect, useState} from 'react'
import './Footer.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from "./Footer.jsx";
function ToDo() {
    const [list,setList] = useState(
        []
    );
    const [blankList,setBlankList] = useState(Boolean);
    const [inputText, setInputText] = useState(''); // State for input text
    const [strike, setStrike] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
        setShowModal(false);
        const blankList = []; // Initialize blank list
        const blankStrike =[]; // Initialize blank list

        setList(blankList); // Update the list
        setStrike(blankStrike); // Update the strike states

        // Update local storage
        localStorage.setItem('List', JSON.stringify(blankList));
        localStorage.setItem('Strike', JSON.stringify(blankStrike));
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
            <div className={'container'}>
            <h1 id={'title'}>
                Simple ToDo
            </h1>
                <div className={'d-flex justify-content-center'}>
                <div className={'myCard d-flex align-self-center flex-column' }>
            <div>
               <h3 id={'header'}>Here is your list</h3>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {list.map((item, index) => (
                            <li key={index}
                                className={`item align-content-lg-start  ${strike[index] ? 'text-decoration-line-through' : ''}`}
                                onClick={() => strikeThrough(index)}
                            >{item}</li>
                        ))}

                        <li className={`item align-content-lg-start`}>

                            <div className="d-flex justify-content-around">
                                <div className="inputContainer">
                                    <input required=""
                                           className="customInput"
                                           type="text"
                                           placeholder={'Enter Text'}
                                           value={inputText}
                                           onChange={handleChange}/>
                                </div>
                                <button
                                    type="submit"
                                    className={'myBtn greenBtn'}
                                >
                                    ADD
                                </button>
                            </div>
                        </li>
                    </ul>
                </form>
            </div>
            <div className={`mt-auto`}>
                <div className={'d-flex justify-content-around'}>
                    <button
                        className={'myBtn redBtn'}
                            onClick={clearCrossedOutItems}
                    >
                        CLEAR
                    </button>
                    <button
                        className={'myBtn redBtn'}
                        onClick={() => setShowModal(true)}>
                        RESET
                    </button>
                </div>
            </div>
        </div>
        </div>
        </div>
            {showModal && !blankList && (
                <div className="modal show" style={{display: 'block', paddingTop:'3em' ,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog">
                        <div className={`modal-content`} style={{backgroundColor:'#fafafa'}}>
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Reset?</h5>
                                <button type="button" className="btn-close"  onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body" >
                                <p style={{paddingTop:'1rem'}}>Are you sure you want to reset your list?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="myBtn greyBtn" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="myBtn redBtn" onClick={resetItems}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </>
    )
}

export default ToDo;
