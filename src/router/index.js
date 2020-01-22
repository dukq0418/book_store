import Vue from 'vue'
import VueRouter from "vue-router";
import Main from '../views/Main'
import Login from "../views/user/Login";
import List from "../views/book/List";
import Add_book from "../views/book/Add_book";
import Book_class from "../views/book_class/Book_class";
import Add_book_class from "../views/book_class/Add_book_class";
import User_list from "../views/user/User_list";
import Order from "../views/order/Order";

Vue.use(VueRouter)

export default new VueRouter({
  routes:[
    {
      path: '/main',
      component: Main,
      children: [
        {path:'/book/list',component:List},
        {path:'/book/add_book',component: Add_book},
        {path:'/book_class/book_class',component: Book_class},
        {path:'/book_class/add_book_class',component: Add_book_class},
        {path:'/user/user_list',component: User_list},
        {path:'/order/order',component: Order},
      ]
    },{
      path: '/',
      component: Login
    }
  ]
})
