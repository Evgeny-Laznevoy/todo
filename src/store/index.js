import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groups:[],
    tasks:[],
    processing: false,
    pushGroupId: ''
  },
  mutations: {
    SET_GROUPS(state, payload){
      state.groups = payload
    },
    SET_GROUP:(state, group) => {
      state.groups.push(group);
    },
    REMOVE_GROUP(state, index){
      console.log("remove");
      console.log(state.groups);
      // state.groups.splice(index,1);
      state.groups.filter(item => item.id !== index)
    },
    SET_PROCESSING(state, payload){
      state.processing = payload
    },
    SET_TASKS(state, payload){
      state.tasks = payload
    },
    SET_PUSHGROUPID(state, payload){
      // console.log('внутри state');
      // console.log(payload);
      state.pushGroupId = payload
    }
  },
  actions: {
    LOAD_GROUPS({commit}){
      Vue.$db.collection('todoGrous')
      .get()
      .then(querySnapshot => {
        let groups = []
        let tasks = []
        querySnapshot.forEach(s => {
          const data = s.data()
          let group = {
            id: s.id,
            name: data.name,
            active: data.active,
            task: data.tasks ? data.tasks : tasks  
          }  
          groups.push(group)

          // if (data.tasks){
          // data.tasks.forEach(t => {
          //   let task = {
          //     id: t.id,
          //     text: t.text,
          //     completed: t.completed,
          //     idGroup: s.id
          //   }
          //   tasks.push(task)
          // })
          // }
        });
        commit('SET_GROUPS', groups)
        // commit('SET_TASKS', tasks)
        console.log(this.state.groups);
        console.log(this.state.tasks);
      })
      .catch(error => console.log(error))
    },
    GET_PUSHGROUPID({commit}, id){
      commit('SET_PUSHGROUPID', id)
    },
    ADD_GROUP({commit}, group){
      console.log('ADD_GROUP');
      console.log(group);
      commit('SET_PROCESSING', true)
      Vue.$db.collection('todoGrous')
      .add(group)
      .then(() => {
        commit('SET_GROUP',group)
        commit('SET_PROCESSING', false)
      })
      .catch((err) => {
        console.log('при добавлении группы ошибка:', err);
      })
      // return axios.post('http://localhost:3000/groups', group)
      // .then(res => {
      //   console.log(res);
      //   console.log(group);
      //   commit('SET_GROUP',group)
      // })
    },
    DELETE_GROUP({commit}, groupId){
      Vue.$db.collection('todoGrous')
      .doc(groupId)
      .delete()
      .then( function(){
        console.log('ЭЛЕМЕНТ УДАЛЕН');
        commit('REMOVE_GROUP',groupId)
      })
      .catch(function(error){
          console.log('error:', error);
      })
      // console.log(groupId);
      // return axios.delete('http://localhost:3000/groups/' + groupId)
      // .then((res) =>{
      //   console.log(res);
      //   commit('REMOVE_GROUP',groupId)
      // })
      
    },
  },
  modules: {
  },
  getters:{
    getGroups(state){
      console.log(state.groups);
      return state.groups;
    },
    lastGroupId(state){
      return state.groups.length
    },
    getProcessing:(state) => state.processing,
    getTasks:(state) => state.tasks,
    getTasksIdGroup(state){
      let group = state.groups.filter(item => item.id == state.pushGroupId);
      console.log(group); 
      return group
    },
    getNameGroup(state){
      let group = state.groups.find(item => item.id == state.pushGroupId);
      if (typeof group == "undefined") {
        return "Выберите группу!"
      } else
        return group.name
      // return state.groups.filter(item => item.id == state.pushGroupId).name
    }
  }
})
