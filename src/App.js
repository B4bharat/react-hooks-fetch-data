import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";
import "./styles.css";

const ThreeDots = (props) => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={160}
    width={400}
    speed={2}
    backgroundColor="transparent"
    {...props}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
);

function App() {
  const [data, setData] = useState({ hits: [] });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );

      setData(result.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <ThreeDots />;
  }

  return (
    <ul>
      {data.hits.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
