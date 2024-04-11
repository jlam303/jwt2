
import { redirect } from "next/navigation";
import Link from "next/link"
import {getSession,login,logout} from "../lib"
export default async function Home() {
  const session = await getSession()
  return (
    <section>
      <h1>This is home</h1>
      <Link href="/prof">Profile Page </Link>
      <Link href="/">Login page</Link>
    </section>
  );
}
