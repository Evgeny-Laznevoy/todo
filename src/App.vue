<template>
<div id="app">
    <div class="todo">
      <Sidebar/>
      <Tasks/>
    </div>
    <router-view/>
</div>
</template>


<script>
import Sidebar from './components/SideBar'
import Tasks from './components/Tasks/Tasks'

    export default {
        name: 'App',
        components: {
          Sidebar,
          Tasks
        },
        data(){
          return{
            label: 'Все задачи'
          }
        }
    }
</script>

<style lang="scss" scoped>
// * {
//   margin: 0;
//   padding: 0;
//   list-style: none;
//   outline: none;
// }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

.todo {
  display: flex;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 800px;
    min-height: 550px;
    transform: translate(-50%, -50%);
    box-shadow: 1px 2px 20px #f3f3f3;
    border-radius: 10px;
    border: 1px solid #f1f1f1;
    font-size: 14px;

    &__tasks {
      flex: 1;
      padding: 60px;
    }
}
</style>
