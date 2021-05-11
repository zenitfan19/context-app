import React, {
  createContext,
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

const MyContext = createContext(true);

const App = () => {
  const [appContext, setAppContext] = useState(true);
  const [appName, setAppName] = useState("ContextAppA");

  const handleContextChange = useCallback(() => {
    setAppContext((prevContext) => !prevContext);
  }, []);

  const handleAppNameChange = () => {
    setAppName((prevAppName) =>
      prevAppName === "ContextAppA" ? "ContextAppB" : "ContextAppA"
    );
  };

  useEffect(() => {
    console.log("App mounting");
  });

  useEffect(() => {
    console.log("App updating");
  });

  return (
    <MyContext.Provider value={appContext}>
      <div>
        <h1>{appName}</h1>
        <h2>To change app name press the button below:</h2>
        <button onClick={handleAppNameChange}>Change app name</button>
        <ChildA handleContextChange={handleContextChange} />
      </div>
    </MyContext.Provider>
  );
};

type ChildAProps = {
  handleContextChange: () => void;
};

const ChildA: FC<ChildAProps> = memo(({ handleContextChange }) => {
  useEffect(() => {
    console.log("ChildA mounting");
  }, []);

  useEffect(() => {
    console.log("ChildA updating");
  });

  return (
    <div>
      <h2>To change context press the button below:</h2>
      <button onClick={handleContextChange}>Change context</button>
      <ChildB />
    </div>
  );
});

const ChildB = () => {
  useEffect(() => {
    console.log("ChildB mounting");
  }, []);

  useEffect(() => {
    console.log("ChildB updating");
  });

  const value = useContext(MyContext);
  return <p>{`The context is ${value}`}</p>;
};

ReactDOM.render(<App />, document.getElementById("root"));
