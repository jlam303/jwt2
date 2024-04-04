import { redirect } from "next/navigation";
import {getSession,login,logout} from "../lib"
import Link from "next/link"
import { json } from "stream/consumers";
export default async function Prof() {
  const session = await getSession()
  return (
    <>
    <h1>This is profile page</h1>
      <h1>Welcome {session.user.name}</h1>
      <h1>Email: {session.user.email}</h1>
      <form action={async ()=>{
        "use server"
        await logout()
        redirect('/')
      }}>
      <Link href="/">Home Page </Link>
        <button type="submit">Logout</button>
      </form>
    </>
  );
}