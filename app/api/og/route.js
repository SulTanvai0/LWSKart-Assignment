import { ImageResponse } from "next/og";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const hasTitle = searchParams.has("title");

  const title = hasTitle ? searchParams.get("title") : "LWSKart";

  return new ImageResponse(
    (
      <div tw="text-7xl text-[#eb4a36] bg-teal-100 w-full h-full flex text-center items-center justify-center">
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
