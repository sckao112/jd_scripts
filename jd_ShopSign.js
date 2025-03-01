/*
店铺签到，各类店铺签到，有新的店铺直接添加token即可
*/
const $ = new Env('店铺签到');

const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '', message,allMessage='',subTitle = '';
const JD_API_HOST = 'https://api.m.jd.com/api?appid=interCenter_shopSign';

let activityId = ''
let vender = ''
let num = 0
let shopname = ''
const token = [
    "FB65AA46F502CCFEB28CAE706BF698DF",
    "9E6034F4A60088A97427701990163E27",
    "59C083DEF419E3341EAF6453D23F8F65",
    "4575711E8DE40C9344E01693FB41EB4E",
    "396DF5D0CA7E35723DE5CB0B2A8E7CBB",
    "696547584DD3FCBE183D3C5BBE549A46",
    "878DE90EBED14FB21B569302BD8EBFD3",//威尔顺京东自营旗舰店
    "18107B987FF0D37A8D4AFF72B8AB7332",//雷瓦官方旗舰店
    "3FF9245926A21A184D43FA10F9B2EF76",//多美鲜（SUKI）奶酪黄油京东自营旗舰店
    "2850C9F48618513C2B9727E0C1E7270B",//创维京东自营官方旗舰店
    "0845D4524D5F4B4A096AB94421C24430",//move it官方旗舰店
    "A61079C4B07BD4BFDB8C4ACC5C3CC6CB",//精气神京东自营旗舰店
    "BCB25DF532BD3BEF46FFE307E087387F",//卓恒达办公专营店
    "F400004EF52B55BEE2DCCE76E37C5F43",//古陶传世红酒专营店
    "071DBC42DD2E666AE25D4849574F55EF",//老达洲旗舰店
    "2E584A3891BB67DEE1868288C94513A9",//迈高清洁专营店
    "7AE752825041B465232A623D8CACF821",//米小芽京东自营旗舰店
    "21AFD1F995FF28A570C16E708DFD21DF",//思莱宜智能健康京东自营旗舰店
    "737646C9DCBCB867A041A86C90420986",//得伴京东自营旗舰店
    "C520A447B4D69659CD17CF1E1F7FCC40",//卡西欧创元专卖店
    "C82DE74B42DB309CD78E3430806105C0",//欧扎克旗舰店
    "7CC5069E5C8102CCE296858306E2A3E9",//购服饰专营店
    "31385084BAA286987012509203CF879B",//迦境官方旗舰店
    "48FB5FEDF4C51E9A988FD6051E3E653F",//乐创威质专卖店
    "0BDBDBCE2D89D805E019ED00198347B8",//酒阿网官方旗舰店
    "985D16A2E4D7542048E251959E2E3C80",//倪斌家具专营店
    "46A656A5427BD312BDCABCB56C6D00AE",//北大荒豆浆京东自营旗舰店
    "CBCE98732A9A051E4BC238EEE485B570",//5-30天65豆 100+50份 大华京东自营官方旗舰店
    "D35A8990A9E30D2857E93AF9BF2A1291",// 5-30天65豆 100+50份 紫林京东自营旗舰店
    "D0AD519DBC35A253CEC052FD041F2EFD",//朗颜（Rownyeon）京东自营旗舰店
    "77A6C7B5C2BC9175521931ADE8E3B2E0",//三人行大米京东自营旗舰店
    "888BA24E643DB95D83242AD122237CA9",//稳健京东自营旗舰店
    "A2DBF6F052891BF5A5A304E1F5E0FDBD",//天章京东自营官方旗舰店 3天50豆 25000份
    "53378560A6BC7E91EB143DE59183F67F",//沙驰官方旗舰店 3天50豆 5790份
    "9A80E139DC411B3CB72EB5E27FC29632",//友臣旗舰店 4天1亓鸿包 200份 https://u.jd.com/nCytKNa
    "C15FDE1894B91E915CE228390339C91A",//飞智京东自营旗舰店 7天5亓鸿包 14天5亓鸿包 100份  https://u.jd.com/nLytLZa
    "02CBED5E0391FDD38BA71F813C50DF2D",//美奥口腔旗舰店 7天100豆 200份 https://u.jd.com/ndytMuZ
    "91CC3F9699320158FAC003F71F4A6C03",//福临门旗舰店 7天50豆 100份 https://u.jd.com/ntyt2Qz
    "18EF5FBC139F9BC5B8DE703E9AB1ABDB",//妮飘纸品旗舰店 2-7天45豆 300份 https://u.jd.com/ndytC9H
    "2A8794EC8DA4659DDDA0DF0E1A2AF4AF",//catalo海外旗舰店  3-30天180豆 10份   https://u.jd.com/nLytQmb
    "011BAF6E366D356E7694B0999CE3DE03",// LG展硕专卖店   7天2亓虹包 500份 https://u.jd.com/nCPjRyp
    "0BC8DD418E64D11837AA95714040E5A3",// THREE SEVEN777旗舰店   10天80京豆 500份 https://u.jd.com/nIPjhgc
    "C19201D1BBFABECF9184E970DF985F62",// 屹林宏业旗舰店  10天50京豆 1000份 https://u.jd.com/nMPjeQX
    "11CD3D32563C80BDE473B2C732F093E3",// 28天100京豆
    "78419F505BFF990180FF253BA10965E5",//
    "EF39DD14994863B96D690DB2583CFCAB",//
    "35CA08F525AE3D3E9216A3CCA4EFDA5C",//6天50京豆 100份 +10天1元E卡 20份 https://u.jd.com/ntWwhOD
    "5F53CEBB0FA88990760660ABA7DD2E5B",//日签1.0豆,连签3天5.0豆,连签5天10.0豆,连签15天20.0豆 https://u.jd.com/nKjf7TJ
]
//IOS等用户直接用NobyDa的jd cookie

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = jsonParse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => item !== "" && item !== null && item !== undefined);
}

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            subTitle = '';
            await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await dpqd()
            // if (i < 1) { await showMsg() }
        }
    }
    if ($.isNode() && allMessage) {
        await notify.sendNotify(`${$.name}`, `${allMessage}`)
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })

