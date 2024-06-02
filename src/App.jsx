import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // password generate
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const specialChars = "!@#$%^&*()_+~`|}{[]:";
    const nums = "0123456789";
    if (numberAllowed) str += nums;
    if (charAllowed) str += specialChars;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // copy to clip board
  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 50);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // calling password generator function using useEffect Hook
  useEffect(() => {
    passwordGenerator();
  }, [length, charAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-800 ">
        <h1 className="text-white text-2xl text-center my-5 "> Password Genetator</h1>
        <div className=" flex shadow rounded-lg overflow-hidden   my-5 ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="outline-none bg-blue-700 hover:bg-blue-500 text-white px-3 py-0.5 shrink-0 rounded-md "
          >
            Copy
          </button>
        </div>
        <div className=" text-smm gap-x-2">
          <div className=" flex items-centre gap-x-1 ">
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        <div className="flex justify-center text-centre items-center gap-x-2">
          <button
            class=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-10"
            onClick={passwordGenerator}
          >
            Generate
          </button>
          </div>
      </div>
    </>
  );
}

export default App;
