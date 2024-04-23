import { SignJWT,jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";

const secretkey = process.env.SECRET;
const key = new TextEncoder().encode(secretkey)

export async function encrypt(payload:any){
    return await new SignJWT(payload)
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime("100 sec")
    .sign(key)
}

export async function decrypt(input:string):Promise<any>{
    const {payload} = await jwtVerify(input,key,{algorithms:["HS256"]})
    return payload
}

export async function login(formData:FormData){
    console.log("E")
    let people = await fetch('http://localhost:5000/users')
  .then(response => {
   return response.json();
  })
  console.log(people)
  people.map(async (persony) => {
    console.log(formData.get("email"),formData.get("password"),persony.password)
   if(formData.get("email") === persony.email && formData.get("password") === persony.password){
    let user ={email:formData.get("email"),password:formData.get("password")}
        const expires = new Date(Date.now()+100*1000)
        const session = await encrypt({user,expires})
        cookies().set("session",session,{expires,httpOnly:true})
        redirect("/home")
   }
  })
    redirect("/") 
}
export async function signup(formData:FormData){
    let email = formData.get("email")
    let password = formData.get("password")
    
    await fetch('http://localhost:5000/users', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password }),
    })
  .then(response => {
   return response.json();
  }).then(res => {
    redirect("/") 
  })
}
export async function logout(){
    cookies().set("session","",{expires:new Date(0)})
}
export async function getSession(){
    const session = cookies().get("session")?.value;
    if(!session) return null;
    return await decrypt(session);
}
export async function updateSession(request:NextRequest){
    const session = request.cookies.get("session")?.value;
    if(!session) return;

    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now()+100*1000);
    const res = NextResponse.next();
    res.cookies.set({
        name:"session",
        value: await encrypt(parsed),
        httpOnly:true,
        expires:parsed.expires,
    });
    return res;
}