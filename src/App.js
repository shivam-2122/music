import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tracks, setTracks] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [keyword, setkeyword] = useState("");

  const getTracks = async () => {
    setisloading(true);
    let data = await fetch(
      `https://v1.nocodeapi.com/shivamsk/spotify/DXDHytVokMRlkWrk/search?q=${
        keyword === "" ? "trending" : keyword
      }&type=track`
    );
    let ConvertedData = await data.json();
    setTracks(ConvertedData.tracks.items);
    setisloading(false);
  };
  useEffect(() => {
    getTracks();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Shivam Music
          </a>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => setkeyword(event.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className={`row ${isloading ? "" : "d-none"}`}>
          <div className="col-12 py-5 text-center">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col"></div>
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                {/* <img className="border-2 w-100"src={element.album.images[0].url} alt="" /> */}

                <div className="card">
                  <img
                    src={element.album.images[0].url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{element.name}</h5>
                    <p className="card-text">
                      {" "}
                      Artist: {element.album.artists[0].name}
                    </p>
                    <audio
                      src={element.preview_url}
                      controls
                      className="w-100"
                    ></audio>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
