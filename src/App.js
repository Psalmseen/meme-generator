import React, { useState, useEffect } from "react";

const App = () => {
  const [state, setState] = useState({
    topText: "",
    bottomText: "",
    memeImg: "https://i.imgflip.com/9ehk.jpg",
    memeCollection: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const randImg =
      state.memeCollection[
        Math.floor(Math.random() * state.memeCollection.length)
      ].url;
    setState({ ...state, memeImg: randImg });
  };

  const print = () => {
    window.print();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    const fetchImage = async () => {
      const resp = await fetch("https://api.imgflip.com/get_memes");
      const data = await resp.json();
      setState({ ...state, memeCollection: data.data.memes });
    };
    fetchImage();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="topText"
          onChange={handleChange}
          value={state.topText}
          placeholder="Enter the top text"
        />
        <input
          name="bottomText"
          onChange={handleChange}
          value={state.bottomText}
          placeholder="Enter the bottom text"
        />
        <button>Get Meme</button>
      </form>
      <div className="wrapper">
        <div>
          <img src={state.memeImg} alt="meme" className="meme-image" />
        </div>
        <div className="meme-container">
          <h1 className="top-text"> {state.topText}</h1>
          <h1 className="bottom-text">{state.bottomText}</h1>
        </div>
      </div>
      <button onClick={() => print()}> Print</button>
    </div>
  );
};

export default App;
