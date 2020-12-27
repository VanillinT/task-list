import React from "react";
import Notifier from "../features/notifications/Notifier";
import TasksList from "../features/tasksList/TasksList";
import Header from "./Header";
import { useAppStyles } from "./styles";

const App = () => {
  const styles = useAppStyles();
  return (
    <div className="App">
      <Notifier />
      <Header />
      <div className={styles.body}>
        <TasksList />
      </div>
    </div>
  );
};

export default App;
