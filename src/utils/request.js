import axios from 'axios'
import qs from 'qs'
import store from '../store/modules/login'
import {warningAlert} from './alert'
import router from '../router'

axios.interceptors.request.use(config=>{
    if(config.url!= baseUrl+'/api/userlogin'){
        config.headers.authorization = store.state.data.list.token
    }
    return config
})


axios.interceptors.response.use(res=>{
    console.log('本次请求地址是'+res.config.url)
    console.log(res)

    if(res.data.msg === '登录已过期或访问权限受限'){
        warningAlert('登录已过期或访问权限受限')
        router.push('/login')
        return
    }

    return res
})

const baseUrl = '/api'

//菜单添加
export const requestCaidanList = (params)=>{
    return axios({
        url:baseUrl+'/api/menuadd',
        method:"post",
        data:qs.stringify(params)
    })
}

//菜单列表
export const requestCaidan = (params)=>{
    return axios({
        url:baseUrl+'/api/menulist',
        method:"get",
        params
    })
}

//请求一条数据
export const requestCaidanInfo = (params)=>{
    return axios({
        url:baseUrl+'/api/menuinfo',
        method:"get",
        params
    })
}


//菜单修改
export const xiugaiCaidanList = (params)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:"post",
        data:qs.stringify(params)
    })
}

//菜单删除
export const delCaidanList = (params)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:"post",
        data:qs.stringify(params)
    })
}


//角色添加
export const requestJueseAdd = (params)=>{
    return axios({
        url:baseUrl+'/api/roleadd',
        method:"post",
        data:qs.stringify(params)
    })
}

//角色列表
export const requestJueseList = ()=>{
    return axios({
        url:baseUrl+'/api/rolelist',
        method:"get",
    })
}

//角色请求一条数据
export const requestJueseDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/roleinfo',
        method:"get",
        params
    })
}

//角色修改
export const requestJueseEdit = (params)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:"post",
        data:qs.stringify(params)
    })
}

//角色删除
export const requestJueseDel = (params)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:"post",
        data:qs.stringify(params)
    })
}

//管理员添加
export const requestGuanliyuanAdd = (params)=>{
    return axios({
        url:baseUrl+'/api/useradd',
        method:"post",
        data:qs.stringify(params)
    })
}

//管理员列表
export const requestGuanliyuanList = (params)=>{
    return axios({
        url:baseUrl+'/api/userlist',
        method:"get",
        params
    })
}

//管理员请求一条数据
export const requestGuanliyuanDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/userinfo',
        method:"get",
        params
    })
}

//管理员修改
export const requestGuanliyuanEdit = (params)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:"post",
        data:qs.stringify(params)
    })
}

//管理员删除
export const requestGuanliyuanDel = (params)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:"post",
        data:qs.stringify(params)
    })
}

//管理员总数
export const requestGuanliyuanCount = ()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:"get",
    })
}

//管理员登录
export const requestGuanliyuanLogin = (params)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:"post",
        data:qs.stringify(params)
    })
}


//分类添加
export const requestFenleiAdd = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/cateadd',
        method:"post",
        data:formData
    })
}

//分类列表
export const requestFenleiList = (params)=>{
    return axios({
        url:baseUrl+'/api/catelist',
        method:"get",
        params
    })
}

//分类请求一条数据
export const requestFenleiDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/cateinfo',
        method:"get",
        params
    })
}

//分类修改时
export const requestFenleiEdit = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/cateedit',
        method:"post",
        data:formData
    })
}

//分类删除
export const requestFenleiDel = (params)=>{
    return axios({
        url:baseUrl+'/api/catedelete',
        method:"post",
        data:qs.stringify(params)
    })
}



//商品规格添加
export const requestRulesAdd = (params)=>{
    return axios({
        url:baseUrl+'/api/specsadd',
        method:"post",
        data:qs.stringify(params)
    })
}

//商品规格总数
export const requestRulesCount = ()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:"get",
    })
}

//商品规格列表
export const requestRulesList = (params)=>{
    return axios({
        url:baseUrl+'/api/specslist',
        method:"get",
        params
    })
}

//商品规格请求一条数据
export const requestRulesDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/specsinfo',
        method:"get",
        params
    })
}

//商品规格修改
export const requestRulesEdit = (params)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:"post",
        data:qs.stringify(params)
    })
}

//商品规格删除
export const requestRulesDel = (params)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:"post",
        data:qs.stringify(params)
    })
}


//会员列表
export const requestHuiyuanList = (params)=>{
    return axios({
        url:baseUrl+'/api/memberlist',
        method:"get",
    })
}

//会员请求一条数据
export const requestHuiyuanDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/memberinfo',
        method:"get",
        params
    })
}

//会员修改
export const requestHuiyuanEdit = (params)=>{
    return axios({
        url:baseUrl+'/api/memberedit',
        method:"post",
        data:qs.stringify(params)
    })
}



//商品管理添加
export const requestGuanliAdd = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/goodsadd',
        method:"post",
        data:formData
    })
}

//商品管理总数
export const requestGuanliCount = ()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:"get",
    })
}

//商品管理列表
export const requestGuanliList = (params)=>{
    return axios({
        url:baseUrl+'/api/goodslist',
        method:"get",
        params
    })
}

//商品管理请求一条数据
export const requestGuanliDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:"get",
        params
    })
}

//商品管理修改
export const requestGuanliEdit = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/goodsedit',
        method:"post",
        data:formData
    })
}

//商品管理删除
export const requestGuanliDel = (params)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:"post",
        data:qs.stringify(params)
    })
}




//轮播图添加
export const requestBannerAdd = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/banneradd',
        method:"post",
        data:formData
    })
}

//轮播图列表
export const requestBannerList = ()=>{
    return axios({
        url:baseUrl+'/api/bannerlist',
        method:"get",
    })
}

//轮播图请求一条数据
export const requestBannerDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/bannerinfo',
        method:"get",
        params
    })
}

//轮播图修改时
export const requestBannerEdit = (params)=>{
    var formData = new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+'/api/banneredit',
        method:"post",
        data:formData
    })
}

//轮播图删除
export const requestBannerDel = (params)=>{
    return axios({
        url:baseUrl+'/api/bannerdelete',
        method:"post",
        data:qs.stringify(params)
    })
}



//秒杀活动添加
export const requestMiaoshaAdd = (params)=>{
    return axios({
        url:baseUrl+'/api/seckadd',
        method:"post",
        data:qs.stringify(params)
    })
}

//秒杀活动列表
export const requestMiaoshaList = ()=>{
    return axios({
        url:baseUrl+'/api/secklist',
        method:"get",
    })
}

//秒杀活动请求一条数据
export const requestMiaoshaDetail = (params)=>{
    return axios({
        url:baseUrl+'/api/seckinfo',
        method:"get",
        params
    })
}

//秒杀活动修改时
export const requestMiaoshaEdit = (params)=>{
    return axios({
        url:baseUrl+'/api/seckedit',
        method:"post",
        data:qs.stringify(params)
    })
}

//秒杀活动删除
export const requestMiaoshaDel = (params)=>{
    return axios({
        url:baseUrl+'/api/seckdelete',
        method:"post",
        data:qs.stringify(params)
    })
}
