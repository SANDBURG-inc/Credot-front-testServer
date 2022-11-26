import React from "react";
import "./AutoInputModal.css";
import { useState } from "react";
import { HOST } from "../../redux/store";

const AutoInputModal = (props) => {
  const { open, close, header, image, setImage, id, pw } = props;
  const [input, setInput] = useState("");

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <>
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <img id="img" src={`${URL.createObjectURL(image)}`} style={{ width: "360px", height: "80px", margin: "20px" }} />
              <div>
                <input
                  style={{
                    width: "200px",
                    height: "30px",
                    margin: "10px",
                    fontSize: "17px",
                  }}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                ></input>
                <button
                  className="submit"
                  onClick={async () => {
                    if (input == "") {
                      alert("빈 칸을 채워주세요.");
                      return;
                    }
                    await fetch(HOST + "/commerce/wmp/crawl?option=input", {
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify({ input: input, id: id, pw: pw }),
                    });
                    close();
                  }}
                >
                  입력
                </button>
                <button
                  style={{ width: "75px", margin: "10px" }}
                  className="refresh"
                  onClick={async () => {
                    await fetch(HOST + "/commerce/wmp/crawl?option=refresh")
                      .then((response) => {
                        return response.blob();
                      })
                      .then((response) => {
                        setImage(response);
                      });
                  }}
                >
                  새로고침
                </button>
              </div>
            </main>
            {/* <footer>
              
            </footer> */}
          </section>
        </>
      ) : null}
    </div>
  );
};

export default AutoInputModal;
