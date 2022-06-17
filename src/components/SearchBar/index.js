import { useState } from "react";
import styles from "./index.module.css";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";


function SearchBar({ data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  // hamburger menüdeki gibi yapmak için
  // <div onClick={handleClick} className="search-bar">
  //       {click ? (
  //         <AiOutlineClose className="icon"  />
  //       ) : (
  //         <AiOutlineSearch className="icon" />
  //       )}
  //     </div>

  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <input
          type="text"
          placeholder="Bir yer ara..."
          value={wordEntered}
          onChange={handleFilter}
        />

        <div className={styles.icon}>
          {wordEntered === "" ? (
            <AiOutlineSearch className={styles.searchIcon} />
          ) : (
            <AiOutlineClose id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {/* {filteredData.length !== 0 && <LocationDropdown data={filteredData} />} */}
      {/* {filteredData.length !== 0 && (
        <div className={styles.dataResult}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <a
                className={styles.dataItem}
                href={value.link + "/" + value.title.toLowerCase()}
              >
                <p>{value.title} </p>
              </a>
            );
          })}
        </div>
      )} */}
    </div>
  );
}

export default SearchBar;
