import { connect } from "@/utils/mongo";
import Form from "@/utils/models/Form";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const formdata  = await req.json();
    console.log("a",formdata)
    const savedForm = await Form.create(formdata);
    console.log("saved", savedForm);

    return NextResponse.json(
      { message: "Form Created Successfully", success: true, savedForm },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating form:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  try {
    const forms = await Form.find({});
    return NextResponse.json(
      { forms },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}