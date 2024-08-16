<template>
    <div class="container">
      <h2>Daily Todo's</h2>
      <div class="input-group">
        <input v-model="newTodoName" placeholder="Item Name" />
        <button @click="addTodo">Add Todo</button>
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      
      <ul class="todo-list">
        <li v-for="todo in Todos" :key="todo.id">
          {{ todo.name }}
          <button @click="deleteTodo(todo.id)" class="delete-btn">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { db } from '../firebase';
  import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const Todos = ref([]);
      const newTodoName = ref('');
      const errorMessage = ref('');
      const todosCollectionRef = collection(db, 'todo');
  
      const fetchTodos = async () => {
        const data = await getDocs(todosCollectionRef);
        Todos.value = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      };
  
      const addTodo = async () => {
        if (!newTodoName.value.trim()) {
            errorMessage.value = 'Item name cannot be empty.';
            setTimeout(() => {
            errorMessage.value = '';
            }, 5000);
            return;
        }
        await addDoc(todosCollectionRef, {
            name: newTodoName.value.trim(),
        });
        newTodoName.value = '';
        errorMessage.value = '';
        fetchTodos();
    };

  
      const deleteTodo = async (id) => {
        const todoDoc = doc(db, 'todo', id);
        await deleteDoc(todoDoc);
        fetchTodos();
      };
  
      onMounted(fetchTodos);
  
      return { Todos, newTodoName, addTodo, deleteTodo, errorMessage };
    },
  };
  </script>
  
  <style>
  
.error-message {
  color: #dc3545;
  margin: 10px 0;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.input-group input {
  flex:1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.input-group button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-group button {
  background-color: #24dc7d;
  color: white;
  cursor: pointer;
  border-color: #24dc7d;
}

.input-group button:hover {
  background-color: #0a7748;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-list li {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  text-align: start;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
