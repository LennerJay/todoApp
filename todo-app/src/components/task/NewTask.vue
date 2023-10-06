<template>
    <div class="relative">
        <input type="text" 
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save." 
            id="newTask"
            @keydown.enter="addNewTask"
            />
    </div>
</template>

<script setup>
import { useTaskStore } from '../../stores/task'; 
import { ref } from 'vue';

const store = useTaskStore();
const emit = defineEmits(['added'])
const newTask = ref({
    name:'',
    is_completed:false
});

const addNewTask = async (event)=>{
   
    if(event.target.value.trim()){
        newTask.value.name = event.target.value.replace(/\s+/g, ' ');
        event.target.value = ''
        await store.handleAddedTask(newTask);
    }
};
</script>