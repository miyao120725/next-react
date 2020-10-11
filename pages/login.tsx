import Head from 'next/head'

export default ()=> {
    return (
        <div className='container-fluid login'>
            <Head>
                <title>迷途导航-登录</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='login-content col-11 col-sm-10 sol-md-8 col-lg-5'>
                <h3>迷途-登录</h3>
                <div className='form-box'>
                    <div className='form-group-box'>
                        <input type="text" placeholder='请输入邮箱' className='form-input-control'/>
                    </div>
                    <div className='form-group-box flex-between'>
                        <input type="text" placeholder='请输入验证码' className='form-input-control flex-input'/>
                        <button className='btn-login btn-code'>发送验证码</button>
                    </div>
                    <div className='form-group-box'>
                        <input type="text" placeholder='请输入密码：12345678' className='form-input-control'/>
                    </div>
                </div>
                <button type='button' className='btn-login col-5 col-sm-5 sol-md-5 col-lg-5'>登录</button>
            </div>
            <style jsx> 
            {
            `
              ::-webkit-input-placeholder {
                color: rgba(117, 188, 229, .8);
                font-weight: 200;
              }
              :-moz-placeholder {/* Firefox 18- */
                color: rgba(117, 188, 229, .8);
                font-weight: 200;
              }
              ::-moz-placeholder{/* Firefox 19+ */
                color: rgba(117, 188, 229, .8);
                font-weight: 200;
              }
              :-ms-input-placeholder {
                color: rgba(117, 188, 229, .8);
                font-weight: 200;
              }
                .container-fluid{
                    height:100vh;
                    background: var(--main-bg-color);
                }

                .login{
                    position:relative;
                }

                .login-content{
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: #75bce5;
                    border-radius: 15px;
                    padding: 2rem;
                    transition: all .3s;
                    border: 1px solid rgba(65,65,65,.22);
                    background: #243441;
                    box-shadow: 6px 6px 16px 0 var(--black-shadow),-6px -6px 16px 0 var(--white-shadow),inset 0 0 0 0 var(--black-shadow),inset 0 0 0 0 var(--white-shadow);
                }

                .login-content:hover{
                    box-shadow: 0 0 0 0 var(--black-shadow),0 0 0 0 var(--white-shadow),inset 6px 6px 16px 0 var(--black-shadow),inset -6px -6px 16px 0 var(--white-shadow);
                }

                h3{
                    margin-bottom:2rem;
                    text-align: center;
                    color: #fff;
                    font-size: 30px;
                    font-weight: 700;
                    text-shadow: 0 1px 4px rgba(0,0,0,.2);
                }

                .form-group-box{
                    margin-bottom: 1rem;
                }

                .form-input-control,.btn-login{
                    background-color: transparent;
                    border-radius: 20px;
                    color: #8c97b4;
                    box-shadow: 6px 6px 16px 0 var(--black-shadow),-6px -6px 16px 0 var(--white-shadow),inset 0 0 0 0 var(--black-shadow),inset 0 0 0 0 var(--white-shadow);
                }

                .form-input-control,.btn-login{
                    width:100%;
                    color: #75bce5;
                    border: 1px solid rgba(65,65,65,.801);
                    border: none;
                    transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);
                    padding: .4rem;
                    cursor: pointer;
                    white-space: nowrap;
                    border-radius: 50px;
                    outline: none;
                    padding: .375rem .75rem;
                    font-size: 1rem;
                    line-height: 1.5;
                }
                .btn-login{
                    margin-top:1rem;
                }

                .flex-input{
                    flex:1;
                }

                .btn-code{
                    margin-top:0;
                    width:auto;
                    margin-left:1rem;
                    font-size: .8rem;
                    line-height: 1.8;
                }

                .form-input-control:focus,.btn-login:hover{
                    box-shadow: 0 0 0 0 var(--black-shadow),0 0 0 0 var(--white-shadow),inset 6px 6px 16px 0 var(--black-shadow),inset -6px -6px 16px 0 var(--white-shadow);
                    color: var(--main-color);
                }
            `
            }
            </style>
        </div>
    )
}