import { signUp } from "@/libs/firebase/service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const signUpStatus = await signUp(body);

    if (signUpStatus.success) {
      return NextResponse.json({
        status: true,
        statusCode: 200,
        message: "success",
      });
    } else {
      return NextResponse.json({
        status: false,
        statusCode: 400,
        message: signUpStatus.message,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
}
