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
    if(formData.get("email")==="jlam303@west-mec.org"&& formData.get("password")==process.env.PASS ){
        let user ={email:formData.get("email"),password:formData.get("password"),name:"Jonathan Lam"}
        const expires = new Date(Date.now()+100*1000)
        const session = await encrypt({user,expires})
        cookies().set("session",session,{expires,httpOnly:true})
        redirect("/home")
    }
    else{
    redirect("/")
    }
    
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