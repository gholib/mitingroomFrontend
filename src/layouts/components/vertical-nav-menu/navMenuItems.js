import store from '../../../store/store'

const user = JSON.parse(store.getters['auth/getProfile'])



const menuItems = [
  {
    url: "/",
    name: "Главная",
    slug: "home",
    icon: "HomeIcon",
  },
]

if(user.admin === 1){
  menuItems.push({
    url:'/rooms',
    name: "Комнаты",
    slug: "rooms",
    icon: "PackageIcon",
  },)
}

export default menuItems
