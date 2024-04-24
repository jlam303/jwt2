import { redirect } from "next/navigation";
import Link from "next/link"

import {getSession,signup} from "../lib"
import "../login.css"
export default async function page() {
  const session = await getSession()
  return (
    <>
    <form className="flexy" action={async (formdata)=>{
      "use server"
        await signup(formdata)
      }}>
        <input type="email" name="email" id="email" placeholder="Email"/>
        <input type="password" name="password" id="password" placeholder="Password"/>
        <button type="submit">Sign Up</button>
      </form>
      <Link href="/">Login Page</Link>

    </>
  );
}