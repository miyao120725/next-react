import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Api from '../static/common/axios/api'
import common from '../static/common/common';
import { promises } from 'fs';

const PostLink = (props) => (
   <li>
    <Link href={`/post?title=${props.title}`} >
      {props.title}
    </Link>
   </li>
  );

  async function navListApi(){
    let navList=[];
    await Api.navList(common.getPostParams({})).then((res)=>{
      navList=res.data.data;
    }).catch((error)=>{
      console.log(error)
    })
    return navList;
  }

  interface IProps{
    dataList:any;
    navList:any;
    title:string;
  }

export default class extends React.Component<IProps> {
  constructor(props:IProps){
    super(props)
  }

  navData:[]

  static async getInitialProps({ req }) {
    // console.log(1111,req)
    let dataList=[];
    let navList=[];
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent

    // const nav=await this.navApiList();
    // nav.then((res)=>{
    //   navList=res.data.data;
    // }).catch((err)=>{
    //     console.log(err)
    // })

    await navListApi().then((res)=>{
      navList=res
    });
    
    const options={
      id:'9'
     }
    await Api.listApi(options).then((res) => {
       if (res.data.code === 0) {
         const data= res.data.data;
         dataList = data;
        // dataList.concat(data,dataList)
        //  console.log(123123,data)
         // this.setState({
         //   dataList:data.list,
         //   total: data.total
         // })
       }
     }).catch((err)=>{
       console.log(err)
     })

    return { dataList,navList }
  }

  async getStaticProps() {
    // console.log(123123123,Api)
  }

  componentDidMount(){
    // console.log(88888888)
  }

