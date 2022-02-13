import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js';


const url=`https://vue3-course-api.hexschool.io/v2`;
const path=`sells`;

createApp({
  data(){
    return{
      temp:{},
      products:[],
    }
  },
  methods:{
    token(){   //將cookie取出並放入token，藉由token達到自動登入
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);
    axios.defaults.headers.common['Authorization'] = token;
    },
    checkLogin(){
      axios.post(`${url}/api/user/check`)
        .then((res)=>{
          this.getData();
        })
        .catch((err)=>{
          alert(err.data.message);
          window.location="login.html";
        })
    },
    getData(){
      axios.get(`${url}/api/${path}/admin/products`)
      .then((res)=>{
        this.products = res.data.products;
        // console.log(this.products);
      })
      .catch((err)=>{
        alert(err.data.message);
      })
    },
    addNewProduct(){
      const newItem = {
        data: {
        title: '幫我撐十秒', 
        category: '雙手劍',
        origin_price: 300,
        price: 220,
        unit: '隻',
        description: '絕命黑色劍士配劍',
        content: '這是內容',
        is_enabled: 1,
        imageUrl: 'https://www.easyatm.com.tw/img/7/8a7/nBnauM3XzQDN1cjNwQjNyUDM0QTMwADMwADMwADMwATMxAzL0YzL1UzLt92YucmbvRWdo5Cd0FmLxE2LvoDc0RHa.jpg'
      }
      }
      axios.post(`${url}/api/${path}/admin/product`,newItem)
        .then((res)=>{
          alert(`${res.data.message}，新增成功`);
          this.getData();
        })
        .catch(()=>{
          alert('新增失敗');
        })
    },
    // removeProduct(id){    //還想不到怎麼抓出proxy裡面的資料
    //   axios.delete(`${url}/api/${path}/admin/product/${id}`)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // },
  },
  mounted() {
    this.token();
    this.checkLogin();
  }
}).mount('#app'); 