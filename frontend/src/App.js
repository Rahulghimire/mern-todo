import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState("");
  const [listItems, setlistItems] = useState([]);

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/api/item", {
        item: item,
      });
      setlistItems((prev) => [...prev, res.data]);
      console.log(res);
      setItem("");
    } catch (err) {
      console.log(err);
    }
  };

  //function to fetch all data from the database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/items");
        console.log(res.data);
        setlistItems(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchItems();
  }, []);

  //delete item when click delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      console.log(res);
      const newListItem = listItems.filter((item) => item._id !== id);
      setlistItems(newListItem);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="App">
      <h1>ToDoApp</h1>
      <form onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="Add a Todo Item"
          onChange={(e) => setItem(e.target.value)}
          value={item}
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listitems">
        {listItems.map((item) => (
          <div className="todoitems" key={item._id}>
            <p className="item-content">{item.item}</p>
            <button className="update-item">Update</button>
            <button
              className="delete-item"
              onClick={() => deleteItem(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
