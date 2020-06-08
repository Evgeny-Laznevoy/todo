<template>
  <div class="tasks__form">
    <div class="tasks__form-new" v-show="!elVisible" @click.prevent="openFormAdd(true)">
      <img :src="`${addSvg}`" alt="Add__task" class="add-task-btn" />
      <span>Новая задача</span>
    </div>
    <div class="tasks__form-block" v-show="elVisible">
      <input class="field" v-model="taskText" type="text" placeholder="Текст задачи">
      <button class="button" @click.prevent="addNewTask">Добавить задачу</button>
      <button class="button button--gray" @click.prevent="openFormAdd(false)">Отмена</button>
    </div>
  </div>
</template>

<script>
import addSvg from "../../assets/img/add.svg";
import { mapActions } from 'vuex';

export default {
  name: "AddTask",
  data() {
    return {
      addSvg: addSvg,
      elVisible: false,
      taskText: ""
    };
  },
  computed:{
       ...mapActions(["ADD_TASK_IN_GROUP"])
  },
  methods:{
      openFormAdd(el){
          console.log('в опенформ');
          console.log(this.id); 
          this.elVisible = el
      },
      addNewTask(){
            if (!this.taskText) {
                alert('Нельзя добавить пустую задачу!');
                return
            }
            let lastId = this.$store.getters.getLastTaskInGroup;

            let id = String(++lastId);

            console.log(id);
            
            let newTask = {
              completed: false,
              id: id,
              text: this.taskText 
            } 

            console.log(newTask);
            
            this.ADD_TASK_IN_GROUP(this.id, newTask)
            this.taskText = ""
          },
  },
  props:{
      id:{
          type: String
      },
      visib:{
          type: Boolean
      }
  }
};
</script>

<style lang="scss" scoped>
.tasks__form {
  margin-top: 20px;

  &-new {
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.4;
    transition: opacity 0.15s ease-in-out;
    span {
    //   font-size: 16px;
      margin-left: 20px;
    }

    img {
      margin-left: 4px;
    }

    &:hover {
      opacity: 1;
    }
  }
  
  &-block {
    margin-top: 15px;
    .button {
      margin-right: 10px;
      background: #4dd599;
      border-radius: 4px;
      color: #ffffff;
      border: 0;
      padding: 10px 20px;
      cursor: pointer;
      &:hover {
        background: darken($color: #4dd599, $amount: 7%);
      }
      &:active {
        background: darken($color: #4dd599, $amount: 10%);
      }
      &--gray {
        background: #F4F6F8;
        color: #444444;

        &:hover {
            background: darken($color: #F4F6F8, $amount: 7%);
        }

        &:active {
            background: darken($color: #F4F6F8, $amount: 10%);
        }
      }
    }
    .field {
      background: #ffffff;
      border: 1px solid #efefef;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 8px 12px;
      width: 100%;
      margin-bottom: 10px;
      &:focus {
        border-color: #dbdbdb;
      }
    }
  }
}
</style>