//开始店铺签到
async function dpqd() {
    subTitle = `【京东账号${$.index}】${$.nickName}`;
    for (var j = 0; j < token.length; j++) {
        num = j + 1
        if (token[j] == '') { continue }
        await getvenderId(token[j])
        if (vender == '') { continue }
        await getvenderName(vender)
        await getActivityInfo(token[j], vender)
        await signCollectGift(token[j], vender, activityId)
        await taskUrl(token[j], vender)
    }
    await showMsg();
}

//获取店铺ID
function getvenderId(token) {
    return new Promise(resolve => {
        const options = {
            url: `https://api.m.jd.com/api?appid=interCenter_shopSign&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22${token}%22,%22venderId%22:%22%22}&jsonp=jsonp1000`,
            headers: {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cookie": cookie,
                "referer": 'https://h5.m.jd.com/',
                "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
                    $.logErr(err);
                } else {
                    //console.log(data)
                    data = JSON.parse(/{(.*)}/g.exec(data)[0])
                    if (data.code == 402) {
                        vender = ''
                        console.log(`第` + num + `个店铺签到活动已失效`)
                        message += `第` + num + `个店铺签到活动已失效\n`
                    } else {
                        vender = data.data.venderId
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

//获取店铺名称
function getvenderName(venderId) {
    return new Promise(resolve => {
        const options = {
            url: `https://wq.jd.com/mshop/QueryShopMemberInfoJson?venderId=${venderId}`,
            headers: {
                "accept": "*/*",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cookie": cookie,
                "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
                    $.logErr(err);
                } else {
                    //console.log(data)
                    data = JSON.parse(data)
                    shopName = data.shopName
                    console.log(`【` + shopName + `】`)
                    message += `【` + shopName + `】`
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}


//获取店铺活动信息
function getActivityInfo(token, venderId) {
    return new Promise(resolve => {
        const options = {
            url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22${token}%22,%22venderId%22:${venderId}}&jsonp=jsonp1005`,
            headers: {
                "accept": "accept",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cookie": cookie,
                "referer": `https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=${token}&sceneval=2&jxsid=16178634353215523301&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2009753434_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713`,
                "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    // console.log(data)
                    console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
                    $.logErr(err);
                } else {
                    //console.log(data)
                    data = JSON.parse(/{(.*)}/g.exec(data)[0])
                    activityId = data.data.id
                    //console.log(data)
                    let mes = '';
                    for (let i = 0; i < data.data.continuePrizeRuleList.length; i++) {
                        const level = data.data.continuePrizeRuleList[i].level
                        const discount = data.data.continuePrizeRuleList[i].prizeList[0].discount
                        mes += "签到" + level + "天,获得" + discount + '豆'
                    }
                    //console.log(message+mes+'\n')
                    //message += mes+'\n'
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

//店铺签到
function signCollectGift(token, venderId, activitytemp) {
    return new Promise(resolve => {
        const options = {
            url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_signCollectGift&body={%22token%22:%22${token}%22,%22venderId%22:688200,%22activityId%22:${activitytemp},%22type%22:56,%22actionType%22:7}&jsonp=jsonp1004`,
            headers: {
                "accept": "accept",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                "cookie": cookie,
                "referer": `https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=${token}&sceneval=2&jxsid=16178634353215523301&cu=true&utm_source=kong&utm_medium=jingfen&utm_campaign=t_2009753434_&utm_term=fa3f8f38c56f44e2b4bfc2f37bce9713`,
                "User-Agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
                    $.logErr(err);
                } else {
                    //console.log(data)
                    data = JSON.parse(/{(.*)}/g.exec(data)[0])
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

//店铺获取签到信息
function taskUrl(token, venderId) {
    return new Promise(resolve => {
        const options = {
            url: `${JD_API_HOST}&t=${Date.now()}&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22${token}%22,%22venderId%22:${venderId},%22activityId%22:${activityId},%22type%22:56}&jsonp=jsonp1006`,
            headers: {
                "accept": "application/json",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9",
                "cookie": cookie,
                "referer": `https://h5.m.jd.com/`,
                "user-agent": `Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40`
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`\n${$.name}: API查询请求失败 ‼️‼️`)
                    $.logErr(err);
                } else {
                    //console.log(data)
                    data = JSON.parse(/{(.*)}/g.exec(data)[0])
                    console.log(`已签到：` + data.data.days + `天`)
                    message += `已签到：` + data.data.days + `天\n`
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(data);
            }
        })
    })
}

async function showMsg() {
    if ($.isNode()) {
        allMessage += `${subTitle}\n${message}${$.index !== cookiesArr.length ? '\n\n' : ''}`;
        // await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `${subTitle}\n${message}`);
    }
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": `jdapp;android;9.3.5;10;3353234393134326-3673735303632613;network/wifi;model/MI 8;addressid/138719729;aid/3524914bc77506b1;oaid/274aeb3d01b03a22;osVer/29;appBuild/86390;psn/Mp0dlaZf4czQtfPNMEfpcYU9S/f2Vv4y|2255;psq/1;adk/;ads/;pap/JA2015_311210|9.3.5|ANDROID 10;osv/10;pv/2039.1;jdv/0|androidapp|t_335139774|appshare|QQfriends|1611211482018|1611211495;ref/com.jingdong.app.mall.home.JDHomeFragment;partner/jingdong;apprpd/Home_Main;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36`
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
