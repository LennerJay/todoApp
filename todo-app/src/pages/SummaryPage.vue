<template>
     <main style="min-height: 50vh; margin-top: 2rem;">
        <p>There are {{  tasks.length}} total Task</p>
        <p>Thee are {{ completedTasks.length }} total uncompleted task</p>
        <p>Thee are {{ uncompletedTasks.length }} total uncompleted task</p>
    </main>
</template>


<script setup>
import { useTaskStore } from '../stores/task';
import {onMounted,ref}  from 'vue';

const store = useTaskStore();
const { fetchAllTasks, uncompletedTasks, completedTasks,tasks } = store;

// onMounted(()=>{
//     tasks.value = fetchAllTasks();
// });

</script>