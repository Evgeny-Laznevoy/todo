<template>
  <div class="todo__tasks">
    <div class="tasks" v-for="(item, i) in getTasksIdGroup" :key="`Group${i}`">
      <h1 class="tasks__title">
        {{ item.name }}
        <img
          :src="`${svg}`"
          alt="Edit__title"
          class="add-list__popup-close-btn"
        />
      </h1>
      <div class="tasks__group" v-if="item.task.length">
        <div
          class="tasks__items"
          v-for="(item, i) in item.task"
          :key="`buttonAddGroup${i}`"
        >
          <div class="tasks__items-row" :key="`buttonAddGroup${i}`">
            <div class="checkbox">
              <input type="checkbox" :id="`buttonAddGroup${i}`" />
              <label :for="`buttonAddGroup${i}`">
                <svg
                  width="11"
                  height="8"
                  viewBox="0 0 11 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                    stroke="#000"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </label>
            </div>
            <p>
              {{ item.text }}
            </p>
          </div>
        </div>
      </div>
      <div v-else>
        <h2>Задачи отсутствуют</h2>
      </div>
      <AddTask :id="item && item.id" :visib="false"/>
    </div>
  </div>
</template>

<script>
import svg from "../../assets/img/edit.svg";
// import addSvg from "../../assets/img/add.svg";
import { mapGetters } from "vuex";
import AddTask from './AddTaskForm'
// import Vue from 'vue'

//       var vm = new Vue ({
//           data:{
//               title: 'title'
//           }
//         })

export default {
  name: "Tasks",
  components:{
      AddTask
  },
  data() {
    return {
        svg: svg,
        idGroup: ''
    //   addSvg: addSvg,
      // title: this.getNameGroup.name
    };
  },
  created(){
      console.log('rerender');
      console.log(this.getTasksIdGroup.id);
      this.idGroup = this.getTasksIdGroup.id;
    // this.$bus.$on('idGroup', group => {
    //     this.title = group.id;
    //     console.log(this.getTasksIdGroup);
    //     // this.$store.getters.getTasksIdGroup
    // })
  },
  computed: {
    ...mapGetters(["getTasksIdGroup"]),
  },
};
</script>

<style lang="scss" scoped>
.tasks {
  &__title {
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    color: #64c4ed;
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;

    &:hover {
      img {
        opacity: 0.2;
      }
    }
  }

  img {
    opacity: 0;
    cursor: pointer;
    margin-left: 12px;
    &:hover {
      opacity: 1;
    }
  }

  &__group {
      margin-top: 10px;
  }

  &__items {
    
    &-row {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      p {
        margin-left: 15px;
      }
    }
  }

h2 {
  font-family: monospace;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  color: #c9d1d3;
  position: absolute;
  left: 50%;
  top: 50%;
}

  .checkbox {
    input {
      display: none;
    }

    input:checked + label {
      background-color: #4dd599;
      border-color: #4dd599;

      svg {
        opacity: 1;
        path {
          stroke: #ffff;
        }
      }
    }

    &:hover {
      label {
        background-color: #f2f2f2;
        border-color: #f2f2f2;
        svg {
          opacity: 1;
          path {
            stroke: #b2b2b2;
          }
        }
      }
    }

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #e8e8e8;
      border-radius: 30px;
      width: 20px;
      height: 20px;
      cursor: pointer;

      svg {
        opacity: 0;
      }
    }
  }
}
</style>
