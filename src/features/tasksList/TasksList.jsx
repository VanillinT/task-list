import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddTaskModal from "./AddTaskModal";
import {
  selectTasksData,
  fetchTasks,
  tasksSaved,
  taskEditedLocally,
  selectUnsavedTasks,
} from "./tasksSlice";
import { modalOpened } from "./taskModalSlice";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  TextField,
  TableSortLabel,
  Box,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { useTasksListStyles } from "./styles";
import { selectLoggedIn } from "../auth/userInfoSlice";
import {
  orderByChanged,
  sortDirectionChanged,
  currentPageChanged,
  selectTaskListState,
} from "./tasksListStateSlice";
import { headers } from "./config";

const getDoubleDigitStatus = (status) => {
  const singleDigit = String(status).length === 1;
  return singleDigit ? "0" + status : String(status);
};

const getNewStatus = (status, { edited, done }) => {
  let newStatus = getDoubleDigitStatus(status);
  if (typeof edited !== "undefined") newStatus = newStatus[0] + Number(edited);
  if (typeof done !== "undefined") newStatus = Number(done) + newStatus[1];

  return Number(newStatus);
};

const getTaskInfoFromStatus = (status) => {
  const doubleDigitStatus = getDoubleDigitStatus(status);
  return {
    done: doubleDigitStatus[0] === "1",
    edited: doubleDigitStatus[1] === "1",
  };
};

const TasksList = () => {
  const styles = useTasksListStyles();
  const dispatch = useDispatch();
  const { orderBy, sortDirection, currentPage } = useSelector(
    selectTaskListState
  );

  const loggedIn = useSelector(selectLoggedIn);
  const unsavedTasks = useSelector(selectUnsavedTasks);
  const { tasks, count } = useSelector(selectTasksData);
  const pageCount = Math.ceil(count / 3);

  const handleSelectSortField = (id) => {
    if (orderBy !== id) dispatch(orderByChanged(id));
    else
      dispatch(sortDirectionChanged(sortDirection === "desc" ? "asc" : "desc"));
  };

  const handleOpenModal = () => dispatch(modalOpened());

  const handleChangePage = (e, val) => {
    dispatch(currentPageChanged(val));
  };

  const updateUnsavedTask = (task) => {
    dispatch(taskEditedLocally(task));
  };
  const handleTextChange = (e, task) => {
    updateUnsavedTask({
      ...task,
      text: e.target.value,
      status: getNewStatus(task.status, { edited: true }),
    });
  };

  const handleCheckboxClick = (e, task) => {
    updateUnsavedTask({
      ...task,
      status: getNewStatus(task.status, { done: e.target.checked }),
    });
  };

  const saveChanges = () => {
    dispatch(tasksSaved());
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [currentPage, sortDirection, orderBy]);

  return (
    <Box>
      <Box className={styles.utilsWrapper}>
        <Box>
          <Button
            className={styles.button}
            variant="outlined"
            onClick={handleOpenModal}
            endIcon={<span className="material-icons">add_task</span>}
          >
            New task
          </Button>
          {unsavedTasks.length > 0 && (
            <Button
              className={styles.button}
              variant="outlined"
              onClick={saveChanges}
              endIcon={<span className="material-icons">save</span>}
            >
              Save
            </Button>
          )}
        </Box>
        {pageCount > 0 && (
          <Pagination
            className={styles.pagination}
            count={pageCount}
            shape="rounded"
            onChange={handleChangePage}
          />
        )}
      </Box>
      {tasks && tasks.length ? (
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((cell) => (
                  <TableCell key={cell.label} width={cell.width}>
                    {cell.sortable ? (
                      <TableSortLabel
                        active={orderBy === cell.label}
                        direction={sortDirection}
                        onClick={() => handleSelectSortField(cell.label)}
                      >
                        {cell.label}
                      </TableSortLabel>
                    ) : (
                      cell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.id}</TableCell>
                  <TableCell>{task.username}</TableCell>
                  <TableCell>{task.email}</TableCell>
                  <TableCell>
                    <TextField
                      className={styles.textField}
                      variant="outlined"
                      value={task.text}
                      label={
                        getTaskInfoFromStatus(task.status).edited
                          ? "Edited by admin"
                          : ""
                      }
                      multiline
                      rowsMax={3}
                      disabled={!loggedIn}
                      onChange={(e) => handleTextChange(e, task)}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={getTaskInfoFromStatus(task.status).done}
                      onClick={(e) => handleCheckboxClick(e, task)}
                      disabled={!loggedIn}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <AddTaskModal />
    </Box>
  );
};

export default TasksList;
