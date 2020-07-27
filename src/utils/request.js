import axios from 'axios'
import qs from 'qs'

axios.interceptors.response.use(res=>{
    console.log('本次请求地址是'+res.config.url)
    console.log(res)
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