import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.filter((tsk) => tsk.title === newTaskTitle);

    if (taskExist.length) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks([...tasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    const tasksList = tasks?.map((item: Task) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item?.done,
        };
      }
    });

    setTasks(tasksList as Task[]);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            const tasksList = tasks?.filter((item: Task) => item?.id !== id);

            setTasks(tasksList as Task[]);
          },
        },
      ]
    );
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const tasksList = tasks?.map((item: Task) => {
      if (item.id === id) {
        return {
          ...item,
          title: taskNewTitle,
        };
      }
    });

    setTasks(tasksList as Task[]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
