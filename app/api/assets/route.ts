import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ikFetch } from "@/lib/imagekit.server";
import type { IKRawFile, IKFile } from "@/types/imagekit";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const path = searchParams.get("folder") || "/";
    const limit = Number(searchParams.get("limit") || "50");
    const skip = Number(searchParams.get("skip") || "0");

    // Do NOT use encodeURIComponent on folder paths — ImageKit's API gateway
    // does not decode %2F back to / in query params, causing 404 "Function not found".
    const data = await ikFetch<IKRawFile[]>(
      `/files?path=${path}&limit=${limit}&skip=${skip}`
    );

    const items: IKFile[] = data.map((item) => {
      // ImageKit has a 25.0 MegaPixel transformation limit.
      // For images > 25MP, append tr=orig-true so requests bypass image transformation and serve raw original without 400 Bad Request.
      const isOversized =
        item.fileType === "image" &&
        Boolean(item.width && item.height && item.width * item.height > 25_000_000);

      let url = item.url;
      if (isOversized && !url.includes("tr=") && !url.includes("/tr:")) {
        url = url.includes("?") ? `${url}&tr=orig-true` : `${url}?tr=orig-true`;
      }

      return {
        id: item.fileId,
        name: item.name,
        url,
        thumbnailUrl: item.thumbnail ?? url,
        type: item.fileType,
        path: item.filePath,
      };
    });

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to list assets" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { fileId } = (await req.json()) as { fileId?: string };
    if (!fileId) {
      return NextResponse.json({ error: "fileId required" }, { status: 400 });
    }

    await ikFetch(`/files/${fileId}`, { method: "DELETE" });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete asset" },
      { status: 500 }
    );
  }
}
