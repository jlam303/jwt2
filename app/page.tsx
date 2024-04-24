import { redirect } from "next/navigation";
import Link from "next/link"

import {getSession,login,logout} from "./lib"
import "./login.css"
export default async function log() {
  const session = await getSession()
  return (
    <>
    <form className="flexy" action={async (formdata)=>{
      "use server"
      console.log("Logy")
        await login(formdata)
      }}>
        <input type="email" name="email" id="email" placeholder="Email"/>
        <input type="password" name="password" id="password" placeholder="Password"/>
        <button type="submit">Login</button>
      </form>
      <Link href="/signup">Sign Up Page</Link>
    </>
  );
}