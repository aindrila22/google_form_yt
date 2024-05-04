import { connect } from "@/utils/mongo";
import Form from "@/utils/models/Form";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const { params } = await req.json();
    const form = await Form.findOne({ _id: params });
    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Form Fetched Successfully", success: true, form },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating form:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
