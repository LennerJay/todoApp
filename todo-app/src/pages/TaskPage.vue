<template>
  <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Add new Task -->
                    <NewTask/>
                    <!-- List of uncompleted tasks -->
                    <Tasks :tasks="uncompletedTasks" />
                    <!-- Show Toggle Button -->
                      <div class="text-center my-3" v-show="showToggleCompletedBtn">
                            <button class="btn btn-sm btn-secondary" @click="showCompletedTasks = !showCompletedTasks">
                                <span v-if="!showCompletedTasks">Show Completed Tasks </span>
                                <span v-else>Hide Completed Tasks </span>
                            </button>
                      </div>
                    <!-- Show List of Completed Task -->
                    <Tasks :tasks="completedTasks" 
                           :show="completedTaskIsVisibile && showCompletedTasks"
                           />
                </div>
            </div>
        </div>
    </main>
</template>


<script setup>
import { computed, onMounted,ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useTaskStore } from '../stores/task';
import Tasks from '../components/task/Tasks.vue';
import NewTask from '../components/task/NewTask.vue';

const store = useTaskStore();
const { completedTasks , uncompletedTasks } = storeToRefs(store)
const { fetchAllTasks } = store;

onMounted(async () =>{
    await fetchAllTasks()
});

const showToggleCompletedBtn = computed(
                            ()=>uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
                        );

const completedTaskIsVisibile = computed(
        ()=> uncompletedTasks.value.length  === 0 || completedTasks.value.length  > 0
    )

const showCompletedTasks = ref(false || completedTaskIsVisibile.value);   


</script>