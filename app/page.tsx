import { redirect } from "next/navigation";
import {getSession,login,logout} from "./lib"
import "./login.css"
export default async function log() {
  const session = await getSession()
  return (
    <>
    <form className="flexy" action={async (formdata)=>{
      "use server"
        await login(formdata)
      }}>
        <input type="email" name="email" id="email" placeholder="Email"/>
        <input type="password" name="password" id="password" placeholder="Password"/>
        <button type="submit">Login</button>
      </form>
      <h1>The email is: jlam303@west-mec.org and password is: hello</h1>

    
    </>
  );
}