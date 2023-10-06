<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0 " 
                    type="checkbox"
                    :class="completedTask"  
                    :checked="task.is_completed" 
                    :id="'task-'+ task.id"
                    @change="markTaskAsCompleted"
                    />
            <div class="ms-2 flex-grow-1" 
                 :class="completedTask" 
                 title="Double click the text to edit or remove"
                 @dblclick="isEdit = true" 
                 >
                <div class="relative" v-if="isEdit">
                    <input class="editable-task" 
                            type="text" 
                            @keyup.esc="undo" 
                            :id="task.id" 
                            v-focus 
                            @keyup.enter="updateTask"
                            v-model="edittingTask"
                            />
                </div>
                <span v-else>{{ task.name }}</span>
            </div>
            <!-- <div class="task-date">24 Feb 12:00</div> -->
        </div>
        <TaskActions 
                    @edit="isEdit = true" 
                    v-show="!isEdit"
                    @remove="removeTask"
                    />
    </li>
</template>

<script setup>
import { computed,ref } from "vue"
import TaskActions from "./TaskActions.vue";

const props =  defineProps({
    task: Object
}) 

const emit = defineEmits(['updated','completed','removed']);
const isEdit = ref(false);
const edittingTask = ref(props.task.name);

const undo = ()=>{
    isEdit.value = false
    edittingTask.value = props.task.name
}
const vFocus = {
  mounted: (el) => el.focus()
};

const completedTask = computed(()=> props.task.is_completed ? "completed" : "");

const updateTask = event =>{
    const updatedTask = {...props.task, name: event.target.value};
    isEdit.value = false;
    emit('updated', updatedTask)
};

const markTaskAsCompleted = event =>{
    const updatedTask = {...props.task, is_completed: !props.task.is_completed};
    emit('completed', updatedTask)
};

const removeTask = () => {
    if(confirm('Are you sure you want to remove this task?')){
        emit('removed',props.task)
    }
};
</script>