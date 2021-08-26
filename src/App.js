import { useEffect, useState } from "react";
import "./App.css";

//the focus for this project isn't to create a useful app
//but to simply test netlify functions with express.js
//so the fetch function isn't exactly readable

const getData = ({ value }) => value;

function App() {
  const [data, setData] = useState("loading...");
  const [error, setError] = useState(null);

  //api paths
  const u1 = "/.netlify/functions/server";
  const u2 = "/.netlify/functions/express?name=YUTA";
  const u3 = "/.netlify/functions/express/about";
  const u4 = "/.netlify/functions/express/users";
  const u5 = "/server"; //path is rewritte to /.netlify/functions/server by setupProxy.js
  const u6 = "/server/express"; //path is rewritten to /.netlify/functions/express by setupProxy.js
  const u7 = "/express";
  useEffect(() => {
    //Promise.all() will reject even if one promise rejects
    //but Promise.allSettled won't reject all the promises
    //as all requests are not dependent on each other, Promise.allSettled is preferred
    Promise.allSettled(
      [u1, u2, u3, u4, u5, u6, u7].map(url =>
        fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Cotent-Type": "application/json",
            Authorization: "basic",
          },
          cache: "default",
          mode: "same-origin",
        })
      )
    )
      .then(responses => {
        return Promise.allSettled(responses.map(({ value }) => value.json()));
      })
      .then(data => {
        setData(data.map(getData));
      })
      .catch(error => {
        console.log("error", error);
        setError(error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {Array.isArray(data) &&
          data.map(res => {
            console.log("res", res);
            return (
              <pre
                style={{ border: "1px solid grey", padding: 10 }}
                key={res?.id}
              >
                {" "}
                {JSON.stringify(res, null, 2)}
              </pre>
            );
          })}
        {error && (error.message || "something went wrong...")}
      </header>
    </div>
  );
}

export default App;
