<template>
<div class="add-list">
    <div class="list__add-button" @click.prevent="openAddForm()">
            <List  v-for="(item, i) in buttonAddGroup" :key="`buttonAddGroup${i}`"
              :icon="item.icon" :name="item.name" :active="item.active"
              :isRemovable="false"/>
    </div>
    <div class="add-list__popup" v-show="elVisible" >
      <img 
        :src="`${svg}`" 
        alt="Close button" 
        class="add-list__popup-close-btn"
        @click.prevent="closeAddForm()"
      >
      <input v-model="nameGroup" class="field" type="text" placeholder="Название группы">
      <button class="button" @click.prevent="addNewTask">{{getProcessing?'Добавление....':'Добавить'}}</button>
    </div>
</div>
</template>

<script>
import List from '../List'
import { mapActions, mapGetters } from 'vuex';
import closeSvg from '../../assets/img/close.svg'

    export default {
        name: 'AddList',
        components: {
          List
        },
        data() {
          return {
            elVisible: false,
            svg: closeSvg,
            nameGroup: ""
          }
        },
        methods:{
          openAddForm(){
            this.elVisible = true;
          },
          closeAddForm(){
            this.elVisible = false;
            this.nameGroup = ""
          },
          addNewTask(){
            if (!this.nameGroup) {
                alert('Требуется указать имя группы');
                return
            }
            let lastId = this.$store.getters.lastGroupId;

            let id = String(++lastId);

            console.log(id);
            
            let newGroup = {
              name: this.nameGroup,
              active: false,
              completed: false
            } 
            this.ADD_GROUP(newGroup)
            // this.closeAddForm()
            this.nameGroup = ""
            // this.$store.dispatch('LOAD_TASKS')
          },
        ...mapActions([
                'ADD_GROUP',
            ])
        },
        computed:{
            buttonAddGroup(){
                return[
                    {
                        icon: "",
                        name: 'Добавить группу',
                        active: false
                    }
                ]     
          },
          ...mapGetters([
            'getProcessing'
          ])
        }
    }
</script>

<style lang="scss" scoped>

    .add-list{
      &__popup{
        width: 235px;
        height: 150px;
        background: #ffffff;
        box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        box-sizing: border-box;
        padding: 18px;
        position: relative;
        .button{
          width: 100%;
          margin-top: 25px;
        }
        &-close-btn {
          position: absolute;
          right: -8px;
          top: -8px;
          cursor: pointer;
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
      &:focus {
        border-color: #dbdbdb;
      }
    }
    .button {
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
    }
    .list__add-button{
      opacity: 0.4;
      &:hover{
        opacity: 1;
      }
    }
</style>