  render() {
    return (
      <div className='container-fluid'>
        <Head>
          <title>迷途导航</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <section id='content' className='row'>
          <div className='d-none d-sm-block col-6 col-sm-4 col-md-3 col-lg-2 left-box'> 
            <div className="left np-element np-hover d-flex flex-column align-items-center">
              <h1>
                <img src='/logo.png' className="img-fluid" alt="迷途导航"/>
              </h1>

              <div className="navigation">
                {
                  this.props.navList.map((item,index)=>{
                    return (
                      <Link href={`/${item.id}?title=${item.nav_title}`}  key={index}>
                        <button className="np-btn nav-btn" data-icon="icon-kaifangpingtai">
                            {/* <i className="iconfont icon-kaifangpingtai nav-icon"></i> */}
                            <img src={item.icon_img} className="nav-icon" alt=""/>
                            {item.nav_title}
                        </button>
                      </Link>
                    )
                  })
                }
                
              
                {/* <button className="np-btn nav-btn" data-icon="icon-kuangjia"><i className="iconfont icon-kuangjia nav-icon"></i>框架
                </button>
                <button className="np-btn nav-btn" data-icon="icon-wendang"><i className="iconfont icon-wendang nav-icon"></i>教程文档
                </button>
                <button className="np-btn nav-btn" data-icon="icon-zixun"><i className="iconfont icon-zixun nav-icon"></i>AI资讯
                </button>
                <button className="np-btn nav-btn" data-icon="icon-shequ"><i className="iconfont icon-shequ nav-icon"></i>博客论坛
                </button>
                <button className="np-btn nav-btn" data-icon="icon-jingsai"><i className="iconfont icon-jingsai nav-icon"></i>AI竞赛
                </button>
                <button className="np-btn nav-btn" data-icon="icon-shujuji"><i className="iconfont icon-shujuji nav-icon"></i>数据集
                </button>
                <button className="np-btn nav-btn" data-icon="icon-lunwen"><i className="iconfont icon-lunwen nav-icon"></i>学术论文
                </button>
                <button className="np-btn nav-btn" data-icon="icon-gpu"><i className="iconfont icon-gpu nav-icon"></i>算力平台
                </button> */}
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-8 col-md-9 col-lg-10 right-box'>
            <div className='right np-element np-hover d-flex flex-column'>
            <div id="scroll" className="d-flex flex-column align-items-center">
              {
                this.props.dataList.map((item,index)=>{
                  return (
                  <div className="row np-element np-hover-inverse np-shadow-inverse itemCart" key={index}>
                    <h6 className="col-12 item-title">
                      {item.block_title}
                    </h6>
                    {
                      item.block_list.map((vm,ix)=>{
                        return (
                          <a href={vm.link_url} target="_blank" className="item col-12 col-sm-6 col-md-4 col-lg-3" key={ix}>
                            <div className="np-element np-hover np-shadow d-flex flex-column justify-content-center">
                              <div className="d-flex justify-content-center align-items-center">
                                <img className="favicon" src={vm.img_url} alt="机器之心"/>
                                <h6 className="site-name">{vm.title}</h6>
                              </div>
                              <div className="introduction">{vm.desc}</div>
                            </div>
                          </a>
                        )
                      })
                    }
                  </div>
                  )
                })
              }
              {/* <div className="row np-element np-hover-inverse np-shadow-inverse itemCart">
                <h6 className="col-12 item-title">
                  <i className="iconfont icon-zixun nav-icon"></i>
                  AI资讯
                </h6>

                <a href="https://www.jiqizhixin.com/" target="_blank" className="item col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="np-element np-hover np-shadow d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center">
                <img className="favicon" src="https://www.puuuq.cn/static/iconfont/15830431783189723.ico" alt="机器之心"/>
                <h6 className="site-name">机器之心</h6>
                </div>
                <div className="introduction">机器之心是国内领先的前沿科技媒体和产业服务平台，关注人工智能、机器人和神经认知科学，坚持为从业者提供高质量内容和多项产业服务。</div>
                </div>
                </a> */}

                {/* <a href="https://www.leiphone.com/" target="_blank" className="item col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="np-element np-hover np-shadow d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center">
                <img className="favicon" src="https://www.puuuq.cn/static/iconfont/1583117961516195.ico" alt="雷锋网"/>
                <h6 className="site-name">雷锋网</h6>
                </div>
                <div className="introduction">雷锋网成立于2011年，秉承“关注智能与未来”的宗旨，持续对全球前沿技术趋势与产品动态进行深入调研与解读，是国内具有代表性的实力型科技新媒体与信息服务平台。</div>
                </div>
                </a>

                <a href="https://www.infoq.cn/" target="_blank" className="item col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="np-element np-hover np-shadow d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center">
                <img className="favicon" src="https://www.puuuq.cn/static/iconfont/15830375206233747.ico" alt="InfoQ"/>
                <h6 className="site-name">InfoQ</h6>
                </div>
                <div className="introduction">跟踪科技公司、科研机构和IT产业在人工智能方向的最新动态，挖掘人工智能技术应用场景和商业化落地案例，重点关注该技术在金融、教育、医疗、交通、智慧城市等方向的应用。</div>
                </div>
                </a>

                <a href="https://tech.163.com/smart/" target="_blank" className="item col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="np-element np-hover np-shadow d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center">
                <img className="favicon" src="https://www.puuuq.cn/static/iconfont/15830375206233747.ico" alt="网易智能"/>
                <h6 className="site-name">网易智能</h6>
                </div>
                <div className="introduction">网易智能频道定位人工智能等前沿科技领域的专业媒体及产品服务平台，面向人工智能等行业的从业者和关注者。</div>
                </div>
                </a>

                <a href="https://www.cnaiplus.com/" target="_blank" className="item col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="np-element np-hover np-shadow d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-center">
                <img className="favicon" src="https://www.puuuq.cn/static/iconfont/15830375206233747.ico" alt="AI中国网"/>
                <h6 className="site-name">AI中国网</h6>
                </div>
                <div className="introduction">中国最专业的人工智能科技门户</div>
                </div>
                </a> */}
              {/* </div> */}

              </div>
            </div>
          </div>
        </section>

        <style jsx> 
          {
            `
              .container-fluid{
                height:100vh;
              }

              #content{
                height: 100%;
              }

              .left-box{
                padding: 2% 1% 2% 2%;
              }

              .right-box{
                padding: 2% 2% 2% 1%;
              }

              .left-box, .right-box{
                height: 100%;
              }

              .np-element{
                background: #383838;
                color: #75bce5;
                box-shadow: 6px 6px 16px 0px rgba(40,40,41,.801), -6px -6px 16px 0px rgba(65,65,65,.801), inset 0px 0px 0px 0px rgba(40,40,41,.801), inset 0px 0px 0px 0px rgba(65,65,65,.801);
                border-radius: 5px;
                padding: .4rem 1rem;
                border: 1px solid rgba(65,65,65,.801);
                transition: all .3s;
              }

              .np-element, #themeToggler{
                border: 1px solid rgba(65,65,65,.22);
                background: #243441;
                box-shadow: 6px 6px 16px 0 var(--black-shadow),-6px -6px 16px 0 var(--white-shadow),inset 0 0 0 0 var(--black-shadow),inset 0 0 0 0 var(--white-shadow);
              }

              .np-shadow-inverse{
                box-shadow: 0 0 0 0 var(--black-shadow),0 0 0 0 var(--white-shadow),inset 6px 6px 16px 0 var(--black-shadow),inset -6px -6px 16px 0 var(--white-shadow);
              }

              .left{
                height: 100%;
              }

              .right{
                width: 100%;
                height: 100%;
                padding-left: .2rem;
                padding-right: .2rem;
              }

              .d-none{
                display: none;
              }

              .np-element{
                border-radius: 15px;
              }

              .img-fluid{
                max-width: 100%;
                height: auto;
              }

              .navigation{
                width: 90%;
                height: 90%;
              }

              .navigation button{
                width: 100%;
                margin: 5% 0;
                white-space: nowrap;
                border-radius: 50px;
                outline: none;
              }

              .nav-icon{
                width: 16px;
                margin-right:4px;
                margin-top: -2px;
              }

              .np-btn{
                background: #243441;
                box-shadow: 6px 6px 16px 0 var(--black-shadow),-6px -6px 16px 0 var(--white-shadow),inset 0 0 0 0 var(--black-shadow),inset 0 0 0 0 var(--white-shadow);
                color: #75bce5;
                border-radius: 5px;
                padding: .4rem 1rem;
                border: 1px solid rgba(65,65,65,.801);
                border: none;
                transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);
                border-radius: 5px;
                line-height: 1.8rem;
                padding: .4rem;
                cursor: pointer;
              }

              #scroll{
                overflow-x: hidden;
                height: 100%;
                padding: 22px;
              }

              .itemCart{
                width: 100%;
                align-self: center;
                margin-bottom: 3vh;
              }

              .item-title{
                margin-top: .3vh;
              }

              .item{
                height: 15vh;
                padding: .5% 1.5% 2vh;
              }

              .item .np-element{
                height: 100%;
              }

              .favicon{
                width: 35px;
                height: 35px;
                margin-right: 5%;
              }

              .site-name{
                width: 100%;
                font-size: .9rem;
                font-weight: 700;
                white-space: nowrap;
              }

              .introduction{
                width: 100%;
                font-size: .6rem;
                margin-top: .2rem;
                display: -webkit-box!important;
                -webkit-box-orient: vertical!important;
                -webkit-line-clamp: 2!important;
                overflow: hidden!important;
                text-overflow: ellipsis!important;
              }

              a:hover{
                color: #eba3a3;
                text-decoration: none;
              }

              .np-hover:hover{
                box-shadow: 0 0 0 0 var(--black-shadow),0 0 0 0 var(--white-shadow),inset 6px 6px 16px 0 var(--black-shadow),inset -6px -6px 16px 0 var(--white-shadow);
              }

              .np-hover-inverse:hover{
                box-shadow: 6px 6px 16px 0 var(--black-shadow),-6px -6px 16px 0 var(--white-shadow),inset 0 0 0 0 var(--black-shadow),inset 0 0 0 0 var(--white-shadow);
              }

              .np-btn:hover{
                box-shadow: 0 0 0 0 var(--black-shadow),0 0 0 0 var(--white-shadow),inset 6px 6px 16px 0 var(--black-shadow),inset -6px -6px 16px 0 var(--white-shadow);
                color: var(--main-color);
              }

              @media (min-width: 576px){
                .d-sm-block{
                  display: block;
                }
              }

              @media screen and (max-width: 540px){
                .right-box{
                  padding: 0;
                }
              }

              
            `
          }
        </style>

        <style global jsx>
          {`
          :root{
            --main-color: #0AFFEF;
            --main-bg-color: #243441;
            --white-shadow: rgba(255, 255, 255, .1);
            --black-shadow: rgba(0, 0, 0, .2);
          }
          
          html, body{
            background: var(--main-bg-color);
          }
          `}
        </style>
      </div>
    )
  }
}
