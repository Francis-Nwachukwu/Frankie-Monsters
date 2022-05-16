import { useState, useEffect } from "react";

import "./App.css";

import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

const App = () => {
  const [searchField, setSearchField] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (e) => {
    const searchFieldstring = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldstring);
  };

  return (
    <div className="App">
      <h1 className="app-title">Select Your Avatar</h1>

      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search monsters"
        className="monsters-search-box"
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
};
// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: "",
//     };
//   }

//   componentDidMount() {
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => response.json())
//   .then((users) =>
//     this.setState(() => {
//       return { monsters: users };
//     })
//       );
//   }

//   onSearchChange = (e) => {
//     const searchField = e.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
// const filteredMonsters = this.state.monsters.filter((monster) => {
//   return monster.name.toLocaleLowerCase().includes(this.state.searchField);
// });

//     if (this.state.monsters.length === 0) {
//       return <h1> Loading...</h1>;
//     } else {
//       return (
//         <div className="App">
//           <h1 className="app-title">Select Your Avatar</h1>

//           <SearchBox
//             onChangeHandler={this.onSearchChange}
//             placeholder="search monsters"
//             className="monsters-search-box"
//           />
//           <CardList monsters={filteredMonsters} />
//         </div>
//       );
//     }
//   }
// }

export default App;
