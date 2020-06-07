<template>
        <ul class="todo_list" @click.prevent="clickGroup(itemGroup)">
          <li :class="[ {active: active && active === isActive}, isRemovable ]">
            <i>
              <!-- <img :src="`../assets/img/${icon}.svg`"> -->
            </i>
            <span>{{name}}{{quantity}}</span>
            <img 
                class="list__remove-icon"
                v-if="isRemovable"
                :src="`${removeSvg}`" 
                alt="Delete icon"
                @click.prevent="removeGroup(itemGroup.id)" 
            >
          </li>
        </ul>
</template>

<script>
import removeSvg from '../assets/img/remove.svg'
import { mapActions, mapGetters } from 'vuex'

    export default {
        name: 'List',
        data(){
            return{
                removeSvg: removeSvg,
                isActive: undefined
            }
        },
        methods:{
            clickGroup(group){

                console.log('нажал на кнопку');
                console.log(group.id);
                // console.log(this.getTasks);
                console.log(this.isActive);
                this.isActive = group.id;
                if (this.isRemovable) {
                    // this.$bus.notify('idGroup', group);
                    // console.log(group.id);
                    this.$store.dispatch('GET_PUSHGROUPID', group.id);
                } 
            },
            removeGroup(item){
                console.log(item);
                this.DELETE_GROUP(item);
                this.$store.dispatch('LOAD_GROUPS')
            },
            ...mapActions([
                'DELETE_GROUP',
            ])
        },
        computed:{
            ...mapGetters([
                'getTasks',
            ])
            // img() {
            //     return `@/assets/img/${icon}.svg`;
            // }
        },
        props: {
            name:{
                type:String
            },
            icon:{
                type:String
            },
            active:{
                type:String
            },
            isRemovable:{
                type:Boolean
            },
            itemGroup:{
                type:Object
            },
            quantity:{
                
            }
        }
    }
</script>

<style lang="scss" scoped>
     .todo_list{
         margin-bottom: 10px;
        li { 
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 10px 12px;  
            span {
                flex: 1;
                text-overflow: ellipsis;
                overflow: hidden;
                width: 160px;
                white-space: nowrap;
            }
            &.active {
            background: #ffffff;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
            border-radius: 4px;
            padding: 10px 12px;
            margin-bottom: 5px;
            }
            &:hover{
                background: rgba(255, 255, 255, 0.5);
            }
            i{
            display: inline-flex;
            margin-right: 10px;
            }
        }
    }
</style>