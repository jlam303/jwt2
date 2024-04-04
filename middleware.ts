import { NextRequest } from "next/server";
import { updateSession } from "./app/lib";

export async function middleware(request: NextRequest){
    console.log("mid")
    return await updateSession(request)
}
//run on every request
