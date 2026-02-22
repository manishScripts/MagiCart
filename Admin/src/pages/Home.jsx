import { useState } from 'react'
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
import Add from "./Add";
import List from "./List";
import Orders from "./Orders";

const Home = () => {
  const [item, setItem] = useState('add');

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Nav />
      <div className="flex flex-row flex-1 overflow-hidden">
        <Sidebar onSelectItem={setItem} selectedItem={item} />
        <div className="flex-1 overflow-auto">
          {item === 'add' && <Add />}
          {item === 'list' && <List />}
          {item === 'orders' && <Orders />}
        </div>
      </div>
    </div>
  )
}

export default Home;
