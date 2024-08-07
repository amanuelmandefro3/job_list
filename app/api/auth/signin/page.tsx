import {getServerSession} from 'next-auth'
import {redirect} from 'next/navigation'
import Form from './component/form'

const  LoginPage = async()=>{
  const session = await getServerSession()
  if (session){
    redirect('/')
  }
  return(
    <Form />
  )
}

export default LoginPage
