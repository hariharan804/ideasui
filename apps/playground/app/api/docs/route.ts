import {NextRequest, NextResponse} from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  try {
    const file = request.nextUrl.searchParams.get("file");

    if (!file) {
      return NextResponse.json({error: "File parameter required"}, {status: 400});
    }

    // Resolve the file path from project root
    const filePath = path.join(process.cwd(), file);

    // Security: prevent directory traversal
    const resolvedPath = path.resolve(filePath);
    const projectRoot = path.resolve(process.cwd());

    if (!resolvedPath.startsWith(projectRoot)) {
      return NextResponse.json({error: "Invalid file path"}, {status: 403});
    }

    // Check if file exists
    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({error: "File not found"}, {status: 404});
    }

    const content = fs.readFileSync(resolvedPath, "utf-8");

    return NextResponse.json({content});
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({error: "Failed to read file"}, {status: 500});
  }
}
