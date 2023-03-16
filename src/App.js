import { useEffect, useRef, useState } from 'react';
import './styles/styles.scss'

function App() {
  const input = useRef("");
  const c = useRef("US");
  const countryids = [
    { country: "United States", id: "US" },
    { country: "Australia", id: "AUS" },
    { country: "Pakistan", id: "PK" },
    { country: "India", id: "IN" },
    { country: "France", id: "FR" },
    { country: "UK", id: "GB" },
    { country: "UAE", id: "AE" },
    { country: "Italy", id: "IT" },
    { country: "China", id: "CN" }
  ];

  const [username, setUsername] = useState("");
  const [countryID, setCountryID] = useState("US");
  const [age, setAge] = useState(0);

  useEffect(() => {
    const apiurl = `https://api.agify.io?name=${username}&country_id=${countryID}`;

    const fetchAPI = async () => {
      try {
        const response = await fetch(apiurl);
        const { age, country_id } = await response.json();
        setCountryID(country_id);
        setAge(age);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchAPI();

  }, [username, countryID, age]);

  const handleInputChange = () => {
    const value = input.current.value;
    setUsername(value);

    const cc = c.current.options[c.current.selectedIndex]
    setCountryID(cc.id);
  }
  return (
    <div className='app'>
      <div className="container">
        <div className='input'>
          <input type="text" ref={input} className="name" />
          <select name="country" id="country" ref={c}>
            {
              countryids.map((item, index) => (
                <option name={item.id} id={item.id} key={index}>{item.country}</option>
              ))
            }
          </select>
          <button onClick={handleInputChange}>Let me Predict</button>
        </div>
        <div className="output">
          {
            username === "" ? (
              <p className='prediction'><span>Please Enter your name</span></p>
            ) : (
              <p className='prediction'><span>I guess you are {age} Years old</span></p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
