import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export async function uploadToImageKit(file: any, fileName: string) {
  try {
    const response = await client.files.upload({
      file,
      fileName,
      folder: "/geniuscv",
      useUniqueFileName: true,
      transformation: {
        pre: "w-300,h-300,fo-face,z-0.75",
      },
    });

    return response;
  } catch (error) {
    console.error("Created Error", error);
    throw error;
  }
}
