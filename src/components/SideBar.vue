<template>
        <div class="todo_sidebar">
          <div class="list">
            <List :name="nameList" :isRemovable="false"/>
          </div>
          <div class="task_groups">
            <List  v-for="(item, i) in getGroups" :key="`listItems${i}`"
            :icon="item.icon" :name="item.name" :active="item.active" 
            :itemGroup="item"
            isRemovable
            />
          </div> 
          <AddList/>
        </div>
</template>

<script>
   import List from './List'
   import AddList from './AddList/AddList'
   import { mapGetters } from 'vuex'

    export default {
        name: 'SideBar',
        components: {
          List,
          AddList
        },
        data(){
          return{
            nameList: 'Все задачи'
          }
        },
        computed:{
          ...mapGetters([
                'getGroups',
            ]),
          // listItems(){
          //   return [
          //     {
          //       icon: "",
          //       name: 'Покупки',
          //       active: false
          //     },
          //     {
          //       icon: "",
          //       name: 'Фронтенд',
          //       active: false
          //     },
          //     {
          //       icon: "",
          //       name: 'Фильмы',
          //       active: true
          //     }
          //   ]
          // },
        }
    }
</script>

<style lang="scss" scoped>
    .todo_sidebar {
      width: 250px;
      // height: calc(100% - 120px);
      border-right: 1px solid #f1f1f1;
      background-color: 	#F5F5F5;
      padding: 60px 20px;
    }
    .list {
      margin-bottom: 30px;
    }
    .task_groups{
      margin-bottom: 30px;
    }
    
</style>