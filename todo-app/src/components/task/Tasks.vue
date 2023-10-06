<template>
    <div class="card mt-2" v-if="tasks.length && show">
        <ul class="list-group list-group-flush">
            <Task v-for="task in tasks" 
                :task ="task"  
                :key="task.id" 
                @updated="handleUpdatedTask"
                @completed="handleComptedTask"
                @removed="handleRemovedTask"
                />
        </ul>
    </div>
</template>


<script setup>
import { useTaskStore } from '../../stores/task';
import Task from './Task.vue'
defineProps({
    tasks: Array,
    show: {
        type: Boolean,
        default: true
    }
});

const store = useTaskStore();
const { handleUpdatedTask, handleComptedTask, handleRemovedTask} = store;

// const handleUpdate = (val)=>{
//     emit('updated', val);
// };

</script>